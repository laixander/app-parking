// ============================================================================
// Store: rfidCredentialStore
// ============================================================================
// State management for RFID credentials, supporting local persistence and seeder generation.
//
// Usage:
//   const store = useRfidCredentialStore()

import { defineStore } from 'pinia'
import { SeederService, type RfidCredential } from '~/utils/seeder'

export const useRfidCredentialStore = defineStore('rfidCredentialStore', {
  state: () => ({
    rfidCredentials: [] as RfidCredential[],
    isLoading: false,
  }),

  actions: {
    deployMockData(count: number = 6) {
      this.isLoading = true
      setTimeout(() => {
        const mockData = SeederService.generateRfidCredentials(count)
        this.rfidCredentials = [...this.rfidCredentials, ...mockData]
        this.isLoading = false
      }, 500)
    },

    removeMockData() {
      this.isLoading = true
      setTimeout(() => {
        this.rfidCredentials = SeederService.clearRfidCredentials()
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
