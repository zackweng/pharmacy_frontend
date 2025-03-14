import useSWR from 'swr'

import { type SmartSearchSchema } from '../components/SmartSearch/SmartSearch'
import { type SearchResult } from '../types/search'
import { clientSWRFetcher } from '../utils/clientSWRFetcher'

export interface SearchParams extends Partial<SmartSearchSchema> {}

export function useApiSearch (params: SearchParams) {
  const key = params.q ? `/search?q=${params.q}` : null
  const { data, error, isLoading, mutate } = useSWR<SearchResult[]>(key, clientSWRFetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
