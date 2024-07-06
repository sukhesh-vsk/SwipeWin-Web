"use client";

import React from "react";
import GameCard from "@/components/GameCard";

export function SportSection({ sportName, games }) {
  return (
    <div className="sport-section">
      <h2>{sportName}</h2>
      <div className="games-grid">
        {games.map((game, index) => (
          <GameCard key={index} gameDetails={game} />
        ))}
      </div>
    </div>
  );
}
