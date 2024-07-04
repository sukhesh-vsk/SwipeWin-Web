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
      <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full">
        {
          Boolean(image) && (
            <img className="w-12 h-12" src={image!} alt="" />
          )
        }
      </div>
      <span className="max-w-[210px] mt-3 font-bold text-text tracking-widest uppercase text-sm text-center">{name}</span>
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
    <div className={`flex flex-col items-center pt-6 pb-8 w-full h-full px-5 mx-4 rounded-[40px]` + (props.className) ? style : 'bg-transparent'}>
      <div className="flex flex-col items-center text-md text-text w-full mb-6">
        <div className='tracking-wide w-full text-center'>{sport.name} | {league.country.name}</div>
        <div className="mt-1 text-sm">
          {league.name}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] flex flex-col space-around items-center">
        <ParticipantLogo {...participants[0]} />
          <div className="text-accent tracking-wide text-xs text-center mx-4">
            {dayjs(+startsAt * 1000).format('DD MMM HH:mm')}
          </div>
        <ParticipantLogo {...participants[1]} />
      </div>
    </div>
  )
}