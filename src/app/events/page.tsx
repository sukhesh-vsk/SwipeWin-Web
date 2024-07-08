"use client";

import React, { useState, useEffect } from "react";
import { SearchBar, UserAlertPopup } from "@/components";
import GameCard from "@/components/GameCard";
import useData from "@/hooks/useData";

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedSport, setSelectedSport] = useState("All");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setShowPopup(true);
      localStorage.setItem("hasSeenPopup", "true");
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filter: string) => {
    setFilterType(filter);
  };

  const handleSportChange = (sport: string) => {
    setSelectedSport(sport);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterType("All");
    setSelectedSport("All");
  };

  const { loading, topEvents, otherEvents } = useData(
    searchTerm,
    filterType,
    selectedSport
  );

  const renderTopEvents = () => (
    <div>
      <div className="flex heading1 justify-between items-center mt-1">
        <p>Top Events</p>
      </div>
      <div className="mt-3 flex overflow-x-auto space-x-4 container-fluid h-2/3 ml-4 snap-x snap-mandatory home-scroll-card-margin no-scrollbar">
        {topEvents.map((data, index) => (
          <div className="snap-start" key={index}>
            <GameCard key={index} gameDetails={data} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderOtherEvents = () => (
    <div className="">
      {Object.keys(otherEvents).map((sportName) => (
        <div key={sportName} className="mb-4 ">
          <p className="heading2">{sportName}</p>
          <div className="flex mt-2 overflow-x-auto space-x-4 container-fluid h-2/3 mx-4 snap-x snap-mandatory home-scroll-card-margin no-scrollbar">
            {otherEvents[sportName].map((data, index) => (
              <div className="snap-start" key={index}>
                <GameCard key={index} gameDetails={data} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );



  const renderSearchResults = () => (
    <div>
      <div className="flex justify-between items-center mt-6">
        <p>Search Results</p>
      </div>
      <div className="mt-5 flex overflow-x-auto space-x-4 container-fluid h-2/3 mx-4 snap-x snap-mandatory home-scroll-card-margin  no-scrollbar">
        {topEvents.concat(...Object.values(otherEvents)).map((data, index) => (
          <div className="snap-start" key={index}>
            <GameCard key={index} gameDetails={data} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderHeading = () => {
    if (searchTerm) {
      return "Search Results";
    }
    if (selectedSport !== "All" && filterType !== "All") {
      return `Results of ${selectedSport} for ${filterType} events`;
    }
    if (selectedSport !== "All") {
      return `Results of ${selectedSport} events`;
    }
    if (filterType !== "All") {
      return `Results of ${filterType} events`;
    }
    return "";
  };

  return (
    <div className="h-full pb-20">
      {showPopup && <UserAlertPopup onClose={handleClosePopup} />}
      <SearchBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onSportChange={handleSportChange}
        resetFilters={resetFilters}
        searchTerm={searchTerm}
        filterType={filterType}
        selectedSport={selectedSport}
      />
      <div className="container mt-7 h-4/5 flex-1 h-full">
        <div className="flex justify-between items-center">
        <h2 className="">{renderHeading()}</h2>
          {(selectedSport !== "All" || filterType !== "All" || searchTerm) && (
            <button
              onClick={resetFilters}
              className="bg-red-500 text-white px-4 py-2 rounded-full"
            >
              Reset Filters
            </button>
          )}
        </div>
        {loading ? (
          <p className="text-center text-lg font-metro font-semibold mt-20">Loading...</p>
        ) : searchTerm || selectedSport !== "All" || filterType !== "All" ? (
          renderSearchResults()
        ) : (
          <>
            {renderTopEvents()}
            <p className="heading1 allevents">All Events</p>
            {renderOtherEvents()}
          </>
        )}
      </div>
    </div>
  );
}
