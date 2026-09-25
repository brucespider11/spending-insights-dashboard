import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Store, Trophy, Navigation, BarChart2 } from 'lucide-react'
import NoCustomerSelected from '@/components/common/NoCustomerSelected'
import MerchantSpendChart from '@/components/merchants/MerchantSpendChart'
import MerchantTable from '@/components/merchants/MerchantTable'
import PeriodFilter, { type TimePeriod, PERIOD_MONTHS } from '@/components/common/PeriodFilter'
import { useCustomer } from '@/context/CustomerContext'
import { MERCHANT_DATA, getPeriodSpend, type MerchantDisplay } from '@/data/merchants'

const PERIOD_LABELS: Record<TimePeriod, string> = {
  '1M': 'Last month',
  '3M': 'Last 3 months',
  '6M': 'Last 6 months',
  '9M': 'Last 9 months',
  '12M': 'Last 12 months',
}

export default function MerchantInsightsPage() {
  const { customer } = useCustomer()
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('12M')

  if (!customer) return <NoCustomerSelected />

  const data = MERCHANT_DATA[customer.cif]
  if (!data) return <NoCustomerSelected />

  const nMonths = PERIOD_MONTHS[timePeriod]
  const periodLabel = PERIOD_LABELS[timePeriod]

  // Attach displaySpend and re-sort descending
  const merchants: MerchantDisplay[] = data.merchants
    .map((m) => ({ ...m, displaySpend: getPeriodSpend(m, nMonths) }))
    .sort((a, b) => b.displaySpend - a.displaySpend)

  // otherSpend has no category, so use simple linear scaling instead of MONTHLY_PATTERNS
  const otherSpend = Math.round(data.otherSpend * (nMonths / 12))

  const topBySpend = merchants[0]
  const topByVisits = [...merchants].sort((a, b) => b.visitCount - a.visitCount)[0]
  const totalVisits = merchants.reduce((s, m) => s + m.visitCount, 0)
  const totalPeriodSpend = merchants.reduce((s, m) => s + m.displaySpend, 0) + otherSpend
  const avgPerVisit = Math.round(totalPeriodSpend / totalVisits)

  const STATS = [
    {
      label: 'Tracked merchants',
      value: `${merchants.length}+`,
      sub: `R ${(otherSpend / 1000).toFixed(0)}k in other merchants`,
      icon: <Store size={17} />,
      iconBg: 'bg-brand-100 dark:bg-brand-500/15',
      iconColor: 'text-brand-600 dark:text-brand-400',
    },
    {
      label: 'Highest spend',
      value: topBySpend.name,
      sub: `R ${topBySpend.displaySpend.toLocaleString()} · ${periodLabel}`,
      icon: <Trophy size={17} />,
      iconBg: 'bg-amber-100 dark:bg-amber-500/15',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      label: 'Most visited',
      value: topByVisits.name,
      sub: `${topByVisits.visitCount} visits · ${periodLabel}`,
      icon: <Navigation size={17} />,
      iconBg: 'bg-emerald-100 dark:bg-emerald-500/15',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Avg per visit',
      value: `R ${avgPerVisit.toLocaleString()}`,
      sub: `across ${totalVisits} total visits`,
      icon: <BarChart2 size={17} />,
      iconBg: 'bg-blue-100 dark:bg-blue-500/15',
      iconColor: 'text-blue-600 dark:text-blue-400',
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
        <span className="text-gray-700 dark:text-gray-300 font-medium">Merchant Insights</span>
      </nav>

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Merchant Insights
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Where {customer.name.split(' ')[0]} spends — ranked by total spend across all merchants.
          </p>
        </div>
        <PeriodFilter value={timePeriod} onChange={setTimePeriod} />
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="card p-4 flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${s.iconBg}`}>
              <span className={s.iconColor}>{s.icon}</span>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-gray-500 dark:text-gray-500 truncate">{s.label}</p>
              <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-tight truncate">
                {s.value}
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-600 truncate">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Horizontal bar chart */}
      <MerchantSpendChart merchants={merchants} periodLabel={periodLabel} />

      {/* Full merchant table */}
      <MerchantTable merchants={merchants} otherSpend={otherSpend} periodLabel={periodLabel} />
    </div>
  )
}
