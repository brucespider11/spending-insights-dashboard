import {
  ShoppingCart,
  ShoppingBag,
  Utensils,
  Car,
  Tv,
  Zap,
  Heart,
  Plane,
  BookOpen,
  Smile,
  RefreshCw,
  MoreHorizontal,
  Briefcase,
  Laptop,
  Home,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import type { Category, CategoryIconName } from '@/data/categories'

const ICONS: Record<CategoryIconName, React.ReactNode> = {
  'shopping-cart': <ShoppingCart size={18} />,
  'shopping-bag': <ShoppingBag size={18} />,
  utensils: <Utensils size={18} />,
  car: <Car size={18} />,
  tv: <Tv size={18} />,
  zap: <Zap size={18} />,
  heart: <Heart size={18} />,
  plane: <Plane size={18} />,
  'book-open': <BookOpen size={18} />,
  smile: <Smile size={18} />,
  'refresh-cw': <RefreshCw size={18} />,
  'more-horizontal': <MoreHorizontal size={18} />,
  briefcase: <Briefcase size={18} />,
  laptop: <Laptop size={18} />,
  home: <Home size={18} />,
  'trending-up': <TrendingUp size={18} />,
}

interface Props {
  category: Category
  totalForType: number
  displayAmount?: number
}

export default function CategoryCard({ category, totalForType, displayAmount }: Props) {
  const amount = displayAmount ?? category.amount
  const pct = ((amount / totalForType) * 100).toFixed(1)
  const isPositive = category.change >= 0

  return (
    <div className="card p-5 flex flex-col gap-3 hover:shadow-lg dark:hover:border-[#3D3C54] transition-all duration-200 cursor-pointer group">
      {/* Icon + badge */}
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
          style={{ background: `${category.color}20` }}>
          <span style={{ color: category.color }}>{ICONS[category.iconName]}</span>
        </div>
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full
            ${
              isPositive
                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
            }`}>
          {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {isPositive ? '+' : ''}
          {category.change}%
        </span>
      </div>

      {/* Name, amount, tx count */}
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-500 mb-0.5">{category.name}</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          R {amount.toLocaleString()}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">
          {category.transactions} transactions
        </p>
      </div>

      {/* Sparkline + share */}
      <div className="flex items-end gap-3">
        <div className="flex-1 h-10 -ml-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={category.trend}>
              <Line
                type="monotone"
                dataKey="v"
                stroke={category.color}
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-base font-bold" style={{ color: category.color }}>
            {pct}%
          </p>
          <p className="text-[10px] text-gray-400 dark:text-gray-600">of total</p>
        </div>
      </div>
    </div>
  )
}
