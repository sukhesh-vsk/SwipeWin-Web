import PageHeader from '@/components/PageHeader'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'
import { Discordico, Logoutico, Telegramico } from '@/assets/icons'


export default function Support() {
  return (
    <>
      <PageHeader title='Support' filter={false} />
      <div className='container h-screen flex flex-col items-center justify-around'>
        <div className='mt-4 mb-12'>
          <ConnectButton chainStatus="icon" />
        </div>
        <div className='flex-1 w-full'>
        <div className='flex justify-around items-center'>
          <button className='bg-sec_dim_2 flex px-3 py-2 h-12 rounded-lg flex items-center'>
            <Discordico className="w-10"/>
            <span className='ml-2 font-semibold font-sm'>Discord</span>
          </button>
          <button className='bg-sec_dim_2 flex px-3 py-2 h-12 rounded-lg flex justify-center items-center'>
            <Telegramico className="w-10 mt-2"/>
            <span className='ml-2 font-semibold font-sm'>Telegram</span>
          </button>
        </div>
        <div className='text-sm mt-10'>
          <p className='font-semibold uppercase mb-3 text-md'>About</p>
          <p className='mb-2'>Terms & Conditions</p>
          <p className='mb-2'>Privacy Policy</p>
          <p className='flex items-center'>Log out <span className='ml-2'><Logoutico className='w-3'/></span></p>
        </div>
        </div>
      </div>
    </>
  )
}
