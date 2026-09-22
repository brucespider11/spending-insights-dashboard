import { TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { MerchantDisplay } from '@/data/merchants'

interface Props {
  merchants: MerchantDisplay[]
  otherSpend: number
  periodLabel: string
}

function ChangeBadge({ change }: { change: number }) {
  if (change === 0)
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-full">
        <Minus size={10} />
        0.0%
      </span>
    )
  if (change > 0)
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
        <TrendingUp size={10} />+{change.toFixed(1)}%
      </span>
    )
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-2 py-0.5 rounded-full">
      <TrendingDown size={10} />
      {change.toFixed(1)}%
    </span>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })
}

export default function MerchantTable({ merchants, otherSpend, periodLabel }: Props) {
  return (
    <div className="card overflow-hidden">
      {/* Table header */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-[#2D2C44] flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
            All merchants
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">
            Sorted by total spend, highest first
          </p>
        </div>
        <Link
          to="/transactions"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
          View transactions
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* Column headers */}
      <div className="hidden md:grid grid-cols-[28px_1fr_80px_110px_100px_90px_80px] gap-x-4 px-6 py-2.5 bg-gray-50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-[#2D2C44]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600">
          #
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600">
          Merchant
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600 text-right">
          Visits
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600 text-right">
          Spend ({periodLabel})
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600 text-right">
          Avg / visit
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600 text-center">
          Change
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600 text-right">
          Last visit
        </span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-50 dark:divide-[#2D2C44]/60">
        {merchants.map((merchant, index) => (
          <div
            key={merchant.id}
            className="
              grid grid-cols-[auto_1fr] md:grid-cols-[28px_1fr_80px_110px_100px_90px_80px]
              items-center gap-x-4 gap-y-1
              px-6 py-3.5
              hover:bg-gray-50/70 dark:hover:bg-white/[0.025]
              transition-colors cursor-default
            ">
            {/* Rank */}
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-600 tabular-nums w-7 text-center">
              {index + 1}
            </span>

            {/* Merchant identity */}
            <div className="flex items-center gap-3 min-w-0 col-span-1">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                style={{ background: merchant.categoryColor }}>
                {merchant.initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate leading-tight">
                  {merchant.name}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                    style={{
                      background: merchant.categoryColor + '18',
                      color: merchant.categoryColor,
                    }}>
                    {merchant.category}
                  </span>
                  {/* Mobile: show key stats inline */}
                  <span className="md:hidden text-[10px] text-gray-400 dark:text-gray-600">
                    · {merchant.visitCount} visits · R {merchant.displaySpend.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Visits — desktop only */}
            <span className="hidden md:block text-sm text-gray-600 dark:text-gray-400 text-right tabular-nums">
              {merchant.visitCount}
            </span>

            {/* Period spend — desktop only */}
            <span className="hidden md:block text-sm font-semibold text-gray-800 dark:text-gray-200 text-right tabular-nums">
              R {merchant.displaySpend.toLocaleString()}
            </span>

            {/* Avg per visit — desktop only */}
            <span className="hidden md:block text-sm text-gray-600 dark:text-gray-400 text-right tabular-nums">
              R {merchant.avgSpend.toLocaleString()}
            </span>

            {/* Change — desktop only */}
            <div className="hidden md:flex justify-center">
              <ChangeBadge change={merchant.change} />
            </div>

            {/* Last visit — desktop only */}
            <span className="hidden md:block text-xs text-gray-400 dark:text-gray-600 text-right">
              {formatDate(merchant.lastVisit)}
            </span>
          </div>
        ))}

        {/* Other merchants row */}
        {otherSpend > 0 && (
          <div className="grid grid-cols-[auto_1fr] md:grid-cols-[28px_1fr_80px_110px_100px_90px_80px] items-center gap-x-4 px-6 py-3.5 bg-gray-50/50 dark:bg-white/[0.015]">
            <span className="text-xs text-gray-300 dark:text-gray-700 w-7 text-center">·</span>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-white/10 flex-shrink-0">
                +
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400 dark:text-gray-600">
                  Other merchants
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-600 md:hidden">
                  R {otherSpend.toLocaleString()}
                </p>
              </div>
            </div>
            <span className="hidden md:block" />
            <span className="hidden md:block text-sm font-medium text-gray-400 dark:text-gray-600 text-right tabular-nums">
              R {otherSpend.toLocaleString()}
            </span>
            <span className="hidden md:block col-span-3" />
          </div>
        )}
      </div>
    </div>
  )
}
