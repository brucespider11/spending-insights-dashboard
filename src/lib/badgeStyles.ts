export const RISK_BADGE: Record<'Low' | 'Medium' | 'High', string> = {
  Low: 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  Medium: 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400',
  High: 'bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400',
}

// Bordered variant — used where the badge sits on a white/card background with an explicit border
export const RISK_BADGE_BORDERED: Record<'Low' | 'Medium' | 'High', string> = {
  Low: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
  Medium:
    'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
  High: 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/20',
}

export const STATUS_BADGE: Record<'Active' | 'Dormant' | 'Restricted', string> = {
  Active: 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  Dormant: 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400',
  Restricted: 'bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400',
}
