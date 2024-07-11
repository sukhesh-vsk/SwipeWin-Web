"use client";

import OddComponent from "@/components/OddComponent";
import PageHeader from "@/components/PageHeader";
import {
  BetslipDisableReason,
  OrderDirection,
  useBaseBetslip,
  useBetTokenBalance,
  useChain,
  useDetailedBetslip,
  useGame,
  useGameMarkets,
  useLiveBetFee,
  useLiveBets,
  usePrematchBets,
} from "@azuro-org/sdk";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { TOKEN_SYMBOL } from "@/constants";
import { connect, switchChain } from "wagmi/actions";
import { wagmiConfig } from "@/context";
import { injected } from "wagmi/connectors";
import BetHistory from "@/components/BetHistory";
import SubmitButton from "@/components/SubmitButton";

const errorPerDisableReason = {
  [BetslipDisableReason.ComboWithForbiddenItem]:
    "One or more conditions can't be used in combo",
  [BetslipDisableReason.BetAmountGreaterThanMaxBet]:
    "Bet amount exceeds max bet",
  [BetslipDisableReason.BetAmountLowerThanMinBet]:
    "Bet amount lower than min bet",
  [BetslipDisableReason.ComboWithLive]: "Live outcome can't be used in combo",
  [BetslipDisableReason.ConditionStatus]:
    "One or more outcomes have been removed or suspended. Review your betslip and remove them.",
  [BetslipDisableReason.PrematchConditionInStartedGame]: "Game has started",
} as const;



export default function Game() {
  const params = useParams();
  const account = useAccount();
  const { betToken } = useChain();
  const { loading: isBalanceFetching, balance } = useBetTokenBalance();
  const [selectedOutcomeIndex, setSelectedOutcomeIndex] = useState<number>(-1);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const { items, addItem, removeItem } = useBaseBetslip();

  const {
    betAmount,
    changeBetAmount,
    totalOdds,
    disableReason,
    isOddsFetching,
    isLiveBet,
  } = useDetailedBetslip();

  const { formattedRelayerFeeAmount, loading: isRelayerFeeLoading } =
    useLiveBetFee({
      enabled: isLiveBet,
    });

  const { loading, game, isGameInLive } = useGame({
    gameId: params.id as string,
  });

  const { loading: marketLoading, markets } = useGameMarkets({
    gameId: params.id as string,
    gameStatus: game?.status as any,
  });
  const { address } = useAccount();

  const props = {
    filter: {
      bettor: address!,
    },
    orderDir: OrderDirection.Desc,
  };

  const getOutcomeLabel = (index, length) => {
    if (length === 3) {
      if (index === 0) return `If ${game?.participants[0].name} wins`;
      if (index === 1) return "If drawn";
      if (index === 2) return `If ${game?.participants[1].name} wins`;
    } else if (length === 2) {
      if (index === 0) return `If ${game?.participants[0].name} wins`;
      if (index === 1) return `If ${game?.participants[1].name} wins`;
    }
    return "Winning Amount";
  };

  const { loading: isPrematchLoading, bets: prematchBets } =
    usePrematchBets(props);
  const { loading: isLiveLoading, bets: liveBets } = useLiveBets(props);
  const allBets = [...prematchBets, ...liveBets].filter(
    (bet) => bet.outcomes[0].game.gameId === params.id
  );




  useEffect(() => {
    if (initialLoad) {
      changeBetAmount("--");
      setInitialLoad(false);
    }
  }, [params.id, changeBetAmount, initialLoad]);

  const handleOutcomeSelection = (index: number) => {
    setSelectedOutcomeIndex(index);
  };

  if (loading || marketLoading || isPrematchLoading || isLiveLoading) {
    return (
      <p className="text-center text-lg font-semibold mt-20">Loading...</p>
    );
  }

  if (!game) {
    return <div>Game info not found</div>;
  }

  const selectedOutcomeLabel =
    markets && markets[0]
      ? getOutcomeLabel(selectedOutcomeIndex, markets[0].outcomeRows[0].length)
      : "";

  const handleBlur = () => {
    // If the input is empty or out of range, set it to the default value (1)
    if (Number(betAmount) < 1) {
      changeBetAmount('1');
    } else if (Number(betAmount) > 100) {
      changeBetAmount('100');
    }
  };

  const connectWallet = async () => {
    const result = await connect(wagmiConfig, {
      chainId: wagmiConfig.chains[0].id,
      connector: injected(),
    })
  }
  const suggestAmount = [10, 20 ,30, 40]

  return (
    <>
      {game && (
        <PageHeader title={`${game.league.name} Betting`} filter={false} />
      )}
      <div className="container-fluid flex flex-col text-center justify-center items-center">
        <>
          <div className="bg-sec_2 mt-10 py-4 rounded-xl w-full flex flex-col py-6">
            {/* Game Details */}
            <div className="flex flex-col justify-between">
              <div className="flex justify-between px-6 mb-2">
                <div className="flex flex-col flex-1  items-center justify-center">
                  <img
                    src={
                      game.participants[0].image !== null
                        ? game.participants[0].image
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
                  <p className="text-sm mt-1 flex-1 font-medium">
                    {game.participants[0].name.split(' ').map((word, index) => (
                      <span key={index} className="block">{word}</span>
                    ))}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center text-secondary">
                  <p className="text-xs">
                    {dayjs(+game.startsAt * 1000).format("DD MMM")}
                  </p>
                  <p className="text-xs">
                    {dayjs(+game.startsAt * 1000).format("HH:mm")}
                  </p>
                </div>
                <div className="flex flex-col flex-1  items-center justify-center">
                  <img
                    src={
                      game.participants[1].image !== null
                        ? game.participants[1].image
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
                  <p className="text-sm mt-1 font-medium">
                    {game.participants[1].name.split(' ').map((word, index) => (
                      <span key={index} className="block">{word}</span>
                    ))}
                  </p>
                </div>
              </div>
              {/* { totalOdds === 1 && <div id="tooltip-light" role="tooltip" className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-1 tooltip">
                    Select Winning Bets
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>} */}
              <div
                className="w-full px-6 mt-2 mb-6"
                data-tooltip-target="tooltip-light"
                data-tooltip-style="light"
              >
                {Boolean(markets?.[0]?.outcomeRows[0]) && (
                  <div>
                    <div className="flex gap-3 w-full justify-between items-center">
                      {markets[0].outcomeRows[0].map((outcome, index) => (
                        <span
                          key={index}
                          onClick={() => {
                            handleOutcomeSelection(index);
                          }}
                        >
                          <OddComponent
                            className="ml-2 odd-cont first-of-type:ml-0"
                            key={`${outcome.selectionName}-${index}`}
                            outcome={outcome}
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Betting Amounts */}
            
            <div className="mt-2 flex flex-col px-6 text-sm font-medium items-center">

            <div className="flex justify-between w-80 mb-2">
                {suggestAmount.map((el) => {
                  return <p className="bg-odd py-2 px-4 rounded-md cursor-pointer active:bg-violet-700"  
                  
                  >${el}</p>
                })}
            </div>

              <div className="flex justify-between items-center w-full mb-4">
                <p className="text-start">Betting Amount :</p>
                <input
                  type="number"
                  value={betAmount}
                  onChange={(event) => changeBetAmount(event.target.value)}
                  onBlur={handleBlur}
                  disabled={items.length == 0 ? true : false}
                  className="w-50 p-2 rounded focus:outline-none focus:ring focus:border-blue-300 custom-number-input bg-odd"
                  min="1"
                  max="100"
                />
              </div>

             
              <div className="flex justify-between items-center w-full mb-4">
                <span>Total Odds :</span>
                <span>
                  {isOddsFetching ? <>Loading...</> : <>{totalOdds}</>}
                </span>
              </div>
              <div className="flex justify-between items-center w-full mb-4">
                <span>{selectedOutcomeLabel} :</span>
                <span>
                  {isOddsFetching ? (
                    <>Loading...</>
                  ) : (
                    <>{(totalOdds * +betAmount).toFixed(2)}</>
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center w-full mb-4">
                <span className="text-sm">Wallet Balance :</span>
                <span className="text-sm font-semibold">
                  {isBalanceFetching ? (
                    <>Loading...</>
                  ) : balance !== undefined ? (
                    <>
                      {(+balance).toFixed(2)} {TOKEN_SYMBOL}
                    </>
                  ) : (
                    <>-</>
                  )}
                </span>
              </div>
            </div>
            {/* Payment Part */}
            {Boolean(disableReason) && (
              <div className="mb-1 text-red-500 text-center font-semibold">
                {errorPerDisableReason[disableReason!]}
              </div>
            )}
            {account?.address ? (
              <SubmitButton />
            ) : (
              <p className="bg-sgrad mx-6 mt-3 px-6 py-2 rounded-full font-cairo font-bold tracking-wide" onClick={connectWallet}>
                Connect your wallet
              </p>
            )}
          </div>
          <BetHistory bets={allBets} />
        </>
      </div>
    </>
  );
}
