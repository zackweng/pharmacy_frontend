import useSWRMutation from 'swr/mutation'

import { clientInstance } from '../utils/clientInstance' // 確保正確導入

export interface PurchaseMaskParams {
  pharmacy_id: string,
  mask_id: string,
  mask_name: string,
  quantity: number,
  transaction_amount: number,
  transaction_date: string,
}

async function purchaseRequest (url: string, { arg }: { arg: PurchaseMaskParams[] }) {
  return await clientInstance().post(url, arg)
}

export function useApiPurchaseMask (userId?: string) {
  const key = userId ? `/users/${userId}/purchase` : null

  const { trigger, isMutating } = useSWRMutation(key, purchaseRequest)

  return {
    trigger,
    isMutating,
  }
}
