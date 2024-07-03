import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { BottomBar, Navbar, Providers } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SwipeWin",
  description: "A Betting Platform",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const cookieStore = cookies()
 
  const initialChainId = cookieStore.get('appChainId')?.value
  const initialLiveState = JSON.parse(cookieStore.get('live')?.value || 'false')

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers initialChainId={initialChainId} initialLiveState={initialLiveState}>
          <Navbar /> 
            <main className="container pt-5 pb-10 flex-grow bg-bg">
              {children}
            </main>
          <BottomBar />
        </Providers>
      </body>
    </html>
  );
}
