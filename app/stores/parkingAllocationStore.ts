// ============================================================================
// Store: parkingAllocationStore
// ============================================================================
// State management for Resident Parking Allocations, supporting local persistence and seeder generation.
//
// Usage:
//   const store = useParkingAllocationStore()

import { defineStore } from 'pinia'
import type { ParkingAllocation } from '~/types/parkingAllocation'

export const useParkingAllocationStore = defineStore('parkingAllocationStore', {
  state: () => ({
    parkingAllocations: [] as ParkingAllocation[],
    isLoading: false,
  }),

  actions: {
    async deployMockData() {
      this.isLoading = true
      try {
        const mockData = await $fetch<ParkingAllocation[]>('/api/parking-allocations')
        this.parkingAllocations = [...this.parkingAllocations, ...mockData]
      } finally {
        this.isLoading = false
      }
    },

    removeMockData() {
      this.isLoading = true
      setTimeout(() => {
        this.parkingAllocations = []
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
