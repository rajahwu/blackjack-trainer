// src/utils/types.ts

// A single playing card (emoji string for now)
export type Card = string

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
