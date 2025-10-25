// src/utils/types.ts
export type Suit = 'spades' | 'hearts' | 'clubs' | 'diamonds'
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'

export interface Card {
  suit: Suit
  rank: Rank
  symbol: string   // 🂡, 🂢, etc.
  value: number    // Blackjack value
}

// Game phases
export type GamePhase = 'setup' | 'dealing' | 'round' | 'dealer' | 'resolve'

// Player object
export interface Player {
  id: number
  hand: Card[]
  status: 'Waiting' | 'Playing' | 'Too Many' | 'Dealer'
  actions?: string[] // optional: track actions taken (hit/stand)
}

// Dealer is just a Player with id = 0 and status = 'Dealer'
export type Dealer = Player

// Hook return types
export interface BlackjackGameState {
  players: Player[]
  dealer: Dealer
  gameDeck: Card[]
  dealingIndex: number
  gamePhase: GamePhase
  currentPlayerIndex: number
}

// Actions the dealer can trigger
export type PlayerAction = 'hit' | 'stand'
