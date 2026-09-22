import { useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { TOP_MOVERS } from '@/data/trends'

type Tab = 'increases' | 'decreases'

export default function TopMovers() {
  const [tab, setTab] = useState<Tab>('increases')
  const list = TOP_MOVERS[tab]

  return (
    <div className="card p-6 flex flex-col gap-5">
      <div>
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">Top Movers</h2>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
          Biggest category changes vs last year
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-white/5 self-start">
        {(['increases', 'decreases'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
              ${
                tab === t
                  ? 'bg-white dark:bg-[#1C1B2E] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}>
            {t === 'increases' ? (
              <TrendingUp size={12} className="text-emerald-500" />
            ) : (
              <TrendingDown size={12} className="text-rose-500" />
            )}
            {t === 'increases' ? 'Increases' : 'Decreases'}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col gap-1">
        {list.map((item, i) => {
          const isPositive = item.change > 0
          const absAmt = Math.abs(item.amount)
          const maxAmt = Math.max(...list.map((m) => Math.abs(m.amount)))
          const barPct = (absAmt / maxAmt) * 100

          return (
            <div
              key={item.name}
              className="py-2.5 border-b border-gray-50 dark:border-[#2D2C44] last:border-0">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs text-gray-400 dark:text-gray-600 w-4 flex-shrink-0">
                    {i + 1}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: item.color }}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {isPositive ? '+' : ''}R {absAmt.toLocaleString()}
                  </span>
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded-md
                      ${
                        isPositive
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}>
                    {isPositive ? '+' : ''}
                    {item.change}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="ml-6 h-1 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${barPct}%`, background: item.color }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
