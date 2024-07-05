import React from 'react';
import { GameStatus, MarketOutcome, useGameMarkets } from "@azuro-org/sdk";

interface OddsProps {
  gameId: string;
  gameStatus: any;
}

const OddComponent: React.FC<OddsProps> = ({ gameId, gameStatus}) => {
    console.log("Game Id", gameId);
    console.log("Status", gameStatus);

    const { loading, markets } = useGameMarkets({
        gameId: gameId, 
        gameStatus: gameStatus
    })


    if(loading) return <p>Loading...</p>

    console.log("Markets", markets);

  return (
    <div className="flex flex-col w-full">
        <div>
            {markets[0].name}
        </div>
        <div className="flex w-full justify-around">
      {markets[0].outcomeRows[0].map((outcome, index) => (
        <p key={index}>
          {outcome!== undefined ? outcome.odds?.toFixed(2) : "N/A"}
        </p>
      ))}
      </div>
    </div>
  );
};

export default OddComponent;
