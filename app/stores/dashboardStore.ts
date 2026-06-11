import { defineStore } from 'pinia'
import { SeederService } from '~/utils/seeder'
import { useBillingTransactionStore } from './billingTransactionStore'
import { useParkingSessionStore } from './parkingSessionStore'
import { useParkingSlotStore } from './parkingSlotStore'
import type { DashboardData } from '~/types/dashboard'

export const useDashboardStore = defineStore('dashboardStore', {
    state: () => ({
        recentActivity: [] as DashboardData['recentActivity'],
        revenueChart: [] as DashboardData['revenueChart'],
        isLoading: false,
    }),

    getters: {
        /** Computed directly from the actual data stores rather than mock inputs */
        overview() {
            const billingStore = useBillingTransactionStore()
            const sessionStore = useParkingSessionStore()
            const slotStore = useParkingSlotStore()
            
            const totalRevenue = billingStore.totalRevenue
            const unpaidInvoices = billingStore.unpaidCount
            
            const activeSessionsCol = sessionStore.columns.find(c => c.id === 'Active')
            const activeSessions = activeSessionsCol ? activeSessionsCol.cards.length : 0

            const totalSlots = slotStore.parkingSlots.length
            const occupiedSlots = slotStore.parkingSlots.filter(s => s.status === 'Occupied').length
            const occupancyRate = totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0

            return {
                totalRevenue,
                unpaidInvoices,
                activeSessions,
                occupancyRate
            }
        },
        hasDashboardData: (state) => state.recentActivity.length > 0 || state.revenueChart.length > 0,
    },

    actions: {
        deployMockData() {
            this.isLoading = true
            setTimeout(() => {
                const data = SeederService.generateDashboard()
                this.recentActivity = data.recentActivity
                this.revenueChart = data.revenueChart
                this.isLoading = false
            }, 500)
        },

        removeMockData() {
            this.isLoading = true
            setTimeout(() => {
                this.recentActivity = []
                this.revenueChart = []
                this.isLoading = false
            }, 300)
        },
    },

    persist: { storage: persistedState.localStorage }
})
