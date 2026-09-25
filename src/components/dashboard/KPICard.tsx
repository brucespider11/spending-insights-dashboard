import { TrendingUp, TrendingDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LineChart, Line, Tooltip, ResponsiveContainer, type TooltipProps } from 'recharts'

type SparkFormat = 'currency' | 'count'

function SparkTooltip({
  active,
  payload,
  format,
}: TooltipProps<number, string> & { format: SparkFormat }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload as { v: number; label?: string }
  const display = format === 'currency' ? `R ${d.v.toLocaleString()}` : d.v.toLocaleString()
  return (
    <div className="bg-white dark:bg-[#1C1B2E] border border-gray-100 dark:border-[#2D2C44] rounded-lg shadow-lg px-2.5 py-1.5 pointer-events-none">
      {d.label && <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">{d.label}</p>}
      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{display}</p>
    </div>
  )
}

interface KPICardProps {
  icon: React.ReactNode
  iconBg: string
  label: string
  value: string
  accent?: string
  change?: number
  to?: string
  sparkData: { v: number; label?: string }[]
  sparkFormat?: SparkFormat
  lineColor: string
}

export default function KPICard({
  icon,
  iconBg,
  label,
  value,
  accent,
  change,
  to,
  sparkData,
  sparkFormat = 'currency',
  lineColor,
}: KPICardProps) {
  const isPositive = (change ?? 0) >= 0

  const inner = (
    <div
      className={`card p-5 flex flex-col gap-3 ${to ? 'hover:shadow-md dark:hover:border-[#3D3C54] transition-shadow cursor-pointer' : ''}`}>
      <div className="flex items-start justify-between">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
          {icon}
        </div>
        {change !== undefined && (
          <span
            className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full
            ${
              isPositive
                ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            }`}>
            {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {isPositive ? '+' : ''}
            {change}%
          </span>
        )}
      </div>

      <div>
        <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">{label}</p>
        <p
          className={`text-2xl font-bold tracking-tight ${accent ?? 'text-gray-900 dark:text-white'}`}>
          {value}
        </p>
      </div>

      {/* Sparkline */}
      <div className="h-12 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkData}>
            <Tooltip
              content={<SparkTooltip format={sparkFormat} />}
              cursor={{ stroke: lineColor, strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            <Line
              type="monotone"
              dataKey="v"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              activeDot={{ r: 3, fill: lineColor, strokeWidth: 2, stroke: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )

  return to ? (
    <Link to={to} className="block">
      {inner}
    </Link>
  ) : (
    inner
  )
}
