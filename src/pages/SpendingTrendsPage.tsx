import { Calendar, TrendingUp, BarChart2, Award } from 'lucide-react'
import SpendingTrendChart from '@/components/trends/SpendingTrendChart'
import CategoryTrendChart from '@/components/trends/CategoryTrendChart'
import TopMovers from '@/components/trends/TopMovers'
import NoCustomerSelected from '@/components/common/NoCustomerSelected'
import { useCustomer } from '@/context/CustomerContext'

export default function SpendingTrendsPage() {
  const { customer } = useCustomer()
  if (!customer) return <NoCustomerSelected />

  const peakMonth = customer.monthlyTrend.reduce((a, b) => (a.amount > b.amount ? a : b))
  const yoySign = customer.spendChange >= 0 ? '+' : ''

  const STATS = [
    {
      label: 'Total YTD spend',
      value: `R ${customer.totalSpend.toLocaleString()}`,
      sub: 'Jan – Dec',
      icon: <BarChart2 size={17} />,
      iconBg: 'bg-brand-100 dark:bg-brand-500/15',
      iconColor: 'text-brand-600 dark:text-brand-400',
    },
    {
      label: 'Monthly average',
      value: `R ${customer.avgMonthlySpend.toLocaleString()}`,
      sub: 'per month',
      icon: <Calendar size={17} />,
      iconBg: 'bg-blue-100 dark:bg-blue-500/15',
      iconColor: 'text-blue-600 dark:text-blue-400',
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
      value: `${yoySign}${customer.spendChange.toFixed(1)}%`,
      sub: 'vs last year',
      icon: <TrendingUp size={17} />,
      iconBg: 'bg-rose-100 dark:bg-rose-500/15',
      iconColor: 'text-rose-600 dark:text-rose-400',
    },
  ]

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-600">
        <span className="hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer transition-colors">
          Dashboards
        </span>
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
            How your spending has changed over time — monthly, quarterly, and by category.
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
              <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight truncate">
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
