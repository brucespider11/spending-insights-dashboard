import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, Settings, ChevronDown, ChevronRight, X } from 'lucide-react'
import { useSidebar } from '@/context/SidebarContext'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface SubNavItem {
  label: string
  dot: string
  to: string
}

interface NavItem {
  icon: React.ReactNode
  label: string
  badge?: string
  to?: string
  children?: SubNavItem[]
}

const NAV_ITEMS: NavItem[] = [
  {
    icon: <LayoutDashboard size={18} />,
    label: 'Dashboards',
    children: [
      { label: 'Customer Overview', dot: 'bg-emerald-500', to: '/customers' },
      { label: 'Analytics', dot: 'bg-brand-600', to: '/' },
      { label: 'Spending Trends', dot: 'bg-blue-500', to: '/spending-trends' },
      { label: 'Transactions', dot: 'bg-amber-500', to: '/transactions' },
      { label: 'Categories', dot: 'bg-pink-500', to: '/categories' },
      { label: 'Merchant Insights', dot: 'bg-cyan-500', to: '/merchants' },
    ],
  },
  { icon: <Settings size={18} />, label: 'Settings', to: '/settings' },
]

function SidebarContent({ forceExpanded = false }: { forceExpanded?: boolean }) {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar()
  const location = useLocation()

  const isExpanded = forceExpanded || !collapsed

  // Keep Dashboards group open when any child route is active
  const dashboardRoutes = NAV_ITEMS[0].children!.map((c) => c.to)
  // '/' needs an exact match — every path starts with '/', so startsWith would always be true
  const dashboardActive = dashboardRoutes.some((r) =>
    r === '/' ? location.pathname === '/' : location.pathname.startsWith(r)
  )
  const [expandedItem, setExpandedItem] = useState<string>(dashboardActive ? 'Dashboards' : '')

  const toggleExpand = (label: string) => setExpandedItem((prev) => (prev === label ? '' : label))

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={`flex items-center h-[60px] px-4 flex-shrink-0 ${isExpanded ? 'gap-2.5' : 'justify-center'}`}>
        <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-[10px] font-bold tracking-tight">CSI</span>
        </div>
        {isExpanded && (
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold leading-none text-gray-500 dark:text-gray-500 truncate">
              Customer Spending
            </p>
            <p className="text-sm font-bold leading-tight tracking-tight text-gray-900 dark:text-white truncate">
              Insights<span className="text-brand-600">.</span>
            </p>
          </div>
        )}
        {forceExpanded && mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close menu">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-2 space-y-0.5">
        {isExpanded && (
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600 px-3 py-2 mt-1">
            Menu
          </p>
        )}

        {NAV_ITEMS.map((item) => {
          const hasChildren = item.children && item.children.length > 0
          const isItemExpanded = expandedItem === item.label

          if (hasChildren) {
            return (
              <div key={item.label}>
                <div
                  className={`sidebar-link ${isExpanded ? '' : 'justify-center px-0'}`}
                  onClick={() => toggleExpand(item.label)}
                  title={!isExpanded ? item.label : undefined}>
                  <span className="flex-shrink-0 text-gray-500 dark:text-gray-400">
                    {item.icon}
                  </span>
                  {isExpanded && (
                    <>
                      <span className="flex-1 text-gray-700 dark:text-gray-300">{item.label}</span>
                      <span className="text-gray-400 dark:text-gray-600">
                        {isItemExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </span>
                    </>
                  )}
                </div>

                {isExpanded && isItemExpanded && (
                  <div className="mt-0.5 space-y-0.5">
                    {item.children!.map((child) => (
                      <NavLink
                        key={child.label}
                        to={child.to}
                        end={child.to === '/'}
                        onClick={() => forceExpanded && setMobileOpen(false)}
                        className={({ isActive }) =>
                          `sidebar-sub-link ${isActive ? 'active' : ''}`
                        }>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${child.dot}`} />
                        <span>{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          // Leaf nav item
          return (
            <NavLink
              key={item.label}
              to={item.to ?? '#'}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''} ${isExpanded ? '' : 'justify-center px-0'}`
              }
              title={!isExpanded ? item.label : undefined}
              onClick={() => forceExpanded && setMobileOpen(false)}>
              <span className="flex-shrink-0 text-gray-500 dark:text-gray-400">{item.icon}</span>
              {isExpanded && (
                <>
                  <span className="flex-1 text-gray-700 dark:text-gray-300">{item.label}</span>
                  {item.badge && (
                    <span className="text-[11px] font-semibold bg-brand-100 dark:bg-brand-600/20 text-brand-600 dark:text-brand-400 px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* User at bottom */}
      {isExpanded && (
        <div className="p-3 border-t border-gray-100 dark:border-[#2D2C44] flex-shrink-0">
          <div className="px-2 py-2">
            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
              Customer Spending Insights
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-500 truncate">
              Analytics Platform
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Sidebar() {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  if (isDesktop) {
    return (
      <aside
        className={`
          fixed top-0 left-0 h-screen z-30 flex flex-col
          bg-white dark:bg-[#13121F]
          border-r border-gray-100 dark:border-[#2D2C44]
          transition-all duration-300 ease-in-out overflow-hidden
          ${collapsed ? 'w-16' : 'w-60'}
        `}>
        <SidebarContent />
      </aside>
    )
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`
          fixed top-0 left-0 h-screen z-50
          w-[min(80vw,320px)]
          bg-white dark:bg-[#13121F]
          border-r border-gray-100 dark:border-[#2D2C44]
          shadow-2xl
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
        <SidebarContent forceExpanded />
      </aside>
    </>
  )
}
