import useSWR from 'swr'

import { type User } from '../types/user'
import { clientSWRFetcher } from '../utils/clientSWRFetcher'

export function useApiUsers () {
  const key = '/users'
  const { data, error, isLoading, mutate } = useSWR<User[]>(key, clientSWRFetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
