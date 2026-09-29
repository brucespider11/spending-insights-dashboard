import { Link } from 'react-router-dom'
import { DollarSign, CreditCard, TrendingUp, Hash, ArrowRight } from 'lucide-react'
import KPICard from '@/components/dashboard/KPICard'
import SpendingChart from '@/components/dashboard/SpendingChart'
import SpendingCategories from '@/components/dashboard/SpendingCategories'
import TopMerchantsWidget from '@/components/dashboard/TopMerchantsWidget'
import InsightsPanel from '@/components/dashboard/InsightsPanel'
import NoCustomerSelected from '@/components/common/NoCustomerSelected'
import { useCustomer } from '@/context/CustomerContext'
import { RISK_BADGE_BORDERED } from '@/lib/badgeStyles'

export default function DashboardPage() {
  const { customer } = useCustomer()
  if (!customer) return <NoCustomerSelected />

  const avgTx = Math.round(customer.totalSpend / customer.transactionCount)
  const netSavings = customer.monthlyIncome * 12 - customer.totalSpend

  const KPI_CARDS = [
    {
      icon: <DollarSign size={18} className="text-brand-600 dark:text-brand-400" />,
      iconBg: 'bg-brand-100 dark:bg-brand-600/20',
      label: 'Total YTD spend',
      value: `R ${customer.totalSpend.toLocaleString()}`,
      change: customer.spendChange,
      to: '/spending-trends',
      sparkData: customer.monthlyTrend.map((m) => ({ v: m.amount, label: m.month })),
      lineColor: '#7c3aed',
    },
    {
      icon: <Hash size={18} className="text-blue-600 dark:text-blue-400" />,
      iconBg: 'bg-blue-100 dark:bg-blue-600/20',
      label: 'Transactions',
      value: customer.transactionCount.toLocaleString(),
      to: '/transactions',
      sparkFormat: 'count' as const,
      sparkData: customer.monthlyTrend.map((m, i) => ({
        v: Math.round(m.amount / avgTx) + i * 2,
        label: m.month,
      })),
      lineColor: '#3b82f6',
    },
    {
      icon: <TrendingUp size={18} className="text-emerald-600 dark:text-emerald-400" />,
      iconBg: 'bg-emerald-100 dark:bg-emerald-600/20',
      label: 'Net savings (YTD)',
      value: `${netSavings < 0 ? '−' : ''}R ${Math.abs(netSavings).toLocaleString()}`,
      accent: netSavings < 0 ? 'text-rose-600 dark:text-rose-400' : undefined,
      to: '/transactions',
      sparkData: customer.monthlyTrend.map((m) => ({
        v: customer.monthlyIncome - m.amount,
        label: m.month,
      })),
      lineColor: '#10b981',
    },
    {
      icon: <CreditCard size={18} className="text-amber-600 dark:text-amber-400" />,
      iconBg: 'bg-amber-100 dark:bg-amber-600/20',
      label: 'Avg. transaction',
      value: `R ${avgTx.toLocaleString()}`,
      to: '/transactions',
      sparkData: customer.monthlyTrend.map((m) => ({
        v: Math.round(m.amount / (customer.transactionCount / 12)),
        label: m.month,
      })),
      lineColor: '#f59e0b',
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
        <span className="text-gray-700 dark:text-gray-300 font-medium">Analytics</span>
      </nav>

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {customer.name}
            </h1>
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full border"
              style={{
                background: customer.segmentColor + '18',
                color: customer.segmentColor,
                borderColor: customer.segmentColor + '40',
              }}>
              {customer.segment}
            </span>
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${RISK_BADGE_BORDERED[customer.riskProfile]}`}>
              {customer.riskProfile} risk
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1.5">
            CIF {customer.cif} · Acc {customer.accountNumber} · {customer.location} · Member since{' '}
            {new Date(customer.joinDate).getFullYear()}
          </p>
        </div>
        <Link
          to="/customers"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium
                     border border-gray-200 dark:border-[#2D2C44]
                     text-gray-500 dark:text-gray-400
                     hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400
                     transition-colors flex-shrink-0">
          View full profile
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI_CARDS.map((card) => (
          <KPICard key={card.label} {...card} />
        ))}
      </div>

      {/* Key insights */}
      <InsightsPanel insights={customer.keyInsights} />

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
        <SpendingChart customer={customer} />
        <SpendingCategories categories={customer.categories} />
      </div>

      {/* Top merchants */}
      <TopMerchantsWidget customer={customer} />
    </div>
  )
}
