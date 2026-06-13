// ============================================================================
// Store: kanbanStore
// ============================================================================
// Manages the state of the Kanban board, including columns and cards.
// Persisted to localStorage via nuxt-pinia-plugin-persistedstate.
//
// Usage:
//   const store = useKanbanStore()
//   store.moveCard(cardId, fromColId, toColId)
//   store.addCard('todo', newCardData)

import { defineStore } from 'pinia'
import type { KanbanCard, KanbanColumn } from '~/types/kanban'

// ── Column structure (always present, even after reset) ─────────────────
function createColumnStructure(): KanbanColumn[] {
    return [
        { id: 'backlog', title: 'Backlog', icon: 'i-lucide-inbox', color: 'error', cards: [] },
        { id: 'todo', title: 'To Do', icon: 'i-lucide-circle-dashed', color: 'blue', cards: [] },
        { id: 'in-progress', title: 'In Progress', icon: 'i-lucide-timer', color: 'amber', cards: [] },
        { id: 'review', title: 'Review', icon: 'i-lucide-eye', color: 'violet', cards: [] },
        { id: 'done', title: 'Done', icon: 'i-lucide-circle-check-big', color: 'green', cards: [] },
    ]
}

// ── Store ─────────────────────────────────────────────────────────────────
export const useKanbanStore = defineStore('kanbanStore', {
    state: () => ({
        // Columns always exist — cards are what get seeded / cleared
        columns: createColumnStructure() as KanbanColumn[],
    }),

    actions: {
        /** Move a card between (or within) columns. Inserts before insertBeforeCardId, or appends to end. */
        moveCard(
            cardId: string,
            fromColumnId: string,
            toColumnId: string,
            insertBeforeCardId?: string,
        ) {
            const fromCol = this.columns.find(c => c.id === fromColumnId)
            const toCol = this.columns.find(c => c.id === toColumnId)
            if (!fromCol || !toCol) return

            const cardIdx = fromCol.cards.findIndex(c => c.id === cardId)
            if (cardIdx === -1) return

            const [card] = fromCol.cards.splice(cardIdx, 1)
            if (!card) return   // splice always returns the element since cardIdx is valid, but TS can't prove that

            if (insertBeforeCardId) {
                const targetIdx = toCol.cards.findIndex(c => c.id === insertBeforeCardId)
                toCol.cards.splice(targetIdx === -1 ? toCol.cards.length : targetIdx, 0, card)
            } else {
                toCol.cards.push(card)
            }
        },

        /** Add a new card to the top of a specific column. */
        addCard(columnId: string, data: Omit<KanbanCard, 'id' | 'createdAt'>) {
            const col = this.columns.find(c => c.id === columnId)
            if (!col) return
            col.cards.unshift({
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                ...data,
            })
        },

        /** Deploy mock data into the board for demo purposes. */
        async deployMockData() {
            const data = await $fetch<Record<string, KanbanCard[]>>('/api/kanban')
            this.columns.forEach(col => {
                let mappedKey = col.id
                if (col.id === 'in-progress') mappedKey = 'inProgress'
                const mappedData = data[mappedKey]
                if (mappedData && mappedData.length > 0) {
                    col.cards.push(...mappedData)
                }
            })
        },

        /** Keep the column structure — only clear the cards. */
        removeMockData() {
            this.columns.forEach(col => { col.cards = [] })
        },
    },

    getters: {
        /** Returns true if there are any cards on the board. */
        hasData: (state) => state.columns.some(col => col.cards.length > 0),
        
        /** Returns the total number of cards across all columns. */
        totalCards: (state) => state.columns.reduce((sum, col) => sum + col.cards.length, 0),
        
        /** Returns the total number of locked cards. */
        lockedCount: (state) => state.columns.reduce(
            (sum, col) => sum + col.cards.filter(c => c.locked).length, 0,
        ),
    },

    persist: {
        storage: persistedState.localStorage,
    },
})
