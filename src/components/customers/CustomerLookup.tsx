import { useState } from 'react'
import { flushSync } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { Search, AlertCircle, X } from 'lucide-react'
import IdentifierTypeSelect from './IdentifierTypeSelect'
import { useCustomer } from '@/context/CustomerContext'
import {
  CUSTOMERS,
  lookupCustomer,
  searchCustomersByName,
  type IdentifierType,
  type CustomerProfile,
} from '@/data/customers'

const PLACEHOLDERS: Record<IdentifierType, string> = {
  CIF: 'e.g. 100234567',
  'Account Number': 'e.g. 1234567890',
  'ID Number': 'e.g. 9801015432089',
  Name: 'e.g. Thandi Mokoena',
}

const FORMAT_RULES: Partial<Record<IdentifierType, { length: number }>> = {
  CIF: { length: 9 },
  'Account Number': { length: 10 },
  'ID Number': { length: 13 },
}

interface Props {
  /** Called after a successful lookup — optional, context + navigate always runs */
  onFound?: (customer: CustomerProfile) => void
}

export default function CustomerLookup({ onFound }: Props) {
  const { setCustomer } = useCustomer()
  const navigate = useNavigate()

  const [idType, setIdType] = useState<IdentifierType>('CIF')
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadMsg, setLoadMsg] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [loadingCif, setLoadingCif] = useState<string | null>(null)
  const [nameResults, setNameResults] = useState<CustomerProfile[]>([])

  const handleSearch = async (searchValue = value, searchType = idType) => {
    if (!searchValue.trim()) return
    setNotFound(false)
    setLoading(true)
    setLoadMsg('Connecting to CIF database…')

    // Simulated latency — mimics a real CIF database round-trip for demo purposes
    await new Promise((r) => setTimeout(r, 900))
    setLoadMsg('Loading customer profile…')
    await new Promise((r) => setTimeout(r, 700))

    const found = lookupCustomer(searchType, searchValue)
    setLoading(false)

    if (found) {
      setCustomer(found)
      onFound?.(found)
      navigate('/')
    } else {
      setLoadingCif(null)
      setNotFound(true)
    }
  }

  const quickLookup = (customer: (typeof CUSTOMERS)[0]) => {
    // flushSync forces the highlight to paint before React batches in setLoading(true)
    flushSync(() => setLoadingCif(customer.cif))
    setIdType('CIF')
    setValue(customer.cif)
    handleSearch(customer.cif, 'CIF')
  }

  const rule = FORMAT_RULES[idType]
  const expectedLen = rule?.length
  const isFormatError = !!expectedLen && value.length > 0 && value.length !== expectedLen
  const digitHint = expectedLen && value.length > 0 ? `${value.length}/${expectedLen}` : null
  const clearValue = () => {
    setValue('')
    setNotFound(false)
    setNameResults([])
  }

  // Full-page spinner only for manual form searches — quick lookups show inline button spinner
  if (loading && !loadingCif) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
        <div className="w-14 h-14 rounded-full border-4 border-brand-200 dark:border-brand-900 border-t-brand-600 animate-spin" />
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 animate-pulse">
            {loadMsg}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">This may take a moment</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-sm font-bold tracking-tight">CS</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Lookup</h1>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1.5 max-w-xs mx-auto">
            Search by CIF, account number, ID number, or name to view spending insights.
          </p>
        </div>

        {/* Form card */}
        <div className="card p-6 flex flex-col gap-4">
          {/* Identifier type */}
          <IdentifierTypeSelect
            value={idType}
            onChange={(v) => {
              setIdType(v)
              setValue('')
              setNotFound(false)
              setNameResults([])
            }}
          />

          {/* Value input */}
          <div className="relative">
            <span className="absolute top-2 left-4 text-xs font-semibold tracking-wide text-gray-400 dark:text-gray-500 pointer-events-none">
              Customer Identifier
            </span>

            {/* Right-side controls: digit counter + clear button */}
            {value && (
              <div className="absolute top-2 right-3 flex items-center gap-1.5 z-10">
                {digitHint && (
                  <span
                    className={`text-[11px] font-semibold tabular-nums ${
                      isFormatError
                        ? 'text-rose-500 dark:text-rose-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}>
                    {digitHint}
                  </span>
                )}
                <button
                  type="button"
                  onClick={clearValue}
                  className="p-0.5 rounded-md text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  aria-label="Clear">
                  <X size={13} />
                </button>
              </div>
            )}

            <input
              type="text"
              value={value}
              onChange={(e) => {
                const v = e.target.value
                setValue(v)
                setNotFound(false)
                if (idType === 'Name') {
                  setNameResults(v.trim().length >= 2 ? searchCustomersByName(v) : [])
                }
              }}
              onKeyDown={(e) => e.key === 'Enter' && idType !== 'Name' && handleSearch()}
              placeholder={PLACEHOLDERS[idType]}
              className={`
                w-full px-4 pt-6 pb-3 rounded-xl text-sm font-medium
                border-2 bg-white dark:bg-[#1C1B2E]
                text-gray-800 dark:text-gray-200
                placeholder:text-gray-300 dark:placeholder:text-gray-600
                focus:outline-none transition-colors
                ${value ? 'pr-20' : ''}
                ${
                  isFormatError
                    ? 'border-rose-300 dark:border-rose-500/50 focus:border-rose-400 dark:focus:border-rose-500'
                    : 'border-gray-200 dark:border-[#2D2C44] hover:border-gray-300 dark:hover:border-[#3D3C54] focus:border-brand-500'
                }
              `}
            />
          </div>

          {/* Name search — live results list */}
          {idType === 'Name' && value.trim().length >= 2 && (
            <div className="flex flex-col gap-1">
              {nameResults.length === 0 ? (
                <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20">
                  <AlertCircle size={15} className="text-rose-500 flex-shrink-0" />
                  <p className="text-xs text-rose-600 dark:text-rose-400">
                    No customers found matching "{value.trim()}"
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-xs text-gray-400 dark:text-gray-600 px-1">
                    {nameResults.length} result{nameResults.length > 1 ? 's' : ''} — select to load
                  </p>
                  {nameResults.map((c) => (
                    <button
                      key={c.cif}
                      onClick={() => quickLookup(c)}
                      disabled={loading}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl border
                                 border-gray-100 dark:border-[#2D2C44]
                                 bg-gray-50/50 dark:bg-white/[0.02]
                                 hover:border-brand-300 dark:hover:border-brand-600/50
                                 hover:bg-brand-50/40 dark:hover:bg-brand-600/5
                                 transition-all duration-150 text-left group">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: c.segmentColor }}>
                        {c.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {c.name}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-600">
                          CIF {c.cif} · {c.accountNumber}
                        </p>
                      </div>
                      <span
                        className="text-xs font-semibold flex-shrink-0"
                        style={{ color: c.segmentColor }}>
                        {c.segment}
                      </span>
                    </button>
                  ))}
                </>
              )}
            </div>
          )}

          {/* Not found error — exact lookups only */}
          {notFound && idType !== 'Name' && (
            <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20">
              <AlertCircle size={15} className="text-rose-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-rose-600 dark:text-rose-400">
                No customer found for the provided identifier. Please check and try again.
              </p>
            </div>
          )}

          {/* Submit — hidden for name search (live results replace it) */}
          {idType !== 'Name' && (
            <button
              onClick={() => handleSearch()}
              disabled={!value.trim()}
              className="btn-primary justify-center py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed">
              <Search size={15} />
              Look up customer
            </button>
          )}
        </div>

        {/* Demo quick-access */}
        <div className="mt-6">
          <p className="text-xs text-center text-gray-400 dark:text-gray-600 mb-3 uppercase tracking-wider font-semibold">
            Demo profiles
          </p>
          <div className="flex flex-col gap-2">
            {CUSTOMERS.map((c) => {
              const isLoadingThis = loadingCif === c.cif
              return (
                <button
                  key={c.cif}
                  onClick={() => quickLookup(c)}
                  disabled={loading}
                  className={`flex items-start gap-3 px-4 py-3 rounded-xl
                             border transition-all duration-150 text-left group
                             ${
                               isLoadingThis
                                 ? 'border-brand-400 dark:border-brand-500 bg-brand-50 dark:bg-brand-600/10'
                                 : 'bg-white dark:bg-[#1C1B2E] border-gray-100 dark:border-[#2D2C44] hover:border-brand-300 dark:hover:border-brand-600/50 hover:bg-brand-50/30 dark:hover:bg-brand-600/5'
                             }`}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: c.segmentColor }}>
                    {c.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-semibold transition-colors
                        ${isLoadingThis ? 'text-brand-600 dark:text-brand-400' : 'text-gray-800 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400'}`}>
                      {c.name}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-600">CIF {c.cif}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-600">
                      Acc {c.accountNumber}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-600 font-mono">
                      ID {c.idNumber}
                    </p>
                    <p className="text-xs font-semibold" style={{ color: c.segmentColor }}>
                      {c.segment}
                    </p>
                  </div>
                  <span className="flex-shrink-0">
                    {isLoadingThis ? (
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-brand-300 dark:border-brand-700 border-t-brand-600 dark:border-t-brand-400 animate-spin block" />
                    ) : (
                      <span className="text-xs text-brand-400 dark:text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        Look up →
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
