// ============================================================================
// Imports
// ============================================================================
import { useStorage } from '@vueuse/core'

// Types
import type { AppLog } from '~/types'

// ============================================================================
// Composable
// ============================================================================
/**
 * Application Logger Composable
 * Provides a standardized way to log events and activities with persistent storage.
 * @param namespace - The namespace to categorize logs under (e.g. 'users', 'billing')
 */
export const useLogger = (namespace: string = 'default') => {
    const logs = useStorage<AppLog[]>(`app-logs-${namespace}`, [])

    /**
     * Add a new entry to the logs
     * @param message - The detailed description of the event
     * @param state - A short state label (e.g. 'Created', 'Updated', 'Deleted')
     * @param level - The severity level of the event (success, info, warn, error)
     */
    const addLog = (message: string, state: string, level: 'success' | 'info' | 'warn' | 'error' = 'info') => {
        const newLog: AppLog = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            level,
            state,
            message,
        }
        
        // Add to the beginning of the array and limit to 50 logs
        logs.value = [newLog, ...logs.value].slice(0, 50)
    }

    /**
     * Clear all logs for the current namespace
     */
    const clearLogs = () => {
        logs.value = []
    }

    return {
        logs,
        addLog,
        clearLogs
    }
}
