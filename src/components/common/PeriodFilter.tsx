import { ChevronDown } from 'lucide-react'

export type TimePeriod = '1M' | '3M' | '6M' | '9M' | '12M'

export const PERIOD_MONTHS: Record<TimePeriod, number> = {
  '1M': 1,
  '3M': 3,
  '6M': 6,
  '9M': 9,
  '12M': 12,
}

const OPTIONS: { value: TimePeriod; label: string }[] = [
  { value: '1M', label: 'Last month' },
  { value: '3M', label: '3 months' },
  { value: '6M', label: '6 months' },
  { value: '9M', label: '9 months' },
  { value: '12M', label: '12 months' },
]

interface Props {
  value: TimePeriod
  onChange: (v: TimePeriod) => void
}

export default function PeriodFilter({ value, onChange }: Props) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TimePeriod)}
        className="
          appearance-none pl-3 pr-7 py-1.5
          text-xs font-medium rounded-lg cursor-pointer
          border border-gray-200 dark:border-[#2D2C44]
          bg-white dark:bg-[#1C1B2E]
          text-gray-700 dark:text-gray-300
          focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400
          transition-colors
        ">
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={12}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  )
}
