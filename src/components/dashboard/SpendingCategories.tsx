import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, type TooltipProps } from 'recharts'

interface CategoryItem {
  name: string
  color: string
  pct?: number // from customer data
  value?: number // legacy fallback
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { name: 'Groceries', value: 34, color: '#7c3aed' },
  { name: 'Dining', value: 24, color: '#10b981' },
  { name: 'Transport', value: 21, color: '#f59e0b' },
  { name: 'Entertainment', value: 21, color: '#3b82f6' },
]

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div className="bg-white dark:bg-[#1C1B2E] border border-gray-100 dark:border-[#2D2C44] rounded-xl shadow-lg px-3 py-2">
      <p className="text-xs font-semibold text-gray-900 dark:text-white">{d.name}</p>
      <p className="text-xs text-gray-500 dark:text-gray-500">{d.value}%</p>
    </div>
  )
}

interface Props {
  categories?: CategoryItem[]
}

export default function SpendingCategories({ categories }: Props) {
  const list = (categories ?? DEFAULT_CATEGORIES).map((c) => ({
    ...c,
    value: c.pct ?? c.value ?? 0,
  }))

  const topCategory = list[0]

  return (
    <div className="card p-6 flex flex-col gap-4">
      <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
        Spending Categories
      </h2>

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
              strokeWidth={0}>
              {list.map((cat, i) => (
                <Cell key={i} fill={cat.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Centre label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
            {topCategory?.name}
          </span>
          <span className="text-xs font-semibold" style={{ color: topCategory?.color }}>
            {topCategory?.value}%
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
            <span className="flex-1 text-sm text-gray-600 dark:text-gray-400 truncate">
              {cat.name}
            </span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex-shrink-0 tabular-nums ml-2">
              {cat.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
