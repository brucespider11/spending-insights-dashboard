export type CategoryIconName =
  | 'shopping-cart'
  | 'shopping-bag'
  | 'utensils'
  | 'car'
  | 'tv'
  | 'zap'
  | 'heart'
  | 'plane'
  | 'book-open'
  | 'smile'
  | 'refresh-cw'
  | 'more-horizontal'
  | 'briefcase'
  | 'laptop'
  | 'home'
  | 'trending-up'

export interface Category {
  id: string
  name: string
  type: 'expense' | 'income'
  color: string
  iconName: CategoryIconName
  amount: number
  transactions: number
  change: number
  trend: { v: number }[]
}

export const CATEGORIES: Category[] = [
  // ── Expenses ────────────────────────────────────────────────────────
  {
    id: 'groceries',
    name: 'Groceries',
    type: 'expense',
    color: '#7c3aed',
    iconName: 'shopping-cart',
    amount: 98400,
    transactions: 284,
    change: 12.4,
    trend: [
      { v: 72000 },
      { v: 75000 },
      { v: 79000 },
      { v: 84000 },
      { v: 89000 },
      { v: 93000 },
      { v: 98400 },
    ],
  },
  {
    id: 'shopping',
    name: 'Shopping',
    type: 'expense',
    color: '#f59e0b',
    iconName: 'shopping-bag',
    amount: 89400,
    transactions: 142,
    change: 6.8,
    trend: [
      { v: 72000 },
      { v: 76000 },
      { v: 79000 },
      { v: 82000 },
      { v: 85000 },
      { v: 88000 },
      { v: 89400 },
    ],
  },
  {
    id: 'dining',
    name: 'Dining',
    type: 'expense',
    color: '#10b981',
    iconName: 'utensils',
    amount: 67200,
    transactions: 168,
    change: 4.2,
    trend: [
      { v: 58000 },
      { v: 61000 },
      { v: 62000 },
      { v: 63000 },
      { v: 64000 },
      { v: 65000 },
      { v: 67200 },
    ],
  },
  {
    id: 'transport',
    name: 'Transport',
    type: 'expense',
    color: '#3b82f6',
    iconName: 'car',
    amount: 54800,
    transactions: 198,
    change: 1.8,
    trend: [
      { v: 51000 },
      { v: 52000 },
      { v: 53000 },
      { v: 53000 },
      { v: 54000 },
      { v: 54000 },
      { v: 54800 },
    ],
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    type: 'expense',
    color: '#ec4899',
    iconName: 'tv',
    amount: 43600,
    transactions: 89,
    change: -3.1,
    trend: [
      { v: 52000 },
      { v: 50000 },
      { v: 48000 },
      { v: 47000 },
      { v: 45000 },
      { v: 44000 },
      { v: 43600 },
    ],
  },
  {
    id: 'utilities',
    name: 'Utilities',
    type: 'expense',
    color: '#ef4444',
    iconName: 'zap',
    amount: 38200,
    transactions: 24,
    change: 0.5,
    trend: [
      { v: 37000 },
      { v: 37500 },
      { v: 38000 },
      { v: 37800 },
      { v: 38100 },
      { v: 38000 },
      { v: 38200 },
    ],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    type: 'expense',
    color: '#f97316',
    iconName: 'heart',
    amount: 29800,
    transactions: 18,
    change: 8.9,
    trend: [
      { v: 22000 },
      { v: 23000 },
      { v: 25000 },
      { v: 26000 },
      { v: 27000 },
      { v: 28000 },
      { v: 29800 },
    ],
  },
  {
    id: 'travel',
    name: 'Travel',
    type: 'expense',
    color: '#06b6d4',
    iconName: 'plane',
    amount: 24600,
    transactions: 12,
    change: 22.4,
    trend: [
      { v: 10000 },
      { v: 12000 },
      { v: 14000 },
      { v: 16000 },
      { v: 19000 },
      { v: 22000 },
      { v: 24600 },
    ],
  },
  {
    id: 'education',
    name: 'Education',
    type: 'expense',
    color: '#6366f1',
    iconName: 'book-open',
    amount: 18900,
    transactions: 8,
    change: 15.6,
    trend: [
      { v: 10000 },
      { v: 12000 },
      { v: 14000 },
      { v: 15000 },
      { v: 16000 },
      { v: 17000 },
      { v: 18900 },
    ],
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    type: 'expense',
    color: '#8b5cf6',
    iconName: 'smile',
    amount: 12400,
    transactions: 36,
    change: -1.4,
    trend: [
      { v: 14000 },
      { v: 13500 },
      { v: 13000 },
      { v: 12800 },
      { v: 12600 },
      { v: 12400 },
      { v: 12400 },
    ],
  },
  {
    id: 'subscriptions',
    name: 'Subscriptions',
    type: 'expense',
    color: '#14b8a6',
    iconName: 'refresh-cw',
    amount: 11200,
    transactions: 22,
    change: 2.1,
    trend: [
      { v: 10000 },
      { v: 10200 },
      { v: 10500 },
      { v: 10800 },
      { v: 11000 },
      { v: 11100 },
      { v: 11200 },
    ],
  },
  {
    id: 'other-expense',
    name: 'Other',
    type: 'expense',
    color: '#9ca3af',
    iconName: 'more-horizontal',
    amount: 196400,
    transactions: 486,
    change: 0.8,
    trend: [
      { v: 185000 },
      { v: 188000 },
      { v: 190000 },
      { v: 192000 },
      { v: 194000 },
      { v: 195000 },
      { v: 196400 },
    ],
  },
  // ── Income ──────────────────────────────────────────────────────────
  {
    id: 'salary',
    name: 'Salary',
    type: 'income',
    color: '#10b981',
    iconName: 'briefcase',
    amount: 540000,
    transactions: 12,
    change: 5.2,
    trend: [
      { v: 490000 },
      { v: 495000 },
      { v: 500000 },
      { v: 510000 },
      { v: 520000 },
      { v: 530000 },
      { v: 540000 },
    ],
  },
  {
    id: 'freelance',
    name: 'Freelance',
    type: 'income',
    color: '#3b82f6',
    iconName: 'laptop',
    amount: 124000,
    transactions: 28,
    change: 18.4,
    trend: [
      { v: 72000 },
      { v: 80000 },
      { v: 90000 },
      { v: 100000 },
      { v: 110000 },
      { v: 118000 },
      { v: 124000 },
    ],
  },
  {
    id: 'rental',
    name: 'Rental Income',
    type: 'income',
    color: '#7c3aed',
    iconName: 'home',
    amount: 120000,
    transactions: 12,
    change: 3.6,
    trend: [
      { v: 112000 },
      { v: 114000 },
      { v: 116000 },
      { v: 117000 },
      { v: 118000 },
      { v: 119000 },
      { v: 120000 },
    ],
  },
  {
    id: 'investments',
    name: 'Investments',
    type: 'income',
    color: '#f59e0b',
    iconName: 'trending-up',
    amount: 82000,
    transactions: 48,
    change: 11.2,
    trend: [
      { v: 55000 },
      { v: 60000 },
      { v: 65000 },
      { v: 70000 },
      { v: 74000 },
      { v: 78000 },
      { v: 82000 },
    ],
  },
]

// Jan-Dec monthly weight distributions per category (each sums to 1.0)
const MONTHLY_PATTERNS: Record<string, number[]> = {
  Groceries: [0.08, 0.08, 0.08, 0.08, 0.09, 0.08, 0.09, 0.08, 0.09, 0.09, 0.08, 0.08],
  Shopping: [0.06, 0.07, 0.07, 0.08, 0.08, 0.08, 0.08, 0.09, 0.08, 0.09, 0.1, 0.12],
  Dining: [0.07, 0.07, 0.08, 0.08, 0.09, 0.09, 0.08, 0.08, 0.08, 0.09, 0.09, 0.1],
  Transport: [0.08, 0.08, 0.09, 0.08, 0.09, 0.08, 0.09, 0.08, 0.09, 0.08, 0.08, 0.08],
  Entertainment: [0.07, 0.07, 0.07, 0.08, 0.08, 0.09, 0.09, 0.09, 0.08, 0.09, 0.09, 0.1],
  Utilities: [0.09, 0.08, 0.08, 0.08, 0.08, 0.09, 0.09, 0.08, 0.09, 0.08, 0.08, 0.08],
  Healthcare: [0.09, 0.08, 0.09, 0.08, 0.08, 0.08, 0.08, 0.09, 0.09, 0.08, 0.08, 0.08],
  Travel: [0.06, 0.07, 0.08, 0.09, 0.1, 0.1, 0.11, 0.1, 0.08, 0.08, 0.07, 0.06],
  Education: [0.1, 0.09, 0.09, 0.08, 0.07, 0.07, 0.07, 0.1, 0.1, 0.08, 0.09, 0.06],
  'Personal Care': [0.07, 0.07, 0.08, 0.08, 0.09, 0.09, 0.08, 0.08, 0.08, 0.09, 0.09, 0.1],
  Subscriptions: [0.08, 0.08, 0.08, 0.08, 0.08, 0.09, 0.09, 0.08, 0.09, 0.09, 0.08, 0.08],
  Other: [0.08, 0.08, 0.08, 0.08, 0.08, 0.09, 0.09, 0.08, 0.09, 0.09, 0.08, 0.08],
  Salary: [0.08, 0.08, 0.08, 0.08, 0.08, 0.09, 0.09, 0.08, 0.09, 0.09, 0.08, 0.08],
  Freelance: [0.07, 0.07, 0.08, 0.08, 0.09, 0.09, 0.08, 0.08, 0.08, 0.09, 0.09, 0.1],
  'Rental Income': [0.08, 0.08, 0.08, 0.08, 0.08, 0.09, 0.09, 0.08, 0.09, 0.09, 0.08, 0.08],
  Investments: [0.06, 0.07, 0.08, 0.09, 0.1, 0.1, 0.11, 0.1, 0.08, 0.08, 0.07, 0.06],
}

// Transport has an even distribution — a safe neutral fallback for any unmapped category
const DEFAULT_PATTERN = MONTHLY_PATTERNS.Transport

/** Sum of the last `nMonths` months of a category's annual amount. */
export function getPeriodAmount(category: Category, nMonths: number): number {
  const pattern = MONTHLY_PATTERNS[category.name] ?? DEFAULT_PATTERN
  // slice(-n) takes the most-recent n months; multiplying by the summed weight scales the annual total
  const weight = pattern.slice(-nMonths).reduce((s, v) => s + v, 0)
  return Math.round(category.amount * weight)
}
