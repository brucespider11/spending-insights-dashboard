import { Link } from 'react-router-dom'
import { TrendingUp, TrendingDown, ArrowRight, Award } from 'lucide-react'
import SpendingTrendChart from '@/components/trends/SpendingTrendChart'
import CategoryTrendChart from '@/components/trends/CategoryTrendChart'
import TopMovers from '@/components/trends/TopMovers'
import NoCustomerSelected from '@/components/common/NoCustomerSelected'
import { useCustomer } from '@/context/CustomerContext'

export default function SpendingTrendsPage() {
  const { customer } = useCustomer()
  if (!customer) return <NoCustomerSelected />

  const peakMonth = customer.monthlyTrend.reduce((a, b) => (a.amount > b.amount ? a : b))
  const lowestMonth = customer.monthlyTrend.reduce((a, b) => (a.amount < b.amount ? a : b))
  const lastMonth = customer.monthlyTrend[customer.monthlyTrend.length - 1]
  const prevMonth = customer.monthlyTrend[customer.monthlyTrend.length - 2]
  const momChange = ((lastMonth.amount - prevMonth.amount) / prevMonth.amount) * 100
  const momUp = momChange >= 0
  const yoyUp = customer.spendChange >= 0

  const STATS = [
    {
      label: 'Lowest month',
      value: lowestMonth.month,
      sub: `R ${lowestMonth.amount.toLocaleString()}`,
      icon: <TrendingDown size={17} />,
      iconBg: 'bg-emerald-100 dark:bg-emerald-500/15',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Month-on-month',
      value: `${momUp ? '+' : ''}${momChange.toFixed(1)}%`,
      sub: `${prevMonth.month} → ${lastMonth.month}`,
      icon: <ArrowRight size={17} />,
      iconBg: momUp ? 'bg-rose-100 dark:bg-rose-500/15' : 'bg-emerald-100 dark:bg-emerald-500/15',
      iconColor: momUp
        ? 'text-rose-600 dark:text-rose-400'
        : 'text-emerald-600 dark:text-emerald-400',
      valueColor: momUp
        ? 'text-rose-600 dark:text-rose-400'
        : 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Peak month',
      value: peakMonth.month,
      sub: `R ${peakMonth.amount.toLocaleString()}`,
      icon: <Award size={17} />,
      iconBg: 'bg-amber-100 dark:bg-amber-500/15',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      label: 'Year-on-year',
      value: `${yoyUp ? '+' : ''}${customer.spendChange.toFixed(1)}%`,
      sub: 'vs last year',
      icon: yoyUp ? <TrendingUp size={17} /> : <TrendingDown size={17} />,
      iconBg: yoyUp ? 'bg-rose-100 dark:bg-rose-500/15' : 'bg-emerald-100 dark:bg-emerald-500/15',
      iconColor: yoyUp
        ? 'text-rose-600 dark:text-rose-400'
        : 'text-emerald-600 dark:text-emerald-400',
      valueColor: yoyUp
        ? 'text-rose-600 dark:text-rose-400'
        : 'text-emerald-600 dark:text-emerald-400',
    },
  ]

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-600">
        <Link to="/" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
          Dashboards
        </Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Spending Trends</span>
      </nav>

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Spending Trends
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            How {customer.name.split(' ')[0]}'s spending has changed over time — monthly, quarterly,
            and by category.
          </p>
        </div>
      </div>

      {/* KPI summary */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="card p-4 flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${s.iconBg}`}>
              <span className={s.iconColor}>{s.icon}</span>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-gray-500 dark:text-gray-500 truncate">{s.label}</p>
              <p
                className={`text-base sm:text-lg font-bold leading-tight truncate ${'valueColor' in s && s.valueColor ? s.valueColor : 'text-gray-900 dark:text-white'}`}>
                {s.value}
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-600 truncate">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main trend chart — full width */}
      <SpendingTrendChart customer={customer} />

      {/* Category trends + top movers */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
        <CategoryTrendChart customer={customer} />
        <TopMovers customer={customer} />
      </div>
    </div>
  )
}
