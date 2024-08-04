"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import SwapContainer from "./SwapContainer";
import { UserAlertPopup } from ".";
import { useBetTokenBalance, useChain, useNativeBalance } from "@azuro-org/sdk";
import { TOKEN_SYMBOL } from "@/constants";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setNativeBalance, setTokenBalance } from "@/lib/features/walletSlice";


interface PopupProps {
  onClose: () => void;
}

export function Navbar() {
  const tBalance = useSelector((state: RootState) => state.walletReducer.tokenBalance);
  const nBalance = useSelector((state: RootState) => state.walletReducer.nativeBalance);
  const dispatch = useDispatch<AppDispatch>();
  const account = useAccount();
  const { loading, balance } = useBetTokenBalance();
  const { loading: isNativeBalanceFetching, balance: nativeBalance } = useNativeBalance();
  const [mounted, setMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showAlert, setAlert] = useState(true);

  const handleClosePopup = () => {
    setAlert(false);
  };

  
  const { appChain } = useChain();

  // const { isLive, changeLive } = useLive()

  // const handleLiveChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   changeLive(event.target.checked)
  // }

  useEffect(() => {
    setMounted(true);
    console.log("Is PWA", isPwa());
    setAlert(!isPwa());
  }, []);


  const isPwa = () => {
    return ["fullscreen", "standalone", "minimal-ui"].some(
      (displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches
    );
  }

  useEffect(() => {
    if (!isNativeBalanceFetching) {
      if (nBalance != nativeBalance) {
        setNativeTokenValue(nativeBalance);
      }
    }
  }, [isNativeBalanceFetching])

  useEffect(() => {
    if (!loading) {
      if (tBalance != balance) {
        setTokenValue(balance);
      }
    }
  }, [loading])

  const setTokenValue = (value: string) => {
    dispatch(setTokenBalance(value))
  }

  const setNativeTokenValue = (value: string) => {
    dispatch(setNativeBalance(value))
  }

  const getBalance = () => {
    if (!mounted) {
      return null;
    }

    return account?.address ? (
      <div className="flex flex-col ml-8" >
        <p className="bg-text flex justify-center items-center rounded-full font-medium cursor-pointer mb-2" style={{
          fontSize: '12px',
          padding: '4px'
        }} onClick={() => Number(appChain.id) == 88888 ? setShowPopup(true) : null}>
          <span className="text-gradient">
            {loading ? "Loading..." : `${Number(tBalance).toFixed(2)} ${TOKEN_SYMBOL(appChain.id)}`}
          </span>
        </p>
        { Number(appChain.id) == 88888 && <p className="bg-text flex justify-center items-center rounded-full font-medium cursor-pointer"
          style={{
            fontSize: '12px',
            padding: '4px'
          }} onClick={() => setShowPopup(true)}>
          <span className="text-gradient">
            {isNativeBalanceFetching ? "Loading..." : `${Number(nBalance).toFixed(2)} CHZ`}
          </span>
        </p>}
        {/* <div className="flex items-center mr-4">
          <label className="mr-2" htmlFor="live">Live</label>
          <input id="live" type="checkbox" checked={isLive} onChange={handleLiveChange} />
        </div> */}
      </div>


    ) : (
      <div style={{
        width: '150px'
      }}>
        <ConnectButton chainStatus="icon" showBalance={false} />
        {/* <div className="flex items-center mr-4">
          <label className="mr-2" htmlFor="live">Live</label>
          <input id="live" type="checkbox" checked={isLive} onChange={handleLiveChange} />
        </div> */}
      </div>
    );


  };

  return (
    <header className="container py-6 flex items-center container-fluid justify-between">
      {showAlert && <UserAlertPopup onClose={handleClosePopup} />}
      <a href="/events" className="cursor-pointer">
        <div className="text-xl font-semibold text-text tracking-wide text-base" style={{
          width: '150px'
        }}>
          <img src="/WakandaLogo/WakandaTransparentLight.png" alt="WakandaBets" className="transition hover:scale-105" />
        </div>
      </a>
      {getBalance()}
      <>
        {(account?.address && Number(appChain.id) == 88888 ) && <img onClick={() => setShowPopup(true)} src="\images\exchange.png" alt="WakandaBets" className="transition hover:scale-105 h-12 w-12 cursor-pointer" />}
      </>
      {showPopup && <SwapContainer onClose={() => setShowPopup(false)} />}
    </header>
  );
}
