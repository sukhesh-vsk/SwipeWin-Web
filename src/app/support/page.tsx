"use client";
import PageHeader from "@/components/PageHeader";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { Discordico, Logoutico, Telegramico } from "@/assets/icons";
import { useBetTokenBalance, useChain } from "@azuro-org/sdk";
import { TOKEN_SYMBOL } from "@/constants";

export default function Support() {
  const { betToken } = useChain();

  const telegramLink = "https://t.me/Wakanda_Bet";
  const discordLink = "https://discord.gg/EyUYFcm5u3";


  const { loading: isBalanceFetching, balance } = useBetTokenBalance();

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
    return
}

  return (
    <>
      <PageHeader title="Support" filter={false} />
      <div className="container h-screen flex flex-col items-center justify-around">
        <div className="mt-4 mb-4">
          <ConnectButton chainStatus="icon" />
        </div>
        <div className="flex justify-between items-center w-full mb-12">
          <span className="text-sm">${TOKEN_SYMBOL} balance:</span>
          <span className="text-sm font-semibold">
            {isBalanceFetching ? (
              <>Loading...</>
            ) : balance !== undefined ? (
              <>
                {(+balance).toFixed(2)} {TOKEN_SYMBOL}
              </>
            ) : (
              <>-</>
            )}
          </span>
        </div>
        <div className="flex-1 w-full">
          <div className="flex justify-around items-center">
            <button onClick={() => {
              openInNewTab(discordLink)
            }} className="bg-sec_dim_2 flex px-3 py-2 h-12 rounded-lg flex items-center">
              <Discordico className="w-10" />
              <span className="ml-2 font-semibold font-sm">Discord</span>
            </button>
            <button onClick={() => {
              openInNewTab(telegramLink)
            }} className="bg-sec_dim_2 flex px-3 py-2 h-12 rounded-lg flex justify-center items-center">
              <Telegramico className="w-10 mt-2" />
              <span className="ml-2 font-semibold font-sm">Telegram</span>
            </button>
          </div>
          <div className="text-sm mt-10">
            <p className="font-semibold uppercase mb-3 text-md">About</p>
            <p className="mb-2">Terms & Conditions</p>
            <p className="mb-2">Privacy Policy</p>
            {/* <p className="flex items-center">
              Log out{" "}
              <span className="ml-2">
                <Logoutico className="w-3" />
              </span>
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}
