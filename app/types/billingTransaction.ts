export type TransactionType = 'ResidentCharge' | 'VisitorPenalty' | 'PayParking'
export type TransactionStatus = 'Unpaid' | 'Paid' | 'Cancelled'
export type PaymentMethod = 'Cash' | 'Card' | 'E-Wallet'

export interface BillingTransaction {
  id: string
  sessionId: string | null
  type: TransactionType
  amount: number
  status: TransactionStatus
  paymentMethod: PaymentMethod | null
  receiptNumber: string | null
  transactionDate: string | null
  createdAt: string
  updatedAt: string
}
