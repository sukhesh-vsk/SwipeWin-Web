'use client';

import { TOKEN_SYMBOL } from "@/constants";
import { Bet, useChain } from "@azuro-org/sdk";
import dayjs from "dayjs";

const getSelectionName = (selectionName: string, participants: any[]) => {
    if (selectionName === "1") {
        return participants[0].name;
    }
    if (selectionName === "2") {
        return participants[1].name;
    }
    if (selectionName === "X") {
        return "Match Draw";
    }
    return "";
};

const BetHistory: React.FC<{ bets: Bet[] }> = ({ bets }) => {
    const { appChain } = useChain();

    return (
        <div className="mt-4 pb-28 w-full">
            <h2 className="heading1 mb-2">Your Bet History</h2>
            {bets.length > 0 ? (
                bets.map((bet, index) => (
                    <div
                        key={bet.txHash}
                        className="flex justify-between items-center bg-gray-500  p-4 mb-2 rounded-md shadow-md"
                    >
                        <div className="flex flex-col">
                            <span className="font-semibold text-white">
                                {getSelectionName(
                                    bet.outcomes[0].selectionName,
                                    bet.outcomes[0].game.participants
                                )}
                            </span>
                            <span className="text-xs text-white">
                                {dayjs(+bet.createdAt * 1000).format("DD MMM HH:mm")}
                            </span>
                        </div>
                        <div className="flex flex-col text-sm text-white text-right">
                            <span className="font-semibold">
                                {bet.amount ? Number(bet.amount).toFixed(2) : ""} ${TOKEN_SYMBOL(appChain.id)}
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <p>No bets placed on this game.</p>
            )}
        </div>
    );
};

export default BetHistory;