// ============================================================================
// Store: parkingSessionStore
// ============================================================================
// State management for front desk parking sessions using a Kanban column structure.
//
// Usage:
//   const store = useParkingSessionStore()

import { defineStore } from 'pinia'
import type { ParkingSession } from '~/types/parkingSession'

export interface SessionColumn {
    id: 'Active' | 'Completed' | 'Overstay'
    title: string
    icon: string
    dotColor: string
    cards: ParkingSession[]
}

function createColumnStructure(): SessionColumn[] {
    return [
        { id: 'Active', title: 'Active Sessions', icon: 'i-lucide-car', dotColor: 'bg-blue-500', cards: [] },
        { id: 'Overstay', title: 'Overstay', icon: 'i-lucide-timer', dotColor: 'bg-orange-500', cards: [] },
        { id: 'Completed', title: 'Completed', icon: 'i-lucide-check-circle', dotColor: 'bg-green-500', cards: [] },
    ]
}

export const useParkingSessionStore = defineStore('parkingSessionStore', {
    state: () => ({
        columns: createColumnStructure() as SessionColumn[],
        isLoading: false,
    }),

    actions: {
        /** Deploy mock data into the board for demo purposes. */
        async deployMockData() {
            this.isLoading = true
            try {
                const mockData = await $fetch<ParkingSession[]>('/api/parking-sessions')
                
                this.columns.forEach(col => {
                    const statusData = mockData.filter(s => s.status === col.id)
                    if (statusData.length > 0) {
                        col.cards.push(...statusData)
                    }
                })
            } finally {
                this.isLoading = false
            }
        },

        removeMockData() {
            this.columns.forEach(col => { col.cards = [] })
        },

        createSession(item: ParkingSession) {
            const col = this.columns.find(c => c.id === item.status)
            if (col) col.cards.unshift(item)
        },

        moveSession(cardId: string, fromColumnId: string, toColumnId: string, insertBeforeCardId?: string) {
            const fromCol = this.columns.find(c => c.id === fromColumnId)
            const toCol   = this.columns.find(c => c.id === toColumnId)
            if (!fromCol || !toCol) return

            const cardIdx = fromCol.cards.findIndex(c => c.id === cardId)
            if (cardIdx === -1) return

            const [card] = fromCol.cards.splice(cardIdx, 1)
            if (!card) return

            // Update status dynamically on drop
            card.status = toColumnId as 'Active' | 'Completed' | 'Overstay'
            
            // Auto-stamp exit time if moved to completed and missing
            if (toColumnId === 'Completed' && !card.exitTime) {
                card.exitTime = new Date().toISOString()
            }

            if (insertBeforeCardId) {
                const targetIdx = toCol.cards.findIndex(c => c.id === insertBeforeCardId)
                toCol.cards.splice(targetIdx === -1 ? toCol.cards.length : targetIdx, 0, card)
            } else {
                toCol.cards.push(card)
            }
        },

        updateSession(id: string, updatedData: Partial<ParkingSession>) {
            for (const col of this.columns) {
                const index = col.cards.findIndex(e => e.id === id)
                if (index !== -1) {
                    const oldStatus = col.cards[index]!.status
                    const updated = { ...col.cards[index], ...updatedData } as ParkingSession
                    
                    if (updated.status !== oldStatus) {
                        // Status changed, needs to jump to new column
                        col.cards.splice(index, 1)
                        const newCol = this.columns.find(c => c.id === updated.status)
                        if (newCol) newCol.cards.unshift(updated)
                    } else {
                        col.cards[index] = updated
                    }
                    return
                }
            }
        },

        deleteSession(id: string) {
            for (const col of this.columns) {
                const idx = col.cards.findIndex(e => e.id === id)
                if (idx !== -1) {
                    col.cards.splice(idx, 1)
                    return
                }
            }
        }
    },

    getters: {
        hasParkingSessions: (state) => state.columns.some(col => col.cards.length > 0)
    },

    persist: { storage: persistedState.localStorage }
})
