import { createContext, useContext, useState, type ReactNode } from 'react'
import type { CustomerProfile } from '@/data/customers'

interface CustomerContextType {
  customer: CustomerProfile | null
  setCustomer: (c: CustomerProfile) => void
  clearCustomer: () => void
}

const CustomerContext = createContext<CustomerContextType | null>(null)

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomerState] = useState<CustomerProfile | null>(null)

  return (
    <CustomerContext.Provider
      value={{
        customer,
        setCustomer: setCustomerState,
        clearCustomer: () => setCustomerState(null),
      }}>
      {children}
    </CustomerContext.Provider>
  )
}

export function useCustomer(): CustomerContextType {
  const ctx = useContext(CustomerContext)
  if (!ctx) throw new Error('useCustomer must be used inside <CustomerProvider>')
  return ctx
}
