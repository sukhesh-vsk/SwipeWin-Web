import { GamesQuery, useGameMarkets, useGameStatus, useLive } from "@azuro-org/sdk";
import dayjs from "dayjs";


export const SerializeGameData = (game: any & { league: string } & { sports: string }) => {
    // const { game } = props;
    // const game = props.game;
    // console.log("Props: ",props);

    const { gameId, title, startsAt, status: graphStatus } = game;
  
    const { isLive } = useLive();
    const { status } = useGameStatus({
      graphStatus,
      startsAt: +startsAt,
      isGameExistInLive: isLive,
    });
    const { markets } = useGameMarkets({
      gameStatus: status,
      gameId: gameId,
    });
  
    const DATA = {
      id: gameId,
      sport: game.sports,
      league: game.league,
      status: status,
      time: dayjs(+startsAt).format("DD MMM HH:mm"),
      teams: [game.participants[0].name, game.participants[1].name],
      teamImage: [
        game.participants[0].image,
        game.participants[1].image,
      ],
    };
  
    return DATA;
  }