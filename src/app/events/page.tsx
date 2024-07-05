"use client";

import { Listico } from "@/assets/icons";
import { SearchBar } from "@/components";
import GameCard from "@/components/GameCard";
import {
  Game_OrderBy,
  UseGamesProps,
  UseSportsProps,
  useGameMarkets,
  useSports,
} from "@azuro-org/sdk";
import dayjs from "dayjs";
import React from "react";

enum GameStatus {
  Canceled = "Canceled",
  Created = "Created",
  Paused = "Paused",
  Resolved = "Resolved"
}

interface GameDataProps {
  __typename?: "Game" | undefined;
  turnover: string;
  id: string;
  gameId: string;
  title?: string | null | undefined;
  startsAt: string;
  status: GameStatus;
  sport: {
      __typename?: "Sport" | undefined;
      sportId: string;
      slug: string;
      name: string;
  };
  league: {
      __typename?: "League" | undefined;
      slug: string;
      name: string;
      country: {
          __typename?: "Country" | undefined;
          slug: string;
          name: string;
      };
  };
  participants: {
      __typename?: "Participant" | undefined;
      image?: string | null | undefined;
      name: string;
  }[];
};


const useData = () => {
  const props: UseSportsProps = {
      gameOrderBy: Game_OrderBy.Turnover,
      filter: {
          limit: 10,
      }
  }
  const { loading, sports } = useSports({ ...props });
  let topGame: GameDataProps[] = [];
  if (sports.length) {
      let gameList: GameDataProps[] = []
      const sortedGame = sports?.flatMap(sport =>
          sport?.countries.flatMap(country =>
              country.leagues.flatMap(league =>
                  league.games
              )
          )
      ).sort((a , b) => +b.turnover - +a.turnover);
      sortedGame.forEach(game => gameList.push(game));

      topGame = gameList.slice(0, 5);

      console.log("Game List", gameList);
  }

  const topEvents = topGame.map((games) => {

    return {
      id: games["gameId"],
      sport: games["sport"]["name"],
      league: games["league"]["name"],
      status: games["status"],
      time: dayjs(+games["startsAt"]).format("DD MMM HH:mm"),
      teams: [
        games["participants"][0]["name"],
        games["participants"][1]["name"],
      ],
      teamImage: [
        games["participants"][0]["image"],
        games["participants"][1]["image"],
      ],
    };

  })

  console.log("Top Game", topEvents);

  // topGame.push(DATA)

  return {
      sports,
      loading,
      topEvents
  }
}

export default function Events() {

  const { loading, topEvents ,  sports } = useData();

  // const datas = extractGames(sports);
  // const datas = topEvents;
  // if(loading) return <p>Loading...</p>;

  return (
    <>
      <SearchBar />
      <div className="container mt-7 h-4/5 flex-1 h-full">
        <div className="flex justify-between items-center">
          <p>Top Events</p>
          <div>
            <Listico className="w-4" />
          </div>
        </div>
        {(loading) 
          ? <p>Loading...</p> 
          : <div className="mt-5 flex overflow-visible overflow-x-auto space-x-4 container-fluid mx-4 h-4/5 snap-x snap-mandatory no-scrollbar">
              {topEvents.map((data: any, index: number) => (
                <div className="snap-start" key={index}>
                  <GameCard key={index} gameDetails={data} />
                </div>
              ))}
            </div>
        }
      </div>
    </>
  );
}
