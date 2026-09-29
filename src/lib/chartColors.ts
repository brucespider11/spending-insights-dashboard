// Static hex values for Recharts props — Tailwind classes can't be used in chart config objects.
// These must stay in sync with the Tailwind theme: brand-600 and emerald-500.
export const CHART = {
  brand: '#7c3aed', // brand-600 — spend series, primary accent
  income: '#10b981', // emerald-500 — income series, positive values
} as const
