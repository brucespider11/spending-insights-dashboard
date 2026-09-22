import { createContext, useContext, useState, type ReactNode } from 'react'
import type { CustomerProfile } from '@/data/customers'

interface CustomerContextType {
  customer: CustomerProfile | null
  setCustomer: (c: CustomerProfile) => void
  clearCustomer: () => void
}

const CustomerContext = createContext<CustomerContextType>({
  customer: null,
  setCustomer: () => {},
  clearCustomer: () => {},
})

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomerState] = useState<CustomerProfile | null>(null)

  return (
    <CustomerContext.Provider
      value={{
        customer,
        setCustomer: (c) => setCustomerState(c),
        clearCustomer: () => setCustomerState(null),
      }}>
      {children}
    </CustomerContext.Provider>
  )
}

export const useCustomer = () => useContext(CustomerContext)
