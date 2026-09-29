import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type ColorMode = 'light' | 'dark'

interface ThemeContextType {
  theme: ColorMode
  colorMode: ColorMode
  setColorMode: (mode: ColorMode) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ColorMode>(() => {
    const stored = localStorage.getItem('csi-theme')
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const setColorMode = (mode: ColorMode) => {
    setThemeState(mode)
    localStorage.setItem('csi-theme', mode)
  }

  const toggleTheme = () => setColorMode(theme === 'light' ? 'dark' : 'light')

  return (
    // colorMode is aliased to theme — both consumers see the same value via a single state
    <ThemeContext.Provider value={{ theme, colorMode: theme, setColorMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
