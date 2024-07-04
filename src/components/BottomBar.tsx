"use client";

import React, { useEffect } from "react";
import {
  HomeColorico,
  Homeico,
  BetsColorico,
  Betsico,
  ThreeDotsColorico,
  ThreeDotsico,
} from "@/assets/icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const BottomBar: React.FC = () => {
  const activePath = usePathname();
  
  return (
    <footer className="flex fixed bottom-1 w-full justify-around items-center">
      <div className="bg-text flex justify-around items-center w-8/12 px-6 py-2 rounded-full ">
        <Link
          href="/events"
          className={`w-10 h-10 flex justify-center items-center ${activePath === "/events" ? "bg-sgrad rounded-full" : ""}`}
        >
          { activePath === "/events" ?  <Homeico className="w-6 h-6" /> : <HomeColorico className="w-6 h-6" /> }
        </Link>
        <Link 
          href="/bethistory"
          className={`w-10 h-10 flex justify-center items-center ${activePath === "/bethistory" ? "bg-sgrad rounded-full" : ""}`}
        >
          { activePath === "/bethistory" ?  <Betsico className="w-6 h-6" /> : <BetsColorico className="w-6 h-6" /> }
        </Link>
        <Link
          href="/support"
          className={`w-10 h-10 flex justify-center items-center ${activePath === "/support" ? "bg-sgrad rounded-full" : ""}`}
        >
          { activePath === "/support" ?  <ThreeDotsico className="w-6 h-6" /> : <ThreeDotsColorico className="w-6 h-6" /> }
        </Link>
      </div>
    </footer>
  );
}
