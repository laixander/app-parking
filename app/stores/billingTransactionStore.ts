// ============================================================================
// Store: billingTransactionStore
// ============================================================================
// State management for financial and billing transactions, supporting local persistence and seeder generation.
//
// Usage:
//   const store = useBillingTransactionStore()

import { defineStore } from 'pinia'
import { SeederService, type BillingTransaction } from '~/utils/seeder'

export const useBillingTransactionStore = defineStore('billingTransactionStore', {
  state: () => ({
    billingTransactions: [] as BillingTransaction[],
    isLoading: false,
  }),

  actions: {
    deployMockData(count: number = 8) {
      this.isLoading = true
      setTimeout(() => {
        const mockData = SeederService.generateBillingTransactions(count)
        this.billingTransactions = [...this.billingTransactions, ...mockData]
        this.isLoading = false
      }, 500)
    },

    removeMockData() {
      this.isLoading = true
      setTimeout(() => {
        this.billingTransactions = SeederService.clearBillingTransactions()
        this.isLoading = false
      }, 300)
    },

    createBillingTransaction(item: BillingTransaction) {
      this.billingTransactions.unshift(item)
    },

    updateBillingTransaction(id: string, updatedData: Partial<BillingTransaction>) {
      const index = this.billingTransactions.findIndex(e => e.id === id)
      if (index !== -1) {
        this.billingTransactions[index] = { ...this.billingTransactions[index], ...updatedData } as BillingTransaction
      }
    },

    deleteBillingTransaction(id: string) {
      this.billingTransactions = this.billingTransactions.filter(e => e.id !== id)
    }
  },

  getters: {
    billingTransactionCount: (state) => state.billingTransactions.length,
    hasBillingTransactions: (state) => state.billingTransactions.length > 0,
    totalRevenue: (state) => state.billingTransactions.filter(t => t.status === 'Paid').reduce((sum, t) => sum + t.amount, 0),
    unpaidCount: (state) => state.billingTransactions.filter(t => t.status === 'Unpaid').length,
  },

  persist: {
    storage: persistedState.localStorage
  }
})
