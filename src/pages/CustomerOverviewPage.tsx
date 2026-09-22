import { useCustomer } from '@/context/CustomerContext'
import CustomerLookup from '@/components/customers/CustomerLookup'
import CustomerDashboard from '@/components/customers/CustomerDashboard'

export default function CustomerOverviewPage() {
  const { customer, clearCustomer } = useCustomer()

  if (customer) {
    return <CustomerDashboard customer={customer} onBack={clearCustomer} />
  }

  return <CustomerLookup />
}
