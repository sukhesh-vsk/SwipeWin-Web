'use client'

import React from 'react'
import { ActiveLink } from '@/components'

export function BottomBar() {
  return (
    <footer className='bg-bhg w-full bottom-bar flex space-around p-4'>
        <ActiveLink
          className="text-zinc-800 hover:text-black transition"
          activeClassName="!text-black font-semibold !cursor-default"
          href="/events/top"
        >
          Home
        </ActiveLink>
        <ActiveLink
          className="text-zinc-800 hover:text-black transition ml-4"
          activeClassName="!text-black font-semibold !cursor-default"
          href="/allbets"
        >
          My Bets
        </ActiveLink>
        <ActiveLink
          className="text-zinc-800 hover:text-black transition ml-4"
          activeClassName="!text-black font-semibold !cursor-default"
          href="/support"
        >
          Support
        </ActiveLink>
    </footer>
  )
}
