import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MERCHANT_DATA, getPeriodSpend } from '@/data/merchants'
import type { CustomerProfile } from '@/data/customers'
import { PERIOD_MONTHS, type TimePeriod } from '@/components/common/PeriodFilter'

interface Props {
  customer: CustomerProfile
  period?: TimePeriod
}

export default function TopMerchantsWidget({ customer, period = '12M' }: Props) {
  const data = MERCHANT_DATA[customer.cif]
  if (!data) return null

  const nMonths = PERIOD_MONTHS[period]
  const top4 = data.merchants.slice(0, 4)

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
            Top merchants
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">
            Highest spend · last {nMonths} months
          </p>
        </div>
        <Link
          to="/merchants"
          className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
          View all
          <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {top4.map((merchant, i) => {
          const changeIcon =
            merchant.change > 0 ? (
              <TrendingUp size={11} />
            ) : merchant.change < 0 ? (
              <TrendingDown size={11} />
            ) : (
              <Minus size={11} />
            )

          const changeCls =
            merchant.change > 0
              ? 'text-emerald-600 dark:text-emerald-400'
              : merchant.change < 0
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-gray-400 dark:text-gray-600'

          return (
            <div
              key={merchant.id}
              className="relative p-4 rounded-2xl border border-gray-100 dark:border-[#2D2C44] bg-gray-50/50 dark:bg-white/[0.02] hover:border-gray-200 dark:hover:border-[#3D3C54] transition-colors">
              {/* Rank badge */}
              <span className="absolute top-3 right-3 text-[10px] font-bold text-gray-300 dark:text-gray-700">
                #{i + 1}
              </span>

              {/* Logo */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold mb-3"
                style={{ background: merchant.categoryColor }}>
                {merchant.initials}
              </div>

              {/* Name + category */}
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight truncate pr-4">
                {merchant.name}
              </p>
              <p className="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5 truncate">
                {merchant.category}
              </p>

              {/* Spend + change */}
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-[#2D2C44]">
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  R {getPeriodSpend(merchant, nMonths).toLocaleString()}
                </p>
                <span
                  className={`inline-flex items-center gap-0.5 text-[11px] font-semibold mt-0.5 ${changeCls}`}>
                  {changeIcon}
                  {merchant.change === 0 ? '0.0' : Math.abs(merchant.change).toFixed(1)}%
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
