import { useState, useCallback } from 'react'
import { Card } from '../utils/types'
import { createDeck, shuffle } from '../utils/deckFactory'

/**
 * Hook to manage a blackjack deck (or shoe).
 * @param numDecks number of decks to include (default 1)
 */
export function useDeck(numDecks: number = 1) {
  const [deck, setDeck] = useState<Card[]>(() => shuffle(createDeck(numDecks)))

  // Draw the top card
  const drawCard = useCallback((): Card | null => {
    if (deck.length === 0) return null
    const [card, ...rest] = deck
    setDeck(rest)
    return card
  }, [deck])

  // Reset to a fresh shuffled deck
  const resetDeck = useCallback(() => {
    setDeck(shuffle(createDeck(numDecks)))
  }, [numDecks])

  return {
    deck,
    drawCard,
    resetDeck,
    remaining: deck.length,
  }
}

export default useDeck
