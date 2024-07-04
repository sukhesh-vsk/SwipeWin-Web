"use client";
import {
  GamesQuery,
  SportsQuery,
  useGameStatus,
  useGameMarkets,
  useLive,
} from "@azuro-org/sdk";
import Link from "next/link";
import cx from "clsx";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

import { GameInfo } from "./GameInfo";
import { OutcomeButton } from "./OutcomeButton";
import GameCard from "./GameCard";

type GameProps = {
  className?: string;
  game: GamesQuery["games"][0];
};

const SerializeGameData = (props: GameProps & { league: string } & { sports: string }) => {
  const { className, game } = props;
  const { gameId, title, startsAt, status: graphStatus } = game;

  const { isLive } = useLive();
  const { status } = useGameStatus({
    graphStatus,
    startsAt: +startsAt,
    isGameExistInLive: isLive,
  });
  const { markets } = useGameMarkets({
    gameStatus: status,
    gameId,
  });

  const DATA = {
    id: gameId,
    sport: props.sports,
    league: props.league,
    status: status,
    time: dayjs(+startsAt).format("DD MMM HH:mm"),
    teams: [game.participants[0].name, game.participants[1].name],
    teamImage: [
      game.participants[0].image,
      game.participants[1].image,
    ],
  };

  return DATA;
}

function Game(props: GameProps & { league: string } & { sports: string }) {

  
  const DATA = SerializeGameData(props);

  return (
    <Link href={`/events/${DATA.id}`}>
      <GameCard key={DATA.id} gameDetails={DATA} />
    </Link>
  );
}

type LeagueProps = {
  className?: string;
  sportSlug: string;
  countryName: string;
  countrySlug: string;
  league: SportsQuery["sports"][0]["countries"][0]["leagues"][0];
};

export function League(props: LeagueProps) {
  const { className, sportSlug, countryName, countrySlug, league } = props;
  const { games } = league;

  const params = useParams();

  const isLeaguePage = params.league;

  return (
    <div
      className={cx("flex items-center mb-5 overflow-x-auto h-72", {
        "text-sm": !isLeaguePage,
        "text-lg font-bold": isLeaguePage,
      })}
    >
      {isLeaguePage && (
        <>
          <Link
            className="hover:underline w-fit"
            href={`/games/${sportSlug}/${countrySlug}`}
          >
            <div className="ml-2">{countryName}</div>
          </Link>
          <div className="mx-2">&middot;</div>
        </>
      )}
      <div className="text-text font-bold text-md">{league.name}</div>
      {games.map((game, index) => (
        <Link
          href={`/events/${game.gameId}`}
          className="mx-4 bg-secondary py-6 px-6 h-64 rounded-lg w-80"
          key={index}
        >
          <GameCard key={game.gameId} gameDetails={SerializeGameData} />
        </Link>
      ))}
    </div>
  );
}