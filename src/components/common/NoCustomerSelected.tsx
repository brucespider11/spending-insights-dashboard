import { useNavigate } from 'react-router-dom'
import { UserSearch, Search } from 'lucide-react'
import { CUSTOMERS } from '@/data/customers'
import { useCustomer } from '@/context/CustomerContext'

const RISK_COLORS: Record<string, string> = {
  Low: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10',
  Medium: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10',
  High: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10',
}

export default function NoCustomerSelected() {
  const { setCustomer } = useCustomer()
  const navigate = useNavigate()

  function loadDemo(cif: string) {
    const c = CUSTOMERS.find((x) => x.cif === cif)
    if (c) {
      setCustomer(c)
      navigate('/')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] px-4 py-8">
      {/* Icon */}
      <div className="w-20 h-20 rounded-3xl bg-gray-100 dark:bg-white/5 border-2 border-dashed border-gray-200 dark:border-[#2D2C44] flex items-center justify-center mb-6">
        <UserSearch size={32} className="text-gray-300 dark:text-gray-600" />
      </div>

      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 text-center">
        No customer selected
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-500 max-w-xs mb-8 leading-relaxed text-center">
        Search by CIF, account number, ID number, or name — or load a demo profile below.
      </p>

      <button
        onClick={() => navigate('/customers')}
        className="btn-primary px-6 py-2.5 text-sm mb-10">
        <Search size={15} />
        Search for customer
      </button>

      {/* Demo profiles */}
      <div className="w-full max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600 mb-3 text-center">
          Demo profiles
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {CUSTOMERS.map((c) => (
            <button
              key={c.cif}
              onClick={() => loadDemo(c.cif)}
              className="card p-5 text-left hover:shadow-md dark:hover:border-[#3D3C54] transition-all duration-200 group">
              {/* Avatar + name */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                  style={{ background: c.segmentColor }}>
                  {c.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {c.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                    CIF {c.cif}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    Acc {c.accountNumber}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-mono truncate">
                    ID {c.idNumber}
                  </p>
                  <p className="text-xs font-semibold truncate" style={{ color: c.segmentColor }}>
                    {c.segment}
                  </p>
                </div>
              </div>

              {/* Risk badge */}
              <span
                className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full ${RISK_COLORS[c.riskProfile]}`}>
                {c.riskProfile} risk
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
