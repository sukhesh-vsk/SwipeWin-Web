"use client";

import { useRouter } from "next/navigation";
import React from "react";
import useFetchOdds from "@/hooks/useFetchOdds";
import { useGameMarkets } from "@azuro-org/sdk";
import Image from "next/image";
import Link from "next/link";
import OddComponent from "./OddComponent";
import { GameProps } from "@/types/types";

export default function GameCard(props: { gameDetails: GameProps }) {
  const { gameDetails: data } = props;
  const router = useRouter();

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
      <div className="bg-sgrad rounded-xl game-card h-3/4 min-w-60 p-4 flex flex-col items-center justify-around">
        <div className="text-center text-sm font-medium">
          <p className="tracking-widest">{data.league}</p>
          <p className="tracking-widest mt-1 text-xs">{data.sport}</p>
        </div>
        <div className="flex justify-around items-center w-full text-center">
          <div className="flex flex-col items-center">
            <img
              src={
                data.teamImage[0] !== null
                  ? data.teamImage[0]
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO8EIqMyxuA7-SwDuYBU-P-t9RF3AuQ7UfRg&s"
              }
              alt="team1"
              width={50}
              height={50}
              onError={(e) => {
                e.currentTarget.src =
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO8EIqMyxuA7-SwDuYBU-P-t9RF3AuQ7UfRg&s";
              }}
            />

            <p className="text-xs uppercase mt-2 font-bold">{data.teams[0]}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-semibold font-cairo">{data.time}</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={
                data.teamImage[1] !== null
                  ? data.teamImage[1]
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO8EIqMyxuA7-SwDuYBU-P-t9RF3AuQ7UfRg&s"
              }
              alt="team1"
              width={50}
              height={50}
              onError={(e) => {
                e.currentTarget.src =
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO8EIqMyxuA7-SwDuYBU-P-t9RF3AuQ7UfRg&s";
              }}
            />
            <p className="text-xs uppercase mt-2 font-bold">{data.teams[1]}</p>
          </div>
        </div>
        {Boolean(markets?.[0]?.outcomeRows[0]) && (
          <div className="">
            <div className="flex gap-3 items-center">
              {markets![0].outcomeRows[0].map((outcome, index) => (
                <OddComponent
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
