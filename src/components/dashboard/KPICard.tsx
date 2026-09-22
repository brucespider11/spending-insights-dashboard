import { TrendingUp, TrendingDown } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface KPICardProps {
  icon: React.ReactNode
  iconBg: string
  label: string
  value: string
  change: number
  sparkData: { v: number }[]
  lineColor: string
}

export default function KPICard({
  icon,
  iconBg,
  label,
  value,
  change,
  sparkData,
  lineColor,
}: KPICardProps) {
  const isPositive = change >= 0

  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
          {icon}
        </div>
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full
            ${
              isPositive
                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
            }`}>
          {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {isPositive ? '+' : ''}
          {change}%
        </span>
      </div>

      <div>
        <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</p>
      </div>

      {/* Sparkline */}
      <div className="h-12 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkData}>
            <Line
              type="monotone"
              dataKey="v"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
