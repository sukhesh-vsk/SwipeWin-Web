import { GameStatus, MarketOutcome } from "@azuro-org/sdk";

export interface GameProps {
    id: string;
    sport: string;
    league: string;
    status: any;
    time: string;
    teams: string[];
    teamImage: (string | null | undefined)[];
}

export type OddsProps = {
    className?: string
    outcome: MarketOutcome
}