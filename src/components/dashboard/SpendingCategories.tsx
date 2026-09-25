import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface CategoryItem {
  name: string
  color: string
  amount?: number
  pct?: number // from customer data
  value?: number // legacy fallback
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { name: 'Groceries', value: 34, color: '#7c3aed' },
  { name: 'Dining', value: 24, color: '#10b981' },
  { name: 'Transport', value: 21, color: '#f59e0b' },
  { name: 'Entertainment', value: 21, color: '#3b82f6' },
]

interface Props {
  categories?: CategoryItem[]
}

export default function SpendingCategories({ categories }: Props) {
  const [hovered, setHovered] = useState<(CategoryItem & { value: number }) | null>(null)

  const list = (categories ?? DEFAULT_CATEGORIES).map((c) => ({
    ...c,
    value: c.pct ?? c.value ?? 0,
  }))

  const topCategory = list[0]

  return (
    <div className="card p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
          Spending Categories
        </h2>
        <Link
          to="/categories"
          className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
          View all
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* Donut — centred */}
      <div className="relative w-44 h-44 mx-auto flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={list}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={70}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
              onMouseEnter={(data) => setHovered(data)}
              onMouseLeave={() => setHovered(null)}>
              {list.map((cat, i) => (
                <Cell
                  key={i}
                  fill={cat.color}
                  opacity={hovered && hovered.name !== cat.name ? 0.4 : 1}
                  style={{ transition: 'opacity 150ms' }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Centre label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight text-center px-2">
            {hovered ? hovered.name : topCategory?.name}
          </span>
          <span
            className="text-xs font-semibold"
            style={{ color: hovered ? hovered.color : topCategory?.color }}>
            {hovered ? hovered.value : topCategory?.value}%
          </span>
        </div>
      </div>

      {/* Hover detail strip */}
      <div className={`transition-opacity duration-150 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: hovered?.color }}
            />
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
              {hovered?.name}
            </span>
          </div>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            {hovered?.value}%
          </span>
        </div>
      </div>

      {/* Legend — full width, no side-by-side constraint */}
      <div className="flex flex-col gap-2.5 w-full">
        {list.map((cat) => (
          <div key={cat.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: cat.color }}
            />
            <span className="flex-1 text-xs text-gray-600 dark:text-gray-400 truncate">
              {cat.name}
            </span>
            <div className="flex items-baseline gap-2 flex-shrink-0">
              {cat.amount != null && (
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 tabular-nums">
                  R {cat.amount.toLocaleString()}
                </span>
              )}
              <span className="text-[10px] text-gray-400 dark:text-gray-600 tabular-nums w-8 text-right">
                {cat.value}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
