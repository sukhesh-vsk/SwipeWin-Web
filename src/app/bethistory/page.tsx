import PageHeader from '@/components/PageHeader'
import Image from 'next/image';
import React from 'react'
import { cricket_ico, football_ico } from '@/assets/sporticons';

export default function BetHistory() {
  const matches = [
    {
      year: 2024,
      matches: [
        {
          team: 'India',
          sportIcon: cricket_ico,
          date: '21 Jun 7:18 pm',
          teamDetails: 'India vs Australia',
          outcome: '+ $37.5',
          result: 'profit',
        },
        {
          team: 'Australia',
          sportIcon: cricket_ico,
          date: '21 Jun 7:02 pm',
          teamDetails: 'India vs Australia',
          outcome: '- $10',
          result: 'loss',
        },
        {
          team: 'India',
          sportIcon: cricket_ico,
          date: '21 Jun 6:42 pm',
          teamDetails: 'India vs Australia',
          outcome: '+ $54.7',
          result: 'profit',
        },
        {
          team: 'Real Madrid',
          sportIcon: football_ico,
          date: '18 Jun 9:11 am',
          teamDetails: 'Real Madrid vs Arsenal',
          outcome: '+ $108.5',
          result: 'profit', 
        },
      ],
    },
    {
      year: 2023,
      matches: [
        {
          team: 'India',
          sportIcon: cricket_ico,
          date: '21 Jun 7:18 pm',
          teamDetails: 'India vs Australia',
          outcome: '+ $37.5',
          result: 'profit',
        },
        {
          team: 'Australia',
          sportIcon: cricket_ico,
          date: '21 Jun 7:02 pm',
          teamDetails: 'India vs Australia',
          outcome: '- $10',
          result: 'loss',
        },
        {
          team: 'India',
          sportIcon: cricket_ico,
          date: '21 Jun 6:42 pm',
          teamDetails: 'India vs Australia',
          outcome: '+ $54.7',
          result: 'profit',
        },
        {
          team: 'Real Madrid',
          sportIcon: football_ico,
          date: '18 Jun 9:11 am',
          teamDetails: 'Real Madrid vs Arsenal',
          outcome: '+ $108.5',
          result: 'profit', 
        },
      ],
    },
  ];
  
  return (
    <>
      <PageHeader title='Bet History' filter={true} />

      <div className='container-fluid'>
        {
          matches.map((data, index) => (
            <div key={data.year} className='flex flex-col mt-8'>
              <div className='absolute right-0 text-start bg-sgrad w-full py-1'>
                <p className='ms-8'>{data.year}</p>
              </div>
              <div className='mt-10'>
              {
                data.matches.map((match, index) => (
                  <div key={index} className='flex mt-4 justify-between items-center'>
                    <div className='flex-1'>
                      <div className='flex'>
                        <p className='tracking-wide font-semibold font-cairo'>{match.team}</p>
                        <match.sportIcon className="ms-2 w-6"/>
                      </div>
                      <p className='text-xs text-sec_dim font-semibold'>{match.date}</p>
                    </div>
                    <div className='flex-1 text-xs ps-4 text-sec_dim font-medium text-center'>
                      {match.teamDetails}
                    </div>
                    <div className={`${ match.result=='profit' ? 'text-green_text' : 'text-red_text'} flex-1 text-end`}>
                      <p>{match.outcome}</p>
                    </div>
                  </div>
                ))
              }
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}
