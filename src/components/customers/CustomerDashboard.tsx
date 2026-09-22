import { useState } from 'react'
import { ArrowLeft, MapPin, Calendar, TrendingUp, TrendingDown, Lightbulb } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  type TooltipProps,
} from 'recharts'
import type { CustomerProfile, CustomerCategory } from '@/data/customers'

const RISK_STYLES = {
  Low: 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  Medium: 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400',
  High: 'bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400',
}

const STATUS_STYLES = {
  Active: 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  Dormant: 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400',
  Restricted: 'bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400',
}

function TrendTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-[#1C1B2E] border border-gray-100 dark:border-[#2D2C44] rounded-xl shadow-lg px-3 py-2 text-xs">
      <p className="text-gray-500 dark:text-gray-400 mb-0.5">{label}</p>
      <p className="font-semibold text-gray-800 dark:text-gray-200">
        R {(payload[0].value as number).toLocaleString()}
      </p>
    </div>
  )
}

interface Props {
  customer: CustomerProfile
  onBack: () => void
}

export default function CustomerDashboard({ customer, onBack }: Props) {
  const [hovered, setHovered] = useState<CustomerCategory | null>(null)
  const isPositive = customer.spendChange >= 0
  const topCategory = customer.categories[0]

  const fmtY = (v: number) => `R ${(v / 1000).toFixed(0)}k`

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Breadcrumb + back */}
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-600 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          <ArrowLeft size={13} />
          Customer Lookup
        </button>
        <span className="text-gray-300 dark:text-gray-700">/</span>
        <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
          {customer.name}
        </span>
      </div>

      {/* Customer profile card */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          {/* Avatar */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
            style={{ background: customer.segmentColor }}>
            {customer.initials}
          </div>

          {/* Core info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{customer.name}</h2>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    CIF:{' '}
                    <span className="font-mono font-semibold text-gray-700 dark:text-gray-300">
                      {customer.cif}
                    </span>
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    Acc:{' '}
                    <span className="font-mono font-semibold text-gray-700 dark:text-gray-300">
                      {customer.accountNumber}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                    <MapPin size={11} />
                    {customer.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                    <Calendar size={11} />
                    Member since{' '}
                    {new Date(customer.joinDate).toLocaleDateString('en-ZA', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[customer.status]}`}>
                  {customer.status}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${RISK_STYLES[customer.riskProfile]}`}>
                  {customer.riskProfile} Risk
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400">
                  {customer.segment}
                </span>
              </div>
            </div>

            {/* Income */}
            <div className="mt-4 flex items-center gap-1.5 text-sm">
              <span className="text-gray-500 dark:text-gray-500">Monthly income:</span>
              <span className="font-bold text-gray-900 dark:text-white">
                R {customer.monthlyIncome.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI summary */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total YTD spend', value: `R ${customer.totalSpend.toLocaleString()}` },
          { label: 'Monthly average', value: `R ${customer.avgMonthlySpend.toLocaleString()}` },
          {
            label: 'Spend change',
            value: `${isPositive ? '+' : ''}${customer.spendChange}%`,
            accent: isPositive ? 'text-rose-500' : 'text-emerald-500',
          },
          { label: 'Transactions', value: customer.transactionCount.toLocaleString() },
        ].map((s) => (
          <div key={s.label} className="card p-4">
            <p className="text-xs text-gray-500 dark:text-gray-500">{s.label}</p>
            <p
              className={`text-xl font-bold mt-0.5 ${s.accent ?? 'text-gray-900 dark:text-white'}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Insight banner */}
      <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-brand-50 dark:bg-brand-600/10 border border-brand-200 dark:border-brand-600/20">
        <Lightbulb size={16} className="text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-brand-700 dark:text-brand-300">{customer.insight}</p>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">
        {/* 6-month trend */}
        <div className="card p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
              12-Month Spending Trend
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                R {customer.totalSpend.toLocaleString()}
              </span>
              <span
                className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full
                ${
                  isPositive
                    ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                }`}>
                {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {isPositive ? '+' : ''}
                {customer.spendChange}% YoY
              </span>
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={customer.monthlyTrend}
                margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id={`custGrad-${customer.cif}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={customer.segmentColor} stopOpacity={0.22} />
                    <stop offset="95%" stopColor={customer.segmentColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.45 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tickFormatter={fmtY}
                  tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.45 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={<TrendTooltip />}
                  cursor={{ stroke: customer.segmentColor, strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke={customer.segmentColor}
                  strokeWidth={2}
                  fill={`url(#custGrad-${customer.cif})`}
                  dot={false}
                  activeDot={{ r: 4, fill: customer.segmentColor, strokeWidth: 2, stroke: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="card p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
            Category Breakdown
          </h3>

          <div className="flex flex-col items-center gap-3">
            {/* Donut */}
            <div className="relative w-40 h-40 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customer.categories}
                    cx="50%"
                    cy="50%"
                    innerRadius={44}
                    outerRadius={64}
                    paddingAngle={3}
                    dataKey="pct"
                    nameKey="name"
                    strokeWidth={0}
                    onMouseEnter={(data) =>
                      setHovered({
                        name: data.name,
                        amount: data.amount,
                        pct: data.pct,
                        color: data.color,
                        change: data.change,
                      })
                    }
                    onMouseLeave={() => setHovered(null)}>
                    {customer.categories.map((cat, i) => (
                      <Cell
                        key={i}
                        fill={cat.color}
                        opacity={hovered && hovered.name !== cat.name ? 0.4 : 1}
                        style={{ transition: 'opacity 150ms' }}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {hovered ? hovered.pct + '%' : 'Top'}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight text-center px-2">
                  {hovered ? hovered.name : topCategory.name}
                </span>
                {!hovered && (
                  <span className="text-xs font-semibold" style={{ color: topCategory.color }}>
                    {topCategory.pct}%
                  </span>
                )}
              </div>
            </div>

            {/* Hover detail strip */}
            <div
              className={`w-full transition-opacity duration-150 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: hovered?.color }}
                  />
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                    {hovered?.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 dark:text-gray-500">{hovered?.pct}%</span>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    R {hovered?.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="w-full space-y-2">
              {customer.categories.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: cat.color }}
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 dark:text-gray-600">{cat.pct}%</span>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 w-24 text-right">
                      R {cat.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
