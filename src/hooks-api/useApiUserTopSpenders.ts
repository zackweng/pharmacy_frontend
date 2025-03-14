import useSWR from 'swr'

import { type UserTransactionRankSchema } from '../components/UserTransactionRank/UserTransactionRank'
import { type User } from '../types/user'
import { clientSWRFetcher } from '../utils/clientSWRFetcher'
import { queryStringify } from '../utils/queryStringify'

export interface UserTopSpendersParams extends Partial<UserTransactionRankSchema> {}

export function useApiUserTopSpenders (params: UserTopSpendersParams) {
  const newParams = {
    start_date: params.startDate,
    end_date: params.endDate,
    top_x: params.topX,
  }

  const isValid = Object.values(newParams).some((value) => value !== undefined)

  const key = isValid ? `/users/top_spenders?${queryStringify(newParams)}` : null
  const { data, error, isLoading, mutate } = useSWR<User[]>(key, clientSWRFetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
