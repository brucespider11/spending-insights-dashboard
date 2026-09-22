import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { IdentifierType } from '@/data/customers'

const OPTIONS: IdentifierType[] = ['CIF', 'Account Number', 'ID Number', 'CIF (Business)']

interface Props {
  value: IdentifierType
  onChange: (v: IdentifierType) => void
}

export default function IdentifierTypeSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`
          w-full relative flex items-center justify-between
          px-4 pt-6 pb-3 rounded-xl text-sm font-medium text-left
          border-2 transition-colors duration-150
          bg-white dark:bg-[#1C1B2E]
          ${
            open
              ? 'border-brand-500 dark:border-brand-500'
              : 'border-gray-200 dark:border-[#2D2C44] hover:border-gray-300 dark:hover:border-[#3D3C54]'
          }
          text-gray-800 dark:text-gray-200
        `}
        aria-haspopup="listbox"
        aria-expanded={open}>
        {/* Floating label */}
        <span
          className={`
          absolute top-2 left-4 text-xs font-semibold tracking-wide transition-colors
          ${open ? 'text-brand-500' : 'text-gray-400 dark:text-gray-500'}
        `}>
          Identifier Type
        </span>
        <span>{value}</span>
        <span
          className={`text-gray-400 dark:text-gray-500 transition-colors ${open ? 'text-brand-500' : ''}`}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {/* Dropdown list */}
      {open && (
        <ul
          role="listbox"
          className="
            absolute z-50 top-full left-0 right-0 mt-1
            bg-white dark:bg-[#1C1B2E]
            border border-gray-100 dark:border-[#2D2C44]
            rounded-xl shadow-xl overflow-hidden
          ">
          {OPTIONS.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={opt === value}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className={`
                px-4 py-3.5 text-sm cursor-pointer transition-colors
                ${
                  opt === value
                    ? 'bg-gray-50 dark:bg-white/5 font-semibold text-brand-600 dark:text-brand-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                }
              `}>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
