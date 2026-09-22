import { Menu, Sun, Moon, X, UserSearch } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSidebar } from '@/context/SidebarContext'
import { useTheme } from '@/context/ThemeContext'
import { useCustomer } from '@/context/CustomerContext'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import GlobalSearch from '@/components/common/GlobalSearch'

export default function Header() {
  const { toggleCollapsed, setMobileOpen } = useSidebar()
  const { theme, toggleTheme } = useTheme()
  const { customer, clearCustomer } = useCustomer()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const handleHamburger = () => {
    if (isDesktop) {
      toggleCollapsed()
    } else {
      setMobileOpen(true)
    }
  }

  return (
    <header
      className="fixed top-0 right-0 z-30 h-[60px] flex items-center px-4 gap-3
                 bg-white dark:bg-[#13121F]
                 border-b border-gray-100 dark:border-[#2D2C44]
                 transition-[left] duration-300"
      style={{ left: 'var(--sidebar-offset, 0px)' }}>
      {/* Hamburger */}
      <button
        onClick={handleHamburger}
        className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors flex-shrink-0"
        aria-label="Toggle sidebar">
        <Menu size={18} />
      </button>

      {/* Search */}
      <GlobalSearch />

      {/* Customer indicator */}
      {customer ? (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-[#2D2C44] bg-white dark:bg-[#1C1B2E] flex-shrink-0 max-w-[220px]">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
            style={{ background: customer.segmentColor }}>
            {customer.initials}
          </div>
          <div className="min-w-0 hidden sm:block">
            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate leading-tight">
              {customer.name}
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">
              CIF {customer.cif}
            </p>
          </div>
          <button
            onClick={clearCustomer}
            className="p-0.5 rounded-md text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors flex-shrink-0"
            aria-label="Clear customer"
            title="Clear customer">
            <X size={13} />
          </button>
        </div>
      ) : (
        <Link
          to="/customers"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-500 dark:text-gray-500 border border-dashed border-gray-200 dark:border-[#2D2C44] hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex-shrink-0">
          <UserSearch size={13} />
          Select customer
        </Link>
      )}

      {/* Right controls */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          aria-label="Toggle theme">
          {theme === 'light' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-1 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-semibold">
            BM
          </div>
          <div className="hidden md:block leading-tight">
            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">Bruce Masenya</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  )
}
