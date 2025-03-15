import { describe, it, expect } from 'vitest'

import { queryStringify } from '../queryStringify'

describe('queryStringify', () => {
  it('should stringify basic key-value pairs', () => {
    const params = {
      name: 'John',
      age: 25,
      active: true,
    }

    expect(queryStringify(params)).toBe('active=true&age=25&name=John')
  })

  it('should stringify object values as JSON strings', () => {
    const params = {
      user: { name: 'John', age: 25 },
      settings: { theme: 'dark' },
    }

    expect(queryStringify(params)).toBe(
      'settings=%7B%22theme%22%3A%22dark%22%7D&user=%7B%22name%22%3A%22John%22%2C%22age%22%3A25%7D'
    )
  })
})
