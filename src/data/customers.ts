export type IdentifierType = 'CIF' | 'Account Number' | 'ID Number' | 'CIF (Business)'

export interface CustomerCategory {
  name: string
  amount: number
  pct: number
  color: string
}

export interface CustomerProfile {
  cif: string
  accountNumber: string
  idNumber: string
  cifBusiness?: string
  name: string
  initials: string
  segment: string
  segmentColor: string
  riskProfile: 'Low' | 'Medium' | 'High'
  status: 'Active' | 'Dormant' | 'Restricted'
  joinDate: string
  location: string
  monthlyIncome: number
  totalSpend: number
  avgMonthlySpend: number
  spendChange: number
  transactionCount: number
  categories: CustomerCategory[]
  monthlyTrend: { month: string; amount: number }[]
  insight: string
}

export const CUSTOMERS: CustomerProfile[] = [
  {
    cif: '100234567',
    accountNumber: '1234567890',
    idNumber: '9801015432089',
    name: 'Madlanga Moody',
    initials: 'MM',
    segment: 'Young Professional',
    segmentColor: '#7c3aed',
    riskProfile: 'Medium',
    status: 'Active',
    joinDate: '2019-03-15',
    location: 'Johannesburg, GP',
    monthlyIncome: 35000,
    totalSpend: 312400,
    avgMonthlySpend: 26033,
    spendChange: 18.2,
    transactionCount: 842,
    categories: [
      { name: 'Dining', amount: 87400, pct: 28, color: '#10b981' },
      { name: 'Entertainment', amount: 68700, pct: 22, color: '#ec4899' },
      { name: 'Shopping', amount: 56200, pct: 18, color: '#f59e0b' },
      { name: 'Transport', amount: 34400, pct: 11, color: '#3b82f6' },
      { name: 'Subscriptions', amount: 18700, pct: 6, color: '#14b8a6' },
      { name: 'Other', amount: 47000, pct: 15, color: '#9ca3af' },
    ],
    monthlyTrend: [
      { month: 'Jan', amount: 19200 },
      { month: 'Feb', amount: 20500 },
      { month: 'Mar', amount: 22000 },
      { month: 'Apr', amount: 21500 },
      { month: 'May', amount: 23500 },
      { month: 'Jun', amount: 25200 },
      { month: 'Jul', amount: 22000 },
      { month: 'Aug', amount: 24000 },
      { month: 'Sep', amount: 23500 },
      { month: 'Oct', amount: 26000 },
      { month: 'Nov', amount: 28500 },
      { month: 'Dec', amount: 31200 },
    ],
    insight:
      'High discretionary spender. Dining and entertainment account for 50% of total spend — well above the 30% segment average.',
  },
  {
    cif: '100567890',
    accountNumber: '0987654321',
    idNumber: '7502245678234',
    name: 'Jade Senyas',
    initials: 'JS',
    segment: 'Family',
    segmentColor: '#10b981',
    riskProfile: 'Low',
    status: 'Active',
    joinDate: '2015-08-22',
    location: 'Cape Town, WC',
    monthlyIncome: 72000,
    totalSpend: 523800,
    avgMonthlySpend: 43650,
    spendChange: 4.3,
    transactionCount: 1204,
    categories: [
      { name: 'Groceries', amount: 182400, pct: 35, color: '#7c3aed' },
      { name: 'Education', amount: 104800, pct: 20, color: '#6366f1' },
      { name: 'Utilities', amount: 78600, pct: 15, color: '#ef4444' },
      { name: 'Healthcare', amount: 52400, pct: 10, color: '#f97316' },
      { name: 'Transport', amount: 41900, pct: 8, color: '#3b82f6' },
      { name: 'Other', amount: 63700, pct: 12, color: '#9ca3af' },
    ],
    monthlyTrend: [
      { month: 'Jan', amount: 40500 },
      { month: 'Feb', amount: 41000 },
      { month: 'Mar', amount: 43500 },
      { month: 'Apr', amount: 42000 },
      { month: 'May', amount: 44000 },
      { month: 'Jun', amount: 44500 },
      { month: 'Jul', amount: 41000 },
      { month: 'Aug', amount: 43000 },
      { month: 'Sep', amount: 42000 },
      { month: 'Oct', amount: 44000 },
      { month: 'Nov', amount: 46000 },
      { month: 'Dec', amount: 43800 },
    ],
    insight:
      'Conservative family spender. Essential categories (groceries, education, utilities) make up 70% of spend — consistent with a stable household profile.',
  },
  {
    cif: '100891234',
    accountNumber: '1357924680',
    idNumber: '6804128901234',
    cifBusiness: '200891234',
    name: 'Cupcake Motsepe',
    initials: 'CM',
    segment: 'Business Owner',
    segmentColor: '#f59e0b',
    riskProfile: 'High',
    status: 'Active',
    joinDate: '2012-01-10',
    location: 'Pretoria, GP',
    monthlyIncome: 145000,
    totalSpend: 847200,
    avgMonthlySpend: 70600,
    spendChange: 22.8,
    transactionCount: 2187,
    categories: [
      { name: 'Travel', amount: 254200, pct: 30, color: '#06b6d4' },
      { name: 'Shopping', amount: 211800, pct: 25, color: '#f59e0b' },
      { name: 'Dining', amount: 169400, pct: 20, color: '#10b981' },
      { name: 'Entertainment', amount: 84700, pct: 10, color: '#ec4899' },
      { name: 'Utilities', amount: 67800, pct: 8, color: '#ef4444' },
      { name: 'Other', amount: 59300, pct: 7, color: '#9ca3af' },
    ],
    monthlyTrend: [
      { month: 'Jan', amount: 52000 },
      { month: 'Feb', amount: 58000 },
      { month: 'Mar', amount: 65000 },
      { month: 'Apr', amount: 56000 },
      { month: 'May', amount: 70000 },
      { month: 'Jun', amount: 74000 },
      { month: 'Jul', amount: 58000 },
      { month: 'Aug', amount: 62000 },
      { month: 'Sep', amount: 68000 },
      { month: 'Oct', amount: 72000 },
      { month: 'Nov', amount: 81000 },
      { month: 'Dec', amount: 91200 },
    ],
    insight:
      'Premium lifestyle spender. Travel and shopping account for 55% of spend. Income is variable — business payouts create irregular deposit patterns.',
  },

  // ── New customers ──────────────────────────────────────────────────────

  {
    cif: '100345678',
    accountNumber: '2345678901',
    idNumber: '9805156234087',
    name: 'Xaka Mulu',
    initials: 'XM',
    segment: 'Youth',
    segmentColor: '#06b6d4',
    riskProfile: 'Low',
    status: 'Active',
    joinDate: '2022-06-10',
    location: 'Sandton, GP',
    monthlyIncome: 18000,
    totalSpend: 148000,
    avgMonthlySpend: 12333,
    spendChange: 24.6,
    transactionCount: 512,
    categories: [
      { name: 'Transport', amount: 40000, pct: 27, color: '#3b82f6' },
      { name: 'Dining', amount: 35000, pct: 24, color: '#10b981' },
      { name: 'Entertainment', amount: 24000, pct: 16, color: '#ec4899' },
      { name: 'Shopping', amount: 21000, pct: 14, color: '#f59e0b' },
      { name: 'Groceries', amount: 13000, pct: 9, color: '#7c3aed' },
      { name: 'Other', amount: 15000, pct: 10, color: '#9ca3af' },
    ],
    monthlyTrend: [
      { month: 'Jan', amount: 8600 },
      { month: 'Feb', amount: 9200 },
      { month: 'Mar', amount: 10400 },
      { month: 'Apr', amount: 9800 },
      { month: 'May', amount: 11400 },
      { month: 'Jun', amount: 12800 },
      { month: 'Jul', amount: 11000 },
      { month: 'Aug', amount: 11800 },
      { month: 'Sep', amount: 12400 },
      { month: 'Oct', amount: 13800 },
      { month: 'Nov', amount: 16600 },
      { month: 'Dec', amount: 20200 },
    ],
    insight:
      'Digital-native spender. Ride-hailing and food delivery apps account for 51% of transport and dining spend — typical youth urbanite pattern with strong growth trajectory.',
  },
  {
    cif: '100456789',
    accountNumber: '3456789012',
    idNumber: '8507235678123',
    name: 'Vikesh Moolah',
    initials: 'VM',
    segment: 'Professional',
    segmentColor: '#3b82f6',
    riskProfile: 'Medium',
    status: 'Active',
    joinDate: '2018-11-05',
    location: 'Durban, KZN',
    monthlyIncome: 52000,
    totalSpend: 398000,
    avgMonthlySpend: 33167,
    spendChange: 9.4,
    transactionCount: 967,
    categories: [
      { name: 'Dining', amount: 99500, pct: 25, color: '#10b981' },
      { name: 'Groceries', amount: 87600, pct: 22, color: '#7c3aed' },
      { name: 'Shopping', amount: 75620, pct: 19, color: '#f59e0b' },
      { name: 'Travel', amount: 55720, pct: 14, color: '#06b6d4' },
      { name: 'Healthcare', amount: 43780, pct: 11, color: '#f97316' },
      { name: 'Other', amount: 35780, pct: 9, color: '#9ca3af' },
    ],
    monthlyTrend: [
      { month: 'Jan', amount: 29400 },
      { month: 'Feb', amount: 30200 },
      { month: 'Mar', amount: 32800 },
      { month: 'Apr', amount: 31400 },
      { month: 'May', amount: 33600 },
      { month: 'Jun', amount: 34200 },
      { month: 'Jul', amount: 31800 },
      { month: 'Aug', amount: 33000 },
      { month: 'Sep', amount: 32600 },
      { month: 'Oct', amount: 35200 },
      { month: 'Nov', amount: 38000 },
      { month: 'Dec', amount: 35800 },
    ],
    insight:
      'Balanced professional spender. Dining and groceries dominate at 47% combined — healthy household fundamentals with moderate discretionary growth in travel.',
  },
  {
    cif: '100678901',
    accountNumber: '4567890123',
    idNumber: '7812015987654',
    name: 'Koos Kardashian van der Berg',
    initials: 'KK',
    segment: 'Lifestyle',
    segmentColor: '#ec4899',
    riskProfile: 'High',
    status: 'Active',
    joinDate: '2020-03-22',
    location: 'Stellenbosch, WC',
    monthlyIncome: 89000,
    totalSpend: 687000,
    avgMonthlySpend: 57250,
    spendChange: 31.4,
    transactionCount: 1648,
    categories: [
      { name: 'Shopping', amount: 206100, pct: 30, color: '#f59e0b' },
      { name: 'Dining', amount: 137400, pct: 20, color: '#10b981' },
      { name: 'Entertainment', amount: 103050, pct: 15, color: '#ec4899' },
      { name: 'Travel', amount: 82440, pct: 12, color: '#06b6d4' },
      { name: 'Personal Care', amount: 68700, pct: 10, color: '#8b5cf6' },
      { name: 'Other', amount: 89310, pct: 13, color: '#9ca3af' },
    ],
    monthlyTrend: [
      { month: 'Jan', amount: 38200 },
      { month: 'Feb', amount: 42800 },
      { month: 'Mar', amount: 51400 },
      { month: 'Apr', amount: 46200 },
      { month: 'May', amount: 54800 },
      { month: 'Jun', amount: 62400 },
      { month: 'Jul', amount: 48200 },
      { month: 'Aug', amount: 54000 },
      { month: 'Sep', amount: 58400 },
      { month: 'Oct', amount: 66200 },
      { month: 'Nov', amount: 78400 },
      { month: 'Dec', amount: 86000 },
    ],
    insight:
      'Lifestyle-driven spender with an accelerating growth curve (+31.4%). Shopping and entertainment combined exceed 45% of total spend. Spend-to-income ratio of 64% warrants review.',
  },
  {
    cif: '100789012',
    accountNumber: '5678901234',
    idNumber: '6203105432110',
    name: 'Koppies Koppendal',
    initials: 'KK',
    segment: 'Retired',
    segmentColor: '#10b981',
    riskProfile: 'Low',
    status: 'Active',
    joinDate: '2008-04-14',
    location: 'Bloemfontein, FS',
    monthlyIncome: 28000,
    totalSpend: 193000,
    avgMonthlySpend: 16083,
    spendChange: 2.1,
    transactionCount: 384,
    categories: [
      { name: 'Groceries', amount: 67550, pct: 35, color: '#7c3aed' },
      { name: 'Healthcare', amount: 42460, pct: 22, color: '#f97316' },
      { name: 'Utilities', amount: 32810, pct: 17, color: '#ef4444' },
      { name: 'Transport', amount: 23160, pct: 12, color: '#3b82f6' },
      { name: 'Dining', amount: 9650, pct: 5, color: '#10b981' },
      { name: 'Other', amount: 17370, pct: 9, color: '#9ca3af' },
    ],
    monthlyTrend: [
      { month: 'Jan', amount: 15200 },
      { month: 'Feb', amount: 14800 },
      { month: 'Mar', amount: 15600 },
      { month: 'Apr', amount: 15400 },
      { month: 'May', amount: 16200 },
      { month: 'Jun', amount: 16000 },
      { month: 'Jul', amount: 15800 },
      { month: 'Aug', amount: 16400 },
      { month: 'Sep', amount: 15600 },
      { month: 'Oct', amount: 16800 },
      { month: 'Nov', amount: 17400 },
      { month: 'Dec', amount: 17800 },
    ],
    insight:
      'Highly predictable retiree spend pattern. Essential categories dominate at 86% combined. Excellent account conduct across 16+ years — exemplary low-risk profile.',
  },
]

export function lookupCustomer(type: IdentifierType, value: string): CustomerProfile | null {
  const v = value.trim()
  return (
    CUSTOMERS.find((c) => {
      if (type === 'CIF') return c.cif === v
      if (type === 'Account Number') return c.accountNumber === v
      if (type === 'ID Number') return c.idNumber === v
      if (type === 'CIF (Business)') return c.cifBusiness === v
      return false
    }) ?? null
  )
}
