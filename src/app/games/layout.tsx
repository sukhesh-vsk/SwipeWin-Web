'use client'

import { Sport } from '@/components/Sport' 
import { useParams } from 'next/navigation'
import { useSports, type UseSportsProps, Game_OrderBy, OrderDirection } from '@azuro-org/sdk'

const useData = () => {
  const params = useParams();

  const props: UseSportsProps = {
    gameOrderBy: Game_OrderBy.StartsAt,
    orderDir: OrderDirection.Asc,
    filter: {
      sportSlug: params.sport as string,
      countrySlug: params.country as string,
      leagueSlug: params.league as string,
    }
  }

  const { loading, sports } = useSports(props)

  return {
    sports,
    loading,
  }
}

export default function EventsLayout() {
  const { loading, sports } = useData()

  return (
    <>
      {
        loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {
              sports.map((sport) => (
                <Sport key={sport.slug} sport={sport} />
              ))
            }
          </div>
        )
      }
    </>
  )
}