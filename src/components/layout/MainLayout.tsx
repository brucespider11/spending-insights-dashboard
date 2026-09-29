import { type ReactNode, useEffect } from 'react'
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

  // Keep --sidebar-offset in sync so the fixed Header can track sidebar width without a
  // <style> tag in the render tree (which causes extra style recalculations every render).
  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-offset', `${sidebarOffset}px`)
  }, [sidebarOffset])

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0F0E1A]">
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
