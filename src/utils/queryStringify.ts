import qs from 'query-string'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StringifyableRecord = Record<string, any>

export const queryStringify = <Params extends StringifyableRecord>(params: Params, options?: qs.StringifyOptions | undefined) => {
  const stringifiedValues: StringifyableRecord = {}
  const keys = Object.keys(params)
  for (const key of keys) {
    const value = params[key]
    if (value !== null && typeof value === 'object') {
      stringifiedValues[key] = JSON.stringify(value)
    } else {
      stringifiedValues[key] = value
    }
  }
  return qs.stringify(stringifiedValues, options)
}
