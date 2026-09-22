import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PeriodFilter, { PERIOD_MONTHS } from './PeriodFilter'

describe('PeriodFilter', () => {
  it('renders all five period options', () => {
    render(<PeriodFilter value="12M" onChange={() => {}} />)
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    // Options use human labels; verify by value attribute
    ;['1M', '3M', '6M', '9M', '12M'].forEach((value) => {
      expect(select.querySelector(`option[value="${value}"]`)).toBeInTheDocument()
    })
  })

  it('shows the current value as selected', () => {
    render(<PeriodFilter value="6M" onChange={() => {}} />)
    expect(screen.getByRole('combobox')).toHaveValue('6M')
  })

  it('calls onChange with the selected value', async () => {
    const onChange = vi.fn()
    render(<PeriodFilter value="12M" onChange={onChange} />)
    await userEvent.selectOptions(screen.getByRole('combobox'), '3M')
    expect(onChange).toHaveBeenCalledWith('3M')
  })

  it('calls onChange exactly once per selection', async () => {
    const onChange = vi.fn()
    render(<PeriodFilter value="12M" onChange={onChange} />)
    await userEvent.selectOptions(screen.getByRole('combobox'), '1M')
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})

describe('PERIOD_MONTHS', () => {
  it('maps each period key to the correct number of months', () => {
    expect(PERIOD_MONTHS['1M']).toBe(1)
    expect(PERIOD_MONTHS['3M']).toBe(3)
    expect(PERIOD_MONTHS['6M']).toBe(6)
    expect(PERIOD_MONTHS['9M']).toBe(9)
    expect(PERIOD_MONTHS['12M']).toBe(12)
  })

  it('has exactly 5 entries', () => {
    expect(Object.keys(PERIOD_MONTHS)).toHaveLength(5)
  })

  it('all values are positive integers', () => {
    Object.values(PERIOD_MONTHS).forEach((v) => {
      expect(v).toBeGreaterThan(0)
      expect(Number.isInteger(v)).toBe(true)
    })
  })
})
