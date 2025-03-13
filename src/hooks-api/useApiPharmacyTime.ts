import useSWR from 'swr'

import { clientSWRFetcher } from '../utils/clientSWRFetcher'

interface PharmacyTime {
  id: number | string,
  cash_balance: number,
  name: string,
}

export function useApiPharmacyTime (queryString?: string) {
  const key = queryString ? `/pharmacies/open?${queryString}` : null
  const { data, error, isLoading, mutate } = useSWR<PharmacyTime[]>(key, clientSWRFetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
