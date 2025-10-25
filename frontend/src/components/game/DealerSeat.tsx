import type { Dealer } from '../../utils/types'

interface DealerSeatProps {
  dealer: Dealer
  hideHoleCard?: boolean
}

export default function DealerSeat({ dealer, hideHoleCard = true }: DealerSeatProps) {
  return (
    <div className="p-6 border-2 border-black rounded bg-white text-center shadow-md">
      <h3 className="font-bold mb-2">Dealer</h3>
      <div className="flex gap-2 text-3xl justify-center min-h-[3rem]">
        {dealer.hand.length > 0 ? (
          <>
            {hideHoleCard && dealer.hand.length > 1 ? (
              <>
                <span className="opacity-40">🂠</span>
                {dealer.hand.slice(1).map((c, i) => (
                  <span key={i}>{c.symbol}</span>
                ))}
              </>
            ) : (
              dealer.hand.map((c, i) => <span key={i}>{c.symbol}</span>)
            )}
          </>
        ) : (
          '—'
        )}
      </div>
    </div>
  )
}
