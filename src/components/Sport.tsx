'use client'

import { SportsQuery } from '@azuro-org/toolkit'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import cx from 'clsx'

import { Country } from './Country'
import PageHeader from './PageHeader'


type SportProps = {
  sport: SportsQuery['sports'][0]
}

export function Sport(props: SportProps) {
  const { sport } = props
  const { countries } = sport
  const params = useParams()

  const isSportPage = params.sport !== 'top'

  return (
    <div
      className={cx({
        "p-4 bg-bg rounded-3xl mt-4 first-of-type:mt-0": !isSportPage
      })}
    > 
      <PageHeader title={`${params.sport}`} filter={false} />
      {
        !isSportPage && (
          <Link
            className="text-sm text-text mb-2 hover:underline font-bold"
            href={`/games/${sport.slug}`}
          >
            {sport.name}
          </Link>
        )
      }
      {
        countries.map(country => (
          <Country
            key={country.slug}
            className="mt-2 first-of-type:mt-0"
            country={country}
            sportSlug={sport.slug}
          />
        ))
      }
    </div>
  )
}