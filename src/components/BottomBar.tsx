"use client";

import React from "react";
import { ActiveLink } from "@/components";

export function BottomBar() {
  return (
    <footer className="fixed bottom-2 left-1/2 transform -translate-x-1/2 bg-text w-10/12 max-w-md rounded-full flex justify-around items-center p-4 shadow-lg">
      <div className="bg-text bottom-bar flex justify-around p-2 w-full">
        <ActiveLink
          className="hover:text-black transition text-gradient"
          activeClassName="font-semibold !cursor-default !text-text !bg-sgrad"
          href="/events/top"
        >
          Home
        </ActiveLink>
        <ActiveLink
          className="text-zinc-800 hover:text-black transition ml-4 text-gradient"
          activeClassName="!text-white font-semibold !cursor-default !bg-sgrad"
          href="/allbets"
        >
          My Bets
        </ActiveLink>
        <ActiveLink
          className="text-zinc-800 hover:text-black transition ml-4 text-gradient"
          activeClassName="!text-white font-semibold !cursor-default"
          href="/support"
        >
          Support
        </ActiveLink>
      </div>
    </footer>
  );
}
