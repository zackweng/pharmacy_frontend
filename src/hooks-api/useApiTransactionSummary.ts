import useSWR from 'swr'

import { type TransactionStatsSchema } from '../components/TransactionStats/TransactionStats'
import { type TransactionSummary } from '../types/user'
import { clientSWRFetcher } from '../utils/clientSWRFetcher'
import { queryStringify } from '../utils/queryStringify'

export interface TransactionStatsParams extends Partial<TransactionStatsSchema> {}

export function useApiTransactionSummary (params: TransactionStatsParams) {
  const newParams = {
    start_date: params.startDate,
    end_date: params.endDate,
  }

  const isValid = Object.values(newParams).some((value) => value !== undefined)

  const key = isValid ? `/users/transactions/summary?${queryStringify(newParams)}` : null
  const { data, error, isLoading, mutate } = useSWR<TransactionSummary>(key, clientSWRFetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
