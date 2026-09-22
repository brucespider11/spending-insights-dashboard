import { describe, it, expect } from 'vitest'
import { CATEGORIES, getPeriodAmount } from './categories'

describe('getPeriodAmount', () => {
  const sample = CATEGORIES[0]

  it('returns a positive amount for all valid periods', () => {
    ;[1, 3, 6, 9, 12].forEach((n) => {
      expect(getPeriodAmount(sample, n)).toBeGreaterThan(0)
    })
  })

  it('12-month amount approximates the full annual amount within 1%', () => {
    const full = getPeriodAmount(sample, 12)
    expect(Math.abs(full - sample.amount) / sample.amount).toBeLessThan(0.01)
  })

  it('shorter periods return less than longer periods', () => {
    const one = getPeriodAmount(sample, 1)
    const six = getPeriodAmount(sample, 6)
    const full = getPeriodAmount(sample, 12)
    expect(one).toBeLessThan(six)
    expect(six).toBeLessThan(full)
  })

  it('returns an integer (Math.round applied)', () => {
    ;[1, 3, 6, 9, 12].forEach((n) => {
      const result = getPeriodAmount(sample, n)
      expect(result).toBe(Math.round(result))
    })
  })

  it('works correctly for an income category', () => {
    const income = CATEGORIES.find((c) => c.type === 'income')!
    expect(getPeriodAmount(income, 6)).toBeGreaterThan(0)
    expect(getPeriodAmount(income, 6)).toBeLessThan(getPeriodAmount(income, 12))
  })
})

describe('CATEGORIES data integrity', () => {
  it('has both expense and income categories', () => {
    const types = new Set(CATEGORIES.map((c) => c.type))
    expect(types.has('expense')).toBe(true)
    expect(types.has('income')).toBe(true)
  })

  it('all category IDs are unique', () => {
    const ids = CATEGORIES.map((c) => c.id)
    expect(new Set(ids).size).toBe(CATEGORIES.length)
  })

  it('every category has a positive amount', () => {
    CATEGORIES.forEach((c) => {
      expect(c.amount).toBeGreaterThan(0)
    })
  })

  it('every category has a non-empty trend array', () => {
    CATEGORIES.forEach((c) => {
      expect(c.trend.length).toBeGreaterThan(0)
    })
  })

  it('every category has a non-empty name and valid color hex', () => {
    CATEGORIES.forEach((c) => {
      expect(c.name.trim().length).toBeGreaterThan(0)
      expect(c.color).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  it('every category has a positive transaction count', () => {
    CATEGORIES.forEach((c) => {
      expect(c.transactions).toBeGreaterThan(0)
    })
  })
})
