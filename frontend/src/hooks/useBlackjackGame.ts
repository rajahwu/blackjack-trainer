import { useState, useCallback } from 'react'
import type { Card, Player, Dealer, GamePhase, PlayerAction } from '../utils/types'
import { useDeck } from './useDeck'
import { calculateScore } from './useScore'

export function useBlackjackGame(numPlayers: number = 7, numDecks: number = 1) {
  const { deck, drawCard, resetDeck, remaining } = useDeck(numDecks)

  const [players, setPlayers] = useState<Player[]>(
    Array.from({ length: numPlayers }, (_, i) => ({
      id: i + 1,
      hand: [],
      status: 'Waiting' as Player['status'],
    }))
  )

  const [dealer, setDealer] = useState<Dealer>({
    id: 0,
    hand: [],
    status: 'Dealer',
  })

  const [gamePhase, setGamePhase] = useState<GamePhase>('setup')
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [dealingIndex, setDealingIndex] = useState(0)

  // Start a new round
  const startNewRound = useCallback(() => {
    setPlayers(players.map(p => ({ ...p, hand: [], status: 'Waiting' })))
    setDealer({ id: 0, hand: [], status: 'Dealer' })
    resetDeck()
    setGamePhase('dealing')
    setCurrentPlayerIndex(0)
    setDealingIndex(0)
  }, [players, resetDeck])

  // Deal one card at a time (round-robin)
  const dealCard = useCallback(() => {
    const card = drawCard()
    if (!card) return

    const targetIndex = dealingIndex % (players.length + 1)
    if (targetIndex === players.length) {
      // Dealer
      setDealer(d => ({ ...d, hand: [...d.hand, card] }))
    } else {
      setPlayers(prev =>
        prev.map((p, idx) =>
          idx === targetIndex
            ? { ...p, hand: [...p.hand, card], status: 'Playing' }
            : p
        )
      )
    }

    setDealingIndex(dealingIndex + 1)

    // After 2 rounds of dealing, move to round phase
    if (dealingIndex + 1 === (players.length + 1) * 2) {
      setGamePhase('round')
      setCurrentPlayerIndex(0)
    }
  }, [dealingIndex, players.length, drawCard])

  // Handle player action
  const handlePlayerAction = useCallback(
    (action: PlayerAction) => {
      setPlayers(prev =>
        prev.map((p, idx) => {
          if (idx !== currentPlayerIndex) return p

          if (action === 'hit') {
            const card = drawCard()
            if (!card) return p
            const newHand = [...p.hand, card]
            const score = calculateScore(newHand)
            if (score > 21) {
              // Bust
              const nextIndex = currentPlayerIndex + 1
              if (nextIndex < prev.length) {
                setCurrentPlayerIndex(nextIndex)
              } else {
                setGamePhase('dealer')
              }
              return { ...p, hand: newHand, status: 'Too Many' }
            }
            return { ...p, hand: newHand, status: 'Playing' }
          }

          if (action === 'stand') {
            const nextIndex = currentPlayerIndex + 1
            if (nextIndex < prev.length) {
              setCurrentPlayerIndex(nextIndex)
            } else {
              setGamePhase('dealer')
            }
            return { ...p, status: 'Waiting' }
          }

          return p
        })
      )
    },
    [currentPlayerIndex, drawCard]
  )

  return {
    players,
    dealer,
    gamePhase,
    currentPlayerIndex,
    dealingIndex,
    remaining,
    startNewRound,
    dealCard,
    handlePlayerAction,
  }
}

export default useBlackjackGame
