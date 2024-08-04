"use client";
import PageHeader from "@/components/PageHeader";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { Discordico, Telegramico, Twitterico } from "@/assets/icons";
import { TOKEN_SYMBOL } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useChain } from "@azuro-org/sdk";
import { ChainId } from '@azuro-org/toolkit';

export default function Support() {

  const telegramLink = "https://t.me/Wakanda_Bet";
  const discordLink = "https://discord.gg/EyUYFcm5u3";
  const twitterLink = "https://x.com/WakandaBets";
  const termsLink = "https://wakanda.bet/tnc.html";
  const privacyLink = "https://wakanda.bet/privacypolicy.html";



  const tBalance = useSelector((state: RootState) => state.walletReducer.tokenBalance);


  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
    return
  }

  const { appChain, setAppChainId } = useChain();

  const handleChainChange = (chainId: number) => {
    setAppChainId(chainId as ChainId);
  }

  return (
    <>
      <PageHeader title="Support" filter={false} />
      <div className="container h-screen flex flex-col items-center justify-around">
        <div className="mt-4 mb-4">
          <ConnectButton chainStatus="icon" />
        </div>
        <div className="flex justify-between items-center w-full mb-2">
          <span className="text-sm">${TOKEN_SYMBOL(appChain.id)} balance:</span>
          <span className="text-sm font-semibold">
            {tBalance == '' ? (
              <>Loading...</>
            ) : tBalance !== undefined ? (
              <>
                {(+tBalance).toFixed(2)} {TOKEN_SYMBOL(appChain.id)}
              </>
            ) : (
              <>-</>
            )}
          </span>
        </div>
        <div className="mb-4">
          <button
            className={`${appChain.id === 137 ? 'bg-blue-500' : 'bg-white'} hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full mr-5`}
            onClick={() => {
              handleChainChange(137);
            }}
          >
            Polygon
          </button>
          <button
            className={`${appChain.id === 88888 ? 'bg-blue-700' : 'bg-white'} hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full ml-5`}
            onClick={() => {
              handleChainChange(88888)
            }}
          >
            Chiliz
          </button>
        </div>
        <div className="flex-1 w-full">
          <div className="flex justify-around items-center">
            <button onClick={() => {
              openInNewTab(twitterLink)
            }} className="bg-sec_dim_2 flex px-3 py-2 h-12 rounded-lg flex items-center">
              <Twitterico className="w-10" />
              {/* <span className="ml-2 font-semibold font-sm">Twitter</span> */}
            </button>
            <button onClick={() => {
              openInNewTab(discordLink)
            }} className="bg-sec_dim_2 flex px-3 py-2 h-12 rounded-lg flex items-center">
              <Discordico className="w-10" />
              {/* <span className="ml-2 font-semibold font-sm">Discord</span> */}
            </button>
            <button onClick={() => {
              openInNewTab(telegramLink)
            }} className="bg-sec_dim_2 flex px-3 py-2 h-12 rounded-lg flex justify-center items-center">
              <Telegramico className="w-10 mt-2" />
              {/* <span className="ml-2 font-semibold font-sm">Telegram</span> */}
            </button>
          </div>
          <div className="text-sm mt-10">
            <p className="font-semibold uppercase mb-3 text-md">About</p>
            <p className="mb-2" onClick={() => {
              openInNewTab(termsLink);
            }}>Terms & Conditions</p>
            <p className="mb-2" onClick={() => {
              openInNewTab(privacyLink);
            }}>Privacy Policy</p>
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

