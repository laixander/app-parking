<script setup lang="ts">
// ============================================================================
// Page Configuration
// ============================================================================
definePageMeta({
    title: 'Activity Logs',
    isTable: true,
})

// ============================================================================
// Imports
// ============================================================================
import { ref, computed, h, onMounted, onUnmounted } from 'vue'
import { UBadge, UTooltip } from '#components'
import type { TableColumn } from '@nuxt/ui'
import type { ActivityLog, ActivityLogAction } from '~/types/activityLog'
import { useActivityLogStore } from '~/stores/activityLogStore'

// ============================================================================
// Store & Composables
// ============================================================================
const store = useActivityLogStore()
const toast = useAppToast()
const { log } = useActivityLog()

// ============================================================================
// Filters
// ============================================================================
const globalFilter = ref('')
const selectedModule = ref('All')
const selectedAction = ref<ActivityLogAction | 'All'>('All')

// Dynamically built from the store's unique module list
const moduleOptions = computed(() => ['All', ...store.modules])

const actionOptions: { label: string; value: ActivityLogAction | 'All' }[] = [
    { label: 'All Actions', value: 'All' },
    { label: 'Created',     value: 'created' },
    { label: 'Updated',     value: 'updated' },
    { label: 'Deleted',     value: 'deleted' },
    { label: 'Viewed',      value: 'viewed' },
]

// ============================================================================
// Computed Data
// ============================================================================
const filteredLogs = computed(() => {
    let result = store.logs

    if (selectedModule.value !== 'All') {
        result = result.filter(l => l.module === selectedModule.value)
    }
    if (selectedAction.value !== 'All') {
        result = result.filter(l => l.action === selectedAction.value)
    }
    if (globalFilter.value.trim()) {
        const q = globalFilter.value.toLowerCase()
        result = result.filter(l =>
            l.module.toLowerCase().includes(q) ||
            l.action.toLowerCase().includes(q) ||
            l.description.toLowerCase().includes(q) ||
            (l.actor ?? '').toLowerCase().includes(q)
        )
    }

    return result
})

// ============================================================================
// Configuration & Helpers
// ============================================================================
const actionConfig: Record<ActivityLogAction, { color: 'success' | 'warning' | 'error' | 'info'; icon: string }> = {
    created: { color: 'success', icon: 'i-lucide-plus-circle' },
    updated: { color: 'warning', icon: 'i-lucide-pencil' },
    deleted: { color: 'error',   icon: 'i-lucide-trash-2' },
    viewed:  { color: 'info',    icon: 'i-lucide-eye' },
}

const formatRelativeTime = (isoString: string): string => {
    const diff = Date.now() - new Date(isoString).getTime()
    const seconds = Math.floor(diff / 1000)
    if (seconds < 60)  return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60)  return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24)    return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
}

const formatFullTimestamp = (isoString: string): string =>
    new Date(isoString).toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    })

// ============================================================================
// Table Columns
// ============================================================================
const tableColumns: TableColumn<ActivityLog>[] = [
    {
        accessorKey: 'timestamp',
        header: 'When',
        cell: ({ row }) =>
            h(UTooltip, {
                text: formatFullTimestamp(row.original.timestamp),
                delayDuration: 200,
            }, {
                // Wrap in a div keyed to `tick` so relative time refreshes
                default: () => h('span', {
                    class: 'text-sm text-muted font-mono cursor-default tabular-nums',
                }, formatRelativeTime(row.original.timestamp))
            })
    },
    {
        accessorKey: 'module',
        header: 'Module',
        cell: ({ row }) =>
            h(UBadge, {
                label: row.original.module,
                variant: 'soft',
                color: 'neutral',
                class: 'font-medium',
            })
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row }) => {
            const cfg = actionConfig[row.original.action]
            return h(UBadge, {
                label: row.original.action.charAt(0).toUpperCase() + row.original.action.slice(1),
                color: cfg.color,
                variant: 'subtle',
                icon: cfg.icon,
                class: 'capitalize gap-1.5',
            })
        }
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) =>
            h('p', { class: 'text-sm text-default max-w-md truncate' }, row.original.description)
    },
    {
        accessorKey: 'actor',
        header: 'Actor',
        cell: ({ row }) =>
            h('span', { class: 'text-sm text-muted' }, row.original.actor ?? '—')
    },
]

// ============================================================================
// Timers & Methods
// ============================================================================
// Re-render relative timestamps every 30 seconds
const tick = ref(0)
let timer: ReturnType<typeof setInterval>
onMounted(() => { timer = setInterval(() => tick.value++, 30_000) })
onUnmounted(() => clearInterval(timer))

// Clear logs flow
const isClearConfirmOpen = ref(false)

const confirmClear = () => {
    store.clearLogs()
    log('Activity Logs', 'deleted', 'Cleared all activity logs')
    toast.error('Logs Cleared', 'All activity logs have been permanently removed.')
}
</script>

<template>
    <PageHeading forTable title="Activity Logs" description="Real-time audit trail of all user actions">
        <div class="flex items-center gap-2">
            <!-- Module filter -->
            <USelect v-model="selectedModule" :items="moduleOptions" class="w-36" icon="i-lucide-layers" />
            <!-- Action filter -->
            <USelect v-model="selectedAction" :items="actionOptions" value-key="value" label-key="label"
                class="w-36" icon="i-lucide-filter" />
            <!-- Text search -->
            <TableGlobalFilter v-model="globalFilter" />
        </div>
    </PageHeading>

    <ClientOnly>
        <!-- Inject count badge + clear button into the layout header -->
        <Teleport to="#header-actions-teleport">
            <UBadge v-if="store.hasLogs" :label="`${store.totalLogs} / 500`"
                variant="soft" color="neutral" icon="i-lucide-database" class="font-mono text-xs" />
            <UButton v-if="store.hasLogs" color="error" variant="soft"
                icon="i-lucide-trash-2" label="Clear Logs" @click="isClearConfirmOpen = true" />
        </Teleport>

        <!-- Re-render on tick to refresh relative timestamps -->
        <div :key="tick" class="contents">
            <UTable :data="filteredLogs" :columns="tableColumns" sticky class="flex-1 scrollbar">
                <template #empty>
                    <UEmpty variant="naked" icon="i-lucide-activity" title="No activity logs"
                        :description="store.hasLogs
                            ? 'No logs match your current filters. Try adjusting or clearing them.'
                            : 'Actions you take across the app will appear here in real time.'" />
                </template>
            </UTable>
        </div>
    </ClientOnly>

    <!-- Clear Confirmation Modal -->
    <ConfirmationModal v-model:open="isClearConfirmOpen" title="Clear all logs?"
        description="This will permanently delete all activity logs. This action cannot be undone."
        confirm-label="Yes, Clear All" confirm-color="error" @confirm="confirmClear" />
</template>
