// ============================================================================
// Store: visitorReservationStore
// ============================================================================
// State management for visitor parking reservations, supporting local persistence and seeder generation.
//
// Usage:
//   const store = useVisitorReservationStore()

import { defineStore } from 'pinia'
import type { VisitorReservation } from '~/types/visitorReservation'

export const useVisitorReservationStore = defineStore('visitorReservationStore', {
  state: () => ({
    visitorReservations: [] as VisitorReservation[],
    isLoading: false,
  }),

  actions: {
    async deployMockData() {
      this.isLoading = true
      try {
        const mockData = await $fetch<VisitorReservation[]>('/api/visitor-reservations')
        this.visitorReservations = [...this.visitorReservations, ...mockData]
      } finally {
        this.isLoading = false
      }
    },

    removeMockData() {
      this.isLoading = true
      setTimeout(() => {
        this.visitorReservations = []
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
