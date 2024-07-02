'use client'
 
import { ConnectButton } from '@rainbow-me/rainbowkit' 
 
export function Navbar() {
 
  return (
    <header className="flex items-center py-3.5 border-b border-zinc-200">
      <div className="text-xl font-semibold">Swipe Win</div>
      
      <div className="ml-auto flex items-center">
        <ConnectButton chainStatus="none" />
      </div>
    </header>
  )
}