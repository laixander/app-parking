<script setup lang="ts">
definePageMeta({
    title: 'Parking Allocations',
    isTable: true,
})

import { ref, h, computed, useTemplateRef } from 'vue'
import { UBadge, UIcon, UButton, UDropdownMenu } from '#components'
import { StatusBadge } from '#components'
import { useParkingAllocationStore } from '~/stores/parkingAllocationStore'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'

const store = useParkingAllocationStore()
const settings = useSettingsStore()
const toast = useAppToast()
const { log } = useActivityLog()

type ParkingAllocation = typeof store.parkingAllocations[0]

const isOpen = ref(false)
const isEditing = ref(false)
const currentAllocationId = ref<string | null>(null)
const pendingSaveData = ref<Omit<ParkingAllocation, 'id' | 'createdAt' | 'updatedAt'> | null>(null)
const modalRef = useTemplateRef('modalRef')

const openCreateModal = () => {
    isEditing.value = false
    currentAllocationId.value = null
    modalRef.value?.reset()
    isOpen.value = true
}

const openEditModal = (item: ParkingAllocation) => {
    isEditing.value = true
    currentAllocationId.value = item.id
    modalRef.value?.reset({
        vehicleId: item.vehicleId,
        slotId: item.slotId,
        allocationType: item.allocationType,
        status: item.status,
        startDate: item.startDate.split('T')[0],
        endDate: item.endDate?.split('T')[0] ?? undefined,
    })
    isOpen.value = true
}

const handleSave = (data: Omit<ParkingAllocation, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (isEditing.value && currentAllocationId.value) {
        pendingSaveData.value = data
        isOpen.value = false
        isEditConfirmOpen.value = true
    } else {
        const newItem: ParkingAllocation = {
            id: crypto.randomUUID(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        store.createParkingAllocation(newItem)
        log('ParkingAllocations', 'created', `Created allocation for slot "${data.slotId}"`, { meta: { id: newItem.id } })
        isOpen.value = false
        toast.success('Allocation Created', `Slot successfully allocated.`)
    }
}

const confirmSave = () => {
    if (currentAllocationId.value && pendingSaveData.value) {
        store.updateParkingAllocation(currentAllocationId.value, { 
            ...pendingSaveData.value,
            updatedAt: new Date().toISOString(),
        })
        log('ParkingAllocations', 'updated', `Updated allocation for slot "${pendingSaveData.value.slotId}"`, { meta: { id: currentAllocationId.value } })
        toast.success('Allocation Updated', `Changes have been saved.`)
        pendingSaveData.value = null
    }
}

const isDeleteConfirmOpen = ref(false)
const isEditConfirmOpen = ref(false)
const pendingDeleteId = ref<string | null>(null)

const promptDelete = (id: string) => {
    pendingDeleteId.value = id
    isDeleteConfirmOpen.value = true
}

const confirmDelete = () => {
    if (pendingDeleteId.value) {
        const item = store.parkingAllocations.find(e => e.id === pendingDeleteId.value)
        store.deleteParkingAllocation(pendingDeleteId.value)
        log('ParkingAllocations', 'deleted', `Deleted allocation "${item?.id ?? 'Unknown'}"`, { meta: { id: pendingDeleteId.value } })
        toast.error('Allocation Deleted', 'The parking allocation has been permanently removed.')
        pendingDeleteId.value = null
    }
}

const tableColumns: TableColumn<ParkingAllocation>[] = [
    {
        id: 'slotId',
        header: 'Slot ID',
        accessorKey: 'slotId',
        cell: ({ row }) => h('div', { class: 'font-mono font-bold text-sm tracking-wider' }, row.original.slotId.slice(0, 8))
    },
    {
        id: 'vehicleId',
        header: 'Vehicle ID',
        accessorKey: 'vehicleId',
        cell: ({ row }) => h('div', { class: 'font-mono text-sm tracking-wider text-muted' }, row.original.vehicleId.slice(0, 8))
    },
    {
        id: 'allocationType',
        header: 'Type',
        accessorKey: 'allocationType',
        cell: ({ row }) => h(StatusBadge, { status: row.original.allocationType })
    },
    {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => h(StatusBadge, { status: row.original.status })
    },
    {
        id: 'dates',
        header: 'Duration',
        cell: ({ row }) => {
            const start = new Date(row.original.startDate).toLocaleDateString()
            const end = row.original.endDate ? new Date(row.original.endDate).toLocaleDateString() : 'Ongoing'
            return h('span', { class: 'text-sm text-default' }, `${start} → ${end}`)
        }
    },
    {
        id: 'actions',
        header: '',
        meta: { class: { td: 'text-right' } },
        cell: ({ row }) => {
            const items: DropdownMenuItem[][] = [
                [{ label: 'Edit', icon: 'i-lucide-pencil', onSelect: () => openEditModal(row.original) }],
                [{ label: 'Delete', icon: 'i-lucide-trash', color: 'error', onSelect: () => promptDelete(row.original.id) }]
            ]
            return h(UDropdownMenu, { items, content: { align: 'end' }, size: 'sm' }, {
                default: () => h(UButton, { icon: 'i-lucide-ellipsis-vertical', color: 'neutral', variant: 'ghost', size: 'sm' })
            })
        }
    }
]

const table = useTemplateRef('table')
const globalFilter = ref('')
const columnVisibility = ref({ id: false })

const viewMode = ref<'list' | 'card'>(settings.defaultViewMode)
const filteredAllocations = computed(() => {
    if (!globalFilter.value) return store.parkingAllocations
    const search = globalFilter.value.toLowerCase()
    return store.parkingAllocations.filter(item =>
        item.slotId.toLowerCase().includes(search) ||
        item.vehicleId.toLowerCase().includes(search) ||
        item.id.toLowerCase().includes(search)
    )
})
</script>

<template>
    <PageHeading forTable title="Parking Allocations" description="Manage parking slot assignments and privileges for resident vehicles.">
        <div class="flex gap-2">
            <TableGlobalFilter v-model="globalFilter" />
            <TableColumnToggle v-if="viewMode === 'list'" :table="table" />
            <UTabs v-model="viewMode" variant="pill" size="xs" :content="false" :items="[
                { value: 'card', icon: 'i-lucide-grid-2x2' },
                { value: 'list', icon: 'i-lucide-list' },
            ]" />
        </div>
    </PageHeading>

    <ClientOnly>
        <Teleport to="#header-actions-teleport">
            <UButton color="primary" icon="i-lucide-plus" label="Allocate Slot" @click="openCreateModal()" />
        </Teleport>

        <!-- List (table) view -->
        <UTable v-if="viewMode === 'list'" :data="store.parkingAllocations" :columns="tableColumns"
            :loading="store.isLoading" v-model:column-visibility="columnVisibility"
            v-model:global-filter="globalFilter" sticky ref="table" class="flex-1 scrollbar">
            <template #empty>
                <UEmpty variant="naked" icon="i-lucide-calendar-check" title="No allocations found"
                    description="Get started by creating a parking allocation.">
                    <template #actions>
                        <UButton label="Create First Allocation" icon="i-lucide-plus" color="primary" size="lg"
                            @click="openCreateModal()" />
                    </template>
                </UEmpty>
            </template>
        </UTable>

        <!-- Card view -->
        <div v-else class="flex-1 overflow-y-auto scrollbar p-4">
            <div v-if="filteredAllocations.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <UCard v-for="item in filteredAllocations" :key="item.id" variant="subtle"
                    :ui="{ header: 'flex items-center justify-between gap-4', footer: 'p-0 sm:p-0' }" class="shadow-sm">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <UIcon name="i-lucide-car-front" class="size-5 text-primary shrink-0" />
                            <div class="text-sm font-mono font-bold truncate">SLOT-{{ item.slotId.slice(0, 8).toUpperCase() }}</div>
                        </div>
                        <UDropdownMenu :items="[[
                            { label: 'Edit', icon: 'i-lucide-edit', onSelect: () => openEditModal(item) }
                        ], [
                            { label: 'Delete', icon: 'i-lucide-trash', color: 'error', onSelect: () => promptDelete(item.id) }
                        ]]" :content="{ align: 'end' }" size="sm">
                            <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" size="sm" />
                        </UDropdownMenu>
                    </template>
                    
                    <div class="*:py-2 *:first:pt-0 *:last:pb-0 *:flex *:items-center *:justify-between text-sm divide-y divide-default">
                        <div>
                            <div class="text-muted w-full">Vehicle Ref</div>
                            <div class="font-mono text-right">{{ item.vehicleId.slice(0, 8) }}</div>
                        </div>
                        <div>
                            <div class="text-muted w-full">Type</div>
                            <StatusBadge :status="item.allocationType" />
                        </div>
                        <div>
                            <div class="text-muted w-full">Status</div>
                            <div class="flex items-center gap-1.5">
                                <StatusBadge :status="item.status" />
                            </div>
                        </div>
                        <div>
                            <div class="text-muted w-full">Duration</div>
                            <div class="text-right">{{ new Date(item.startDate).toLocaleDateString() }} → {{ item.endDate ? new Date(item.endDate).toLocaleDateString() : 'Ongoing' }}</div>
                        </div>
                    </div>
                </UCard>
            </div>
            <div v-else-if="store.isLoading" class="flex items-center justify-center h-full gap-3 text-muted">
                <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-primary" />
                <p class="text-sm font-medium">Loading allocations…</p>
            </div>
            <UEmpty v-else variant="naked" icon="i-lucide-calendar-check" title="No allocations found"
                description="Get started by creating a parking allocation.">
                <template #actions>
                    <UButton label="Create First Allocation" icon="i-lucide-plus" color="primary" size="lg"
                        @click="openCreateModal()" />
                </template>
            </UEmpty>
        </div>
    </ClientOnly>

    <ConfirmationModal v-model:open="isEditConfirmOpen" title="Save changes?"
        description="Are you sure you want to update this allocation record?" confirm-label="Yes, Save"
        confirm-color="warning" @confirm="confirmSave" />

    <ConfirmationModal v-model:open="isDeleteConfirmOpen" title="Delete allocation?"
        description="This will permanently remove the parking allocation record. This action cannot be undone."
        confirm-label="Yes, Delete" confirm-color="error" @confirm="confirmDelete" />

    <AddParkingAllocationModal ref="modalRef" v-model:open="isOpen" :is-editing="isEditing" @save="handleSave" />
</template>
