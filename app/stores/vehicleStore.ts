// ============================================================================
// Store: vehicleStore
// ============================================================================
// State management for resident vehicles, supporting local persistence and seeder generation.
//
// Usage:
//   const store = useVehicleStore()

import { defineStore } from 'pinia'
import { SeederService, type Vehicle } from '~/utils/seeder'

export const useVehicleStore = defineStore('vehicleStore', {
  state: () => ({
    vehicles: [] as Vehicle[],
    isLoading: false,
  }),

  actions: {
    deployMockData(count: number = 6) {
      this.isLoading = true
      setTimeout(() => {
        const mockData = SeederService.generateVehicles(count)
        this.vehicles = [...this.vehicles, ...mockData]
        this.isLoading = false
      }, 500)
    },

    removeMockData() {
      this.isLoading = true
      setTimeout(() => {
        this.vehicles = SeederService.clearVehicles()
        this.isLoading = false
      }, 300)
    },

    createVehicle(item: Vehicle) {
      this.vehicles.unshift(item)
    },

    updateVehicle(id: string, updatedData: Partial<Vehicle>) {
      const index = this.vehicles.findIndex(e => e.id === id)
      if (index !== -1) {
        this.vehicles[index] = { ...this.vehicles[index], ...updatedData } as Vehicle
      }
    },

    deleteVehicle(id: string) {
      this.vehicles = this.vehicles.filter(e => e.id !== id)
    }
  },

  getters: {
    vehicleCount: (state) => state.vehicles.length,
    hasVehicles: (state) => state.vehicles.length > 0
  },

  persist: {
    storage: persistedState.localStorage
  }
})
