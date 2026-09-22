import { AlertTriangle, Bell, TrendingUp, Activity } from 'lucide-react'
import type { CustomerInsight } from '@/data/customers'

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
      <div>
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">Key Insights</h2>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
          Behavioural signals and recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {insights.map((insight, i) => {
          const cfg = TYPE_CONFIG[insight.type]
          const Icon = cfg.icon
          return (
            <div
              key={i}
              className={`border-l-4 rounded-xl p-4 flex flex-col gap-2 ${cfg.border} ${cfg.bg}`}>
              <div className="flex items-center gap-2">
                <Icon size={14} className={`flex-shrink-0 ${cfg.iconColor}`} />
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>
                  {cfg.label}
                </span>
                <span className="ml-auto text-[10px] font-semibold text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-white/5 px-2 py-0.5 rounded-full">
                  {insight.metric}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {insight.title}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {insight.body}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
