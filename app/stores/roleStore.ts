import { defineStore } from 'pinia'
import type { Role } from '~/types/role'

export const useRoleStore = defineStore('roleStore', {
    state: () => ({
        roles: [
            { id: 'role-admin', name: 'Admin', description: 'Administrator with full access to all pages', pages: ['/', '/reports', '/users', '/roles', '/activity-logs', '/notifications', '/parking-slots', '/parking-allocations', '/vehicles', '/rfid-credentials', '/parking-sessions', '/visitor-reservations', '/billing-transactions'] },
            { id: 'role-ops', name: 'Parking Operations', description: 'Slot and allocation management', pages: ['/', '/parking-slots', '/parking-allocations', '/vehicles', '/rfid-credentials'] },
            { id: 'role-frontdesk', name: 'Front Desk', description: 'Session and visitor management', pages: ['/', '/parking-sessions', '/visitor-reservations'] },
            { id: 'role-finance', name: 'Finance', description: 'Billing and transaction processing', pages: ['/', '/billing-transactions'] },
        ] as Role[],
        isLoading: false,
    }),
    actions: {
        createRole(role: Role) {
            this.roles.push(role)
        },
        updateRole(id: string, updatedData: Partial<Role>) {
            const index = this.roles.findIndex((r: Role) => r.id === id)
            if (index !== -1) {
                this.roles[index] = { ...this.roles[index], ...updatedData } as Role
            }
        },
        deleteRole(id: string) {
            this.roles = this.roles.filter((r: Role) => r.id !== id)
        }
    },
    persist: {
        storage: persistedState.localStorage
    }
})
