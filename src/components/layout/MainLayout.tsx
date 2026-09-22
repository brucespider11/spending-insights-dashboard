import { type ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { useSidebar } from '@/context/SidebarContext'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { collapsed } = useSidebar()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // On mobile there is no persistent sidebar — offset is 0
  const sidebarOffset = !isDesktop ? 0 : collapsed ? 64 : 240

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0F0E1A]">
      {/* Header is position:fixed so it can't inherit padding — CSS variable bridges the gap */}
      <style>{`:root { --sidebar-offset: ${sidebarOffset}px; }`}</style>

      <Sidebar />
      <Header />

      <main
        className="transition-[padding-left] duration-300 pt-[60px]"
        style={{ paddingLeft: sidebarOffset }}>
        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </div>
  )
}
