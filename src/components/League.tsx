'use client'
import { GamesQuery, SportsQuery, useGameStatus, useGameMarkets, useLive } from '@azuro-org/sdk'
import Link from 'next/link'
import cx from 'clsx'
import { useParams } from 'next/navigation'
import dayjs from 'dayjs'

import { OutcomeButton } from './index'


type GameProps = {
  className?: string
  game: GamesQuery['games'][0]
}

function Game(props: (GameProps & { league: string })) {
  const { className, game } = props
  const { gameId, title, startsAt, status: graphStatus } = game

  const { isLive } = useLive()
  const { status } = useGameStatus({
    graphStatus,
    startsAt: +startsAt,
    isGameExistInLive: isLive,
  })
  const { markets } = useGameMarkets({
    gameStatus: status,
    gameId,
  })

  return (
    <Link href={`/event/${gameId}`}>
    <div className={cx(className, "p-2 bg-sgrad text-text rounded-lg flex flex-col items-center justify-around game-card")}>
      <div>
        <div className='text-md mb-8 tracking-widest font-medium text-center'>{props.league}</div>
        <div className='max-w-[220px] text-sm w-full flex flex-col items-center justify-center mx-auto'>
            {title}
          <div className='text-sm'>{dayjs(+startsAt * 1000).format('DD MMM HH:mm')}</div>
        </div>
      </div>
      {
        Boolean(markets?.[0]?.outcomeRows[0]) && (
          <div className="lg:min-w-[500px]">
            <div className="flex items-center">
              {
                markets![0].outcomeRows[0].map((outcome) => (
                  <OutcomeButton
                    className="ml-2 odd-cont first-of-type:ml-0"
                    key={outcome.selectionName}
                    outcome={outcome}
                  />
                ))
              }
            </div>
          </div>
        )
      }
    </div>
    </Link>
  )
}

type LeagueProps = {
  className?: string
  sportSlug: string
  countryName: string
  countrySlug: string
  league: SportsQuery['sports'][0]['countries'][0]['leagues'][0]
}

export function League(props: LeagueProps) {
  const { className, sportSlug, countryName, countrySlug, league } = props
  const { games } = league

  const params = useParams()

  const isLeaguePage = params.league

  return (
    <div
      className={cx(className, {
        "p-4 bg-zinc-50 rounded-md": !isLeaguePage
      })}>
      <div className={cx("flex items-center mb-2", {
        "text-sm": !isLeaguePage,
        "text-lg font-bold": isLeaguePage
      })}>
        {
          isLeaguePage && (
            <>
              <Link
                className="hover:underline w-fit"
                href={`/events/${sportSlug}/${countrySlug}`}
              >
                <div className="ml-2">{countryName}</div>
              </Link>
              <div className="mx-2">&middot;</div>
            </>
          )
        }
      </div>
      {
        games.map(game => (
          <Game
            key={game.gameId}
            className="mt-2 first-of-type:mt-0 mb-4"
            game={game}
            league={league.name}
          />
        ))
      }
    </div>
  )
}
