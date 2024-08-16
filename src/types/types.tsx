import { Bet } from "@azuro-org/sdk";
import { MarketOutcome } from "@azuro-org/toolkit";


export interface GameProps {
    id: string;
    sport: string;
    league: string;
    country: string;
    status: any;
    time: string;
    teams: string[];
    teamImage: (string | null | undefined)[];
}

export type OddsProps = {
    className?: string
    outcome: MarketOutcome
}

export interface TransactionDetailProps {
    betDetail: Bet;
    bidOn: String;
    league: String;
    team1: string;
    team2: string;
    eventDate: string;
}
