export interface Pharmacy {
  id: number | string,
  cash_balance: number,
  name: string,
}

export interface PharmacyMask {
  id: number | string,
  name: string,
  pharmacy_id: Pharmacy['id'],
  price: number,
}
