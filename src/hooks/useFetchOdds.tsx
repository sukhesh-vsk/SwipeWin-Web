import { useGameMarkets, GameStatus } from "@azuro-org/sdk";

const useFetchOdds = (game_id: string, status: GameStatus) => {
  const { loading, markets } = useGameMarkets({
    gameId: game_id,
    gameStatus: status,
  });

  return { loading, markets };
};

export default useFetchOdds;
