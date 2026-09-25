import { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import type { CustomerProfile } from '@/data/customers'

type Tab = 'income' | 'expenses'
type SortOrder = 'default' | 'desc' | 'asc'

const INCOME_BREAKDOWN: Record<string, { name: string; color: string; pct: number }[]> = {
  Youth: [
    { name: 'Salary', color: '#10b981', pct: 0.95 },
    { name: 'Other Income', color: '#9ca3af', pct: 0.05 },
  ],
  'Young Professional': [
    { name: 'Salary', color: '#10b981', pct: 0.88 },
    { name: 'Annual Bonus', color: '#f59e0b', pct: 0.12 },
  ],
  Professional: [
    { name: 'Salary', color: '#10b981', pct: 0.83 },
    { name: 'Annual Bonus', color: '#f59e0b', pct: 0.12 },
    { name: 'Investment Returns', color: '#3b82f6', pct: 0.05 },
  ],
  Family: [
    { name: 'Salary', color: '#10b981', pct: 0.8 },
    { name: 'Annual Bonus', color: '#f59e0b', pct: 0.12 },
    { name: 'Investment Returns', color: '#3b82f6', pct: 0.05 },
    { name: 'Other Income', color: '#9ca3af', pct: 0.03 },
  ],
  'Business Owner': [
    { name: 'Business Income', color: '#10b981', pct: 0.75 },
    { name: 'Dividends', color: '#f59e0b', pct: 0.15 },
    { name: 'Rental Income', color: '#3b82f6', pct: 0.1 },
  ],
  Retired: [
    { name: 'Pension', color: '#10b981', pct: 0.85 },
    { name: 'Investment Returns', color: '#3b82f6', pct: 0.1 },
    { name: 'Other Income', color: '#9ca3af', pct: 0.05 },
  ],
  Lifestyle: [
    { name: 'Salary', color: '#10b981', pct: 0.7 },
    { name: 'Investment Returns', color: '#3b82f6', pct: 0.15 },
    { name: 'Rental Income', color: '#8b5cf6', pct: 0.1 },
    { name: 'Other Income', color: '#9ca3af', pct: 0.05 },
  ],
}

function CategoryRow({
  name,
  amount,
  color,
  max,
  total,
  change,
}: {
  name: string
  amount: number
  color: string
  max: number
  total: number
  change?: number
}) {
  const pct = Math.round((amount / max) * 100)
  const share = ((amount / total) * 100).toFixed(1)
  const hasChange = change !== undefined && change !== 0
  const changeUp = (change ?? 0) > 0

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
        {hasChange ? (
          <span
            className={`hidden sm:inline-flex text-[11px] font-semibold px-1.5 py-0.5 rounded-md w-16 justify-end
              ${
                changeUp
                  ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              }`}>
            {changeUp ? '+' : ''}
            {change}%
          </span>
        ) : (
          <span className="hidden sm:block w-16" />
        )}
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
  const [changeSort, setChangeSort] = useState<SortOrder>('default')

  const cycleSort = () =>
    setChangeSort((s) => (s === 'default' ? 'desc' : s === 'desc' ? 'asc' : 'default'))

  const EXPENSES = useMemo(
    () =>
      customer.categories.map((c) => ({
        name: c.name,
        amount: c.amount,
        color: c.color,
        change: c.change,
      })),
    [customer]
  )

  // Income breakdown varies by segment — retirees get pension, business owners get dividends, etc.
  const INCOME = useMemo(() => {
    const annualIncome = customer.monthlyIncome * 12
    const breakdown = INCOME_BREAKDOWN[customer.segment] ?? INCOME_BREAKDOWN['Family']
    return breakdown.map((b) => ({
      name: b.name,
      amount: Math.round(annualIncome * b.pct),
      color: b.color,
    }))
  }, [customer])

  const baseList = tab === 'income' ? INCOME : EXPENSES
  const list =
    tab === 'expenses' && changeSort !== 'default'
      ? [...baseList].sort((a, b) => {
          const ac = 'change' in a && typeof a.change === 'number' ? a.change : 0
          const bc = 'change' in b && typeof b.change === 'number' ? b.change : 0
          return changeSort === 'desc' ? bc - ac : ac - bc
        })
      : baseList

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
              onClick={() => {
                setTab(t)
                setChangeSort('default')
              }}
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
          {tab === 'expenses' ? (
            <button
              onClick={cycleSort}
              className="hidden sm:flex items-center justify-end gap-0.5 w-16 text-[10px] font-semibold uppercase tracking-wider transition-colors
                hover:text-gray-600 dark:hover:text-gray-400
                text-gray-400 dark:text-gray-600">
              YoY
              {changeSort === 'desc' ? (
                <ChevronDown size={10} className="text-brand-500" />
              ) : changeSort === 'asc' ? (
                <ChevronUp size={10} className="text-brand-500" />
              ) : (
                <ChevronsUpDown size={10} />
              )}
            </button>
          ) : (
            <span className="hidden sm:block w-16" />
          )}
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600 w-28 text-right">
            Amount
          </span>
        </div>
      </div>

      <div>
        {list.map((cat) => (
          <CategoryRow
            key={cat.name}
            {...cat}
            max={max}
            total={total}
            change={'change' in cat && typeof cat.change === 'number' ? cat.change : undefined}
          />
        ))}
      </div>
    </div>
  )
}
