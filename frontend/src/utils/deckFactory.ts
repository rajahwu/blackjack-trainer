import type { Card, Suit, Rank } from './types'
import { cardSymbols } from './cardSymbols'
import { rankValues } from './rankValues'

const suits: Suit[] = ['spades', 'hearts', 'clubs', 'diamonds']
const ranks: Rank[] = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']

export function createDeck(numDecks: number = 1): Card[] {
  const deck: Card[] = []

  for (let d = 0; d < numDecks; d++) {
    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({
          suit,
          rank,
          symbol: cardSymbols[suit][rank],
          value: rankValues[rank]
        })
      }
    }
  }

  return deck
}

export function shuffle(deck: Card[]): Card[] {
  const newDeck = [...deck]
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]]
  }
  return newDeck
}
