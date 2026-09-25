import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, X, ArrowUpDown, ArrowUpRight, ArrowDownLeft, LayoutGrid } from 'lucide-react'
import CategoryCard from '@/components/categories/CategoryCard'
import { CATEGORIES, getPeriodAmount } from '@/data/categories'
import type { Category } from '@/data/categories'
import NoCustomerSelected from '@/components/common/NoCustomerSelected'
import { useCustomer } from '@/context/CustomerContext'
import PeriodFilter, { type TimePeriod, PERIOD_MONTHS } from '@/components/common/PeriodFilter'

type Filter = 'all' | 'expense' | 'income'
type SortKey = 'default' | 'amount' | 'change' | 'transactions'

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'expense', label: 'Expenses' },
  { key: 'income', label: 'Income' },
]

const PERIOD_LABEL: Record<TimePeriod, string> = {
  '1M': 'Last month',
  '3M': 'Last 3 months',
  '6M': 'Last 6 months',
  '9M': 'Last 9 months',
  '12M': 'Last 12 months',
}

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'default', label: 'Default order' },
  { key: 'amount', label: 'By amount' },
  { key: 'change', label: 'By change' },
  { key: 'transactions', label: 'By transactions' },
]

export default function CategoriesPage() {
  const { customer } = useCustomer()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('12M')
  const [sortKey, setSortKey] = useState<SortKey>('default')

  const nMonths = PERIOD_MONTHS[timePeriod]

  const customerCategories = useMemo(() => {
    if (!customer) return CATEGORIES
    const map = new Map(customer.categories.map((c) => [c.name, c.amount]))
    return CATEGORIES.map((cat) => ({
      ...cat,
      amount: map.get(cat.name) ?? cat.amount,
    }))
  }, [customer])

  const visible = useMemo(() => {
    let list: Category[] = customerCategories
    if (filter !== 'all') list = list.filter((c) => c.type === filter)
    if (search.trim())
      list = list.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    if (sortKey === 'amount')
      list = [...list].sort((a, b) => getPeriodAmount(b, nMonths) - getPeriodAmount(a, nMonths))
    else if (sortKey === 'change') list = [...list].sort((a, b) => b.change - a.change)
    else if (sortKey === 'transactions')
      list = [...list].sort((a, b) => b.transactions - a.transactions)
    return list
  }, [filter, search, customerCategories, sortKey, nMonths])

  if (!customer) return <NoCustomerSelected />

  const expenseCount = customerCategories.filter((c) => c.type === 'expense').length
  const incomeCount = customerCategories.filter((c) => c.type === 'income').length

  const periodTotalExpenses = customerCategories
    .filter((c) => c.type === 'expense')
    .reduce((s, c) => s + getPeriodAmount(c, nMonths), 0)

  const periodTotalIncome = customerCategories
    .filter((c) => c.type === 'income')
    .reduce((s, c) => s + getPeriodAmount(c, nMonths), 0)

  const totalForType = (cat: Category) =>
    cat.type === 'expense' ? periodTotalExpenses : periodTotalIncome

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-600">
        <Link to="/" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
          Dashboards
        </Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Categories</span>
      </nav>

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Categories
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            {customer.name.split(' ')[0]}'s spending and income categories.
          </p>
        </div>
        <PeriodFilter value={timePeriod} onChange={setTimePeriod} />
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
            <LayoutGrid size={16} className="text-gray-500 dark:text-gray-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-500">Total categories</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {customerCategories.length}
              <span className="text-xs font-normal text-gray-400 dark:text-gray-600 ml-1.5">
                ({expenseCount} expense · {incomeCount} income)
              </span>
            </p>
          </div>
        </div>

        <div className="card p-4 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-500/15 flex items-center justify-center flex-shrink-0">
            <ArrowUpRight size={16} className="text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-500">Total expenses</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              R {periodTotalExpenses.toLocaleString()}
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-600">
              {PERIOD_LABEL[timePeriod]}
            </p>
          </div>
        </div>

        <div className="card p-4 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
            <ArrowDownLeft size={16} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-500">Total income</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              R {periodTotalIncome.toLocaleString()}
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-600">
              {PERIOD_LABEL[timePeriod]}
            </p>
          </div>
        </div>
      </div>

      {/* Filter + search bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Filter tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-white/5 flex-shrink-0">
          {FILTERS.map((f) => {
            const count =
              f.key === 'all'
                ? customerCategories.length
                : customerCategories.filter((c) => c.type === f.key).length
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5
                  ${
                    filter === f.key
                      ? 'bg-white dark:bg-[#1C1B2E] text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}>
                {f.label}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold
                  ${
                    filter === f.key
                      ? 'bg-brand-100 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400'
                      : 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-500'
                  }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search */}
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-8 py-2 text-sm rounded-xl
                       bg-white dark:bg-[#1C1B2E]
                       border border-gray-200 dark:border-[#2D2C44]
                       text-gray-700 dark:text-gray-300
                       placeholder:text-gray-400 dark:placeholder:text-gray-600
                       focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400
                       transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <X size={13} />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="relative flex-shrink-0">
          <ArrowUpDown
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="pl-7 pr-3 py-2 text-xs rounded-xl appearance-none cursor-pointer
                       bg-white dark:bg-[#1C1B2E]
                       border border-gray-200 dark:border-[#2D2C44]
                       text-gray-700 dark:text-gray-300
                       focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400
                       transition-colors">
            {SORT_OPTIONS.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {visible.length !== customerCategories.length && (
          <p className="text-xs text-gray-400 dark:text-gray-600 flex-shrink-0">
            Showing {visible.length} of {customerCategories.length}
          </p>
        )}
      </div>

      {/* Category grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visible.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              totalForType={totalForType(cat)}
              displayAmount={getPeriodAmount(cat, nMonths)}
              rank={sortKey !== 'default' ? i + 1 : undefined}
              onClick={() =>
                navigate(cat.type === 'expense' ? '/transactions' : '/spending-trends')
              }
            />
          ))}
        </div>
      ) : (
        <div className="card py-16 flex flex-col items-center gap-3 text-center">
          <Search size={32} className="text-gray-300 dark:text-gray-700" />
          <p className="text-sm font-medium text-gray-500 dark:text-gray-500">
            No categories found
          </p>
          {search ? (
            <button
              onClick={() => setSearch('')}
              className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline">
              Clear search
            </button>
          ) : (
            <p className="text-xs text-gray-400 dark:text-gray-600">Try a different filter</p>
          )}
        </div>
      )}
    </div>
  )
}
