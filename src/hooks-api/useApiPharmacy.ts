import useSWR from 'swr'

import { type Pharmacy } from '../types/pharmacy'
import { clientSWRFetcher } from '../utils/clientSWRFetcher'

export function useApiPharmacy () {
  const key = '/pharmacies/all_pharmacies'
  const { data, error, isLoading, mutate } = useSWR<Pharmacy[]>(key, clientSWRFetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
