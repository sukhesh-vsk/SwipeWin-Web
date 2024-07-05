"use client"

import { Filterico } from '@/assets/icons'
import React, { useState } from 'react'
import { SportsNavigation } from './SportNavigation';

export const SearchBar: React.FC = () => {
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    const toggleFilter = () => {
      setFilterVisible(!isFilterVisible);
    };

    const handleFilterClick = (filter: string) => {
      setSelectedFilter(filter);
    };

    const handleApplyClick = () => {
      if (selectedFilter) {
        console.log(`Applying filter: ${selectedFilter}`);
      }
    };

  return (
    <div className="flex container flex-col w-full">
    <div className="flex w-full justify-around items-center items-center px-0 mt-4"> 
      <form className="flex-1 mr-6">   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="search" id="default-search" 
            className="block w-full px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none" 
            placeholder="Search by events, teams"
            required 
          />
        </div>
      </form>
      <div className='cursor-pointer flex items-center justify-center' onClick={toggleFilter}>
        <Filterico className="w-4"/>
      </div>
    </div>

    {isFilterVisible && (
        <div className="rounded-md mt-4 bg-sec_2 border border-sec_dim_2 p-4">
          <div className="flex justify-between items-center border-sec_dim_2 border-b pb-1">
            <p className="font-bold">Filter</p>
            <button onClick={toggleFilter} className="text-sm">✕</button>
          </div>
          <div className="flex justify-around items-center mt-4">
            <SportsNavigation />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {['Today', 'This Week', 'LIVE', 'Tomorrow', 'All'].map((filter) => (
              <button
                key={filter}
                className={`rounded-md px-2 text-xs py-1 ${
                  selectedFilter === filter ? 'bg-sgrad text-white' : 'bg-white text-black'
                }`}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </button>
            ))}
            <button className="bg-sgrad text-white rounded-md px-2 text-xs py-1" onClick={handleApplyClick}>
              APPLY
            </button>
          </div>
        </div>
      )}
  </div>
  )
}
