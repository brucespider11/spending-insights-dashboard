import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts'
import type { CustomerProfile } from '@/data/customers'

const fmt = (v: number) => `R ${(v / 1000).toFixed(0)}k`

interface Series {
  key: string
  label: string
  color: string
}

function CustomTooltip({
  active,
  payload,
  label,
  hidden,
  series,
}: TooltipProps<number, string> & { hidden: Set<string>; series: Series[] }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-[#1C1B2E] border border-gray-100 dark:border-[#2D2C44] rounded-xl shadow-lg px-4 py-3 text-sm min-w-[170px]">
      <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{label}</p>
      {series
        .filter((s) => !hidden.has(s.key))
        .map((s) => {
          const entry = payload.find((p) => p.dataKey === s.key)
          if (!entry) return null
          return (
            <div key={s.key} className="flex items-center justify-between gap-4 py-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-xs text-gray-500 dark:text-gray-400">{s.label}</span>
              </div>
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                R {(entry.value as number).toLocaleString()}
              </span>
            </div>
          )
        })}
    </div>
  )
}

interface Props {
  customer: CustomerProfile
}

export default function CategoryTrendChart({ customer }: Props) {
  const [hidden, setHidden] = useState<Set<string>>(new Set())

  // Top 5 categories by spend, excluding the catch-all 'Other'
  const topCategories = customer.categories.filter((c) => c.name !== 'Other').slice(0, 5)

  const series: Series[] = topCategories.map((cat) => ({
    key: cat.name.toLowerCase(),
    label: cat.name,
    color: cat.color,
  }))

  // Distribute each category's annual total across months using the customer's
  // own monthly spend pattern as the seasonal weight
  const totalSpend = customer.monthlyTrend.reduce((s, m) => s + m.amount, 0)
  const categoryMonthly = customer.monthlyTrend.map((m) => {
    const weight = totalSpend > 0 ? m.amount / totalSpend : 1 / 12
    const row: Record<string, number | string> = { month: m.month }
    topCategories.forEach((cat) => {
      row[cat.name.toLowerCase()] = Math.round(cat.amount * weight)
    })
    return row
  })

  const toggle = (key: string) =>
    setHidden((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  return (
    <div className="card p-6 flex flex-col gap-5">
      <div>
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
          Category Trends
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
          Monthly spend per category — click legend to toggle
        </p>
      </div>

      {/* Clickable legend */}
      <div className="flex items-center flex-wrap gap-2">
        {series.map((s) => {
          const isHidden = hidden.has(s.key)
          return (
            <button
              key={s.key}
              onClick={() => toggle(s.key)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-150
                ${
                  isHidden
                    ? 'border-gray-200 dark:border-[#2D2C44] text-gray-400 dark:text-gray-600 opacity-50'
                    : 'border-gray-200 dark:border-[#2D2C44] text-gray-600 dark:text-gray-300'
                }`}>
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-opacity"
                style={{ background: isHidden ? '#9ca3af' : s.color }}
              />
              {s.label}
            </button>
          )
        })}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={categoryMonthly} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
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
            <Tooltip
              content={<CustomTooltip hidden={hidden} series={series} />}
              cursor={{ stroke: 'currentColor', strokeOpacity: 0.1 }}
            />
            {series.map((s) =>
              hidden.has(s.key) ? null : (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  stroke={s.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 3.5, strokeWidth: 2, stroke: '#fff', fill: s.color }}
                />
              )
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
