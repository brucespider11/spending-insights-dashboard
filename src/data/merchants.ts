export interface Merchant {
  id: string
  name: string
  initials: string
  category: string
  categoryColor: string
  totalSpend: number // full-year YTD total
  visitCount: number
  avgSpend: number
  change: number
  lastVisit: string
}

export type MerchantDisplay = Merchant & { displaySpend: number }

export interface CustomerMerchantData {
  merchants: Merchant[]
  otherSpend: number
}

// Jan-Dec monthly weight distribution per category (must each sum to 1.0)
const MONTHLY_PATTERNS: Record<string, number[]> = {
  Dining: [0.07, 0.07, 0.08, 0.08, 0.09, 0.09, 0.08, 0.08, 0.08, 0.09, 0.09, 0.1],
  Entertainment: [0.07, 0.07, 0.07, 0.08, 0.08, 0.09, 0.09, 0.09, 0.08, 0.09, 0.09, 0.1],
  Retail: [0.06, 0.07, 0.07, 0.08, 0.08, 0.08, 0.08, 0.09, 0.08, 0.09, 0.1, 0.12],
  Groceries: [0.08, 0.08, 0.08, 0.08, 0.09, 0.08, 0.09, 0.08, 0.09, 0.09, 0.08, 0.08],
  Travel: [0.06, 0.07, 0.08, 0.09, 0.1, 0.1, 0.11, 0.1, 0.08, 0.08, 0.07, 0.06],
  Transport: [0.08, 0.08, 0.09, 0.08, 0.09, 0.08, 0.09, 0.08, 0.09, 0.08, 0.08, 0.08],
  Healthcare: [0.09, 0.08, 0.09, 0.08, 0.08, 0.08, 0.08, 0.09, 0.09, 0.08, 0.08, 0.08],
  Education: [0.1, 0.09, 0.09, 0.08, 0.07, 0.07, 0.07, 0.1, 0.1, 0.08, 0.09, 0.06],
  Utilities: [0.09, 0.08, 0.08, 0.08, 0.08, 0.09, 0.09, 0.08, 0.09, 0.08, 0.08, 0.08],
}

// Transport has an even distribution — a safe neutral fallback for unmapped merchant categories
const DEFAULT_PATTERN = MONTHLY_PATTERNS.Transport

/** Sum of the last `nMonths` months of a merchant's YTD spend. */
export function getPeriodSpend(merchant: Merchant, nMonths: number): number {
  const pattern = MONTHLY_PATTERNS[merchant.category] ?? DEFAULT_PATTERN
  const weight = pattern.slice(-nMonths).reduce((s, v) => s + v, 0)
  return Math.round(merchant.totalSpend * weight)
}

// Compact factory — auto-derives avgSpend so it never drifts out of sync with totalSpend/visitCount
const m = (
  id: string,
  name: string,
  initials: string,
  category: string,
  categoryColor: string,
  totalSpend: number,
  visitCount: number,
  change: number,
  lastVisit: string
): Merchant => ({
  id,
  name,
  initials,
  category,
  categoryColor,
  totalSpend,
  visitCount,
  avgSpend: Math.round(totalSpend / visitCount),
  change,
  lastVisit,
})

export const MERCHANT_DATA: Record<string, CustomerMerchantData> = {
  // ── Madlanga Dlamini — dining & entertainment heavy ─────────────────
  '100234567': {
    otherSpend: 157300,
    merchants: [
      m('nan', "Nando's", 'NA', 'Dining', '#10b981', 24800, 32, +8.4, '2025-12-14'),
      m('ste', 'Ster-Kinekor', 'SK', 'Entertainment', '#ec4899', 18600, 24, -2.1, '2025-12-10'),
      m('vid', 'Vida e Caffè', 'VC', 'Dining', '#10b981', 16200, 48, +12.6, '2025-12-18'),
      m('zar', 'Zara', 'ZA', 'Retail', '#f59e0b', 14800, 8, +5.2, '2025-11-28'),
      m('ube', 'Uber', 'UB', 'Transport', '#3b82f6', 13400, 86, +3.8, '2025-12-19'),
      m('spu', 'Spur', 'SP', 'Dining', '#10b981', 12900, 14, -4.2, '2025-12-08'),
      m('cli', 'Clicks', 'CL', 'Healthcare', '#f97316', 11200, 18, +1.2, '2025-12-15'),
      m('net', 'Netflix', 'NF', 'Entertainment', '#ec4899', 10800, 12, 0.0, '2025-12-01'),
      m('she', 'Shell', 'SH', 'Transport', '#3b82f6', 9800, 24, +2.4, '2025-12-17'),
      m('mrp', 'Mr Price', 'MP', 'Retail', '#f59e0b', 8600, 12, -1.8, '2025-12-03'),
      m('ocb', 'Ocean Basket', 'OB', 'Dining', '#10b981', 7200, 8, +6.4, '2025-11-30'),
      m('gam', 'Game', 'GM', 'Retail', '#f59e0b', 6800, 6, +9.2, '2025-11-22'),
    ],
  },

  // ── Thandi Mokoena — groceries & education heavy ────────────────────
  '100567890': {
    otherSpend: 182200,
    merchants: [
      m('chk', 'Checkers', 'CH', 'Groceries', '#7c3aed', 68400, 104, +3.2, '2025-12-19'),
      m('woo', 'Woolworths Food', 'WF', 'Groceries', '#7c3aed', 52800, 78, +2.4, '2025-12-17'),
      m('cur', 'Curro Schools', 'CS', 'Education', '#6366f1', 48000, 24, +8.0, '2025-12-01'),
      m('pnp', 'Pick n Pay', 'PP', 'Groceries', '#7c3aed', 36400, 52, +1.6, '2025-12-15'),
      m('dis', 'Dis-Chem', 'DC', 'Healthcare', '#f97316', 28600, 36, +4.8, '2025-12-12'),
      m('esk', 'Eskom', 'ES', 'Utilities', '#ef4444', 24000, 12, +0.8, '2025-12-01'),
      m('vod', 'Vodacom', 'VO', 'Utilities', '#ef4444', 18000, 12, 0.0, '2025-12-01'),
      m('bpf', 'BP', 'BP', 'Transport', '#3b82f6', 16800, 36, +1.2, '2025-12-18'),
      m('cl2', 'Clicks', 'CL', 'Healthcare', '#f97316', 14200, 22, +2.8, '2025-12-14'),
      m('spa', 'Spar', 'SA', 'Groceries', '#7c3aed', 12400, 24, -1.2, '2025-12-11'),
      m('net2', 'Netcare', 'NC', 'Healthcare', '#f97316', 11200, 6, +6.4, '2025-11-28'),
      m('mak', 'Makro', 'MK', 'Retail', '#f59e0b', 10800, 8, +3.6, '2025-11-20'),
    ],
  },

  // ── Sipho Motsepe — travel & luxury heavy ────────────────────────────
  '100891234': {
    otherSpend: 232000,
    merchants: [
      m('fly', 'FlySafair', 'FS', 'Travel', '#06b6d4', 98400, 18, +22.4, '2025-12-16'),
      m('emi', 'Emirates', 'EM', 'Travel', '#06b6d4', 86200, 6, +12.8, '2025-12-04'),
      m('sun', 'Sun International', 'SI', 'Travel', '#06b6d4', 74800, 8, +18.6, '2025-12-10'),
      m('san', 'Sandton City', 'SC', 'Retail', '#f59e0b', 68400, 24, +8.4, '2025-12-18'),
      m('mar', 'Marble Restaurant', 'MR', 'Dining', '#10b981', 52800, 22, +14.2, '2025-12-19'),
      m('sax', 'The Saxon Hotel', 'TS', 'Travel', '#06b6d4', 48600, 4, +6.8, '2025-11-22'),
      m('mbs', 'Mercedes-Benz FS', 'MB', 'Transport', '#3b82f6', 42000, 12, +2.4, '2025-12-01'),
      m('hyd', 'Hyde Park Corner', 'HP', 'Retail', '#f59e0b', 38200, 18, +10.8, '2025-12-15'),
      m('wlw', 'Woolworths', 'WW', 'Retail', '#f59e0b', 34800, 26, +5.6, '2025-12-17'),
      m('spi', 'Spier Wine Farm', 'SW', 'Dining', '#10b981', 28400, 6, +28.4, '2025-11-30'),
      m('sh2', 'Shell', 'SH', 'Transport', '#3b82f6', 24600, 48, +3.2, '2025-12-19'),
      m('dst', 'DSTV Premium', 'DT', 'Entertainment', '#ec4899', 18000, 12, 0.0, '2025-12-01'),
    ],
  },

  // ── Lwazi Dube — transport & delivery heavy (youth) ─────────────────
  '100345678': {
    otherSpend: 30800,
    merchants: [
      m('uea', 'Uber Eats', 'UE', 'Dining', '#10b981', 18400, 64, +32.4, '2026-09-20'),
      m('blt', 'Bolt', 'BT', 'Transport', '#3b82f6', 16200, 128, +18.6, '2026-09-21'),
      m('ubx', 'Uber', 'UB', 'Transport', '#3b82f6', 14800, 96, +12.4, '2026-09-19'),
      m('tka', 'Takealot', 'TA', 'Retail', '#f59e0b', 12600, 18, +24.8, '2026-09-15'),
      m('mrd', 'Mr D Food', 'MD', 'Dining', '#10b981', 10200, 38, +28.2, '2026-09-20'),
      m('nfx', 'Netflix', 'NF', 'Entertainment', '#ec4899', 9600, 12, 0.0, '2026-09-01'),
      m('pnx', 'Pick n Pay', 'PP', 'Groceries', '#7c3aed', 8400, 24, +6.4, '2026-09-18'),
      m('sup', 'Superbalist', 'SU', 'Retail', '#f59e0b', 7200, 8, +14.2, '2026-09-10'),
      m('str', 'Steers', 'ST', 'Dining', '#10b981', 6800, 22, +8.8, '2026-09-16'),
      m('shl', 'Shell', 'SH', 'Transport', '#3b82f6', 5800, 18, +2.4, '2026-09-17'),
      m('spf', 'Spotify', 'SP', 'Entertainment', '#ec4899', 2400, 12, 0.0, '2026-09-01'),
      m('wlx', 'Woolworths Food', 'WF', 'Groceries', '#7c3aed', 4800, 14, +1.6, '2026-09-12'),
    ],
  },

  // ── Vikesh Govender — groceries & professional (KZN) ───────────────
  '100456789': {
    otherSpend: 149800,
    merchants: [
      m('chv', 'Checkers', 'CH', 'Groceries', '#7c3aed', 42400, 72, +2.8, '2026-09-19'),
      m('pnv', 'Pick n Pay', 'PP', 'Groceries', '#7c3aed', 32600, 56, +1.2, '2026-09-18'),
      m('nav', "Nando's", 'NA', 'Dining', '#10b981', 28400, 44, +6.4, '2026-09-20'),
      m('wlv', 'Woolworths', 'WL', 'Retail', '#f59e0b', 24800, 28, +4.8, '2026-09-15'),
      m('dsc', 'Discovery Health', 'DH', 'Healthcare', '#f97316', 22000, 12, +8.2, '2026-09-01'),
      m('ubv', 'Uber', 'UB', 'Transport', '#3b82f6', 18600, 68, +14.4, '2026-09-21'),
      m('eskv', 'Eskom', 'ES', 'Utilities', '#ef4444', 16800, 12, +1.6, '2026-09-01'),
      m('kul', 'Kulula.com', 'KL', 'Travel', '#06b6d4', 16200, 8, +18.8, '2026-09-10'),
      m('dcv', 'Dis-Chem', 'DC', 'Healthcare', '#f97316', 14400, 24, +3.2, '2026-09-14'),
      m('mrv', 'Mr Price', 'MP', 'Retail', '#f59e0b', 11600, 16, -2.4, '2026-09-08'),
      m('vdv', 'Vida e Caffè', 'VC', 'Dining', '#10b981', 10800, 36, +8.6, '2026-09-21'),
      m('clc', 'Cell C', 'CC', 'Utilities', '#ef4444', 9600, 12, 0.0, '2026-09-01'),
    ],
  },

  // ── Kobus van der Berg — lifestyle & luxury (WC) ────────────────────
  '100678901': {
    otherSpend: 239400,
    merchants: [
      m('wlk', 'Woolworths Fashion', 'WF', 'Retail', '#f59e0b', 82400, 32, +24.8, '2026-09-20'),
      m('zrk', 'Zara', 'ZA', 'Retail', '#f59e0b', 68200, 14, +18.4, '2026-09-17'),
      m('lac', 'La Colombe', 'LC', 'Dining', '#10b981', 56800, 28, +32.6, '2026-09-18'),
      m('tgm', "Tiger's Milk", 'TM', 'Dining', '#10b981', 42400, 38, +12.4, '2026-09-21'),
      m('stk', 'Ster-Kinekor', 'SK', 'Entertainment', '#ec4899', 38600, 22, -4.2, '2026-09-15'),
      m('srb', 'Sorbet', 'SR', 'Healthcare', '#f97316', 34200, 18, +8.6, '2026-09-12'),
      m('cum', 'Cape Union Mart', 'CU', 'Retail', '#f59e0b', 28800, 12, +14.2, '2026-09-10'),
      m('dstk', 'DSTV Premium', 'DT', 'Entertainment', '#ec4899', 24000, 12, 0.0, '2026-09-01'),
      m('ark', 'Airlink', 'AL', 'Travel', '#06b6d4', 22400, 6, +28.4, '2026-09-14'),
      m('ftn', 'Faithful to Nature', 'FN', 'Retail', '#f59e0b', 18600, 8, +6.8, '2026-09-06'),
      m('bpk', 'BP', 'BP', 'Transport', '#3b82f6', 16400, 42, +2.4, '2026-09-21'),
      m('vdk', 'Vida e Caffè', 'VC', 'Dining', '#10b981', 14800, 52, +16.2, '2026-09-20'),
    ],
  },

  // ── Anna-Marie Botha — essentials & retiree (FS) ────────────────────
  '100789012': {
    otherSpend: 55200,
    merchants: [
      m('spk', 'Spar', 'SA', 'Groceries', '#7c3aed', 28400, 48, +1.2, '2026-09-20'),
      m('chk', 'Checkers', 'CH', 'Groceries', '#7c3aed', 22600, 36, +0.8, '2026-09-19'),
      m('clk', 'Clicks', 'CL', 'Healthcare', '#f97316', 16800, 24, +2.4, '2026-09-16'),
      m('esk2', 'Eskom', 'ES', 'Utilities', '#ef4444', 14400, 12, +1.6, '2026-09-01'),
      m('pnk', 'Pick n Pay', 'PP', 'Groceries', '#7c3aed', 12800, 22, -0.8, '2026-09-15'),
      m('shk', 'Shell', 'SH', 'Transport', '#3b82f6', 9600, 28, +1.2, '2026-09-18'),
      m('wmp', 'Wimpy', 'WI', 'Dining', '#10b981', 8400, 14, +0.4, '2026-09-14'),
      m('vodk', 'Vodacom', 'VO', 'Utilities', '#ef4444', 7200, 12, 0.0, '2026-09-01'),
      m('dck', 'Dis-Chem', 'DC', 'Healthcare', '#f97316', 5800, 10, +1.8, '2026-09-10'),
      m('stk2', 'Steers', 'ST', 'Dining', '#10b981', 4800, 12, -1.2, '2026-09-08'),
      m('eng', 'Engen', 'EN', 'Transport', '#3b82f6', 3800, 14, +0.6, '2026-09-12'),
      m('mak', 'Makro', 'MK', 'Retail', '#f59e0b', 3200, 4, +3.2, '2026-09-05'),
    ],
  },
}
