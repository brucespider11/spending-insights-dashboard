import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts'
import { MONTHLY_TREND, QUARTERLY_TREND } from '@/data/trends'
import PeriodFilter, { type TimePeriod, PERIOD_MONTHS } from '@/components/common/PeriodFilter'

type Period = 'monthly' | 'quarterly'

const fmt = (v: number) => `R ${(v / 1000).toFixed(0)}k`

function CustomTooltip({
  active,
  payload,
  label,
  showLastYear,
}: TooltipProps<number, string> & { showLastYear: boolean }) {
  if (!active || !payload?.length) return null
  const thisYear = payload.find((p) => p.dataKey === 'thisYear')
  const lastYear = payload.find((p) => p.dataKey === 'lastYear')
  const diff =
    thisYear && lastYear
      ? (((thisYear.value as number) - (lastYear.value as number)) / (lastYear.value as number)) *
        100
      : null

  return (
    <div className="bg-white dark:bg-[#1C1B2E] border border-gray-100 dark:border-[#2D2C44] rounded-xl shadow-lg px-4 py-3 text-sm min-w-[160px]">
      <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{label}</p>
      {thisYear && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-600" />
            <span className="text-xs text-gray-500 dark:text-gray-400">This year</span>
          </div>
          <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
            R {(thisYear.value as number).toLocaleString()}
          </span>
        </div>
      )}
      {showLastYear && lastYear && (
        <div className="flex items-center justify-between gap-4 mt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gray-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Last year</span>
          </div>
          <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
            R {(lastYear.value as number).toLocaleString()}
          </span>
        </div>
      )}
      {diff !== null && showLastYear && (
        <div
          className={`mt-2 pt-2 border-t border-gray-100 dark:border-[#2D2C44] text-xs font-semibold text-right
          ${diff >= 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
          {diff >= 0 ? '+' : ''}
          {diff.toFixed(1)}% YoY
        </div>
      )}
    </div>
  )
}

export default function SpendingTrendChart() {
  const [period, setPeriod] = useState<Period>('monthly')
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('12M')
  const [showLastYear, setShowLastYear] = useState(false)

  const rawData = period === 'monthly' ? MONTHLY_TREND : QUARTERLY_TREND
  const data = period === 'monthly' ? rawData.slice(-PERIOD_MONTHS[timePeriod]) : rawData
  const xKey = period === 'monthly' ? 'month' : 'period'
  const gradId = 'trendGradThis'
  const gradIdLY = 'trendGradLast'

  return (
    <div className="card p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
            Spending Trend
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
            Total outgoing spend over time
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* YoY toggle */}
          <button
            onClick={() => setShowLastYear((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors
              ${
                showLastYear
                  ? 'border-brand-400 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400'
                  : 'border-gray-200 dark:border-[#2D2C44] text-gray-500 dark:text-gray-500 hover:border-gray-300 dark:hover:border-[#3D3C54]'
              }`}>
            <span
              className={`w-2 h-2 rounded-full ${showLastYear ? 'bg-brand-500' : 'bg-gray-400'}`}
            />
            vs Last Year
          </button>

          {/* Monthly / Quarterly toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-white/5">
            {(['monthly', 'quarterly'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors
                  ${
                    period === p
                      ? 'bg-white dark:bg-[#1C1B2E] text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}>
                {p === 'monthly' ? 'Monthly' : 'Quarterly'}
              </button>
            ))}
          </div>

          {/* Time period filter — only meaningful in monthly view */}
          {period === 'monthly' && <PeriodFilter value={timePeriod} onChange={setTimePeriod} />}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-brand-600" />
          <span className="text-xs text-gray-500 dark:text-gray-400">2025</span>
        </div>
        {showLastYear && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-gray-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400">2024</span>
          </div>
        )}
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
              <linearGradient id={gradIdLY} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#9ca3af" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              strokeOpacity={0.06}
              vertical={false}
            />
            <XAxis
              dataKey={xKey}
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
              content={<CustomTooltip showLastYear={showLastYear} />}
              cursor={{ stroke: '#7c3aed', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            {showLastYear && (
              <Area
                type="monotone"
                dataKey="lastYear"
                stroke="#9ca3af"
                strokeWidth={1.5}
                strokeDasharray="5 4"
                fill={`url(#${gradIdLY})`}
                dot={false}
                activeDot={false}
              />
            )}
            <Area
              type="monotone"
              dataKey="thisYear"
              stroke="#7c3aed"
              strokeWidth={2}
              fill={`url(#${gradId})`}
              dot={false}
              activeDot={{ r: 4, fill: '#7c3aed', strokeWidth: 2, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
