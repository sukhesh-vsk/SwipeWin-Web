"use client";

import { Listico } from "@/assets/icons";
import { SearchBar } from "@/components";
import GameCard from "@/components/GameCard";
import {
  Game_OrderBy,
  UseSportsProps,
  useGameMarkets,
  useSports,
} from "@azuro-org/sdk";
import dayjs from "dayjs";
import React from "react";

export default function Events() {
  const useData = () => {
    const dataFilter: UseSportsProps = {
      gameOrderBy: Game_OrderBy.Turnover,
      filter: {
        limit: 1,
      },
    };

    const { loading, sports } = useSports(dataFilter);

    return {
      sports,
      loading,
    };
  };

  const { loading, sports } = useData();

  const extractGames = (sportsData: any) => {
    const GAME_DATA: any = [];
    
    var temp = sportsData.slice(0, 5);
    temp.forEach((sport: any, index: number) => {
      const countries = sport["countries"].slice(0, 1);
      countries.forEach((country: any, index: number) => {
        const leagues = country["leagues"].slice(0, 1);
        leagues.forEach((league: any, index: number) => {
          const games = league["games"][0];

          const DATA = {
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

          GAME_DATA.push(DATA);
        });
      });
    });

    return GAME_DATA;
  };

  const datas = extractGames(sports);

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

        <div className="mt-5 flex overflow-visible overflow-x-auto space-x-4 container-fluid mx-4 h-4/5 snap-x snap-mandatory no-scrollbar">
          {datas.map((data: any, index: number) => (
            <div className="snap-start" key={index}>
              <GameCard key={index} gameDetails={data} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
