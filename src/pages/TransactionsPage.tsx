import { ArrowDownLeft, ArrowUpRight, Scale, Hash, Calendar } from 'lucide-react'
import MoneyFlowChart, { MONTHLY_DATA } from '@/components/transactions/MoneyFlowChart'
import CategoryBreakdown from '@/components/transactions/CategoryBreakdown'
import NoCustomerSelected from '@/components/common/NoCustomerSelected'
import { useCustomer } from '@/context/CustomerContext'

const totalIn = MONTHLY_DATA.reduce((s, m) => s + m.in, 0) // 866,000
const totalOut = MONTHLY_DATA.reduce((s, m) => s + m.out, 0) // 684,900
const net = totalIn - totalOut // 181,100

const SUMMARY = [
  {
    label: 'Money In',
    value: `R ${totalIn.toLocaleString()}`,
    change: '+12.4%',
    positive: true,
    icon: <ArrowDownLeft size={18} />,
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/15',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    label: 'Money Out',
    value: `R ${totalOut.toLocaleString()}`,
    change: '+8.1%',
    positive: false,
    icon: <ArrowUpRight size={18} />,
    iconBg: 'bg-rose-100 dark:bg-rose-500/15',
    iconColor: 'text-rose-600 dark:text-rose-400',
  },
  {
    label: 'Net Balance',
    value: `R ${net.toLocaleString()}`,
    change: '+5.2%',
    positive: true,
    icon: <Scale size={18} />,
    iconBg: 'bg-brand-100 dark:bg-brand-500/15',
    iconColor: 'text-brand-600 dark:text-brand-400',
  },
  {
    label: 'Transactions',
    value: '2,840',
    change: '+6.8%',
    positive: true,
    icon: <Hash size={18} />,
    iconBg: 'bg-blue-100 dark:bg-blue-500/15',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
]

export default function TransactionsPage() {
  const { customer } = useCustomer()
  if (!customer) return <NoCustomerSelected />

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-600">
        <span className="hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer transition-colors">
          Dashboards
        </span>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Transactions</span>
      </nav>

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Money in and out across all accounts — Jan to Dec 2025.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost text-xs sm:text-sm">
            <Calendar size={13} />
            <span className="hidden sm:inline">Last 12 months</span>
            <span className="sm:hidden">12m</span>
          </button>
        </div>
      </div>

      {/* Summary KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {SUMMARY.map((s) => (
          <div key={s.label} className="card p-5 flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.iconBg}`}>
              <span className={s.iconColor}>{s.icon}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-500">{s.label}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight truncate">
                {s.value}
              </p>
            </div>
            <span
              className={`flex-shrink-0 text-xs font-semibold px-2 py-1 rounded-full
                ${
                  s.positive
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                }`}>
              {s.change}
            </span>
          </div>
        ))}
      </div>

      {/* Charts */}
      <MoneyFlowChart />
      <CategoryBreakdown />
    </div>
  )
}
