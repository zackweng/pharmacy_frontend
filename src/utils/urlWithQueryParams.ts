import qs from 'query-string'

export function urlWithQueryParams (path: string, queryParams: Record<string, unknown>): string {
  const filteredParams = Object.fromEntries(
    Object.entries(queryParams).filter(([_, value]) => value)
  )
  return `${path}?${qs.stringify(filteredParams)}`
}
