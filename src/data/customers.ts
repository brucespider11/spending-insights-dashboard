export type IdentifierType = 'CIF' | 'Account Number' | 'ID Number' | 'Name'

export interface CustomerInsight {
  type: 'risk' | 'alert' | 'opportunity' | 'pattern'
  title: string
  body: string
  metric: string
}

export interface CustomerCategory {
  name: string
  amount: number
  pct: number
  color: string
  change: number
}

export interface CustomerProfile {
  cif: string
  accountNumber: string
  idNumber: string
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
  keyInsights: CustomerInsight[]
}

export const CUSTOMERS: CustomerProfile[] = [
  {
    cif: '100234567',
    accountNumber: '1234567890',
    idNumber: '9801015432089',
    name: 'Riyaad van Damme',
    initials: 'RD',
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
      { name: 'Dining', amount: 87400, pct: 28, color: '#10b981', change: 28 },
      { name: 'Entertainment', amount: 68700, pct: 22, color: '#ec4899', change: 22 },
      { name: 'Shopping', amount: 56200, pct: 18, color: '#f59e0b', change: 14 },
      { name: 'Transport', amount: 34400, pct: 11, color: '#3b82f6', change: 7 },
      { name: 'Subscriptions', amount: 18700, pct: 6, color: '#14b8a6', change: 12 },
      { name: 'Other', amount: 47000, pct: 15, color: '#9ca3af', change: 0 },
    ],
    monthlyTrend: [
      { month: 'Oct', amount: 19200 },
      { month: 'Nov', amount: 20500 },
      { month: 'Dec', amount: 22000 },
      { month: 'Jan', amount: 21500 },
      { month: 'Feb', amount: 23500 },
      { month: 'Mar', amount: 25200 },
      { month: 'Apr', amount: 22000 },
      { month: 'May', amount: 24000 },
      { month: 'Jun', amount: 23500 },
      { month: 'Jul', amount: 26000 },
      { month: 'Aug', amount: 28500 },
      { month: 'Sep', amount: 31200 },
    ],
    insight:
      'High discretionary spender. Dining and entertainment account for 50% of total spend — well above the 30% segment average. YoY growth of 18.2% requires close monitoring.',
    keyInsights: [
      {
        type: 'risk',
        title: 'Elevated spend-to-income ratio',
        body: 'Monthly spend of R 26,033 is 74% of take-home income — above the 65% threshold for this segment.',
        metric: '74% ratio',
      },
      {
        type: 'pattern',
        title: 'Dining & entertainment dominance',
        body: 'These two categories account for 50% of total spend, compared to a 30% segment average. Discretionary spend is the primary driver.',
        metric: '50% of spend',
      },
      {
        type: 'opportunity',
        title: 'Savings capacity available',
        body: 'Trimming dining to segment average would free up approximately R 4,200/month — ideal for a tax-free savings account.',
        metric: 'R 4,200/mo',
      },
      {
        type: 'alert',
        title: 'Spend growth outpacing income',
        body: 'Year-on-year spend growth of 18.2% significantly exceeds the 6–8% typical salary increase band. Trajectory requires monitoring.',
        metric: '+18.2% YoY',
      },
    ],
  },
  {
    cif: '100567890',
    accountNumber: '0987654321',
    idNumber: '7502245678234',
    name: 'Thandi Mokoena',
    initials: 'TM',
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
      { name: 'Groceries', amount: 182400, pct: 35, color: '#7c3aed', change: 11 },
      { name: 'Education', amount: 104800, pct: 20, color: '#6366f1', change: 15 },
      { name: 'Utilities', amount: 78600, pct: 15, color: '#ef4444', change: 9 },
      { name: 'Healthcare', amount: 52400, pct: 10, color: '#f97316', change: -4 },
      { name: 'Transport', amount: 41900, pct: 8, color: '#3b82f6', change: 5 },
      { name: 'Other', amount: 63700, pct: 12, color: '#9ca3af', change: 0 },
    ],
    monthlyTrend: [
      { month: 'Oct', amount: 40500 },
      { month: 'Nov', amount: 41000 },
      { month: 'Dec', amount: 43500 },
      { month: 'Jan', amount: 42000 },
      { month: 'Feb', amount: 44000 },
      { month: 'Mar', amount: 44500 },
      { month: 'Apr', amount: 41000 },
      { month: 'May', amount: 43000 },
      { month: 'Jun', amount: 42000 },
      { month: 'Jul', amount: 44000 },
      { month: 'Aug', amount: 46000 },
      { month: 'Sep', amount: 43800 },
    ],
    insight:
      'Conservative family spender. Essential categories make up 70% of spend. Strong 39% savings rate — well-positioned for wealth-building products.',
    keyInsights: [
      {
        type: 'pattern',
        title: 'Essential-first spending profile',
        body: 'Groceries, education, and utilities account for 70% of spend — consistent with a well-managed family household.',
        metric: '70% essentials',
      },
      {
        type: 'opportunity',
        title: 'Strong investment candidacy',
        body: 'With a 39% savings rate and stable spend pattern, this customer is well-positioned for unit trusts or a fixed deposit.',
        metric: '39% savings rate',
      },
      {
        type: 'alert',
        title: 'Education costs rising',
        body: 'Education spend has grown 15.6% YoY, likely tracking school fee escalations. May need a dedicated education savings plan.',
        metric: '+15.6% education',
      },
      {
        type: 'pattern',
        title: 'Low transaction velocity',
        body: '1,204 transactions annually suggests consolidated, planned shopping behaviour — lower fraud exposure than the segment average.',
        metric: '1,204 txns/yr',
      },
    ],
  },
  {
    cif: '100891234',
    accountNumber: '1357924680',
    idNumber: '6804128901234',
    name: 'Sipho Motsepe',
    initials: 'SM',
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
      { name: 'Travel', amount: 254200, pct: 30, color: '#06b6d4', change: -18 },
      { name: 'Shopping', amount: 211800, pct: 25, color: '#f59e0b', change: -9 },
      { name: 'Dining', amount: 169400, pct: 20, color: '#10b981', change: 8 },
      { name: 'Entertainment', amount: 84700, pct: 10, color: '#ec4899', change: -6 },
      { name: 'Utilities', amount: 67800, pct: 8, color: '#ef4444', change: 5 },
      { name: 'Other', amount: 59300, pct: 7, color: '#9ca3af', change: 0 },
    ],
    monthlyTrend: [
      { month: 'Oct', amount: 52000 },
      { month: 'Nov', amount: 58000 },
      { month: 'Dec', amount: 65000 },
      { month: 'Jan', amount: 56000 },
      { month: 'Feb', amount: 70000 },
      { month: 'Mar', amount: 74000 },
      { month: 'Apr', amount: 58000 },
      { month: 'May', amount: 62000 },
      { month: 'Jun', amount: 68000 },
      { month: 'Jul', amount: 72000 },
      { month: 'Aug', amount: 81000 },
      { month: 'Sep', amount: 91200 },
    ],
    insight:
      'Premium lifestyle spender with blended business and personal transactions. Irregular deposit patterns and high transaction velocity warrant segment review.',
    keyInsights: [
      {
        type: 'risk',
        title: 'Business and personal spend blended',
        body: 'With 2,187 transactions and a linked Business CIF, personal and business expenses appear intermixed — a tax and audit risk.',
        metric: '2,187 txns',
      },
      {
        type: 'alert',
        title: 'Lifestyle inflation accelerating',
        body: 'Spend has grown 22.8% YoY against a relatively stable income base. Travel and shopping are the primary growth drivers.',
        metric: '+22.8% YoY',
      },
      {
        type: 'opportunity',
        title: 'Business banking referral',
        body: 'Separating business expenses via the linked Business CIF (200891234) could unlock VAT benefits and cleaner financial reporting.',
        metric: 'CIF 200891234',
      },
      {
        type: 'pattern',
        title: 'Irregular deposit pattern',
        body: 'Income deposits vary significantly month-to-month, consistent with business owner drawdowns rather than a fixed salary.',
        metric: 'Variable income',
      },
    ],
  },
  {
    cif: '100789012',
    accountNumber: '5678901234',
    idNumber: '6203105432110',
    name: 'Anna-Marie Botha',
    initials: 'AB',
    segment: 'Retired',
    segmentColor: '#f97316',
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
      { name: 'Groceries', amount: 67550, pct: 35, color: '#7c3aed', change: 7 },
      { name: 'Healthcare', amount: 42460, pct: 22, color: '#f97316', change: 11 },
      { name: 'Utilities', amount: 32810, pct: 17, color: '#ef4444', change: -8 },
      { name: 'Transport', amount: 23160, pct: 12, color: '#3b82f6', change: -14 },
      { name: 'Dining', amount: 9650, pct: 5, color: '#10b981', change: -6 },
      { name: 'Other', amount: 17370, pct: 9, color: '#9ca3af', change: 0 },
    ],
    monthlyTrend: [
      { month: 'Oct', amount: 15200 },
      { month: 'Nov', amount: 14800 },
      { month: 'Dec', amount: 15600 },
      { month: 'Jan', amount: 15400 },
      { month: 'Feb', amount: 16200 },
      { month: 'Mar', amount: 16000 },
      { month: 'Apr', amount: 15800 },
      { month: 'May', amount: 16400 },
      { month: 'Jun', amount: 15600 },
      { month: 'Jul', amount: 16800 },
      { month: 'Aug', amount: 17400 },
      { month: 'Sep', amount: 17800 },
    ],
    insight:
      'Model retiree profile. Essential spend dominates at 86%, spend variance is minimal, and 16+ years of exemplary account conduct make this the lowest-risk customer in the portfolio.',
    keyInsights: [
      {
        type: 'pattern',
        title: 'Textbook retiree spend profile',
        body: 'Essential categories — groceries, healthcare, and utilities — account for 86% of spend. Highly predictable and well-managed.',
        metric: '86% essentials',
      },
      {
        type: 'opportunity',
        title: 'Highest creditworthiness in cohort',
        body: 'With 16+ years of consistent account conduct and a 43% effective savings rate, this customer qualifies for premium banking tier.',
        metric: '16+ yr tenure',
      },
      {
        type: 'alert',
        title: 'Healthcare costs escalating',
        body: 'Healthcare spend has grown 8.9% YoY — outpacing CPI. Medical aid adequacy should be reviewed to avoid out-of-pocket risk.',
        metric: '+8.9% health YoY',
      },
      {
        type: 'pattern',
        title: 'Minimal discretionary volatility',
        body: 'Month-to-month spend variance is less than 12% — the lowest in the portfolio. Income is fixed pension/annuity.',
        metric: '<12% variance',
      },
    ],
  },

  // ── New customers ──────────────────────────────────────────────────────

  {
    cif: '100345678',
    accountNumber: '2345678901',
    idNumber: '9805156234087',
    name: 'Lwazi Dube',
    initials: 'LD',
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
      { name: 'Transport', amount: 40000, pct: 27, color: '#3b82f6', change: 42 },
      { name: 'Dining', amount: 35000, pct: 24, color: '#10b981', change: 36 },
      { name: 'Entertainment', amount: 24000, pct: 16, color: '#ec4899', change: 28 },
      { name: 'Shopping', amount: 21000, pct: 14, color: '#f59e0b', change: 18 },
      { name: 'Groceries', amount: 13000, pct: 9, color: '#7c3aed', change: 12 },
      { name: 'Other', amount: 15000, pct: 10, color: '#9ca3af', change: 0 },
    ],
    monthlyTrend: [
      { month: 'Oct', amount: 8600 },
      { month: 'Nov', amount: 9200 },
      { month: 'Dec', amount: 10400 },
      { month: 'Jan', amount: 9800 },
      { month: 'Feb', amount: 11400 },
      { month: 'Mar', amount: 12800 },
      { month: 'Apr', amount: 11000 },
      { month: 'May', amount: 11800 },
      { month: 'Jun', amount: 12400 },
      { month: 'Jul', amount: 13800 },
      { month: 'Aug', amount: 16600 },
      { month: 'Sep', amount: 20200 },
    ],
    insight:
      'Digital-native youth spender. App-based transport and dining dominate. No healthcare spend detected — key insurance gap for this age group.',
    keyInsights: [
      {
        type: 'pattern',
        title: 'Digital-first spending behaviour',
        body: 'Ride-hailing and food delivery apps account for the majority of transport and dining spend — typical of an urban digital native.',
        metric: '51% app-based',
      },
      {
        type: 'alert',
        title: 'No healthcare spend detected',
        body: 'Zero spend in healthcare or medical aid categories for a customer in their mid-twenties indicates an uninsured gap.',
        metric: 'R 0 healthcare',
      },
      {
        type: 'opportunity',
        title: 'Ideal savings entry point',
        body: 'Spend growth is tracking income growth. A starter investment or savings pocket now could compound meaningfully over a 10-year horizon.',
        metric: '+24.6% growth',
      },
      {
        type: 'alert',
        title: 'Holiday overspend pattern',
        body: 'December spend was 62% above monthly average, suggesting seasonal budget pressure. A Christmas savings plan could smooth this.',
        metric: '+62% Dec spike',
      },
    ],
  },
  {
    cif: '100456789',
    accountNumber: '3456789012',
    idNumber: '8507235678123',
    name: 'Vikesh Govender',
    initials: 'VG',
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
      { name: 'Dining', amount: 99500, pct: 25, color: '#10b981', change: 16 },
      { name: 'Groceries', amount: 87600, pct: 22, color: '#7c3aed', change: 12 },
      { name: 'Shopping', amount: 75620, pct: 19, color: '#f59e0b', change: -7 },
      { name: 'Travel', amount: 55720, pct: 14, color: '#06b6d4', change: 14 },
      { name: 'Healthcare', amount: 43780, pct: 11, color: '#f97316', change: 8 },
      { name: 'Other', amount: 35780, pct: 9, color: '#9ca3af', change: 0 },
    ],
    monthlyTrend: [
      { month: 'Oct', amount: 29400 },
      { month: 'Nov', amount: 30200 },
      { month: 'Dec', amount: 32800 },
      { month: 'Jan', amount: 31400 },
      { month: 'Feb', amount: 33600 },
      { month: 'Mar', amount: 34200 },
      { month: 'Apr', amount: 31800 },
      { month: 'May', amount: 33000 },
      { month: 'Jun', amount: 32600 },
      { month: 'Jul', amount: 35200 },
      { month: 'Aug', amount: 38000 },
      { month: 'Sep', amount: 35800 },
    ],
    insight:
      'Balanced professional spender with strong savings capacity. Elevated healthcare spend and growing travel category are the key watchpoints.',
    keyInsights: [
      {
        type: 'pattern',
        title: 'Well-balanced spend profile',
        body: 'Dining and groceries combined represent 47% of spend — within healthy norms for the Professional segment.',
        metric: '47% food spend',
      },
      {
        type: 'opportunity',
        title: 'Finance product readiness',
        body: 'A 36% effective savings rate and stable spend growth make this customer a strong candidate for home loan or vehicle finance.',
        metric: '36% savings rate',
      },
      {
        type: 'alert',
        title: 'Healthcare spend elevated',
        body: 'R 43,780 in healthcare YTD (11% of total spend) may indicate chronic condition management or dependant medical costs.',
        metric: 'R 43,780 health',
      },
      {
        type: 'pattern',
        title: 'Emerging travel category',
        body: 'Travel spend has grown 14% YoY and now represents 14% of total spend — an aspirational lifestyle shift worth tracking.',
        metric: '+14% travel YoY',
      },
    ],
  },
  {
    cif: '100678901',
    accountNumber: '4567890123',
    idNumber: '7812015987654',
    name: 'Kobus van der Berg',
    initials: 'KV',
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
      { name: 'Shopping', amount: 206100, pct: 30, color: '#f59e0b', change: 18 },
      { name: 'Dining', amount: 137400, pct: 20, color: '#10b981', change: 22 },
      { name: 'Entertainment', amount: 103050, pct: 15, color: '#ec4899', change: 16 },
      { name: 'Travel', amount: 82440, pct: 12, color: '#06b6d4', change: 24 },
      { name: 'Personal Care', amount: 68700, pct: 10, color: '#8b5cf6', change: 9 },
      { name: 'Other', amount: 89310, pct: 13, color: '#9ca3af', change: 0 },
    ],
    monthlyTrend: [
      { month: 'Oct', amount: 38200 },
      { month: 'Nov', amount: 42800 },
      { month: 'Dec', amount: 51400 },
      { month: 'Jan', amount: 46200 },
      { month: 'Feb', amount: 54800 },
      { month: 'Mar', amount: 62400 },
      { month: 'Apr', amount: 48200 },
      { month: 'May', amount: 54000 },
      { month: 'Jun', amount: 58400 },
      { month: 'Jul', amount: 66200 },
      { month: 'Aug', amount: 78400 },
      { month: 'Sep', amount: 86000 },
    ],
    insight:
      'High-risk lifestyle spender with accelerating growth (+31.4% YoY). No savings behaviour detected despite above-average income. Immediate wealth management referral recommended.',
    keyInsights: [
      {
        type: 'risk',
        title: 'Spend growth trajectory unsustainable',
        body: 'Year-on-year spend growth of 31.4% far exceeds income growth. At this rate, spend-to-income ratio will breach 80% within 18 months.',
        metric: '+31.4% YoY',
      },
      {
        type: 'alert',
        title: 'Shopping dominates discretionary',
        body: 'Retail shopping at 30% of total spend is the highest in the Lifestyle peer group — luxury and fashion brands are primary drivers.',
        metric: '30% shopping',
      },
      {
        type: 'risk',
        title: 'Extreme seasonal volatility',
        body: 'December spend (R 86,000) is 125% higher than January (R 38,200). This level of seasonality creates cash flow risk.',
        metric: '125% Dec vs Jan',
      },
      {
        type: 'opportunity',
        title: 'No savings category detected',
        body: 'Despite a high income, no investment or savings transactions are visible. A wealth management conversation is warranted.',
        metric: 'R 0 savings',
      },
    ],
  },
]

export function lookupCustomer(type: IdentifierType, value: string): CustomerProfile | null {
  const v = value.trim()
  return (
    CUSTOMERS.find((c) => {
      if (type === 'CIF') return c.cif === v
      if (type === 'Account Number') return c.accountNumber === v
      if (type === 'ID Number') return c.idNumber === v
      if (type === 'Name') return c.name.toLowerCase().includes(v.toLowerCase())
      return false
    }) ?? null
  )
}

export function searchCustomersByName(query: string): CustomerProfile[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return CUSTOMERS.filter((c) => c.name.toLowerCase().includes(q))
}
