import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  type TooltipProps,
} from 'recharts'
import type { CustomerProfile } from '@/data/customers'
import PeriodFilter, { type TimePeriod, PERIOD_MONTHS } from '@/components/common/PeriodFilter'

interface Props {
  customer: CustomerProfile
}

// 6-value cycle applied to monthly income — prevents a flat line on the chart while keeping totals realistic
const INCOME_FACTORS = [1.02, 0.98, 1.0, 1.03, 0.97, 1.0]

function buildChartData(customer: CustomerProfile) {
  return customer.monthlyTrend.map((m, i) => ({
    month: m.month,
    spend: m.amount,
    income: Math.round(customer.monthlyIncome * INCOME_FACTORS[i % INCOME_FACTORS.length]),
  }))
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const income = payload.find((p) => p.dataKey === 'income')?.value ?? 0
  const spend = payload.find((p) => p.dataKey === 'spend')?.value ?? 0
  const net = (income as number) - (spend as number)
  return (
    <div className="bg-white dark:bg-[#1C1B2E] border border-gray-100 dark:border-[#2D2C44] rounded-xl shadow-xl px-4 py-3 min-w-[160px]">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-500 mb-2">{label}</p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Income
          </span>
          <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
            R {(income as number).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
            <span className="w-2 h-2 rounded-full bg-brand-500 inline-block" />
            Spend
          </span>
          <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
            R {(spend as number).toLocaleString()}
          </span>
        </div>
        <div className="pt-1.5 mt-1.5 border-t border-gray-100 dark:border-[#2D2C44] flex items-center justify-between gap-4">
          <span className="text-xs text-gray-400 dark:text-gray-600">Net saved</span>
          <span
            className={`text-xs font-bold ${net >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {net >= 0 ? '+' : ''}R {net.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function SpendingChart({ customer }: Props) {
  const [period, setPeriod] = useState<TimePeriod>('6M')
  const allData = buildChartData(customer)
  const data = allData.slice(-PERIOD_MONTHS[period])
  const totalSaved = data.reduce((s, d) => s + (d.income - d.spend), 0)
  const savingsRate = Math.round((totalSaved / data.reduce((s, d) => s + d.income, 0)) * 100)

  return (
    <div className="card p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
            Income vs Spend
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">
            Savings rate:{' '}
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {savingsRate}%
            </span>
          </p>
        </div>
        <PeriodFilter value={period} onChange={setPeriod} />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              tickFormatter={(v) => `R ${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.45 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#7c3aed', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#incomeGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
            />
            <Area
              type="monotone"
              dataKey="spend"
              stroke="#7c3aed"
              strokeWidth={2}
              fill="url(#spendGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#7c3aed', strokeWidth: 2, stroke: '#fff' }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{value}</span>
              )}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
