import useSWR from 'swr'

import { type MaskQuantityFilterSchema } from '../components/MaskQuantityFilter/MaskQuantityFilter'
import { type Pharmacy } from '../types/pharmacy'
import { clientSWRFetcher } from '../utils/clientSWRFetcher'
import { queryStringify } from '../utils/queryStringify'

export interface PharmacyFilterParams extends Partial<MaskQuantityFilterSchema> {}

export function useApiPharmacyFilter (params: PharmacyFilterParams) {
  const newParams = {
    count_op: params.countOp,
    count_value: params.countValue,
    price_min: params.priceMin,
    price_max: params.priceMax,
  }

  const isValid = Object.values(newParams).some((value) => value !== undefined)

  const key = isValid ? `/pharmacies/filter?${queryStringify(newParams)}` : null
  const { data, error, isLoading, mutate } = useSWR<Pharmacy[]>(key, clientSWRFetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
