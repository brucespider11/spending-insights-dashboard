import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCustomer } from '@/context/CustomerContext'
import { lookupCustomer, type IdentifierType, type CustomerProfile } from '@/data/customers'

export interface UseCustomerSearchReturn {
  loading: boolean
  loadMsg: string
  notFound: boolean
  loadingCif: string | null
  setNotFound: (v: boolean) => void
  setLoadingCif: (cif: string | null) => void
  run: (searchValue: string, searchType: IdentifierType) => void
}

export function useCustomerSearch(onFound?: (c: CustomerProfile) => void): UseCustomerSearchReturn {
  const { setCustomer } = useCustomer()
  const navigate = useNavigate()
  const genRef = useRef(0)

  const [loading, setLoading] = useState(false)
  const [loadMsg, setLoadMsg] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [loadingCif, setLoadingCif] = useState<string | null>(null)

  const run = async (searchValue: string, searchType: IdentifierType) => {
    if (!searchValue.trim()) return
    const gen = ++genRef.current
    setNotFound(false)
    setLoading(true)
    setLoadMsg('Connecting to CIF database…')

    // Simulated latency — mimics a real CIF database round-trip for demo purposes
    await new Promise<void>((r) => setTimeout(r, 900))
    setLoadMsg('Loading customer profile…')
    await new Promise<void>((r) => setTimeout(r, 700))

    if (gen !== genRef.current) return

    const found = lookupCustomer(searchType, searchValue)
    setLoading(false)

    if (found) {
      setCustomer(found)
      onFound?.(found)
      navigate('/')
    } else {
      setLoadingCif(null)
      setNotFound(true)
    }
  }

  return { loading, loadMsg, notFound, setNotFound, loadingCif, setLoadingCif, run }
}
