"use client"

import { Closeico } from '@/assets/icons';
import React, { useEffect, useState } from 'react'

export default function DataPopup(props: any) {
    const [isHidden, setHidden] = useState(true);
    
    if (!props.match) {
        return null; 
    }
    

    useEffect(() => {
        if (props.visible === 'true') {
            setHidden(false);
        }
    }, [props.visible]);

    const toggleForm = () => {
        props.toggleVisible();
        setHidden(!isHidden);
    }

    const data = props.match;

  return (
    <div className={`py-4 flex items-center justify-center fixed top-0 left-0 container-fluid bg-bg_dim h-full w-full ${isHidden ? 'hidden' : ''}`} onClick={() => toggleForm()}>
        <div className='bg-sec_2 flex flex-col items-center h-5/6 w-4/5 rounded-xl' onClick={(e) => e.stopPropagation()}>
            <div className='flex justify-center items- w-full px-4 pt-4'>
                <p className='uppercase flex-1 text-center ps-4'>Transaction</p>
                <div onClick={toggleForm} className='cursor-pointer'>
                    <Closeico className="w-6"/>
                </div>
            </div>
            <div className='flex-1 flex flex-col justify-center items-center w-full px-2'>
                <div className='flex flex-col mt-2 px-6 font-cairo text-start w-full leading-5'>
                    <p className='text-sec_dim font-medium text-sm'>Event Name</p>
                    <p className='font-semibold tracking-widest text-sm'>{data.league}</p>
                </div>
                <div className='flex flex-col mt-2 px-6 font-cairo text-start w-full leading-5'>
                    <p className='text-sec_dim font-medium text-sm'>Teams</p>
                    <p className='font-semibold tracking-widest text-sm'>{data.teamDetails}</p>
                </div>
                <div className='w-full flex justify-between mt-2'>
                    <div className='flex flex-col px-6 font-cairo text-start w-full leading-5'>
                        <p className='text-sec_dim font-medium text-sm'>Bet Placed on</p>
                        <p className='font-semibold tracking-widest text-sm'>{data.team}</p>
                    </div>
                    <div className='flex flex-col px-6 font-cairo text-start w-full leading-5'>
                        <p className='text-sec_dim font-medium text-sm'>Betting Odd</p>
                        <p className='font-semibold tracking-widest text-sm'>{data.odd}</p>
                    </div>
                </div>
                <div className='w-full flex justify-between mt-2'>
                    <div className='flex flex-col px-6 font-cairo text-start w-full leading-5'>
                        <p className='text-sec_dim font-medium text-sm'>Bet Placed</p>
                        <p className='font-semibold tracking-widest text-sm'>{data.bet}</p>
                    </div>
                    <div className='flex flex-col px-6 font-cairo text-start w-full leading-5'>
                        <p className='text-sec_dim font-medium text-sm'>Result</p>
                        <p className='font-semibold tracking-wide text-sm'>{data.outcome}</p>
                    </div>
                </div>
                <div className='flex flex-col mt-2 px-6 font-cairo text-start w-full leading-5'>
                    <p className='text-sec_dim font-medium text-sm'>Transaction Hash</p>
                    <p className='font-semibold tracking-widest text-sm'>{data.trasactionHash}</p>
                </div>
                <div className='flex flex-col mt-2 px-6 font-cairo text-start w-full leading-5'>
                    <p className='text-sec_dim font-medium text-sm'>Payout Hash</p>
                    <p className='font-semibold tracking-widest text-sm'>{data.payoutHash}</p>
                </div>
                <div className='flex flex-col mt-2 px-6 font-cairo text-start w-full leading-5'>
                    <p className='text-sec_dim font-medium text-sm'>Payout Status</p>
                    <p className='font-semibold tracking-widest text-sm'>{data.status}</p>
                </div>
                <div className='w-full flex justify-between mt-2'>
                    <div className='flex flex-col px-6 font-cairo text-start w-full leading-5'>
                        <p className='text-sec_dim font-medium text-sm'>Event Date & Time</p>
                        <p className='font-semibold tracking-widest text-sm'>{data.eventDate}</p>
                    </div>
                    <div className='flex flex-col px-6 font-cairo text-start w-full leading-5'>
                        <p className='text-sec_dim font-medium text-sm'>Result</p>
                        <p className='font-semibold tracking-wide text-sm'>{data.date}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
