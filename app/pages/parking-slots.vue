<script setup lang="ts">
definePageMeta({
    title: 'Parking Slots',
    isTable: true,
})

import { ref, h, computed, useTemplateRef } from 'vue'
import { UBadge, UIcon, UButton, UDropdownMenu } from '#components'
import { StatusBadge } from '#components'
import { useParkingSlotStore } from '~/stores/parkingSlotStore'
import { SeederService } from '~/utils/seeder'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'

const store = useParkingSlotStore()
const toast = useAppToast()
const { log } = useActivityLog()

type ParkingSlot = typeof store.parkingSlots[0]

const isOpen = ref(false)
const isEditing = ref(false)
const currentParkingSlotId = ref<string | null>(null)
const pendingSaveData = ref<Omit<ParkingSlot, 'id' | 'createdAt' | 'updatedAt'> | null>(null)
const modalRef = useTemplateRef('modalRef')

const openCreateModal = () => {
    isEditing.value = false
    currentParkingSlotId.value = null
    modalRef.value?.reset()
    isOpen.value = true
}

const openEditModal = (item: ParkingSlot) => {
    isEditing.value = true
    currentParkingSlotId.value = item.id
    modalRef.value?.reset({
        code: item.code,
        classification: item.classification,
        tower: item.tower,
        floor: item.floor,
        zone: item.zone,
        status: item.status,
    })
    isOpen.value = true
}

const handleSave = (data: Omit<ParkingSlot, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (isEditing.value && currentParkingSlotId.value) {
        pendingSaveData.value = data
        isOpen.value = false
        isEditConfirmOpen.value = true
    } else {
        const newItem: ParkingSlot = {
            id: crypto.randomUUID(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        store.createParkingSlot(newItem)
        log('ParkingSlots', 'created', `Created parking slot "${data.code}"`, { meta: { id: newItem.id } })
        isOpen.value = false
        toast.success('Parking Slot Created', `${data.code} has been added.`)
    }
}

const confirmSave = () => {
    if (currentParkingSlotId.value && pendingSaveData.value) {
        store.updateParkingSlot(currentParkingSlotId.value, { 
            ...pendingSaveData.value,
            updatedAt: new Date().toISOString(),
        })
        log('ParkingSlots', 'updated', `Updated parking slot "${pendingSaveData.value.code}"`, { meta: { id: currentParkingSlotId.value } })
        toast.success('Parking Slot Updated', `${pendingSaveData.value.code} has been saved.`)
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
        const item = store.parkingSlots.find(e => e.id === pendingDeleteId.value)
        store.deleteParkingSlot(pendingDeleteId.value)
        log('ParkingSlots', 'deleted', `Deleted parking slot "${item?.code ?? 'Unknown'}"`, { meta: { id: pendingDeleteId.value } })
        toast.error('Parking Slot Deleted', 'The record has been permanently removed.')
        pendingDeleteId.value = null
    }
}

const tableColumns: TableColumn<ParkingSlot>[] = [
    {
        id: 'code',
        header: 'Code',
        accessorKey: 'code',
        cell: ({ row }) => h('div', { class: 'font-bold' }, row.original.code)
    },
    {
        id: 'classification',
        header: 'Classification',
        accessorKey: 'classification',
        cell: ({ row }) => h(StatusBadge, { status: row.original.classification })
    },
    {
        id: 'location',
        header: 'Location',
        cell: ({ row }) => h('span', { class: 'text-muted' }, `${row.original.tower}, ${row.original.floor} (${row.original.zone})`)
    },
    {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => h(StatusBadge, { status: row.original.status })
    },
    {
        id: 'id',
        header: 'ID',
        accessorKey: 'id',
        cell: ({ row }) => h(UBadge, { label: row.original.id.slice(0, 8), variant: 'soft', color: 'neutral', class: 'font-mono text-[11px]' })
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

const viewMode = ref<'list' | 'card'>('list')
const filteredParkingSlots = computed(() => {
    if (!globalFilter.value) return store.parkingSlots
    const search = globalFilter.value.toLowerCase()
    return store.parkingSlots.filter(item =>
        item.code.toLowerCase().includes(search) ||
        item.tower.toLowerCase().includes(search) ||
        item.zone.toLowerCase().includes(search) ||
        item.id.toLowerCase().includes(search)
    )
})
</script>

<template>
    <PageHeading forTable title="Parking Slots" description="Manage parking slots across all towers and floors.">
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
            <UButton color="primary" icon="i-lucide-plus" label="Add Slot" @click="openCreateModal()" />
        </Teleport>

        <!-- List (table) view -->
        <UTable v-if="viewMode === 'list'" :data="store.parkingSlots" :columns="tableColumns"
            :loading="store.isLoading" v-model:column-visibility="columnVisibility"
            v-model:global-filter="globalFilter" sticky ref="table" class="flex-1 scrollbar">
            <template #empty>
                <UEmpty variant="naked" icon="i-lucide-car" title="No parking slots found"
                    description="Get started by adding a parking slot.">
                    <template #actions>
                        <UButton label="Add First Slot" icon="i-lucide-plus" color="primary" size="lg"
                            @click="openCreateModal()" />
                    </template>
                </UEmpty>
            </template>
        </UTable>

        <!-- Card view -->
        <div v-else class="flex-1 overflow-y-auto scrollbar p-4">
            <div v-if="filteredParkingSlots.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <UCard v-for="item in filteredParkingSlots" :key="item.id" variant="subtle"
                    :ui="{ header: 'flex items-center justify-between gap-4', footer: 'p-0 sm:p-0' }" class="shadow-sm">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <div class="text-lg font-bold truncate">{{ item.code }}</div>
                            <StatusBadge :status="item.classification" />
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
                            <div class="text-muted w-full">Location</div>
                            <div class="text-right">{{ item.tower }}, {{ item.floor }} ({{ item.zone }})</div>
                        </div>
                        <div>
                            <div class="text-muted w-full">Status</div>
                            <div class="flex items-center gap-1.5">
                                <StatusBadge :status="item.status" />
                            </div>
                        </div>
                        <div>
                            <div class="text-muted w-full">ID</div>
                            <UBadge :label="item.id.slice(0, 8)" variant="soft" color="neutral" />
                        </div>
                    </div>
                </UCard>
            </div>
            <div v-else-if="store.isLoading" class="flex items-center justify-center h-full gap-3 text-muted">
                <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-primary" />
                <p class="text-sm font-medium">Loading slots…</p>
            </div>
            <UEmpty v-else variant="naked" icon="i-lucide-car" title="No parking slots found"
                description="Get started by adding a parking slot.">
                <template #actions>
                    <UButton label="Add First Slot" icon="i-lucide-plus" color="primary" size="lg"
                        @click="openCreateModal()" />
                </template>
            </UEmpty>
        </div>
    </ClientOnly>

    <ConfirmationModal v-model:open="isEditConfirmOpen" title="Save changes?"
        description="Are you sure you want to update this parking slot?" confirm-label="Yes, Save"
        confirm-color="warning" @confirm="confirmSave" />

    <ConfirmationModal v-model:open="isDeleteConfirmOpen" title="Delete parking slot?"
        description="This will permanently remove the parking slot. This action cannot be undone."
        confirm-label="Yes, Delete" confirm-color="error" @confirm="confirmDelete" />

    <AddParkingSlotModal ref="modalRef" v-model:open="isOpen" :is-editing="isEditing" @save="handleSave" />
</template>
