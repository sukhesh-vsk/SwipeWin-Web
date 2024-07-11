"use client"

import { Closeico } from '@/assets/icons';
import { TransactionDetailProps } from '@/types/types';
import { Bet, useRedeemBet } from '@azuro-org/sdk';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import cx from "clsx";
import { TOKEN_SYMBOL } from '@/constants';

import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setTokenBalance } from "@/lib/features/walletSlice";
import { contractAddress } from "@/components/WrapComponent";
import { ethers } from "ethers";
import { getBalance } from 'wagmi/actions';
import { wagmiConfig } from '@/context/Providers';
import { useAccount } from 'wagmi';

export default function DataPopup(props: any) {
    
    const { address } = useAccount();

    const { submit, isPending, isProcessing } = useRedeemBet()

    if (!props.match) {
        return null;
    }

    const handleRedeem = async () => {
        try {
            await submit({ bets: [props.match.betDetail] });
            updateBalance();
        } catch (error) {
            console.error("Erorr in Redeem", error)
        }
    }

    const matchStatus = (betData: Bet) => {
        if (betData.isWin) {
            return 'Won';
        } else if (betData.isLose) {
            return 'Lost';
        } else if (betData.isCanceled) {
            return 'Canceled';
        } else {
            return 'Pending';
        }
    }

    const payoutStatus = (betData: Bet) => {
        if (betData.isWin || betData.isCanceled) {
            if (betData.isRedeemable) {
                return <button className={cx(
                    "md:w-[200px] py-3.5 text-white font-semibold text-center rounded-xl mb-4",
                    {
                        "bg-blue-500 hover:bg-blue-600 transition shadow-md": betData.isRedeemable,
                        "bg-zinc-300 cursor-not-allowed": !betData.isRedeemable,
                    }
                )} onClick={handleRedeem}>
                    Redeem Now
                </button>;
            } else {
                return <p className='font-semibold tracking-widest text-sm'>Redeemed</p>
            }
        } else if (betData.isLose) {
            return <p className='font-semibold tracking-widest text-sm'>N/A</p>;
        }
        else {
            return <p className='font-semibold tracking-widest text-sm'>--</p>;
        }
    }

    const [isHidden, setHidden] = useState(true);

    useEffect(() => {
        if (props.visible === true) {
            setHidden(false);
        }
    }, [props.visible]);


    const toggleForm = () => {
        setHidden(!isHidden);
        props.toggleVisible();
    }

    const tBalance = useSelector((state: RootState) => state.walletReducer.tokenBalance);
    const dispatch = useDispatch<AppDispatch>();
    const setTokenValue = (value: string) => {
      dispatch(setTokenBalance(value))
    }
  
    const updateBalance = async () => {
      const tempBalance = await getBalance(wagmiConfig, {
        address: address,
        token: contractAddress as `0x{string}`,
      })
      const ethValue = ethers.utils.formatEther(tempBalance.value);
      if (tBalance != ethValue) {
        setTokenValue(ethValue);
      }
    };

    const data: TransactionDetailProps = props.match;

    return (
        <div className={`py-4 flex absolute items-center justify-center fixed top-0 left-0 container-fluid bg-bg_dim h-full w-full ${isHidden ? 'hidden' : ''}`} onClick={() => toggleForm()}>
            <div className='bg-sec_2 flex flex-col items-center h-max py-6 w-4/5 rounded-xl' onClick={(e) => e.stopPropagation()}>
                <div className='flex justify-center items- w-full px-4 pt-4 mb-2'>
                    <p className='uppercase flex-1 text-center ps-4'>Transaction</p>
                    <div onClick={toggleForm} className='cursor-pointer'>
                        <Closeico className="w-6" />
                    </div>
                </div>
                <div className='flex-1 flex flex-col justify-center items-center w-full px-2'>
                    <div className='flex flex-col mt-2 px-6 font-cairo text-start w-full leading-5'>
                        <p className='text-sec_dim font-medium text-sm'>Event Name</p>
                        <p className='font-semibold tracking-widest text-sm'>{data.league}</p>
                    </div>
                    <div className='flex flex-col mt-2 px-6 font-cairo text-start w-full leading-5'>
                        <p className='text-sec_dim font-medium text-sm'>Between</p>
                        <p className='font-semibold tracking-widest text-sm'>{`${data.team1} vs ${data.team2}`}</p>
                    </div>
                    <div className='w-full flex justify-between mt-2'>
                        <div className='flex flex-col px-6 font-cairo text-start w-full leading-5'>
                            <p className='text-sec_dim font-medium text-sm'>Bet Placed on</p>
                            <p className='font-semibold tracking-widest text-sm'>{data.bidOn}</p>
                        </div>
                        <div className='flex flex-col px-6 font-cairo text-start w-full leading-5'>
                            <p className='text-sec_dim font-medium text-sm'>Betting Odds</p>
                            <p className='font-semibold tracking-widest text-sm'>{data.betDetail.outcomes[0].odds.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className='w-full flex justify-between mt-2'>
                        <div className='flex flex-col px-6 font-cairo text-start w-full leading-5'>
                            <p className='text-sec_dim font-medium text-sm'>Bet Placed</p>
                            <p className='font-semibold tracking-widest text-sm'>{data.betDetail.amount ? Number(data.betDetail.amount).toFixed(2) : ''} ${TOKEN_SYMBOL}</p>
                        </div>
                        <div className='flex flex-col px-6 font-cairo text-start w-full leading-5'>
                            <p className='text-sec_dim font-medium text-sm'>Result</p>
                            <p className='font-semibold tracking-wide text-sm'>{matchStatus(data.betDetail)}</p>
                        </div>
                    </div>
                    <div className='flex flex-col mt-2 px-6 font-cairo text-start w-full leading-5'>
                        <p className='text-sec_dim font-medium text-sm'>Transaction Hash</p>
                        <a href={`https://polygonscan.com/tx/${data.betDetail.txHash}`} target='_blank'>
                            <p className='font-semibold tracking-widest text-sm'>{`${data.betDetail.txHash.substring(0, 6)}....${data.betDetail.txHash.substring(data.betDetail.txHash.length - 4)}`}</p>
                        </a>
                    </div>
                    {/* <div className='flex flex-col mt-2 px-6 font-cairo text-start w-full leading-5'>
                    <p className='text-sec_dim font-medium text-sm'>Redeem Hash</p>
                    <a href={`https://polygonscan.com/tx/${data.betDetail.txHash}`} target='_blank'>
                        <p className='font-semibold tracking-widest text-sm'>{data.betDetail.txHash}</p>
                    </a>
                </div> */}
                    <div className='flex flex-col mt-2 px-6 font-cairo text-start w-full leading-5'>
                        <p className='text-sec_dim font-medium text-sm'>Payout Status</p>
                        {payoutStatus(data.betDetail)}
                    </div>
                    <div className='w-full flex justify-between mt-2'>
                        <div className='flex flex-col px-6 font-cairo text-start w-full leading-5'>
                            <p className='text-sec_dim font-medium text-sm'>Event Date</p>
                            <p className='font-semibold tracking-widest text-xs'>{dayjs(+data.eventDate * 1000).format('DD MMM HH:mm')}</p>
                        </div>
                        <div className='flex flex-col px-6 font-cairo text-start w-full leading-5'>
                            <p className='text-sec_dim font-medium text-sm'>Betting Date</p>
                            <p className='font-semibold tracking-wide text-xs'>{dayjs(data.betDetail.createdAt * 1000).format('DD MMM HH:mm')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
