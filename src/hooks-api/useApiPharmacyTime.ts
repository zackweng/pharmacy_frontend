import useSWR from 'swr'

import { type PharmacyTime } from '../types/pharmacy'
import { clientSWRFetcher } from '../utils/clientSWRFetcher'

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
