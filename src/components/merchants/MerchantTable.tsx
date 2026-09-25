import { useState, useMemo } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  Search,
  X,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { MerchantDisplay } from '@/data/merchants'

type SortCol = 'spend' | 'visits' | 'avgSpend' | 'change' | 'lastVisit'
type SortDir = 'asc' | 'desc'

const PERIOD_SHORT: Record<string, string> = {
  'Last month': '1M',
  'Last 3 months': '3M',
  'Last 6 months': '6M',
  'Last 9 months': '9M',
  'Last 12 months': '12M',
}

function SortHeader({
  col,
  label,
  align = 'right',
  activeSortCol,
  sortDir,
  onSort,
}: {
  col: SortCol
  label: string
  align?: 'right' | 'center'
  activeSortCol: SortCol
  sortDir: SortDir
  onSort: (col: SortCol) => void
}) {
  const active = activeSortCol === col
  return (
    <button
      onClick={() => onSort(col)}
      className={`flex items-center gap-0.5 text-[11px] font-semibold uppercase tracking-wider w-full transition-colors
        ${align === 'right' ? 'justify-end' : 'justify-center'}
        ${
          active
            ? 'text-brand-600 dark:text-brand-400'
            : 'text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400'
        }`}>
      {label}
      {active ? (
        sortDir === 'desc' ? (
          <ChevronDown size={9} />
        ) : (
          <ChevronUp size={9} />
        )
      ) : (
        <ChevronsUpDown size={9} />
      )}
    </button>
  )
}

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
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-2 py-0.5 rounded-full">
        <TrendingUp size={10} />+{change.toFixed(1)}%
      </span>
    )
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
      <TrendingDown size={10} />
      {change.toFixed(1)}%
    </span>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })
}

export default function MerchantTable({ merchants, otherSpend, periodLabel }: Props) {
  const shortPeriod = PERIOD_SHORT[periodLabel] ?? periodLabel
  const [sortCol, setSortCol] = useState<SortCol>('spend')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState<string | null>(null)

  const categories = useMemo(
    () => [...new Set(merchants.map((m) => m.category))].sort(),
    [merchants]
  )

  const handleSort = (col: SortCol) => {
    if (sortCol === col) setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))
    else {
      setSortCol(col)
      setSortDir('desc')
    }
  }

  const displayList = useMemo(() => {
    let list = merchants
    if (search.trim())
      list = list.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
    if (catFilter) list = list.filter((m) => m.category === catFilter)
    return [...list].sort((a, b) => {
      let av = 0,
        bv = 0
      if (sortCol === 'spend') {
        av = a.displaySpend
        bv = b.displaySpend
      } else if (sortCol === 'visits') {
        av = a.visitCount
        bv = b.visitCount
      } else if (sortCol === 'avgSpend') {
        av = a.avgSpend
        bv = b.avgSpend
      } else if (sortCol === 'change') {
        av = a.change
        bv = b.change
      } else if (sortCol === 'lastVisit') {
        av = new Date(a.lastVisit).getTime()
        bv = new Date(b.lastVisit).getTime()
      }
      return sortDir === 'desc' ? bv - av : av - bv
    })
  }, [merchants, search, catFilter, sortCol, sortDir])

  return (
    <div className="card overflow-hidden">
      {/* Table header */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-[#2D2C44] flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
            All merchants
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">
            {displayList.length !== merchants.length
              ? `Showing ${displayList.length} of ${merchants.length}`
              : `${merchants.length} merchants`}
          </p>
        </div>
        <Link
          to="/transactions"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors flex-shrink-0">
          View transactions
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* Search + category filter */}
      <div className="px-6 py-3 border-b border-gray-100 dark:border-[#2D2C44] flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[160px] max-w-xs">
          <Search
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search merchants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-7 pr-7 py-1.5 text-xs rounded-lg
                       bg-gray-50 dark:bg-white/[0.04]
                       border border-gray-200 dark:border-[#2D2C44]
                       text-gray-700 dark:text-gray-300
                       placeholder:text-gray-400 dark:placeholder:text-gray-600
                       focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400
                       transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <X size={12} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          <button
            onClick={() => setCatFilter(null)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors
              ${
                catFilter === null
                  ? 'bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300'
                  : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}>
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCatFilter(catFilter === cat ? null : cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors
                ${
                  catFilter === cat
                    ? 'bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300'
                    : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Column headers */}
      <div className="hidden md:grid grid-cols-[28px_1fr_80px_110px_100px_90px_80px] gap-x-4 px-6 py-2.5 bg-gray-50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-[#2D2C44]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600">
          #
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600">
          Merchant
        </span>
        <SortHeader
          col="visits"
          label="Visits"
          align="right"
          activeSortCol={sortCol}
          sortDir={sortDir}
          onSort={handleSort}
        />
        <SortHeader
          col="spend"
          label={`Spend (${shortPeriod})`}
          align="right"
          activeSortCol={sortCol}
          sortDir={sortDir}
          onSort={handleSort}
        />
        <SortHeader
          col="avgSpend"
          label="Avg / visit"
          align="right"
          activeSortCol={sortCol}
          sortDir={sortDir}
          onSort={handleSort}
        />
        <SortHeader
          col="change"
          label="Change"
          align="center"
          activeSortCol={sortCol}
          sortDir={sortDir}
          onSort={handleSort}
        />
        <SortHeader
          col="lastVisit"
          label="Last visit"
          align="right"
          activeSortCol={sortCol}
          sortDir={sortDir}
          onSort={handleSort}
        />
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-50 dark:divide-[#2D2C44]/60">
        {displayList.length === 0 && (
          <div className="py-12 flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-600">No merchants found</p>
            <button
              onClick={() => {
                setSearch('')
                setCatFilter(null)
              }}
              className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline">
              Clear filters
            </button>
          </div>
        )}
        {displayList.map((merchant, index) => (
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
