'use client'

import React from 'react'
import { ActiveLink } from '@/components'

export function BottomBar() {
  return (
    <footer className='bg-white fixed inset-x-0 bottom-0'>
        <ActiveLink
          className="text-zinc-800 hover:text-black transition"
          activeClassName="!text-black font-semibold !cursor-default"
          href="/home"
          regex="^\/home(.*)"
        >
          Home
        </ActiveLink>
        <ActiveLink
          className="text-zinc-800 hover:text-black transition ml-4"
          activeClassName="!text-black font-semibold !cursor-default"
          href="/allbets"
          regex="^\/allbets"
        >
          My Bets
        </ActiveLink>
        <ActiveLink
          className="text-zinc-800 hover:text-black transition ml-4"
          activeClassName="!text-black font-semibold !cursor-default"
          href="/support"
          regex="^\/support"
        >
          Support
        </ActiveLink>
    </footer>
  )
}
