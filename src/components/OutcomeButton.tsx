'use client'

import { useSelection, useBaseBetslip } from '@azuro-org/sdk'
import { MarketOutcome } from '@azuro-org/toolkit'

import cx from 'clsx'


type OutcomeProps = {
  className?: string
  outcome: MarketOutcome,
}

export function OutcomeButton(props: OutcomeProps) {
  const { className, outcome } = props

  const { items, addItem, removeItem } = useBaseBetslip()
  const { odds, isLocked, isOddsFetching, } = useSelection({
    selection: outcome,
    initialOdds: outcome.odds,
    initialStatus: outcome.status,
  })

  const isActive = Boolean(items?.find((item) => {
    const propsKey = `${outcome.coreAddress}-${outcome.lpAddress}-${outcome.gameId}-${outcome.conditionId}-${outcome.outcomeId}`
    const itemKey = `${item.coreAddress}-${item.lpAddress}-${item.game.gameId}-${item.conditionId}-${item.outcomeId}`

    return propsKey === itemKey
  }))

  const buttonClassName = cx(`flex items-center justify-between px-4 py-3 transition rounded-2xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${className}`, {
    'bg-sec_dim_2': isActive,
    'bg-odd': !isActive,
  })

  const handleClick = () => {
    const item = {
      gameId: String(outcome.gameId),
      conditionId: String(outcome.conditionId),
      outcomeId: String(outcome.outcomeId),
      coreAddress: outcome.coreAddress,
      lpAddress: outcome.lpAddress,
      isExpressForbidden: outcome.isExpressForbidden,
    }
    if (isActive) {
      removeItem({
        outcomeId: outcome.outcomeId,
        conditionId: outcome.conditionId
      })
    } else {
      addItem(item)
    }
  }

  return (
    <button
      className={buttonClassName}
      onClick={handleClick}
      disabled={isLocked}
    >
      <span className="font-medium">{isOddsFetching ? '--' : odds.toFixed(2)}</span>
    </button>
  )
}