export interface SearchResult {
  mask_id?: string,
  name: string,
  pharmacy_id?: string,
  price?: number,
  cash_balance?: number,
  rank: number,
  type: 'mask' | 'pharmacy',
}
