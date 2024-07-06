"use client"

import OddComponent from '@/components/OddComponent';
import Odds from '@/components/Odds';
import PageHeader from '@/components/PageHeader'
import { useGameData } from '@/context/GameDataProvider';
import { SerializeGameData } from '@/hooks/Serializer';
import useFetchOdds from '@/hooks/useFetchOdds';
import { BetslipDisableReason, ConditionStatus, GameMarkets, GameQuery, useBaseBetslip, useBetTokenBalance, useChain, useDetailedBetslip, useGame, useGameMarkets, useLiveBetFee, usePrepareBet } from '@azuro-org/sdk';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import cx from 'clsx';
import { useAccount } from 'wagmi';

type ContentProps = {
    game: GameQuery['games'][0]
    isGameInLive: boolean
}

const errorPerDisableReason = {
    [BetslipDisableReason.ComboWithForbiddenItem]: 'One or more conditions can\'t be used in combo',
    [BetslipDisableReason.BetAmountGreaterThanMaxBet]: 'Bet amount exceeds max bet',
    [BetslipDisableReason.BetAmountLowerThanMinBet]: 'Bet amount lower than min bet',
    [BetslipDisableReason.ComboWithLive]: 'Live outcome can\'t be used in combo',
    [BetslipDisableReason.ConditionStatus]: 'One or more outcomes have been removed or suspended. Review your betslip and remove them.',
    [BetslipDisableReason.PrematchConditionInStartedGame]: 'Game has started',
  } as const
  
  const SubmitButton: React.FC = () => {
    const { appChain, isRightNetwork } = useChain()
    const { items, clear } = useBaseBetslip()
    const { betAmount, odds, totalOdds, isStatusesFetching, isOddsFetching, isBetAllowed } = useDetailedBetslip()
    const { loading: isBalanceFetching, balance } = useBetTokenBalance()
  
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
      affiliate: '0x0000000000000000000000000000000000000000', // your affiliate address
      selections: items,
      odds,
      totalOdds,
      onSuccess: () => {
        clear()
      },
    })
  
    const isPending = approveTx.isPending || betTx.isPending
    const isProcessing = approveTx.isProcessing  || betTx.isProcessing
  
    if (!isRightNetwork) {
      return (
        <div className="mt-6 py-3.5 text-center bg-red-200 rounded-2xl">
          Switch network to <b>{appChain.name}</b> in your wallet
        </div>
      )
    }
  
    const isEnoughBalance = isBalanceFetching || !Boolean(+betAmount) ? true : Boolean(+balance! > +betAmount)
  
    const isLoading = (
      isOddsFetching
      || isBalanceFetching
      || isStatusesFetching
      || isAllowanceLoading
      || isPending
      || isProcessing
      || isRelayerFeeLoading
    )
  
    const isDisabled = (
      isLoading
      || !isBetAllowed
      || !isEnoughBalance
      || !+betAmount
    )
  
    let title
  
    if (isPending) {
      title = 'Waiting for approval'
    }
    else if (isProcessing) {
      title = 'Processing...'
    }
    else if (isLoading) {
      title = 'Loading...'
    }
    else if (isApproveRequired) {
      title = 'Approve'
    }
    else {
      title = 'Place Bet'
    }
  
    return (
      <div className="mt-1 flex flex-col justify-center items-center">
        {
          !isEnoughBalance && (
            <div className="mb-1 text-sm text-red-500 text-center font-semibold">
              Not enough balance.
            </div>
          )
        }
        <button
          className={cx('bg-sgrad mt-4 px-4 py-2 rounded-full font-cairo font-bold tracking-widest', {
            'transition shadow-md': !isDisabled,
            'bg-bg_dim cursor-not-allowed': isDisabled,
          })}
          disabled={isDisabled}
          onClick={submit}
        >
          {title}
        </button>
      </div>
    )
}
  






export default function Game() {
    const params = useParams();
    const account = useAccount();
    const { betAmount, odds, totalOdds, statuses, disableReason, isStatusesFetching, isOddsFetching, isLiveBet } = useDetailedBetslip()
    const { formattedRelayerFeeAmount, loading: isRelayerFeeLoading } = useLiveBetFee({
        enabled: isLiveBet,
    })


    const { loading, game, isGameInLive } = useGame({
      gameId: params.id as string,
    })

    const { loading: marketLoading, markets } = useGameMarkets({
        gameId: params.id as string,
        gameStatus: game?.status as any
    });

    // const { items, addItem, removeItem } = useBaseBetslip();
    // const { betAmount, odds, totalOdds, statuses, disableReason, isStatusesFetching, isOddsFetching, isLiveBet } = useDetailedBetslip()
    // const { formattedRelayerFeeAmount, loading: isRelayerFeeLoading } = useLiveBetFee({
    //   enabled: isLiveBet,
    // })

    // const marketData = markets[0].outcomeRows[0][0]
    // const conditionID = marketData.conditionId;
    // const isLock = !isStatusesFetching && statuses[conditionID] !== ConditionStatus.Created;
    
    // ---------------------------------------------

    // const [selectedOdd, setSelectedOdd] = useState<string | null>(null);
    // const [bettingAmount, setBettingAmount] = useState<number>(0);
    // const [winningAmount, setWinningAmount] = useState<number>(0);
    // const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

    // const { loading : OddLoading , markets } = useFetchOdds(game?.id, game?.status as any);
    
    // const isActive = (items: any, outcome: any) => Boolean(items?.find((item: any) => {
    //     const propsKey = `${outcome.coreAddress}-${outcome.lpAddress}-${outcome.gameId}-${outcome.conditionId}-${outcome.outcomeId}`
    //     const itemKey = `${item.coreAddress}-${item.lpAddress}-${item.game.gameId}-${item.conditionId}-${item.outcomeId}`
      
    //     return propsKey === itemKey
    // }));


    // const handleOddClick = (odd: string, index: number) => {
    //     setSelectedOdd(odd);
    //     const item = {
    //         gameId: String(oddData[index].gameId),
    //         conditionId: String(oddData[index].conditionId),
    //         outcomeId: String(oddData[index].outcomeId),
    //         coreAddress: oddData[index].coreAddress,
    //         lpAddress: oddData[index].lpAddress,
    //         isExpressForbidden: oddData[index].isExpressForbidden,
    //     }
    //     if (isActive(items, oddData[index])) {
    //         removeItem(String(oddData[index].gameId))
    //       } else {
    //         addItem(item)
    //     }
    //     setWinningAmount(bettingAmount * Number(selectedOdd));
    //     switch(index) {
    //         case 0:
    //           setSelectedTeam(game.participants[0].name);
    //           break;
    //         case 1:
    //           setSelectedTeam('Draw'); 
    //           break;
    //         case 2:
    //           setSelectedTeam(game.participants[1].name);
    //           break;
    //         default:
    //           setSelectedTeam(null);
    //       }
    // };

    // useEffect(() => {
    //     setWinningAmount(bettingAmount * Number(selectedOdd));
    //   }, [selectedOdd, bettingAmount]);

    // const handleBettingAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const amount = Number(event.target.value);
    //     setBettingAmount(amount);
    // };
    if (loading) {
        return <div>Loading...</div>
    }
    
    if (!game) {
        return (
            <div>Game info not found</div>
        )
    }

    if(marketLoading) {
        return <div>Loading...</div>
    }

    // console.log("Markets: ",markets);

    return (
        <>
            {(game !== null) && <PageHeader title={`${game.sport.name} Betting`} filter={false}/>}

            <div className='container flex flex-col justify-center items-center '>
                {(game !== null) 
                ?
                    <div className='bg-sec_2 h-4/6 mt-4 py-4 rounded-xl flex flex-col justify-cetner items-center'>
                    <div className='grid grid-cols-3 gap-4 items-center w-3/5'>
                        <div className='flex flex-col items-center justify-center'>
                            <img src={(game.participants[0].image !== null) ? game.participants[0].image : "/default.png"} alt="team1" width={50} height={50} />
                            <p className="text-xs uppercase mt-2 font-bold">{game.participants[0].name}</p>
                        </div>
                        <div className='flex flex-col mx-4'>
                            <p className="text-xs">{dayjs(+game.startsAt).format("DD MMM HH:mm")}</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <img src={(game.participants[1].image !== null) ? game.participants[1].image : "/default.png"} alt="team2" width={50} height={50} />
                            <p className="text-xs uppercase mt-2 font-bold">{game.participants[1].name}</p>
                        </div>
                    </div>
                    <div className='flex w-3/5 justify-center mt-8 mb-4'>
                        {Boolean(markets?.[0]?.outcomeRows[0]) && (
                            <div className="">
                                <div className="flex items-center">
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
                    <div>
                        <div className='flex justify-around items-center mb-4'>
                            <p>Betting Amount</p>
                            <input
                                type="number"
                                className='w-1/5 bg-sec_2 border-2 border-sgrad rounded-md px-2 py-1'
                                // value={bettingAmount !== 0 ? bettingAmount : ''}
                                // onChange={handleBettingAmountChange}
                            />
                        </div>
                        <div className='flex flex-1 justify-around items-center'>
                            {/* {selectedTeam 
                                ? 
                                    <p> If {selectedTeam === 'Draw' ? 'it Draws' : `${selectedTeam} wins, `} you win</p> 
                                :  */}
                                <p>Winning Amount</p>
                            {/* } */}
                            <p className='text-green_text'>20</p>
                            {/* <p className='text-green_text'>{winningAmount}</p> */}
                        </div>
                    </div>
                    
                    {
                        Boolean(disableReason) && (
                            <div className="mb-1 text-red-500 text-center font-semibold">
                            {errorPerDisableReason[disableReason!]}
                            </div>
                        )
                        }
                        {
                        account?.address ? (
                            <SubmitButton />
                        ) : (
                            // <div className="mt-1 flex justify-center items-center text-sm text-center">
                            <p className='bg-sgrad mt-4 px-4 py-2 rounded-full font-cairo font-bold tracking-wide'>Connect your wallet</p>
                        // </div>
                        )
                        }

                    </div>
                : 
                    <p>Loading...</p>
                }
            </div>
        </>
    )
}

"use client";

import OddComponent from "@/components/OddComponent";
import Odds from "@/components/Odds";
import PageHeader from "@/components/PageHeader";
import { useGameData } from "@/context/GameDataProvider";
import { SerializeGameData } from "@/hooks/Serializer";
import useFetchOdds from "@/hooks/useFetchOdds";
import {
  BetslipDisableReason,
  ConditionStatus,
  GameMarkets,
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
import { ethers } from "ethers";

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
            "btn-grad transition shadow-md": !isDisabled,
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

const BetHistory: React.FC<{ bets: any[] }> = ({ bets }) => {
  return (
    <div className="mt-8 pb-28 w-full">
      <h2 className="text-2xl font-semibold mb-4">Your Bet History</h2>
      {bets.length > 0 ? (
        bets.map((bet, index) => (
          <div
            key={bet.txHash}
            className="flex justify-between items-center bg-gray-500  p-4 mb-4 rounded-md shadow-md"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-white">
                {bet.outcomes[0].game.participants[0].name} vs{" "}
                {bet.outcomes[0].game.participants[1].name}
              </span>
              <span className="text-xs text-white">
                {new Date(bet.createdAt * 1000).toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col text-white text-right">
              <span className="font-semibold">
                {bet.isWin ? `+ ${bet.possibleWin}` : `- ${bet.amount}`}
              </span>
              <span
                className={`${
                  bet.isWin ? "text-green-500" : "text-red-500"
                } text-xs font-bold`}
              >
                {bet.isWin ? "Win" : "Loss"}
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

  const {
    betAmount,
    changeBetAmount,
    totalOdds,
    disableReason,
    isOddsFetching,
    isLiveBet,
  } = useDetailedBetslip();
  console.log(betAmount);

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

  const { loading: isPrematchLoading, bets: prematchBets } =
    usePrematchBets(props);
  const { loading: isLiveLoading, bets: liveBets } = useLiveBets(props);
  const allBets = [...prematchBets, ...liveBets].filter(
    (bet) => bet.outcomes[0].game.gameId === params.id
  );

  if (loading || marketLoading || isPrematchLoading || isLiveLoading) {
    return (
      <p className="text-center text-lg font-semibold mt-20">Loading...</p>
    );
  }

  if (!game) {
    return <div>Game info not found</div>;
  }

  return (
    <>
      {game !== null && (
        <PageHeader title={`${game.sport.name} Betting`} filter={false} />
      )}

      <div className="container flex flex-col justify-center items-center">
        {game !== null ? (
          <>
            <div className="bg-sec_2 mt-4 py-4 rounded-xl flex flex-col justify-center items-center">
              <div className="flex gap-5  items-center px-8 pt-5">
                <div className="flex flex-col items-center justify-center">
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
                  <p className="text-xs uppercase mt-2 font-bold">
                    {game.participants[0].name}
                  </p>
                </div>
                <div className="flex flex-col pl-3 ">
                  <p className="text-xs">
                    {dayjs(+game.startsAt * 1000).format("DD MMM HH:mm")}
                  </p>
                </div>
                <div className="flex flex-col items-center">
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
                  <p className="text-xs uppercase mt-2 font-bold">
                    {game.participants[1].name}
                  </p>
                </div>
              </div>
              <div className="flex  justify-center mt-8 mb-4">
                {Boolean(markets?.[0]?.outcomeRows[0]) && (
                  <div>
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
              <div className=" mt-2 flex flex-col items-center">
                <div className="flex justify-between items-center w-full mb-4">
                  <p>Betting Amount</p>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={betAmount}
                    onChange={(event) => changeBetAmount(event.target.value)}
                    className="w-2/3 mr-2"
                  />
                  <span>{betAmount}</span>
                </div>
                <div className="flex justify-between items-center w-full mb-4">
                  <span>Total Odds:</span>
                  <span>
                    {isOddsFetching ? <>Loading...</> : <>{totalOdds}</>}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full mb-4">
                  <span>Possible Win:</span>
                  <span>
                    {isOddsFetching ? (
                      <>Loading...</>
                    ) : (
                      <>{(totalOdds * +betAmount).toFixed(2)}</>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full mb-4">
                  <span className="text-sm">Wallet balance:</span>
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

              {Boolean(disableReason) && (
                <div className="mb-1 text-red-500 text-center font-semibold">
                  {errorPerDisableReason[disableReason!]}
                </div>
              )}
              {account?.address ? (
                <SubmitButton />
              ) : (
                <p className="bg-sgrad mt-4 px-4 py-2 rounded-full font-cairo font-bold tracking-wide">
                  Connect your wallet
                </p>
              )}
            </div>
            <BetHistory bets={allBets} />
          </>
        ) : (
          <p className="text-center text-lg font-semibold mt-20">Loading...</p>
        )}
      </div>
    </>
  );
}
