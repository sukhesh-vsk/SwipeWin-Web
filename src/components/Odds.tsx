import React from 'react';
import { MarketOutcome } from "@azuro-org/sdk";

interface OddsProps {
  oddsData: MarketOutcome[];
  className?: string;
}

const Odds: React.FC<OddsProps> = ({ oddsData, className = '' }) => {
  return (
    <div className="flex w-full justify-around">
      {oddsData.map((outcome, index) => (
        <p key={index} className={className}>
          {outcome.odds !== undefined ? outcome.odds.toFixed(2) : "N/A"}
        </p>
      ))}
    </div>
  );
};

export default Odds;
