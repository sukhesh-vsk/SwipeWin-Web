"use client"

import OddComponent from '@/components/OddComponent';
import Odds from '@/components/Odds';
import PageHeader from '@/components/PageHeader'
import { useGameData } from '@/context/GameDataProvider';
import { SerializeGameData } from '@/hooks/Serializer';
import useFetchOdds from '@/hooks/useFetchOdds';
import { GameMarkets, GameQuery, useBaseBetslip, useGame, useGameMarkets } from '@azuro-org/sdk';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


type ContentProps = {
    game: GameQuery['games'][0]
    isGameInLive: boolean
}
  
export default function Game() {
    const params = useParams();
    const { loading, game, isGameInLive } = useGame({
      gameId: params.id as string,
    })

    const { loading: marketLoading, markets } = useGameMarkets({
        gameId: params.id as string,
        gameStatus: game?.status as any
    });

    const { items, addItem, removeItem } = useBaseBetslip();

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
                            <div className="lg:min-w-[500px]">
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
                    <button className='bg-sgrad mt-4 px-4 py-2 rounded-full font-cairo font-bold tracking-widest'>Bet Now</button>    
                    </div>
                : 
                    <p>Loading...</p>
                }
            </div>
        </>
    )
}
