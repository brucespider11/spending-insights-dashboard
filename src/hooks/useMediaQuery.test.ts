import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useMediaQuery } from './useMediaQuery'

type ChangeHandler = (e: MediaQueryListEvent) => void

function makeMQL(matches: boolean) {
  const handlers: ChangeHandler[] = []
  const mql = {
    matches,
    addEventListener: vi.fn((_: string, h: ChangeHandler) => handlers.push(h)),
    removeEventListener: vi.fn((_: string, h: ChangeHandler) => {
      const i = handlers.indexOf(h)
      if (i !== -1) handlers.splice(i, 1)
    }),
    fire: (m: boolean) => handlers.forEach((h) => h({ matches: m } as MediaQueryListEvent)),
  }
  return mql
}

describe('useMediaQuery', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns the current mql.matches value after mount', () => {
    const mql = makeMQL(true)
    window.matchMedia = vi.fn().mockReturnValue(mql)
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('returns false when media query does not match', () => {
    const mql = makeMQL(false)
    window.matchMedia = vi.fn().mockReturnValue(mql)
    const { result } = renderHook(() => useMediaQuery('(min-width: 1280px)'))
    expect(result.current).toBe(false)
  })

  it('updates when the media query fires a change event', () => {
    const mql = makeMQL(false)
    window.matchMedia = vi.fn().mockReturnValue(mql)
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    act(() => mql.fire(true))
    expect(result.current).toBe(true)
    act(() => mql.fire(false))
    expect(result.current).toBe(false)
  })

  it('removes the event listener on unmount', () => {
    const mql = makeMQL(false)
    window.matchMedia = vi.fn().mockReturnValue(mql)
    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    unmount()
    expect(mql.removeEventListener).toHaveBeenCalledTimes(1)
  })

  it('re-subscribes when the query string changes', () => {
    const mql = makeMQL(false)
    window.matchMedia = vi.fn().mockReturnValue(mql)
    const { rerender } = renderHook(({ q }) => useMediaQuery(q), {
      initialProps: { q: '(min-width: 768px)' },
    })
    rerender({ q: '(min-width: 1024px)' })
    expect(window.matchMedia).toHaveBeenCalledTimes(2)
  })
})
