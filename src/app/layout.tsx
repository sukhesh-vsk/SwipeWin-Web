import React from "react";
import './globals.css';
import { BottomBar, Navbar } from "@/components";
import { GameDataProvider } from "@/context/GameDataProvider";

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body className="bg-bg text-text font-noto flex flex-col">
        <GameDataProvider>
          <Navbar />
          <main className="container flex-grow">
            {children}
          </main>
          <BottomBar />
        </GameDataProvider>
      </body>
    </html>
  );
}
