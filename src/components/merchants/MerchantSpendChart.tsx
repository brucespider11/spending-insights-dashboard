import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  type TooltipProps,
} from 'recharts'
import type { MerchantDisplay } from '@/data/merchants'

interface Props {
  merchants: MerchantDisplay[]
  periodLabel: string
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const d = payload[0]
  const merchant = d.payload as MerchantDisplay
  return (
    <div className="bg-white dark:bg-[#1C1B2E] border border-gray-100 dark:border-[#2D2C44] rounded-xl shadow-xl px-4 py-3 min-w-[160px]">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
          style={{ background: merchant.categoryColor }}>
          {merchant.initials}
        </div>
        <span className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">
          {label}
        </span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span className="text-[11px] text-gray-500 dark:text-gray-500">Spend</span>
          <span className="text-[11px] font-semibold text-gray-800 dark:text-gray-200">
            R {merchant.displaySpend.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[11px] text-gray-500 dark:text-gray-500">Visits</span>
          <span className="text-[11px] font-semibold text-gray-800 dark:text-gray-200">
            {merchant.visitCount}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[11px] text-gray-500 dark:text-gray-500">Avg/visit</span>
          <span className="text-[11px] font-semibold text-gray-800 dark:text-gray-200">
            R {merchant.avgSpend.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-100 dark:border-[#2D2C44]">
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: merchant.categoryColor + '22', color: merchant.categoryColor }}>
          {merchant.category}
        </span>
      </div>
    </div>
  )
}

function formatAmount(v: number) {
  if (v >= 1000) return `R ${(v / 1000).toFixed(0)}k`
  return `R ${v}`
}

export default function MerchantSpendChart({ merchants, periodLabel }: Props) {
  const top8 = merchants.slice(0, 8)

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
            Top merchants by spend
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">
            Ranked by spend · {periodLabel}
          </p>
        </div>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={top8}
            margin={{ top: 0, right: 16, bottom: 0, left: 8 }}
            barCategoryGap="28%">
            <CartesianGrid
              horizontal={false}
              strokeDasharray="3 3"
              stroke="currentColor"
              className="text-gray-100 dark:text-[#2D2C44]"
            />
            <XAxis
              type="number"
              tickFormatter={formatAmount}
              tick={{
                fontSize: 11,
                fill: 'currentColor',
                className: 'text-gray-400 dark:text-gray-600',
              }}
              axisLine={false}
              tickLine={false}
              className="text-gray-400 dark:text-gray-600"
            />
            <YAxis
              type="category"
              dataKey="name"
              width={112}
              tick={{
                fontSize: 12,
                fill: 'currentColor',
                className: 'text-gray-600 dark:text-gray-400',
              }}
              axisLine={false}
              tickLine={false}
              className="text-gray-600 dark:text-gray-400"
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                fill: 'currentColor',
                className: 'text-gray-50 dark:text-white/5',
                opacity: 0.6,
              }}
            />
            <Bar dataKey="displaySpend" radius={[0, 5, 5, 0]} maxBarSize={20}>
              {top8.map((entry, i) => (
                <Cell key={i} fill={entry.categoryColor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
