import React from "react";
import "./globals.css";
import { Betslip, BottomBar, Navbar, UserAlertPopup } from "@/components";
import { GameDataProvider } from "@/context/GameDataProvider";
import { Providers } from "@/context/Providers";
import { Metadata } from "next";
import { cookies } from "next/headers";
import "@rainbow-me/rainbowkit/styles.css";
import { BetslipProvider } from "@/context";
import ServiceWorkerRegister from '../components/ServiceWorkerRegister';
import StateProvider from "@/lib/StoreProvider";

export const metadata: Metadata = {
  title: "Wakanda Bets",
  description: "Wakanda Betting Platform",
  generator: "Next.js",
  manifest: "/manifest.json",
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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-59LQD73Z');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="bg-bg text-text font-inter flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-59LQD73Z"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <div className="mobile-wrapper">
          <div className="mobile-content no-scrollbar">
            <ServiceWorkerRegister />
            <StateProvider>
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
            </StateProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
