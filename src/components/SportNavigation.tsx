"use client";

import React from "react";
import { useSportsNavigation } from "@azuro-org/sdk";
import { sportIcons } from "@/assets/sporticons";

export function SportsNavigation({ onSportChange }) {
  const { loading, sports } = useSportsNavigation({
    withGameCount: true,
  });

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  const sortedSports = [...(sports || [])].sort(
    (a, b) => b.games!.length - a.games!.length
  );

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="flex space-x-1">
          {sortedSports.map(({ slug, name, games }) => {
            const Icon = sportIcons[name as keyof typeof sportIcons];
            return (
              <button
                key={slug}
                onClick={() => {
                  onSportChange(name);
                }}
                className="flex text-xs font-medium items-center py-1 px-2 bg-zinc-100 text-bg whitespace-nowrap rounded-full hover:bg-purple-200"
              >
                {Icon ? <Icon className="w-8 h-8 mr-2" /> : <span>{name}</span>}
                {games && (
                  <span className="pl-1 text-zinc-400">{games.length}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
