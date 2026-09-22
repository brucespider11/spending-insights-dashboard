import { describe, it, expect } from 'vitest'
import { MERCHANT_DATA, getPeriodSpend } from './merchants'
import { CUSTOMERS } from './customers'

describe('getPeriodSpend', () => {
  const sample = MERCHANT_DATA['100234567'].merchants[0]

  it('returns a positive number for all valid periods', () => {
    ;[1, 3, 6, 9, 12].forEach((n) => {
      expect(getPeriodSpend(sample, n)).toBeGreaterThan(0)
    })
  })

  it('12-month spend approximates the full annual total within 1%', () => {
    const full = getPeriodSpend(sample, 12)
    expect(Math.abs(full - sample.totalSpend) / sample.totalSpend).toBeLessThan(0.01)
  })

  it('shorter periods return less spend than longer periods', () => {
    const one = getPeriodSpend(sample, 1)
    const six = getPeriodSpend(sample, 6)
    const full = getPeriodSpend(sample, 12)
    expect(one).toBeLessThan(six)
    expect(six).toBeLessThan(full)
  })

  it('returns an integer (Math.round applied)', () => {
    ;[1, 3, 6, 9, 12].forEach((n) => {
      const result = getPeriodSpend(sample, n)
      expect(result).toBe(Math.round(result))
    })
  })
})

describe('MERCHANT_DATA integrity', () => {
  it('every customer has a merchant data entry', () => {
    CUSTOMERS.forEach((c) => {
      expect(MERCHANT_DATA[c.cif]).toBeDefined()
    })
  })

  it('every customer has exactly 12 tracked merchants', () => {
    CUSTOMERS.forEach((c) => {
      expect(MERCHANT_DATA[c.cif].merchants).toHaveLength(12)
    })
  })

  it('all merchant IDs are unique within each customer', () => {
    CUSTOMERS.forEach((c) => {
      const ids = MERCHANT_DATA[c.cif].merchants.map((m) => m.id)
      expect(new Set(ids).size).toBe(ids.length)
    })
  })

  it('every merchant has positive totalSpend and visitCount', () => {
    CUSTOMERS.forEach((c) => {
      MERCHANT_DATA[c.cif].merchants.forEach((m) => {
        expect(m.totalSpend).toBeGreaterThan(0)
        expect(m.visitCount).toBeGreaterThan(0)
      })
    })
  })

  it('avgSpend is correctly derived from totalSpend / visitCount', () => {
    CUSTOMERS.forEach((c) => {
      MERCHANT_DATA[c.cif].merchants.forEach((m) => {
        expect(m.avgSpend).toBe(Math.round(m.totalSpend / m.visitCount))
      })
    })
  })

  it('every merchant has a non-empty name and category', () => {
    CUSTOMERS.forEach((c) => {
      MERCHANT_DATA[c.cif].merchants.forEach((m) => {
        expect(m.name.trim().length).toBeGreaterThan(0)
        expect(m.category.trim().length).toBeGreaterThan(0)
      })
    })
  })

  it('every customer has a positive otherSpend', () => {
    CUSTOMERS.forEach((c) => {
      expect(MERCHANT_DATA[c.cif].otherSpend).toBeGreaterThan(0)
    })
  })
})
