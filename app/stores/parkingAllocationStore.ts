// ============================================================================
// Store: parkingAllocationStore
// ============================================================================
// State management for Resident Parking Allocations, supporting local persistence and seeder generation.
//
// Usage:
//   const store = useParkingAllocationStore()

import { defineStore } from 'pinia'
import { SeederService, type ParkingAllocation } from '~/utils/seeder'

export const useParkingAllocationStore = defineStore('parkingAllocationStore', {
  state: () => ({
    parkingAllocations: [] as ParkingAllocation[],
    isLoading: false,
  }),

  actions: {
    deployMockData(count: number = 6) {
      this.isLoading = true
      setTimeout(() => {
        const mockData = SeederService.generateParkingAllocations(count)
        this.parkingAllocations = [...this.parkingAllocations, ...mockData]
        this.isLoading = false
      }, 500)
    },

    removeMockData() {
      this.isLoading = true
      setTimeout(() => {
        this.parkingAllocations = SeederService.clearParkingAllocations()
        this.isLoading = false
      }, 300)
    },

    createParkingAllocation(item: ParkingAllocation) {
      this.parkingAllocations.unshift(item)
    },

    updateParkingAllocation(id: string, updatedData: Partial<ParkingAllocation>) {
      const index = this.parkingAllocations.findIndex(e => e.id === id)
      if (index !== -1) {
        this.parkingAllocations[index] = { ...this.parkingAllocations[index], ...updatedData } as ParkingAllocation
      }
    },

    deleteParkingAllocation(id: string) {
      this.parkingAllocations = this.parkingAllocations.filter(e => e.id !== id)
    }
  },

  getters: {
    parkingAllocationCount: (state) => state.parkingAllocations.length,
    hasParkingAllocations: (state) => state.parkingAllocations.length > 0
  },

  persist: {
    storage: persistedState.localStorage
  }
})
