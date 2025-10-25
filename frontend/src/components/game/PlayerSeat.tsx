import { Player } from '../../utils/types'

interface PlayerSeatProps {
  player: Player
  isActive: boolean
}

export default function PlayerSeat({ player, isActive }: PlayerSeatProps) {
  return (
    <div
      className={`p-4 rounded border shadow-sm ${
        isActive ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
      }`}
    >
      <h4 className="font-bold mb-2">Player {player.id}</h4>
      <div className="flex gap-1 text-2xl justify-center min-h-[2rem]">
        {player.hand.length > 0
          ? player.hand.map((c, i) => <span key={i}>{c.symbol}</span>)
          : '—'}
      </div>
      <div className="text-sm text-gray-600 mt-1">{player.status}</div>
    </div>
  )
}
