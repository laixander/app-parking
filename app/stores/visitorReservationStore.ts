// ============================================================================
// Store: visitorReservationStore
// ============================================================================
// State management for visitor parking reservations, supporting local persistence and seeder generation.
//
// Usage:
//   const store = useVisitorReservationStore()

import { defineStore } from 'pinia'
import { SeederService, type VisitorReservation } from '~/utils/seeder'

export const useVisitorReservationStore = defineStore('visitorReservationStore', {
  state: () => ({
    visitorReservations: [] as VisitorReservation[],
    isLoading: false,
  }),

  actions: {
    deployMockData(count: number = 6) {
      this.isLoading = true
      setTimeout(() => {
        const mockData = SeederService.generateVisitorReservations(count)
        this.visitorReservations = [...this.visitorReservations, ...mockData]
        this.isLoading = false
      }, 500)
    },

    removeMockData() {
      this.isLoading = true
      setTimeout(() => {
        this.visitorReservations = SeederService.clearVisitorReservations()
        this.isLoading = false
      }, 300)
    },

    createVisitorReservation(item: VisitorReservation) {
      this.visitorReservations.unshift(item)
    },

    updateVisitorReservation(id: string, updatedData: Partial<VisitorReservation>) {
      const index = this.visitorReservations.findIndex(e => e.id === id)
      if (index !== -1) {
        this.visitorReservations[index] = { ...this.visitorReservations[index], ...updatedData } as VisitorReservation
      }
    },

    deleteVisitorReservation(id: string) {
      this.visitorReservations = this.visitorReservations.filter(e => e.id !== id)
    }
  },

  getters: {
    visitorReservationCount: (state) => state.visitorReservations.length,
    hasVisitorReservations: (state) => state.visitorReservations.length > 0
  },

  persist: {
    storage: persistedState.localStorage
  }
})
