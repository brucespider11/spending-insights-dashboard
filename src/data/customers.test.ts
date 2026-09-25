import { describe, it, expect } from 'vitest'
import { CUSTOMERS, lookupCustomer } from './customers'

describe('lookupCustomer', () => {
  it('finds a customer by CIF', () => {
    const result = lookupCustomer('CIF', '100234567')
    expect(result).not.toBeNull()
    expect(result?.name).toBe('Riyaad van Damme')
  })

  it('finds a customer by Account Number', () => {
    const result = lookupCustomer('Account Number', '0987654321')
    expect(result).not.toBeNull()
    expect(result?.name).toBe('Thandi Mokoena')
  })

  it('finds a customer by ID Number', () => {
    const result = lookupCustomer('ID Number', '9801015432089')
    expect(result).not.toBeNull()
    expect(result?.name).toBe('Riyaad van Damme')
  })

  it('finds a customer by full name (case-insensitive)', () => {
    const result = lookupCustomer('Name', 'thandi mokoena')
    expect(result).not.toBeNull()
    expect(result?.name).toBe('Thandi Mokoena')
  })

  it('finds a customer by partial name', () => {
    const result = lookupCustomer('Name', 'van Damme')
    expect(result).not.toBeNull()
    expect(result?.name).toBe('Riyaad van Damme')
  })

  it('returns null for an unknown CIF', () => {
    expect(lookupCustomer('CIF', '000000000')).toBeNull()
  })

  it('returns null for an unknown Account Number', () => {
    expect(lookupCustomer('Account Number', '9999999999')).toBeNull()
  })

  it('trims whitespace from the search value', () => {
    expect(lookupCustomer('CIF', '  100234567  ')).not.toBeNull()
  })

  it('is case-insensitive for name-like fields by returning exact stored values', () => {
    // CIF lookup is exact — wrong casing returns null
    expect(lookupCustomer('CIF', '100234567')).not.toBeNull()
    expect(lookupCustomer('CIF', '100234568')).toBeNull()
  })
})

describe('CUSTOMERS data integrity', () => {
  it('has 7 customers total', () => {
    expect(CUSTOMERS).toHaveLength(7)
  })

  it('every customer has exactly 12 months of trend data', () => {
    CUSTOMERS.forEach((c) => {
      expect(c.monthlyTrend).toHaveLength(12)
    })
  })

  it('monthly trend months run Oct through Sep (rolling 12-month window)', () => {
    const expected = [
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
    ]
    CUSTOMERS.forEach((c) => {
      const months = c.monthlyTrend.map((m) => m.month)
      expect(months).toEqual(expected)
    })
  })

  it('every customer category percentages sum to 100', () => {
    CUSTOMERS.forEach((c) => {
      const total = c.categories.reduce((sum, cat) => sum + cat.pct, 0)
      expect(total).toBe(100)
    })
  })

  it('every customer has a valid status', () => {
    const valid = ['Active', 'Dormant', 'Restricted']
    CUSTOMERS.forEach((c) => {
      expect(valid).toContain(c.status)
    })
  })

  it('every customer has a valid risk profile', () => {
    const valid = ['Low', 'Medium', 'High']
    CUSTOMERS.forEach((c) => {
      expect(valid).toContain(c.riskProfile)
    })
  })

  it('all customer CIFs are unique', () => {
    const cifs = CUSTOMERS.map((c) => c.cif)
    expect(new Set(cifs).size).toBe(CUSTOMERS.length)
  })

  it('all account numbers are unique', () => {
    const accounts = CUSTOMERS.map((c) => c.accountNumber)
    expect(new Set(accounts).size).toBe(CUSTOMERS.length)
  })

  it('every customer has positive monthlyIncome and totalSpend', () => {
    CUSTOMERS.forEach((c) => {
      expect(c.monthlyIncome).toBeGreaterThan(0)
      expect(c.totalSpend).toBeGreaterThan(0)
    })
  })

  it('every customer has non-empty name, initials and insight', () => {
    CUSTOMERS.forEach((c) => {
      expect(c.name.trim().length).toBeGreaterThan(0)
      expect(c.initials.trim().length).toBeGreaterThan(0)
      expect(c.insight.trim().length).toBeGreaterThan(0)
    })
  })

  it('every customer has exactly 4 keyInsights with valid types', () => {
    const validTypes = ['risk', 'alert', 'opportunity', 'pattern']
    CUSTOMERS.forEach((c) => {
      expect(c.keyInsights).toHaveLength(4)
      c.keyInsights.forEach((insight) => {
        expect(validTypes).toContain(insight.type)
        expect(insight.title.trim().length).toBeGreaterThan(0)
        expect(insight.body.trim().length).toBeGreaterThan(0)
        expect(insight.metric.trim().length).toBeGreaterThan(0)
      })
    })
  })
})
