"use client";

import PageHeader from "@/components/PageHeader";
import React, { useState } from "react";
import {
  FaFootballBall,
  FaBasketballBall,
  FaBaseballBall,
} from "react-icons/fa";
import { GiCricketBat, GiBoxingGlove } from "react-icons/gi";
import { MdSportsMma, MdSportsTennis, MdSportsEsports } from "react-icons/md";
import DataPopup from "@/components/DataPopup";
import { useAccount } from "wagmi";
import {
  OrderDirection,
  usePrematchBets,
  useLiveBets,
  Bet,
} from "@azuro-org/sdk";
import { RedeemAll } from "@/components/RedeemAll";

export default function BetHistory() {
  const { address } = useAccount();

  const props = {
    filter: {
      bettor: address!,
    },
    orderDir: OrderDirection.Desc,
  };

  const { loading: isPrematchLoading, bets: prematchBets } =
    usePrematchBets(props);
  const { loading: isLiveLoading, bets: liveBets } = useLiveBets(props);
  
  const isLoading = isPrematchLoading || isLiveLoading;
  const allBets = [...prematchBets, ...liveBets];

  const [isVisible, setIsVisible] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Bet | null>(null);

  const handleClick = (match: Bet) => {
    setSelectedMatch(match);
    setIsVisible((isVisible === false) ? true : false);
  };

  const getSportIcon = (sportSlug: string) => {
    switch (sportSlug) {
      case "football":
        return <FaFootballBall className="ms-2 w-6" />;
      case "cricket":
        return <GiCricketBat className="ms-2 w-6" />;
      case "tennis":
        return <MdSportsTennis className="ms-2 w-6" />;
      case "boxing":
        return <GiBoxingGlove className="ms-2 w-6" />;
      case "basketball":
        return <FaBasketballBall className="ms-2 w-6" />;
      case "mma":
        return <MdSportsMma className="ms-2 w-6" />;
      case "esports":
        return <MdSportsEsports className="ms-2 w-6" />;
      case "baseball":
        return <FaBaseballBall className="ms-2 w-6" />;
      default:
        return null;
    }
  };

  const getSelectionName = (selectionName: string, participants: any[]) => {
    if (selectionName === "1") {
      return participants[0].name;
    }
    if (selectionName === "2") {
      return participants[1].name;
    }
    if (selectionName === "X") {
      return "Match Draw";
    }
    return "";
  };

  const groupedBets = allBets.reduce((acc, bet) => {
    const year = new Date(bet.createdAt * 1000).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(bet);
    return acc;
  }, {} as { [year: number]: Bet[] });

  const redeemableBets = allBets.filter(
    (bet) => bet.isRedeemable && !bet.freebetContractAddress
  );

  return (
    <>
      <PageHeader title="Bet History" filter={false} />

      <div className="container">
        {redeemableBets.length > 0 && (
          <div className="my-4 flex justify-end">
            <RedeemAll bets={redeemableBets} />
          </div>
        )}
        {isLoading ? (
          <p className="text-center text-lg font-semibold mt-20">Loading...</p>
        ) : Object.keys(groupedBets).length === 0 ? (
          <p className="text-center text-lg font-semibold mt-20">
            No Bet History
          </p>
        ) : (
          Object.keys(groupedBets).map((year) => (
            <div key={year}>
              <div className="absolute right-0 top-36 text-start bg-sgrad w-full py-1">
                <p className="ms-8">{year}</p>
              </div>
              <div className="mt-12">
                {groupedBets[year].map((bet, index) => (
                  <div
                    onClick={() => handleClick(bet)}
                    key={bet.txHash}
                    className="flex mt-5 justify-between items-center cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex">
                        <p className="tracking-wide font-semibold font-cairo">
                          {getSelectionName(
                            bet.outcomes[0].selectionName,
                            bet.outcomes[0].game.participants
                          )}
                        </p>
                        {getSportIcon(bet.outcomes[0].game.sport.slug)}
                      </div>
                      <p className="text-xs text-sec_dim font-semibold">
                        {new Date(bet.createdAt * 1000).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex-1 text-xs ps-4 text-sec_dim font-medium text-center">
                      {bet.outcomes[0].game.participants[0].name} vs{" "}
                      {bet.outcomes[0].game.participants[1].name}
                    </div>
                    <div className="flex-1 text-end">
                      <p>{bet.amount}USDT</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
        {selectedMatch && (
          <DataPopup
            match={selectedMatch}
            visible={isVisible}
            toggleVisible={handleClick}
          />
        )}
      </div>
    </>
  );
}
