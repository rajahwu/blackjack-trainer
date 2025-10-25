// src/pages/GamePage.tsx
import TableLayout from '../components/game/TableLayout'
import Controls from '../components/game/Controls'
import useBlackjackGame from '../hooks/useBlackjackGame'

export default function GamePage() {
  const {
    players,
    dealer,
    gamePhase,
    currentPlayerIndex,
    remaining,
    startNewRound,
    dealCard,
    handlePlayerAction,
  } = useBlackjackGame(7, 6) // 7 players, 6-deck shoe

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">TREX Blackjack Trainer</h1>

      <TableLayout
        players={players}
        dealer={dealer}
        currentPlayerIndex={currentPlayerIndex}
        gamePhase={gamePhase}
      />

      <Controls
        gamePhase={gamePhase}
        onNewRound={startNewRound}
        onDeal={dealCard}
        onPlayerAction={handlePlayerAction}
        canDeal={remaining > 0}
      />

      <div className="text-center text-gray-500">
        Cards remaining: {remaining}
      </div>
    </div>
  )
}
