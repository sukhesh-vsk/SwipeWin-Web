'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit"

 
export function Navbar() {
  const data = {
    walletBal: 20
  }

  return (
    <header className="px-8 py-6 flex items-center justify-between">
      <div className="text-xl font-semibold text-text tracking-wide text-base">Swipe Win</div>
      
      <ConnectButton chainStatus="icon" />
    </header>
  )
}