import { useSports, type UseSportsProps, Game_OrderBy } from "@azuro-org/sdk";
import dayjs from "dayjs";

enum GameStatus {
  Canceled = "Canceled",
  Created = "Created",
  Paused = "Paused",
  Resolved = "Resolved",
}

interface GameDataProps {
  __typename?: "Game" | undefined;
  turnover: string;
  id: string;
  gameId: string;
  title?: string | null | undefined;
  startsAt: string;
  status: GameStatus;
  sport: {
    __typename?: "Sport" | undefined;
    sportId: string;
    slug: string;
    name: string;
  };
  league: {
    __typename?: "League" | undefined;
    slug: string;
    name: string;
    country: {
      __typename?: "Country" | undefined;
      slug: string;
      name: string;
    };
  };
  participants: {
    __typename?: "Participant" | undefined;
    image?: string | null | undefined;
    name: string;
  }[];
}

const useData = (
  searchTerm: string,
  filterType: string,
  selectedSport: string
) => {
  const props: UseSportsProps = {
    gameOrderBy: Game_OrderBy.Turnover,
    filter: {
      limit: 50,
    },
  };

  const { loading, sports } = useSports(props);

  let allGames: GameDataProps[] = [];

  if (sports.length) {
    allGames = sports
      ?.flatMap((sport) =>
        sport?.countries.flatMap((country) =>
          country.leagues.flatMap((league) => league.games)
        )
      )
      .sort((a, b) => +b.turnover - +a.turnover);
  }

  const filteredGames = allGames.filter((game) => {
    const startTime = dayjs.unix(Number(game.startsAt));
    const today = dayjs();
    const endOfWeek = today.endOf("week");

    const matchesSearchTerm =
      game.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.league.country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.participants.some((participant) =>
        participant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesFilterType = (() => {
      switch (filterType) {
        case "Today":
          return startTime.isSame(today, "day");
        case "This Week":
          return startTime.isBefore(endOfWeek) && startTime.isAfter(today);
        case "LIVE":
          return game.status === GameStatus.Created;
        case "Tomorrow":
          return startTime.isSame(today.add(1, "day"), "day");
        case "All":
        default:
          return true;
      }
    })();

    const matchesSelectedSport =
      selectedSport === "All" || game.sport.name === selectedSport;

    return matchesSearchTerm && matchesFilterType && matchesSelectedSport;
  });

  const topEvents = filteredGames.slice(0, 5).map((game) => ({
    id: game.gameId,
    sport: game.sport.name,
    league: game.league.name,
    status: game.status,
    time: dayjs(game.startsAt * 1000).format("DD MMM HH:mm"),
    teams: game.participants.map((participant) => participant.name),
    teamImage: game.participants.map(
      (participant) => participant.image || "/default.png"
    ),
  }));

  const otherEvents = filteredGames.slice(5).reduce((acc, game) => {
    const sportName = game.sport.name;
    if (!acc[sportName]) {
      acc[sportName] = [];
    }
    acc[sportName].push({
      id: game.gameId,
      sport: game.sport.name,
      league: game.league.name,
      status: game.status,
      time: dayjs(game.startsAt * 1000).format("DD MMM HH:mm"),
      teams: game.participants.map((participant) => participant.name),
      teamImage: game.participants.map(
        (participant) => participant.image || "/default.png"
      ),
    });
    return acc;
  }, {});

  return {
    sports,
    loading,
    topEvents,
    otherEvents,
  };
};

export default useData;
