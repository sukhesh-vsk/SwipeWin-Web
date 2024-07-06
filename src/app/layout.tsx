import React from "react";
import "./globals.css";
import { Betslip, BottomBar, Navbar } from "@/components";
import { GameDataProvider } from "@/context/GameDataProvider";
import { Providers } from "@/context/Providers";
import { Metadata } from "next";
import { cookies } from "next/headers";
import "@rainbow-me/rainbowkit/styles.css";
import { BetslipProvider } from "@/context";

export const metadata: Metadata = {
  title: "Swipe Win",
};

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;

  const cookieStore = cookies();

  const initialChainId = cookieStore.get("appChainId")?.value;
  const initialLiveState = JSON.parse(
    cookieStore.get("live")?.value || "false"
  );

  return (
    <html lang="en">
      <body className="bg-bg text-text font-noto flex flex-col">
        <div className="mobile-wrapper">
          <div className="mobile-content no-scrollbar">
            <Providers
              initialChainId={initialChainId}
              initialLiveState={initialLiveState}
            >
              <GameDataProvider>
                <Navbar />
                <BetslipProvider>
                  <main className="container-fluid flex-1 h-full flex-grow">
                    {children}
                  </main>
                </BetslipProvider>
                <BottomBar />
              </GameDataProvider>
            </Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
