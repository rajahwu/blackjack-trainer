import { PlayerAction } from '../../utils/types'

interface ControlsProps {
  gamePhase: string
  onNewRound: () => void
  onDeal: () => void
  onPlayerAction: (action: PlayerAction) => void
  canDeal: boolean
}

export default function Controls({
  gamePhase,
  onNewRound,
  onDeal,
  onPlayerAction,
  canDeal,
}: ControlsProps) {
  return (
    <div className="text-center mt-4 space-x-2">
      {(gamePhase === 'setup' || gamePhase === 'dealer') && (
        <button
          onClick={onNewRound}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          New Round
        </button>
      )}

      {gamePhase === 'dealing' && (
        <button
          onClick={onDeal}
          disabled={!canDeal}
          className={`px-4 py-2 rounded ${
            canDeal ? 'bg-green-600 text-white' : 'bg-gray-400 text-gray-200'
          }`}
        >
          Deal Card
        </button>
      )}

      {gamePhase === 'round' && (
        <>
          <button
            onClick={() => onPlayerAction('hit')}
            className="px-3 py-2 bg-yellow-500 text-white rounded"
          >
            Hit
          </button>
          <button
            onClick={() => onPlayerAction('stand')}
            className="px-3 py-2 bg-purple-600 text-white rounded"
          >
            Stand
          </button>
        </>
      )}
    </div>
  )
}
