import React from "react";
import './globals.css';
import { BottomBar, Navbar } from "@/components";

export default function layout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body className="bg-bg text-text font-noto flex flex-col">
        <Navbar />
        <main className="container flex-grow">
            {children}
        </main>
        <BottomBar />
      </body>
    </html>
  );
}
