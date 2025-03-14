import useSWR from 'swr'

import { type AllPharmacyMask } from '../types/pharmacy'
import { clientSWRFetcher } from '../utils/clientSWRFetcher'

export function useApiAllPharmacyMasks () {
  const key = '/pharmacies/all_masks'
  const { data, error, isLoading, mutate } = useSWR<AllPharmacyMask>(key, clientSWRFetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
