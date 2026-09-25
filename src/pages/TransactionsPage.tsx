import { Link } from 'react-router-dom'
import { ArrowDownLeft, ArrowUpRight, Scale, Hash } from 'lucide-react'
import MoneyFlowChart from '@/components/transactions/MoneyFlowChart'
import CategoryBreakdown from '@/components/transactions/CategoryBreakdown'
import NoCustomerSelected from '@/components/common/NoCustomerSelected'
import { useCustomer } from '@/context/CustomerContext'

export default function TransactionsPage() {
  const { customer } = useCustomer()
  if (!customer) return <NoCustomerSelected />

  const totalIn = customer.monthlyIncome * 12
  const totalOut = customer.totalSpend
  const net = totalIn - totalOut
  const netPositive = net >= 0

  const SUMMARY = [
    {
      label: 'Money In',
      value: `R ${totalIn.toLocaleString()}`,
      icon: <ArrowDownLeft size={18} />,
      iconBg: 'bg-emerald-100 dark:bg-emerald-500/15',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Money Out',
      value: `R ${totalOut.toLocaleString()}`,
      change: `${customer.spendChange > 0 ? '+' : ''}${customer.spendChange}%`,
      positive: customer.spendChange < 0,
      icon: <ArrowUpRight size={18} />,
      iconBg: 'bg-rose-100 dark:bg-rose-500/15',
      iconColor: 'text-rose-600 dark:text-rose-400',
    },
    {
      label: 'Net Balance',
      value: `${netPositive ? '' : '−'}R ${Math.abs(net).toLocaleString()}`,
      sub: netPositive ? 'Surplus this year' : 'Deficit this year',
      valueColor: netPositive
        ? 'text-emerald-600 dark:text-emerald-400'
        : 'text-rose-600 dark:text-rose-400',
      icon: <Scale size={18} />,
      iconBg: netPositive
        ? 'bg-emerald-100 dark:bg-emerald-500/15'
        : 'bg-rose-100 dark:bg-rose-500/15',
      iconColor: netPositive
        ? 'text-emerald-600 dark:text-emerald-400'
        : 'text-rose-600 dark:text-rose-400',
    },
    {
      label: 'Transactions',
      value: customer.transactionCount.toLocaleString(),
      icon: <Hash size={18} />,
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
        <span className="text-gray-700 dark:text-gray-300 font-medium">Transactions</span>
      </nav>

      {/* Page header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Transactions
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          {customer.name.split(' ')[0]}'s money in and out across all accounts.
        </p>
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
              <p className={`text-xl font-bold tracking-tight truncate ${'valueColor' in s && s.valueColor ? s.valueColor : 'text-gray-900 dark:text-white'}`}>
                {s.value}
              </p>
              {'sub' in s && s.sub && (
                <p className="text-[10px] text-gray-400 dark:text-gray-600 truncate">{s.sub}</p>
              )}
            </div>
            {'change' in s && s.change && (
              <span
                className={`flex-shrink-0 text-xs font-semibold px-2 py-1 rounded-full
                  ${
                    s.positive
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  }`}>
                {s.change}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Charts */}
      <MoneyFlowChart customer={customer} />
      <CategoryBreakdown customer={customer} />
    </div>
  )
}
