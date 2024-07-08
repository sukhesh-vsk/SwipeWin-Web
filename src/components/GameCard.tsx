"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useGameMarkets, useBaseBetslip } from "@azuro-org/sdk";
import Link from "next/link";
import OddComponent from "./OddComponent";
import { GameProps } from "@/types/types";

const defaultTeamLogo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO8EIqMyxuA7-SwDuYBU-P-t9RF3AuQ7UfRg&s";

export default function GameCard(props: { gameDetails: GameProps }) {
  const { gameDetails: data } = props;
  const router = useRouter();
  const { clear } = useBaseBetslip();
  
  useEffect(() => {
    clear();
  }, [clear]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/event/${data.id}`);
  };

  const { markets } = useGameMarkets({
    gameId: data.id,
    gameStatus: data.status,
  });

  return (
    <Link href={`/event/${data.id}`} passHref onClick={handleClick}>
      <div className="bg-sgrad font-inter font-medium rounded-xl game-card h-3/4 min-w-60 p-4 flex flex-col justify-around">
        <div className="text-center">
          <p className="font-metro font-semibold text-md tracking-wide">{data.league}</p>
          <p className="tracking-widest font-medium text-sm">{data.sport}</p>
        </div>
        <div className="flex justify-around w-full text-center">
          <div className="flex flex-col w-10 items-center">
            <img
              src={
                data.teamImage[0] !== null
                  ? data.teamImage[0]
                  : defaultTeamLogo
              }
              alt="team1"
              width={50}
              height={50}
              onError={(e) => {
                e.currentTarget.src =
                  defaultTeamLogo;
              }}
              className="rounded-full"
            />
            <p className="text-sm font-semibold mt-2 fixed-width text-center" style={{lineHeight: '18.2px'}}>
              {data.teams[0]}
            </p>
          </div>
          <div className="flex flex-col text-xs items-center text-text_dim_2">
            <p className="">{data.time.substring(0, data.time.length-5)}</p>
            <p className="">{data.time.substring(data.time.length-5)}</p>
          </div>
          <div className="flex flex-col w-10 items-center">
            <img
              src={
                data.teamImage[1] !== null
                  ? data.teamImage[1]
                  : defaultTeamLogo
              }
              alt="team2"
              width={50}
              height={50}
              onError={(e) => {
                e.currentTarget.src =
                  defaultTeamLogo
              }}
              className="rounded-full"
            />
            <p className="text-sm font-semibold mt-2 fixed-width text-center" style={{lineHeight: '18.2px'}}>
              {data.teams[1]}
            </p>
          </div>
        </div>
        {Boolean(markets?.[0]?.outcomeRows[0]) && (
          <div className="flex justify-between items-center w-full mt-2">
            {markets[0].outcomeRows[0].map((outcome, index) => (
              <OddComponent
                className="odd-cont"
                key={`${outcome.selectionName}-${index}`}
                outcome={outcome}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
