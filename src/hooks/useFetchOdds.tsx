import { GameStatus, useGameMarkets } from "@azuro-org/sdk";

const useFetchOdds = (game_id?: string, status?: GameStatus) => {
  if(!game_id || !status) return { loading: true, markets: [] };


  const { loading, markets } = useGameMarkets({
    gameId: game_id,
    gameStatus: status,
  });

  return { loading, markets };
};

export default useFetchOdds;
