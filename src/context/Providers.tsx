"use client";

import React from "react";
import { AzuroSDKProvider, LiveProvider, ChainId } from "@azuro-org/sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { polygon, gnosis } from "viem/chains";
import { BetslipProvider } from "./BetSlip";

const { wallets } = getDefaultWallets();

const chains = [polygon, gnosis] as const;

const wagmiConfig = getDefaultConfig({
  appName: "SwipeWin",
  projectId: "3020b540cb4600580463aaee8fac93a6", // get your own project ID - https://cloud.walletconnect.com/sign-in
  wallets,
  chains,
});

const queryClient = new QueryClient();

type ProvidersProps = {
  children: React.ReactNode;
  initialChainId?: string;
  initialLiveState?: boolean;
};

export function Providers(props: ProvidersProps) {
  const { children, initialChainId, initialLiveState } = props;

  const chainId = initialChainId ? chains.find((chain) => chain.id === +initialChainId)
                                    ? (+initialChainId as ChainId) : polygon.id
                                : polygon.id;
                    

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AzuroSDKProvider initialChainId={chainId}>
            <LiveProvider initialLiveState={initialLiveState}>
              <BetslipProvider>
                {children}
              </BetslipProvider>
            </LiveProvider>
          </AzuroSDKProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
