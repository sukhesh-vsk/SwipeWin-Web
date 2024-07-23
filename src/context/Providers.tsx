'use client'

import { AzuroSDKProvider, SocketProvider, useWatchers, ChainProvider, LiveProvider, ApolloProvider } from '@azuro-org/sdk'
import { ChainId } from '@azuro-org/toolkit';
import { RainbowKitProvider, getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { chiliz } from 'viem/chains'
import { WagmiProvider } from 'wagmi'


const { wallets } = getDefaultWallets()

export const chains = [
  chiliz
] as const

export const wagmiConfig = getDefaultConfig({
  appName: 'Wakanda Bet',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ? process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID : '3020b540cb4600580463aaee8fac93a6',
  wallets,
  chains,
})

const queryClient = new QueryClient()

type ProvidersProps = {
  children: React.ReactNode
  initialChainId?: string
  initialLiveState?: boolean
}

export function Watchers() {
  useWatchers()

  return null
}

export function Providers(props: ProvidersProps) {
  const { children, initialChainId, initialLiveState } = props

  const chainId = initialChainId
    ? chains.find(chain => chain.id === +initialChainId) ? +initialChainId as ChainId : chiliz.id
    : chiliz.id;

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ChainProvider initialChainId={chiliz.id}>
        <LiveProvider initialLiveState={false}>
        <ApolloProvider>
          <RainbowKitProvider>
            <AzuroSDKProvider initialChainId={initialChainId as unknown as ChainId}>
              <SocketProvider>
                {children}
              </SocketProvider>
              <Watchers />
            </AzuroSDKProvider>
          </RainbowKitProvider>
          </ApolloProvider>
          </LiveProvider>
        </ChainProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
