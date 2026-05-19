// ============================================================================
// Composable: useDemoSeeder
// ============================================================================
// Handles mass-seeding and resetting of the application data for demo purposes.

export const useDemoSeeder = () => {
    const { setUsers, clear } = useUsers()

    /**
     * Fetch mock data from API and populate local storage
     */
    const seedAll = async () => {
        const data = await $fetch('/api/users')
        setUsers(data as any[])
    }

    /**
     * Clear all local storage data
     */
    const resetAll = async () => {
        clear(true)
    }

    return {
        seedAll,
        resetAll
    }
}
