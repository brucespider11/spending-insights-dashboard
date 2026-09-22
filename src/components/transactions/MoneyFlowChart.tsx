import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts'
import type { CustomerProfile } from '@/data/customers'

type Tab = 'all' | 'income' | 'expenses'
const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'income', label: 'Money In' },
  { key: 'expenses', label: 'Money Out' },
]

const fmt = (v: number) => `R ${(v / 1000).toFixed(0)}k`

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-[#1C1B2E] border border-gray-100 dark:border-[#2D2C44] rounded-xl shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              {p.name === 'in' ? 'Money In' : 'Money Out'}
            </span>
          </div>
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            R {(p.value as number).toLocaleString()}
          </span>
        </div>
      ))}
      {payload.length === 2 && (
        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-[#2D2C44] flex justify-between">
          <span className="text-xs text-gray-400 dark:text-gray-600">Net</span>
          <span
            className={`text-xs font-semibold ${
              (payload[0].value as number) >= (payload[1].value as number)
                ? 'text-emerald-500'
                : 'text-rose-500'
            }`}>
            R{' '}
            {Math.abs((payload[0].value as number) - (payload[1].value as number)).toLocaleString()}
          </span>
        </div>
      )}
    </div>
  )
}

interface Props {
  customer: CustomerProfile
}

export default function MoneyFlowChart({ customer }: Props) {
  const [tab, setTab] = useState<Tab>('all')

  const monthlyData = customer.monthlyTrend.map((m) => ({
    month: m.month,
    in: customer.monthlyIncome,
    out: m.amount,
  }))

  return (
    <div className="card p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
            Monthly Money Flow
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">Jan – Dec 2025</p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-white/5">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${
                  tab === t.key
                    ? 'bg-white dark:bg-[#1C1B2E] text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5">
        {(tab === 'all' || tab === 'income') && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Money In</span>
          </div>
        )}
        {(tab === 'all' || tab === 'expenses') && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-rose-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Money Out</span>
          </div>
        )}
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            barGap={4}
            barCategoryGap="30%"
            margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              strokeOpacity={0.06}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.45 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={fmt}
              tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.45 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.04 }} />
            {(tab === 'all' || tab === 'income') && (
              <Bar dataKey="in" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={32} />
            )}
            {(tab === 'all' || tab === 'expenses') && (
              <Bar dataKey="out" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={32} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
