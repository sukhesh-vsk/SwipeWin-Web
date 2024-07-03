// app event [id] page.tsx

// 'use client'

// import { useParams } from 'next/navigation'
// import { useGame, useGameMarkets, type GameQuery, useGameStatus, GameStatus } from '@azuro-org/sdk'
// import { GameInfo, GameMarkets } from '@/components'


// type MarketsProps = {
//   gameId: string
//   gameStatus: GameStatus,
// }

// const Markets: React.FC<MarketsProps> = ({ gameId, gameStatus }) => {
//   const { loading, markets } = useGameMarkets({
//     gameId,
//     gameStatus,
//     filter: {
//       outcomeIds: ['29']
//     }
//   })

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   if (!markets) {
//     return null
//   }

//   return <GameMarkets markets={markets} />
// }

// type ContentProps = {
//   game: GameQuery['games'][0]
//   isGameInLive: boolean
// }

// const Content: React.FC<ContentProps> = ({ game, isGameInLive }) => {
//   const { status: gameStatus } = useGameStatus({
//     startsAt: +game.startsAt,
//     graphStatus: game.status,
//     isGameExistInLive: isGameInLive,
//   })

//   return (
//     <div className='bg-sec_2 p-10 rounded-xl mx-6'>
//       <GameInfo game={game} />
//       <Markets
//         gameId={game.gameId}
//         gameStatus={gameStatus}
//       />
//     </div>
//   )
// }

// export default function Game() {
//   const params = useParams()

//   const { loading, game, isGameInLive } = useGame({
//     gameId: params.id as string,
//   })

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   if (!game) {
//     return (
//       <div>Game info not found</div>
//     )
//   }

//   return (
//     <Content game={game} isGameInLive={isGameInLive} />
//   )
// }
