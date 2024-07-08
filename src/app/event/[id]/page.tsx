"use client";

import OddComponent from "@/components/OddComponent";
import PageHeader from "@/components/PageHeader";
import {
  Bet,
  BetslipDisableReason,
  GameQuery,
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
  usePrepareBet,
} from "@azuro-org/sdk";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import cx from "clsx";
import { useAccount } from "wagmi";
import { TOKEN_SYMBOL } from "@/constants";

type ContentProps = {
  game: GameQuery["games"][0];
  isGameInLive: boolean;
};

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

const SubmitButton: React.FC = () => {
  const { appChain, isRightNetwork } = useChain();
  const { items, clear } = useBaseBetslip();
  const {
    betAmount,
    odds,
    totalOdds,
    isStatusesFetching,
    isOddsFetching,
    isBetAllowed,
  } = useDetailedBetslip();
  const { loading: isBalanceFetching, balance } = useBetTokenBalance();
  const {
    submit,
    approveTx,
    betTx,
    isRelayerFeeLoading,
    isAllowanceLoading,
    isApproveRequired,
  } = usePrepareBet({
    betAmount,
    slippage: 10,
    affiliate: "0x2687B4FDFa0C4290eD754Bfea807DC6a50CE286E",
    selections: items,
    odds,
    totalOdds,
    onSuccess: () => {
      clear();
    },
  });

  const isPending = approveTx.isPending || betTx.isPending;
  const isProcessing = approveTx.isProcessing || betTx.isProcessing;
  if (!isRightNetwork) {
    return (
      <div className="mt-6 py-3.5 text-center bg-red-200 rounded-2xl">
        Switch network to <b>{appChain.name}</b> in your wallet
      </div>
    );
  }

  const isEnoughBalance =
    isBalanceFetching || !Boolean(+betAmount)
      ? true
      : Boolean(+balance! > +betAmount);

  const isLoading =
    isOddsFetching ||
    isBalanceFetching ||
    isStatusesFetching ||
    isAllowanceLoading ||
    isPending ||
    isProcessing ||
    isRelayerFeeLoading;

  const isDisabled =
    isLoading || !isBetAllowed || !isEnoughBalance || !+betAmount;

  let title;

  if (isPending) {
    title = "Waiting for approval";
  } else if (isProcessing) {
    title = "Processing...";
  } else if (isLoading) {
    title = "Loading...";
  } else if (isApproveRequired) {
    title = "Approve";
  } else {
    title = "Place Bet";
  }

  return (
    <div className="mt-1 flex flex-col justify-center items-center">
      {!isEnoughBalance && (
        <div className="mb-1 text-sm text-red-500 text-center font-semibold">
          Not enough balance.
        </div>
      )}
      <button
        className={cx(
          "px-4 py-2 rounded-full font-cairo font-bold tracking-widest",
          {
            "btn-grad transition": !isDisabled,
            "bg-gray-400 cursor-not-allowed": isDisabled,
          }
        )}
        disabled={isDisabled}
        onClick={submit}
      >
        {title}
      </button>
    </div>
  );
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

const BetHistory: React.FC<{ bets: Bet[] }> = ({ bets }) => {
  return (
    <div className="mt-4 pb-28 w-full">
      <h2 className="heading1 mb-2">Your Bet History</h2>
      {bets.length > 0 ? (
        bets.map((bet, index) => (
          <div
            key={bet.txHash}
            className="flex justify-between items-center bg-gray-500  p-4 mb-2 rounded-md shadow-md"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-white">
                {getSelectionName(
                  bet.outcomes[0].selectionName,
                  bet.outcomes[0].game.participants
                )}
              </span>
              <span className="text-xs text-white">
                {dayjs(+bet.createdAt * 1000).format("DD MMM HH:mm")}
              </span>
            </div>
            <div className="flex flex-col text-sm text-white text-right">
              <span className="font-semibold">
                {bet.amount ? Number(bet.amount).toFixed(2) : ""} ${TOKEN_SYMBOL}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No bets placed on this game.</p>
      )}
    </div>
  );
};

export default function Game() {
  const params = useParams();
  const account = useAccount();
  const { betToken } = useChain();
  const { loading: isBalanceFetching, balance } = useBetTokenBalance();
  const { items, clear } = useBaseBetslip();

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

  const [selectedOutcomeIndex, setSelectedOutcomeIndex] = useState<number>(-1);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

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

  return (
    <>
      {game && (
        <PageHeader title={`${game.league.name} Betting`} filter={false} />
      )}

      <div className="container flex flex-col text-center justify-center items-center">
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
              <div className="flex justify-between items-center w-full mb-4">
                <p className="text-start">Betting Amount :</p>
                <input
                  type="range"
                  min="1"
                  max={`${
                    !isBalanceFetching && +balance! > 100 ? balance : "100"
                  }`}
                  // max='100'
                  value={betAmount}
                  onChange={(event) => changeBetAmount(event.target.value)}
                  className="w-2/3 mr-2"
                />
                <span>{betAmount}</span>
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
                      {(+balance).toFixed(2)} {betToken.symbol}
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
              <p className="bg-sgrad mx-6 mt-3 px-6 py-2 rounded-full font-cairo font-bold tracking-wide">
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
