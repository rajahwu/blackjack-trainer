import type { Card } from '../utils/types'

/**
 * Calculate the best blackjack score for a given hand.
 * Handles soft aces (counts them as 11 unless it would bust).
 */
export function calculateScore(hand: Card[]): number {
  let score = 0
  let aces = 0

  for (const card of hand) {
    score += card.value
    if (card.rank === 'A') aces++
  }

  // Downgrade aces from 11 → 1 until score <= 21 or no aces left
  while (score > 21 && aces > 0) {
    score -= 10
    aces--
  }

  return score
}

/**
 * Hook wrapper (optional) if you want to use it reactively.
 * For now, it's just a utility function.
 */
export function useScore() {
  return { calculateScore }
}

export default useScore
