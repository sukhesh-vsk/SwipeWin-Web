"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Navbar() {
  const data = {
    walletBal: 20,
  };

  return (
    <header className="px-8 py-6 flex items-center justify-between">
      <div className="text-xl font-semibold text-text tracking-wide text-base">
        <img src="/WakandaLogo/WakandaTransparentLight.png" alt="logo" className="h-8 w-36" />
      </div>

      <ConnectButton chainStatus="icon" showBalance={false} />
    </header>
  );
}
