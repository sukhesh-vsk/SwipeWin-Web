'use client'

import { AzuroSDKProvider, ChainId } from '@azuro-org/sdk'
import { RainbowKitProvider, getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { gnosis, polygon } from 'viem/chains'
import { WagmiProvider } from 'wagmi'


const { wallets } = getDefaultWallets()

const chains = [
  polygon,
] as const

const wagmiConfig = getDefaultConfig({
  appName: 'Azuro',
  projectId: '3020b540cb4600580463aaee8fac93a6',
  wallets,
  chains,
})

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
              {children}
          </AzuroSDKProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
