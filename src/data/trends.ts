export const MONTHLY_TREND = [
  { month: 'Jan', thisYear: 38400, lastYear: 34600 },
  { month: 'Feb', thisYear: 41200, lastYear: 37100 },
  { month: 'Mar', thisYear: 39800, lastYear: 35800 },
  { month: 'Apr', thisYear: 43600, lastYear: 39200 },
  { month: 'May', thisYear: 51200, lastYear: 46100 },
  { month: 'Jun', thisYear: 58400, lastYear: 52600 },
  { month: 'Jul', thisYear: 54800, lastYear: 49300 },
  { month: 'Aug', thisYear: 62100, lastYear: 55900 },
  { month: 'Sep', thisYear: 59300, lastYear: 53400 },
  { month: 'Oct', thisYear: 71400, lastYear: 64300 },
  { month: 'Nov', thisYear: 78200, lastYear: 70400 },
  { month: 'Dec', thisYear: 86500, lastYear: 77900 },
]

export const QUARTERLY_TREND = [
  { period: 'Q1 2025', thisYear: 119400, lastYear: 107500 },
  { period: 'Q2 2025', thisYear: 153200, lastYear: 137900 },
  { period: 'Q3 2025', thisYear: 176200, lastYear: 158600 },
  { period: 'Q4 2025', thisYear: 236100, lastYear: 212600 },
]

export const CATEGORY_MONTHLY = [
  {
    month: 'Jan',
    groceries: 5800,
    shopping: 4200,
    dining: 4200,
    transport: 4200,
    entertainment: 3900,
  },
  {
    month: 'Feb',
    groceries: 6200,
    shopping: 4800,
    dining: 4500,
    transport: 4400,
    entertainment: 4100,
  },
  {
    month: 'Mar',
    groceries: 5900,
    shopping: 4500,
    dining: 4300,
    transport: 4200,
    entertainment: 3900,
  },
  {
    month: 'Apr',
    groceries: 6400,
    shopping: 5200,
    dining: 4700,
    transport: 4500,
    entertainment: 4200,
  },
  {
    month: 'May',
    groceries: 7200,
    shopping: 6100,
    dining: 5200,
    transport: 4600,
    entertainment: 4000,
  },
  {
    month: 'Jun',
    groceries: 8100,
    shopping: 7000,
    dining: 5700,
    transport: 4800,
    entertainment: 3800,
  },
  {
    month: 'Jul',
    groceries: 7800,
    shopping: 6600,
    dining: 5400,
    transport: 4500,
    entertainment: 3700,
  },
  {
    month: 'Aug',
    groceries: 8700,
    shopping: 7400,
    dining: 6100,
    transport: 4900,
    entertainment: 3600,
  },
  {
    month: 'Sep',
    groceries: 8300,
    shopping: 7100,
    dining: 5800,
    transport: 4700,
    entertainment: 3500,
  },
  {
    month: 'Oct',
    groceries: 10000,
    shopping: 8500,
    dining: 6600,
    transport: 5000,
    entertainment: 3500,
  },
  {
    month: 'Nov',
    groceries: 11400,
    shopping: 10200,
    dining: 7400,
    transport: 5200,
    entertainment: 3400,
  },
  {
    month: 'Dec',
    groceries: 12800,
    shopping: 12000,
    dining: 7400,
    transport: 5700,
    entertainment: 3000,
  },
]

export const CATEGORY_SERIES = [
  { key: 'groceries', label: 'Groceries', color: '#7c3aed' },
  { key: 'shopping', label: 'Shopping', color: '#f59e0b' },
  { key: 'dining', label: 'Dining', color: '#10b981' },
  { key: 'transport', label: 'Transport', color: '#3b82f6' },
  { key: 'entertainment', label: 'Entertainment', color: '#ec4899' },
]

export const TOP_MOVERS = {
  increases: [
    { name: 'Travel', color: '#06b6d4', change: 22.4, amount: 5400 },
    { name: 'Education', color: '#6366f1', change: 15.6, amount: 2600 },
    { name: 'Groceries', color: '#7c3aed', change: 12.4, amount: 10800 },
    { name: 'Healthcare', color: '#f97316', change: 8.9, amount: 2400 },
    { name: 'Shopping', color: '#f59e0b', change: 6.8, amount: 5700 },
  ],
  decreases: [
    { name: 'Entertainment', color: '#ec4899', change: -3.1, amount: -1400 },
    { name: 'Personal Care', color: '#8b5cf6', change: -1.4, amount: -180 },
  ],
}
