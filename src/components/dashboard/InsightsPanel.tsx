import { AlertTriangle, Bell, TrendingUp, Activity, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CustomerInsight } from '@/data/customers'

const TYPE_DESTINATION: Record<string, string> = {
  risk: '/transactions',
  alert: '/transactions',
  opportunity: '/categories',
  pattern: '/spending-trends',
}

interface Props {
  insights: CustomerInsight[]
}

const TYPE_CONFIG = {
  risk: {
    border: 'border-l-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-500/10',
    icon: AlertTriangle,
    iconColor: 'text-rose-500 dark:text-rose-400',
    badge: 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300',
    label: 'Risk',
  },
  alert: {
    border: 'border-l-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    icon: Bell,
    iconColor: 'text-amber-500 dark:text-amber-400',
    badge: 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300',
    label: 'Alert',
  },
  opportunity: {
    border: 'border-l-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    icon: TrendingUp,
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    badge: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
    label: 'Opportunity',
  },
  pattern: {
    border: 'border-l-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    icon: Activity,
    iconColor: 'text-blue-500 dark:text-blue-400',
    badge: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300',
    label: 'Pattern',
  },
}

export default function InsightsPanel({ insights }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">Key Insights</h2>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
            Behavioural signals and recommendations
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {(Object.keys(TYPE_CONFIG) as Array<keyof typeof TYPE_CONFIG>).map((type) => {
            const count = insights.filter((i) => i.type === type).length
            if (count === 0) return null
            const cfg = TYPE_CONFIG[type]
            const Icon = cfg.icon
            return (
              <span
                key={type}
                className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>
                <Icon size={9} />
                {count} {cfg.label}
                {count > 1 ? 's' : ''}
              </span>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {insights.map((insight) => {
          const cfg = TYPE_CONFIG[insight.type]
          const Icon = cfg.icon
          const dest = TYPE_DESTINATION[insight.type]
          return (
            <Link
              key={insight.title}
              to={dest}
              className={`border-l-4 rounded-xl p-4 flex flex-col gap-2 group
                hover:shadow-md transition-shadow duration-200
                ${cfg.border} ${cfg.bg}`}>
              <div className="flex items-center gap-2">
                <Icon size={14} className={`flex-shrink-0 ${cfg.iconColor}`} />
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>
                  {cfg.label}
                </span>
                <span className="ml-auto text-[10px] font-semibold text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-white/10 px-2 py-0.5 rounded-full">
                  {insight.metric}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {insight.title}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {insight.body}
              </p>
              <div className="flex items-center justify-end mt-1">
                <ArrowRight
                  size={13}
                  className="text-gray-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
