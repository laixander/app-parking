// ============================================================================
// Store: Auth
// ============================================================================
// Manages the demo session — stores the currently logged-in user and role.
// Persisted to localStorage so session survives page reloads.
//
// Usage:
//   const authStore = useAuthStore()
//   authStore.login('Admin')
//   authStore.logout()

import { defineStore } from 'pinia'
import type { AuthUser, SystemRole } from '~/types/auth'

// Pre-built demo user profiles per role
const DEMO_USERS: Record<SystemRole, AuthUser> = {
    'Property Admin': { name: 'Alex Rivera', role: 'Property Admin' },
    'Parking Operations': { name: 'Sam Torres', role: 'Parking Operations' },
    'Front Desk': { name: 'Jamie Chen', role: 'Front Desk' },
    'Security': { name: 'Marcus Cole', role: 'Security' },
    'Finance': { name: 'Linda Park', role: 'Finance' },
}

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        currentUser: null as AuthUser | null,
    }),

    getters: {
        /** Returns true if a user is currently logged in. */
        isAuthenticated: (state): boolean => state.currentUser !== null,
        /** Returns the system role of the currently logged-in user. */
        role: (state): SystemRole | null => state.currentUser?.role ?? null,
        /** Returns true if the logged-in user is an Admin. */
        isAdmin: (state): boolean => state.currentUser?.role === 'Property Admin',
        /** Returns true if the logged-in user is Staff. */
        isStaff: (state): boolean => state.currentUser?.role !== 'Property Admin',
    },

    actions: {
        /** Logs in a demo user with the specified role. */
        login(role: SystemRole) {
            this.currentUser = DEMO_USERS[role]
        },

        /** Clears the current user session. */
        logout() {
            this.currentUser = null
        },
    },

    persist: {
        storage: persistedState.localStorage,
    },
})
