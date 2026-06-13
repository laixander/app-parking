// ============================================================================
// Store: parkingSlotStore
// ============================================================================
// State management for parking slots, supporting local persistence and seeder generation.
//
// Usage:
//   const store = useParkingSlotStore()

import { defineStore } from 'pinia'
import type { ParkingSlot } from '~/types/parkingSlot'

export const useParkingSlotStore = defineStore('parkingSlotStore', {
  state: () => ({
    parkingSlots: [] as ParkingSlot[],
    isLoading: false,
  }),

  actions: {
    async deployMockData() {
      this.isLoading = true
      try {
        const mockData = await $fetch<ParkingSlot[]>('/api/parking-slots')
        this.parkingSlots = [...this.parkingSlots, ...mockData]
      } finally {
        this.isLoading = false
      }
    },

    removeMockData() {
      this.isLoading = true
      setTimeout(() => {
        this.parkingSlots = []
        this.isLoading = false
      }, 300)
    },

    createParkingSlot(item: ParkingSlot) {
      this.parkingSlots.unshift(item)
    },

    updateParkingSlot(id: string, updatedData: Partial<ParkingSlot>) {
      const index = this.parkingSlots.findIndex(e => e.id === id)
      if (index !== -1) {
        this.parkingSlots[index] = { ...this.parkingSlots[index], ...updatedData } as ParkingSlot
      }
    },

    deleteParkingSlot(id: string) {
      this.parkingSlots = this.parkingSlots.filter(e => e.id !== id)
    }
  },

  getters: {
    parkingSlotCount: (state) => state.parkingSlots.length,
    hasParkingSlots: (state) => state.parkingSlots.length > 0
  },

  persist: {
    storage: persistedState.localStorage
  }
})
