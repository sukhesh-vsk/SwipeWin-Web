"use client"

import { Listico } from '@/assets/icons'
import { SearchBar } from '@/components'
import GameCard from '@/components/GameCard'
import { Game_OrderBy, UseSportsProps, useSports } from '@azuro-org/sdk'
import { useParams } from 'next/navigation'
import React from 'react'


export default function Events() {
  const IND = '/images/india.png'
  const AUS = '/images/aus.png'

  // const useData = () => {
  //   const homeData: UseSportsProps = {
  //     gameOrderBy: Game_OrderBy.Turnover,
  //     filter: {
  //       limit: 1,
  //     }
  //   }

  //   const { loading, sports } = useSports(homeData);
  //   return ({
  //     sports, loading
  //   })
  // }

  // const { loading, sports } = useData()
  
  const datas = [
    {
      id: 1282,
      league: "ICC Mens T20 World Cup",
      sport: "Cricket",
      teams: ["India", "Australia"],
      teamImage: [IND, AUS],
      time: "3 JUN 20:30",
      odds: ['1.5', '2.5', '3.5'],
    },
    {
      id: 6453,
      league: "ICC Mens T20 World Cup",
      sport: "Cricket",
      teams: ["India", "Australia"],
      teamImage: [IND, AUS],
      time: "3 JUN 20:30",
      odds: ['1.5', '2.5', '3.5'],
    },
    {
      id: 1282,
      league: "ICC Mens T20 World Cup",
      sport: "Cricket",
      teams: ["India", "Australia"],
      teamImage: [IND, AUS],
      date: "3 JUN",
      time: "20:30",
      odds: ['1.5', '2.5', '3.5'],
    },
    {
      id: 6453,
      league: "ICC Mens T20 World Cup",
      sport: "Cricket",
      teams: ["India", "Australia"],
      teamImage: [IND, AUS],
      time: "3 JUN 20:30",
      odds: ['1.5', '2.5', '3.5'],
    },
    {
      league: "ICC Mens T20 World Cup",
      sport: "Cricket",
      teams: ["India", "Australia"],
      teamImage: [IND, AUS],
      time: "3 JUN 20:30",
      odds: ['1.5', '2.5', '3.5'],
    },
    {
      league: "ICC Mens T20 World Cup",
      sport: "Cricket",
      teams: ["India", "Australia"],
      teamImage: [IND, AUS],
      time: "3 JUN 20:30",
      odds: ['1.5', '2.5', '3.5'],
    },
    {
      league: "ICC Mens T20 World Cup",
      sport: "Cricket",
      teams: ["India", "Australia"],
      teamImage: [IND, AUS],
      time: "3 JUN 20:30",
      odds: ['1.5', '2.5', '3.5'],
    }
  ]

  return (
    <>
      <SearchBar />
      <div className='mt-10 h-4/5'>
        <div className='flex justify-between items-center'>
          <p>Top Events</p>
          <div>
            <Listico className="w-4"/>
          </div>
        </div>

        <div className='mt-9 flex overflow-x-auto space-x-4 w-full h-4/5 snap-x snap-mandatory no-scrollbar'>
          {datas.map((data, index) => (
            <div className='snap-start' key={index}>
              <GameCard key={index} gameDetails={data}/>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
