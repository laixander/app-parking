// ============================================================================
// Store: rfidCredentialStore
// ============================================================================
// State management for RFID credentials, supporting local persistence and seeder generation.
//
// Usage:
//   const store = useRfidCredentialStore()

import { defineStore } from 'pinia'
import type { RfidCredential } from '~/types/rfidCredential'

export const useRfidCredentialStore = defineStore('rfidCredentialStore', {
  state: () => ({
    rfidCredentials: [] as RfidCredential[],
    isLoading: false,
  }),

  actions: {
    async deployMockData() {
      this.isLoading = true
      try {
        const mockData = await $fetch<RfidCredential[]>('/api/rfid-credentials')
        this.rfidCredentials = [...this.rfidCredentials, ...mockData]
      } finally {
        this.isLoading = false
      }
    },

    removeMockData() {
      this.isLoading = true
      setTimeout(() => {
        this.rfidCredentials = []
        this.isLoading = false
      }, 300)
    },

    createRfidCredential(item: RfidCredential) {
      this.rfidCredentials.unshift(item)
    },

    updateRfidCredential(id: string, updatedData: Partial<RfidCredential>) {
      const index = this.rfidCredentials.findIndex(e => e.id === id)
      if (index !== -1) {
        this.rfidCredentials[index] = { ...this.rfidCredentials[index], ...updatedData } as RfidCredential
      }
    },

    deleteRfidCredential(id: string) {
      this.rfidCredentials = this.rfidCredentials.filter(e => e.id !== id)
    }
  },

  getters: {
    rfidCredentialCount: (state) => state.rfidCredentials.length,
    hasRfidCredentials: (state) => state.rfidCredentials.length > 0
  },

  persist: {
    storage: persistedState.localStorage
  }
})
