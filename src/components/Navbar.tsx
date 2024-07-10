"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import SwapContainer from "./SwapContainer";
import { UserAlertPopup } from ".";
import { useBetTokenBalance, useNativeBalance } from "@azuro-org/sdk";
import { TOKEN_SYMBOL } from "@/constants";

interface PopupProps {
  onClose: () => void;
}

export function Navbar() {
  const account = useAccount();
  const { loading, balance } = useBetTokenBalance();
  const { loading: isNativeBalanceFetching, balance: nativeBalance } = useNativeBalance();
  const [mounted, setMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showAlert, setAlert] = useState(true);

  const handleClosePopup = () => {
    setAlert(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);


  const getBalance = () => {
    if (!mounted) {
      return null;
    }

    return account?.address ? (
      <>
        <p className="bg-text flex justify-center items-center rounded-full font-medium cursor-pointer" style={{
          fontSize : '12px',
          padding : '4px'
        }} onClick={() => setShowPopup(true)}>
          <span className="text-gradient">
            {loading ? "Loading..." : `${Number(balance).toFixed(2)} ${TOKEN_SYMBOL}`}
          </span>
        </p>
        <p className="bg-text flex justify-center items-center rounded-full font-medium cursor-pointer" 
        style={{
          fontSize : '12px',
          padding : '4px'
        }} onClick={() => setShowPopup(true)}>
          <span className="text-gradient">
            {isNativeBalanceFetching ? "Loading..." : `${Number(nativeBalance).toFixed(2)} CHZ`}
          </span>
        </p>
      </>

    ) : (
      <ConnectButton chainStatus="icon" showBalance={false} />
    );
  };

  return (
    <header className="container py-6 flex items-center container-fluid justify-between">
      {/* {showAlert && <UserAlertPopup onClose={handleClosePopup} />} */}
      <a href="/events" className="cursor-pointer">
        <div className="text-xl font-semibold text-text tracking-wide text-base" style={{
          width : '150px'
        }}>
          <img src="/WakandaLogo/WakandaTransparentLight.png" alt="WakandaBets" className="transition hover:scale-105" />
        </div>
      </a>
      {getBalance()}
      {showPopup && <SwapContainer onClose={() => setShowPopup(false)} />}
    </header>
  );
}
