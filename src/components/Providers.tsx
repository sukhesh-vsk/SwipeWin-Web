'use client'

import { AzuroSDKProvider, ChainId } from '@azuro-org/sdk'
import { RainbowKitProvider, getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { gnosis, polygon } from 'viem/chains'
import { WagmiProvider } from 'wagmi'

import { BetslipProvider } from '@/context/betslip'


const { wallets } = getDefaultWallets()

const chains = [
  polygon,
  gnosis,
] as const

const wagmiConfig = getDefaultConfig({
  appName: 'Azuro',
  projectId: '3020b540cb4600580463aaee8fac93a6', // get your own project ID - https://cloud.walletconnect.com/sign-in
  wallets,
  chains,
})
//  a4d11202a4439e209c1c59c4131c7633
const queryClient = new QueryClient()

type ProvidersProps = {
  children: React.ReactNode
  initialChainId?: string
  initialLiveState?: boolean
}

export function Providers(props: ProvidersProps) {
  const { children, initialChainId, initialLiveState } = props

  const chainId = initialChainId
    ? chains.find(chain => chain.id === +initialChainId) ? +initialChainId as ChainId : polygon.id
    : polygon.id

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AzuroSDKProvider initialChainId={chainId} initialLiveState={initialLiveState}>
            <BetslipProvider>
              {children}
            </BetslipProvider>
          </AzuroSDKProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
