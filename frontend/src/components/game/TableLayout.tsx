import { Player } from '../../utils/types'
import PlayerSeat from './PlayerSeat'
import DealerSeat from './DealerSeat'

interface TableLayoutProps {
  players: Player[]
  dealer: Player
  currentPlayerIndex: number
  gamePhase: string
}

export default function TableLayout({
  players,
  dealer,
  currentPlayerIndex,
  gamePhase,
}: TableLayoutProps) {
  return (
    <div className="space-y-8">
      {/* Players grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {players.map((p, idx) => (
          <PlayerSeat
            key={p.id}
            player={p}
            isActive={gamePhase === 'round' && idx === currentPlayerIndex}
          />
        ))}
      </div>

      {/* Dealer at bottom */}
      <div className="flex justify-center">
        <DealerSeat dealer={dealer} hideHoleCard={gamePhase === 'dealing'} />
      </div>
    </div>
  )
}
