"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import SwapContainer from "./SwapContainer";
import { UserAlertPopup } from ".";
import { useBetTokenBalance } from "@azuro-org/sdk";

interface PopupProps {
  onClose: () => void;
}

export function Navbar() {
  const account = useAccount();
  const { loading, balance } = useBetTokenBalance();
  const [walletBal, setWalletBal] = useState("loading");
  const [mounted, setMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showAlert, setAlert] = useState(true);

  const handleClosePopup = () => {
    setAlert(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading) {
      setWalletBal(balance ?? "0");
    }
  }, [balance, loading]);

  const getBalance = () => {
    if (!mounted) {
      return null;
    }

    return account?.address ? (
      <p className="bg-text px-4 py-1 flex justify-center items-center rounded-full font-medium cursor-pointer" onClick={() => setShowPopup(true)}>
        <span className="text-gradient">
          {walletBal === "loading" ? "Loading..." : `My Wallet: ${walletBal}`}
        </span>
      </p>
    ) : (
      <ConnectButton chainStatus="icon" showBalance={false} />
    );
  };

  return (
    <header className=" py-6 flex items-center container-fluid justify-between">
      {showAlert && <UserAlertPopup onClose={handleClosePopup} />}
      <a href="/events" className="cursor-pointer">
        <div className="text-xl font-semibold text-text tracking-wide text-base">
          <img src="/WakandaLogo/WakandaTransparentLight.png" alt="WakandaBets" className="h-8 w-36 transition hover:scale-105" />
        </div>
      </a>
      {getBalance()}
      {showPopup && <SwapContainer onClose={() => setShowPopup(false)} />}
    </header>
  );
}
