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

import { GameInfo, OutcomeButton } from "./index";

type GameProps = {
  className?: string;
  game: GamesQuery["games"][0];
};

function Game(props: GameProps & { league: string } & { sports: string }) {
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

  return (
    <Link href={`/event/${gameId}`}>
      <div
        className={cx(
          className,
          "p-2 bg-sgrad text-text rounded-xl flex flex-col items-center justify-around game-card"
        )}
      >
        <div>
          <div className="text-md mb-8 tracking-widest font-medium text-center">
            {props.league}
          </div>
          <div className="max-w-[220px] text-sm w-full flex flex-col items-center justify-center mx-auto">
            {title}
            <div className="text-sm">
              {dayjs(+startsAt * 1000).format("DD MMM HH:mm")}
            </div>
          </div>
        </div>
        {Boolean(markets?.[0]?.outcomeRows[0]) && (
          <div className="lg:min-w-[500px]">
            <div className="flex items-center">
              {markets![0].outcomeRows[0].map((outcome, index) => (
                <OutcomeButton
                  className="ml-2 odd-cont first-of-type:ml-0"
                  key={`${outcome.selectionName}-${index}`}
                  outcome={outcome}
                />
              ))}
            </div>
          </div>
        )}
      </div>
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
      className={cx("flex items-center justify-start ms-4 my-5 overflow-x-auto h-max", {
        "text-sm": !isLeaguePage,
        "text-sm font-bold": isLeaguePage,
      })}
    >
      {isLeaguePage && (
        <>
          <Link
            className="hover:underline w-fit"
            href={`/events/${sportSlug}/${countrySlug}`}
          >
            <div className="ml-2">{countryName}</div>
          </Link>
          <div className="mx-2">&middot;</div>
        </>
      )}
      <div className="text-text font-medium text-xs mr-4 flex-1 min-w-28">{league.name}</div>
      <div className="flex">
      {games.map((game, index) => (
        <Link
          href={`/event/${game.gameId}`}
          className="mx-4 bg-sgrad py-6 px-6 h-48 rounded-lg w-80"
          key={index}
        >
          <GameInfo key={game.gameId} game={game} />
        </Link>
      ))}
      </div>
    </div>
  );
}