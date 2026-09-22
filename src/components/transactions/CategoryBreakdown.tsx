import { useState } from 'react'
import type { CustomerProfile } from '@/data/customers'

type Tab = 'income' | 'expenses'

function CategoryRow({
  name,
  amount,
  color,
  max,
  total,
}: {
  name: string
  amount: number
  color: string
  max: number
  total: number
}) {
  const pct = Math.round((amount / max) * 100)
  const share = ((amount / total) * 100).toFixed(1)

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-50 dark:border-[#2D2C44] last:border-0">
      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
      <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 truncate">{name}</span>
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Mini bar */}
        <div className="hidden sm:block w-24 h-1.5 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: color }}
          />
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-600 w-10 text-right">{share}%</span>
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 w-28 text-right">
          R {amount.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

interface Props {
  customer: CustomerProfile
}

export default function CategoryBreakdown({ customer }: Props) {
  const [tab, setTab] = useState<Tab>('expenses')

  const EXPENSES = customer.categories.map((c) => ({
    name: c.name,
    amount: c.amount,
    color: c.color,
  }))

  const INCOME = [{ name: 'Primary Income', amount: customer.monthlyIncome * 12, color: '#10b981' }]

  const list = tab === 'income' ? INCOME : EXPENSES
  const max = Math.max(...list.map((c) => c.amount))
  const total = list.reduce((s, c) => s + c.amount, 0)

  return (
    <div className="card p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
            Category Breakdown
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
            Total:{' '}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              R {total.toLocaleString()}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-white/5">
          {(['income', 'expenses'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors
                ${
                  tab === t
                    ? 'bg-white dark:bg-[#1C1B2E] text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}>
              {t === 'income' ? 'Income Sources' : 'Expenses'}
            </button>
          ))}
        </div>
      </div>

      {/* Column headers */}
      <div className="flex items-center gap-3 px-0 pb-1 border-b border-gray-100 dark:border-[#2D2C44]">
        <span className="w-2.5 flex-shrink-0" />
        <span className="flex-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600">
          Category
        </span>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="hidden sm:block w-24 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600 text-right">
            Share
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600 w-10 text-right">
            %
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600 w-28 text-right">
            Amount
          </span>
        </div>
      </div>

      <div>
        {list.map((cat) => (
          <CategoryRow key={cat.name} {...cat} max={max} total={total} />
        ))}
      </div>
    </div>
  )
}
