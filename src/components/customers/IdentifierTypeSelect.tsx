import type { IdentifierType } from '@/data/customers'

const OPTIONS: IdentifierType[] = ['CIF', 'Account Number', 'ID Number', 'Name']

const SHORT_LABEL: Record<IdentifierType, string> = {
  CIF: 'CIF',
  'Account Number': 'Account No.',
  'ID Number': 'ID No.',
  Name: 'Name',
}

interface Props {
  value: IdentifierType
  onChange: (v: IdentifierType) => void
}

export default function IdentifierTypeSelect({ value, onChange }: Props) {
  return (
    <div className="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-white/[0.06]">
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap
            ${
              opt === value
                ? 'bg-white dark:bg-[#1C1B2E] text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}>
          {SHORT_LABEL[opt]}
        </button>
      ))}
    </div>
  )
}
