import useSWR from 'swr'

import { type PharmacyMaskListSchema } from '../components/PharmacyMaskList/PharmacyMaskList'
import { type PharmacyMask } from '../types/pharmacy'
import { clientSWRFetcher } from '../utils/clientSWRFetcher'
import { queryStringify } from '../utils/queryStringify'

export interface PharmacyMasksParams extends Partial<PharmacyMaskListSchema> {}

export function useApiPharmacyMasks (params: PharmacyMasksParams) {
  const newParams = {
    sort_by: params.sortBy,
    sort_order: params.sortOrder,
  }
  const key = params?.pharmacyId ? `/pharmacies/${params.pharmacyId}/masks?${queryStringify(newParams)}` : null
  const { data, error, isLoading, mutate } = useSWR<PharmacyMask[]>(key, clientSWRFetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
