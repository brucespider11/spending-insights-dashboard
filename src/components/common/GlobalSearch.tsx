import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  LayoutDashboard,
  TrendingUp,
  ArrowLeftRight,
  Tag,
  Store,
  Settings,
  UserSearch,
  X,
  CornerDownLeft,
} from 'lucide-react'
import { useCustomer } from '@/context/CustomerContext'
import { CUSTOMERS } from '@/data/customers'
import type { CustomerProfile } from '@/data/customers'

interface Page {
  label: string
  to: string
  icon: React.ReactNode
}

const PAGES: Page[] = [
  { label: 'Customer Overview', to: '/customers', icon: <UserSearch size={14} /> },
  { label: 'Analytics', to: '/', icon: <LayoutDashboard size={14} /> },
  { label: 'Spending Trends', to: '/spending-trends', icon: <TrendingUp size={14} /> },
  { label: 'Transactions', to: '/transactions', icon: <ArrowLeftRight size={14} /> },
  { label: 'Categories', to: '/categories', icon: <Tag size={14} /> },
  { label: 'Merchant Insights', to: '/merchants', icon: <Store size={14} /> },
  { label: 'Settings', to: '/settings', icon: <Settings size={14} /> },
]

function matchesQuery(c: CustomerProfile, q: string) {
  const lower = q.toLowerCase()
  return (
    c.name.toLowerCase().includes(lower) ||
    c.cif.includes(q) ||
    c.accountNumber.includes(q) ||
    c.idNumber.includes(q)
  )
}

export default function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { setCustomer, customer: activeCustomer } = useCustomer()
  const navigate = useNavigate()

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
  }, [])

  // ⌘K / Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [close])

  // Click-outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [close])

  const filteredPages = query.trim()
    ? PAGES.filter((p) => p.label.toLowerCase().includes(query.toLowerCase()))
    : PAGES

  const filteredCustomers = query.trim()
    ? CUSTOMERS.filter((c) => matchesQuery(c, query.trim()))
    : CUSTOMERS

  const handleSelectCustomer = (c: CustomerProfile) => {
    setCustomer(c)
    navigate('/')
    close()
  }

  const handleSelectPage = (to: string) => {
    navigate(to)
    close()
  }

  const hasResults = filteredPages.length > 0 || filteredCustomers.length > 0

  return (
    <div ref={containerRef} className="relative flex-1 min-w-0">
      {/* Input */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search customers, pages…"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          className="w-full pl-9 pr-14 py-2 text-sm rounded-xl
                     bg-gray-50 dark:bg-white/5
                     border border-gray-200 dark:border-[#2D2C44]
                     text-gray-700 dark:text-gray-300
                     placeholder:text-gray-400 dark:placeholder:text-gray-600
                     focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400
                     transition-colors"
        />
        {query ? (
          <button
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <X size={14} />
          </button>
        ) : (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded hidden sm:block select-none">
            ⌘K
          </span>
        )}
      </div>

      {/* Dropdown panel */}
      {open && (
        <div
          className="
          absolute z-50 top-full left-0 right-0 mt-2
          bg-white dark:bg-[#1C1B2E]
          border border-gray-100 dark:border-[#2D2C44]
          rounded-2xl shadow-2xl overflow-hidden
          max-h-[420px] overflow-y-auto
        ">
          {!hasResults && (
            <div className="flex flex-col items-center gap-2 py-10 text-center">
              <Search size={22} className="text-gray-300 dark:text-gray-700" />
              <p className="text-sm text-gray-400 dark:text-gray-600">No results for "{query}"</p>
            </div>
          )}

          {/* Customers section */}
          {filteredCustomers.length > 0 && (
            <div>
              <p className="px-4 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600">
                Customers
              </p>
              {filteredCustomers.map((c) => (
                <button
                  key={c.cif}
                  onClick={() => handleSelectCustomer(c)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left group">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                    style={{ background: c.segmentColor }}>
                    {c.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate leading-tight">
                      {c.name}
                      {activeCustomer?.cif === c.cif && (
                        <span className="ml-2 text-[10px] font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 px-1.5 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-gray-400 dark:text-gray-600 truncate">
                      CIF {c.cif} · Acc {c.accountNumber} · {c.segment}
                    </p>
                  </div>
                  <CornerDownLeft
                    size={13}
                    className="text-gray-300 dark:text-gray-700 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Pages section */}
          {filteredPages.length > 0 && (
            <div
              className={
                filteredCustomers.length > 0 ? 'border-t border-gray-100 dark:border-[#2D2C44]' : ''
              }>
              <p className="px-4 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600">
                Pages
              </p>
              {filteredPages.map((p) => (
                <button
                  key={p.to}
                  onClick={() => handleSelectPage(p.to)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left group">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0 text-gray-500 dark:text-gray-400">
                    {p.icon}
                  </div>
                  <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {p.label}
                  </span>
                  <CornerDownLeft
                    size={13}
                    className="text-gray-300 dark:text-gray-700 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Footer hint */}
          <div className="px-4 py-2.5 border-t border-gray-100 dark:border-[#2D2C44] flex items-center gap-3 bg-gray-50/50 dark:bg-white/[0.02]">
            <span className="text-[10px] text-gray-400 dark:text-gray-600 flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-500 font-mono text-[10px]">
                ↵
              </kbd>
              select
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-600 flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-500 font-mono text-[10px]">
                esc
              </kbd>
              close
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
