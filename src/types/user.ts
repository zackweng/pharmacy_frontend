export interface User {
  id: string,
  name: string,
}

export interface UserTransactionSummary {
  user_id: string,
  user_name: string,
  total_spent: number,
}

export interface TransactionSummary {
  total_masks: string,
  total_dollar: number,
}
