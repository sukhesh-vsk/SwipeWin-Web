"use client";

import { useGameData } from "@/context/GameDataProvider";
import { GameStatus } from "@azuro-org/sdk";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import useFetchOdds from "@/hooks/useFetchOdds";
import Odds from "@/components/Odds";

export default function GameCard(props: { gameDetails: any }) {
  const { gameDetails: data } = props;
  const router = useRouter();
  const { setGameData } = useGameData();
  
  const { loading, markets } = useFetchOdds(data.id, data.status);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setGameData(data);
    router.push(`/events/${data.id}`);
  };

  return (
    <Link href={`/events/${data.id}`} passHref onClick={handleClick}>
      <div className="bg-sgrad rounded-xl h-4/5 w-64 p-4 flex flex-col items-center justify-around">
        <div className="text-center text-sm font-medium">
          <p className="tracking-widest">{data.league}</p>
          <p className="tracking-widest mt-1 text-xs">{data.sport}</p>
        </div>
        <div className="flex justify-around items-center w-full text-center">
          <div className="flex flex-col items-center">
            <Image src={data.teamImage[0]} alt="team1" width={50} height={50} />
            <p className="text-xs uppercase mt-2 font-bold">{data.teams[0]}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-semibold font-cairo">{data.time}</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src={data.teamImage[1]} alt="team2" width={50} height={50} />
            <p className="text-xs uppercase mt-2 font-bold">{data.teams[1]}</p>
          </div>
        </div>
        <div className="flex w-full justify-around">
          {loading ? (
            <p>Loading...</p>
          ) : markets && markets[0] && markets[0].outcomeRows[0] ? (
            <Odds oddsData={markets[0].outcomeRows[0]} className="bg-odd px-4 py-1 rounded-md font-cairo font-bold tracking-widest" />
          ) : (
            <p>No odds available</p>
          )}
        </div>
      </div>
    </Link>
  );
}
