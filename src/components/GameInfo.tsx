import dayjs from 'dayjs'
import { type GameQuery } from '@azuro-org/sdk'


type ParticipantLogoProps = {
  image?: string | null
  name: string
}

export function ParticipantLogo(props: ParticipantLogoProps) {
  const { image, name } = props

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center rounded-full">
        {
          Boolean(image) && (
            <img className="w-8 h-8" src={image!} alt="" />
          )
        }
      </div>
      <span className="max-w-[210px] mt-3 font-medium text-text tracking-wide uppercase text-xs text-center">{name}</span>
    </div>
  )
}

type Props = {
  game: GameQuery['games'][0], 
  className?: string
}

export function GameInfo(props: Props) {
  const { sport, league, participants, startsAt } = props.game
  const style = (props.className) ? props.className : '';

  return (
    <div className={`flex flex-col items-center pt-2 pb-2 w-full h-full px-5 mx-4 rounded-[40px]` + (props.className) ? style : 'bg-transparent'}>
      <div className="flex flex-col items-center text-md text-text w-full mb-3">
        <div className='tracking-wide w-full text-sm text-center'><p>{sport.name}</p><p className='text-xs w-full'>{league.country.name}</p></div>
        <div className="mt-1 text-xs font-medium">
          {league.name}
        </div>
      </div>
      <div className="mt-2 grid grid-cols-[1fr_auto_1fr] flex flex-col space-between items-center">
        <ParticipantLogo {...participants[0]} />
          <div className="text-accent tracking-wide text-xs text-center mx-2">
            {dayjs(+startsAt * 1000).format('DD MMM HH:mm')}
          </div>
        <ParticipantLogo {...participants[1]} />
      </div>
    </div>
  )
}