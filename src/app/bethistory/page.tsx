"use client"

import PageHeader from '@/components/PageHeader'
import React, { useState } from 'react'
import { cricket_ico, football_ico } from '@/assets/sporticons';
import DataPopup from '@/components/DataPopup';

export default function BetHistory() {
  const matches = [
    {
      year: 2024,
      matches: [
        {
          team: 'India',
          league: 'ICC Mens World Cup',
          sportIcon: cricket_ico,
          date: '21 Jun 19:18',
          teamDetails: 'India vs Australia',
          odd: '2.16',
          bet: '$ 25',
          trasactionHash: 'Oxdf3ycysxggdeg56',
          payoutHash: 'Oxoeu89h9exertqxc6',
          status: 'Completed',
          eventDate: '24 JUN 20:30',
          outcome: '+ $37.5',
          result: 'profit',
        },
        {
          team: 'Australia',
          league: 'ICC Mens World Cup',
          sportIcon: cricket_ico,
          date: '21 Jun 19:02',
          teamDetails: 'India vs Australia',
          odd: '2.10',
          bet: '$ 20',
          trasactionHash: 'Ox2sdy3ycysxggdeg57',
          payoutHash: 'Oxdseu89h9exertqxc7',
          status: 'Completed',
          eventDate: '24 JUN 20:30',
          outcome: '- $10',
          result: 'loss',
        },
        {
          team: 'India',
          league: 'ICC Mens World Cup',
          sportIcon: cricket_ico,
          date: '21 Jun 18:42',
          teamDetails: 'India vs Australia',
          odd: '2.30',
          bet: '$ 30',
          trasactionHash: 'Ox3ty3ycysxggdeg58',
          payoutHash: 'Oxeueu89h9exertqxc8',
          status: 'Completed',
          eventDate: '24 JUN 20:30',
          outcome: '+ $54.7',
          result: 'profit',
        },
        {
          team: 'Real Madrid',
          league: 'UEFA Champions League',
          sportIcon: football_ico,
          date: '18 Jun 09:11',
          teamDetails: 'Real Madrid vs Arsenal',
          odd: '1.80',
          bet: '$ 50',
          trasactionHash: 'Ox4uy3ycysxggdeg59',
          payoutHash: 'Oxdgeu89h9exertqxc9',
          status: 'Completed',
          eventDate: '24 JUN 20:30',
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
          league: 'ICC Mens World Cup',
          sportIcon: cricket_ico,
          date: '21 Jun 19:18',
          teamDetails: 'India vs Australia',
          odd: '2.16',
          bet: '$ 25',
          trasactionHash: 'Oxdf3ycysxggdeg56',
          payoutHash: 'Oxoeu89h9exertqxc6',
          status: 'Completed',
          eventDate: '24 JUN 20:30',
          outcome: '+ $37.5',
          result: 'profit',
        },
        {
          team: 'Australia',
          league: 'ICC Mens World Cup',
          sportIcon: cricket_ico,
          date: '21 Jun 19:02',
          teamDetails: 'India vs Australia',
          odd: '2.10',
          bet: '$ 20',
          trasactionHash: 'Ox2sdy3ycysxggdeg57',
          payoutHash: 'Oxdseu89h9exertqxc7',
          status: 'Completed',
          eventDate: '24 JUN 20:30',
          outcome: '- $10',
          result: 'loss',
        },
        {
          team: 'India',
          league: 'ICC Mens World Cup',
          sportIcon: cricket_ico,
          date: '21 Jun 18:42',
          teamDetails: 'India vs Australia',
          odd: '2.30',
          bet: '$ 30',
          trasactionHash: 'Ox3ty3ycysxggdeg58',
          payoutHash: 'Oxeueu89h9exertqxc8',
          status: 'Completed',
          eventDate: '24 JUN 20:30',
          outcome: '+ $54.7',
          result: 'profit',
        },
        {
          team: 'Real Madrid',
          league: 'UEFA Champions League',
          sportIcon: football_ico,
          date: '18 Jun 09:11',
          teamDetails: 'Real Madrid vs Arsenal',
          odd: '1.80',
          bet: '$ 50',
          trasactionHash: 'Ox4uy3ycysxggdeg59',
          payoutHash: 'Oxdgeu89h9exertqxc9',
          status: 'Completed',
          eventDate: '24 JUN 20:30',
          outcome: '+ $108.5',
          result: 'profit', 
        },
      ],
    },
  ];
  
  const [isVisible, setIsVisible] = useState("false");
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleClick = (match: any) => {
    setSelectedMatch(match)
    setIsVisible((isVisible === "false") ? "true" : "false");
  }

  return (
    <>
      <PageHeader title='Bet History' filter={true} />

      <div className='container'>
        {
          matches.map((data, index) => (
            <div key={data.year} className='flex flex-col mt-8'>
              <div className='absolute right-0 text-start bg-sgrad w-full py-1'>
                <p className='ms-8'>{data.year}</p>
              </div>
              <div className='mt-10'>
              {
                data.matches.map((match, index) => (
                  <div onClick={() => handleClick(match)} key={index} className='flex mt-4 justify-between items-center cursor-pointer'>
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
                    <div className={`${match.result=='profit' ? 'text-green_text' : 'text-red_text'} flex-1 text-end`}>
                      <p>{match.outcome}</p>
                    </div>
                  </div>
                ))
              }
              </div>
            </div>
          ))
        }
        <DataPopup match={selectedMatch} visible={isVisible} toggleVisible={handleClick}/>
      </div>
    </>
  )
}
