// ============================================================================
// Store: parkingSlotStore
// ============================================================================
// State management for parking slots, supporting local persistence and seeder generation.
//
// Usage:
//   const store = useParkingSlotStore()

import { defineStore } from 'pinia'
import { SeederService, type ParkingSlot } from '~/utils/seeder'

export const useParkingSlotStore = defineStore('parkingSlotStore', {
  state: () => ({
    parkingSlots: [] as ParkingSlot[],
    isLoading: false,
  }),

  actions: {
    deployMockData(count: number = 6) {
      this.isLoading = true
      setTimeout(() => {
        const mockData = SeederService.generateParkingSlots(count)
        this.parkingSlots = [...this.parkingSlots, ...mockData]
        this.isLoading = false
      }, 500)
    },

    removeMockData() {
      this.isLoading = true
      setTimeout(() => {
        this.parkingSlots = SeederService.clearParkingSlots()
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
