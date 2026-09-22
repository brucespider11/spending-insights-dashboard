import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type ColorMode = 'light' | 'dark'

interface ThemeContextType {
  theme: ColorMode
  colorMode: ColorMode
  setColorMode: (mode: ColorMode) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colorMode: 'light',
  setColorMode: () => {},
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  // colorMode drives the settings UI; theme drives the <html> class — kept in sync via setColorMode
  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    const stored = localStorage.getItem('csi-theme')
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [theme, setTheme] = useState<ColorMode>(() => {
    const stored = localStorage.getItem('csi-theme')
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  // Apply class to <html> whenever resolved theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode)
    setTheme(mode)
    localStorage.setItem('csi-theme', mode)
  }

  const toggleTheme = () => setColorMode(theme === 'light' ? 'dark' : 'light')

  return (
    <ThemeContext.Provider value={{ theme, colorMode, setColorMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
