import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ThemeProvider, useTheme } from './ThemeContext'

// jsdom in this environment provides a minimal localStorage stub — replace with a proper in-memory mock
let store: Record<string, string> = {}
const mockLocalStorage = {
  getItem: (key: string) => store[key] ?? null,
  setItem: (key: string, value: string) => {
    store[key] = value
  },
  removeItem: (key: string) => {
    delete store[key]
  },
  clear: () => {
    store = {}
  },
}

function wrapper({ children }: { children: React.ReactNode }) {
  return React.createElement(ThemeProvider, null, children)
}

describe('ThemeContext', () => {
  beforeEach(() => {
    store = {}
    vi.stubGlobal('localStorage', mockLocalStorage)
    document.documentElement.classList.remove('dark')
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('throws when used outside ThemeProvider', () => {
    // jsdom dispatches a cancelable "error" event for errors thrown by event-listener callbacks.
    // Calling preventDefault() stops jsdom from forwarding it to virtualConsole (i.e. the terminal).
    const suppress = (e: Event) => e.preventDefault()
    window.addEventListener('error', suppress)
    vi.spyOn(console, 'error').mockImplementation(() => {})
    try {
      expect(() => renderHook(() => useTheme())).toThrow(
        'useTheme must be used inside <ThemeProvider>'
      )
    } finally {
      window.removeEventListener('error', suppress)
    }
  })

  it('defaults to light when localStorage is empty and no system dark-mode', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.theme).toBe('light')
    expect(result.current.colorMode).toBe('light')
  })

  it('reads stored dark theme from localStorage on init', () => {
    store['csi-theme'] = 'dark'
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.theme).toBe('dark')
  })

  it('toggleTheme flips light → dark', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('dark')
    expect(result.current.colorMode).toBe('dark')
  })

  it('toggleTheme flips dark → light', () => {
    store['csi-theme'] = 'dark'
    const { result } = renderHook(() => useTheme(), { wrapper })
    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('light')
  })

  it('setColorMode persists choice to localStorage', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    act(() => result.current.setColorMode('dark'))
    expect(store['csi-theme']).toBe('dark')
    act(() => result.current.setColorMode('light'))
    expect(store['csi-theme']).toBe('light')
  })

  it('colorMode is always equal to theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    act(() => result.current.setColorMode('dark'))
    expect(result.current.colorMode).toBe(result.current.theme)
  })

  it('adds dark class to documentElement when theme is dark', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    act(() => result.current.setColorMode('dark'))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes dark class when theme switches to light', () => {
    store['csi-theme'] = 'dark'
    const { result } = renderHook(() => useTheme(), { wrapper })
    act(() => result.current.setColorMode('light'))
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
