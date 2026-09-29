import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useCustomerSearch } from './useCustomerSearch'
import type { CustomerProfile } from '@/data/customers'

const navigate = vi.fn()
const setCustomer = vi.fn()

vi.mock('react-router-dom', () => ({ useNavigate: () => navigate }))
vi.mock('@/context/CustomerContext', () => ({ useCustomer: () => ({ setCustomer }) }))

const mockLookup = vi.fn()
vi.mock('@/data/customers', () => ({
  lookupCustomer: (...args: unknown[]) => mockLookup(...args),
}))

const MOCK_CUSTOMER = { cif: 'C001', name: 'Test User' } as unknown as CustomerProfile

describe('useCustomerSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('exposes initial idle state', () => {
    const { result } = renderHook(() => useCustomerSearch())
    expect(result.current.loading).toBe(false)
    expect(result.current.notFound).toBe(false)
    expect(result.current.loadMsg).toBe('')
    expect(result.current.loadingCif).toBeNull()
  })

  it('does nothing when the search value is blank', async () => {
    const { result } = renderHook(() => useCustomerSearch())
    await act(async () => {
      result.current.run('   ', 'CIF')
    })
    expect(result.current.loading).toBe(false)
    expect(setCustomer).not.toHaveBeenCalled()
  })

  it('shows "Connecting…" immediately when search starts', () => {
    mockLookup.mockReturnValue(MOCK_CUSTOMER)
    const { result } = renderHook(() => useCustomerSearch())
    act(() => {
      result.current.run('C001', 'CIF')
    })
    expect(result.current.loading).toBe(true)
    expect(result.current.loadMsg).toBe('Connecting to CIF database…')
  })

  it('shows "Loading customer profile…" after the first delay', async () => {
    mockLookup.mockReturnValue(MOCK_CUSTOMER)
    const { result } = renderHook(() => useCustomerSearch())
    act(() => {
      result.current.run('C001', 'CIF')
    })
    await act(async () => {
      await vi.advanceTimersByTimeAsync(900)
    })
    expect(result.current.loadMsg).toBe('Loading customer profile…')
  })

  it('calls setCustomer, onFound, and navigate on a successful lookup', async () => {
    mockLookup.mockReturnValue(MOCK_CUSTOMER)
    const onFound = vi.fn()
    const { result } = renderHook(() => useCustomerSearch(onFound))

    await act(async () => {
      result.current.run('C001', 'CIF')
      await vi.runAllTimersAsync()
    })

    expect(setCustomer).toHaveBeenCalledWith(MOCK_CUSTOMER)
    expect(onFound).toHaveBeenCalledWith(MOCK_CUSTOMER)
    expect(navigate).toHaveBeenCalledWith('/')
    expect(result.current.loading).toBe(false)
  })

  it('sets notFound when lookup returns nothing', async () => {
    mockLookup.mockReturnValue(undefined)
    const { result } = renderHook(() => useCustomerSearch())

    await act(async () => {
      result.current.run('UNKNOWN', 'CIF')
      await vi.runAllTimersAsync()
    })

    expect(result.current.notFound).toBe(true)
    expect(navigate).not.toHaveBeenCalled()
    expect(result.current.loading).toBe(false)
  })

  it('clears notFound when a new search begins', async () => {
    mockLookup.mockReturnValue(undefined)
    const { result } = renderHook(() => useCustomerSearch())

    await act(async () => {
      result.current.run('UNKNOWN', 'CIF')
      await vi.runAllTimersAsync()
    })
    expect(result.current.notFound).toBe(true)

    act(() => {
      result.current.run('C001', 'CIF')
    })
    expect(result.current.notFound).toBe(false)
  })

  it('discards stale results when a second search overtakes the first', async () => {
    mockLookup.mockReturnValue(MOCK_CUSTOMER)
    const { result } = renderHook(() => useCustomerSearch())

    await act(async () => {
      result.current.run('C001', 'CIF') // gen = 1
      result.current.run('C002', 'CIF') // gen = 2 — makes gen 1 stale
      await vi.runAllTimersAsync()
    })

    // Both runs complete but only gen=2 should call navigate
    expect(navigate).toHaveBeenCalledTimes(1)
  })
})
