<script setup lang="ts">
definePageMeta({
    title: 'Resident Vehicles',
    isTable: true,
})

import { ref, h, computed, useTemplateRef } from 'vue'
import { UBadge, UIcon, UButton, UDropdownMenu } from '#components'
import { StatusBadge } from '#components'
import { useVehicleStore } from '~/stores/vehicleStore'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'

const store = useVehicleStore()
const settings = useSettingsStore()
const toast = useAppToast()
const { log } = useActivityLog()

type Vehicle = typeof store.vehicles[0]

const isOpen = ref(false)
const isEditing = ref(false)
const currentVehicleId = ref<string | null>(null)
const pendingSaveData = ref<Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'> | null>(null)
const modalRef = useTemplateRef('modalRef')

const openCreateModal = () => {
    isEditing.value = false
    currentVehicleId.value = null
    modalRef.value?.reset()
    isOpen.value = true
}

const openEditModal = (item: Vehicle) => {
    isEditing.value = true
    currentVehicleId.value = item.id
    modalRef.value?.reset({
        unitOwnerId: item.unitOwnerId,
        plateNumber: item.plateNumber,
        make: item.make,
        model: item.model,
        color: item.color,
        registrationType: item.registrationType,
        status: item.status,
        documentUrls: item.documentUrls,
    })
    isOpen.value = true
}

const handleSave = (data: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (isEditing.value && currentVehicleId.value) {
        pendingSaveData.value = data
        isOpen.value = false
        isEditConfirmOpen.value = true
    } else {
        const newItem: Vehicle = {
            id: crypto.randomUUID(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        store.createVehicle(newItem)
        log('Vehicles', 'created', `Registered vehicle "${data.plateNumber}"`, { meta: { id: newItem.id } })
        isOpen.value = false
        toast.success('Vehicle Registered', `${data.plateNumber} has been added.`)
    }
}

const confirmSave = () => {
    if (currentVehicleId.value && pendingSaveData.value) {
        store.updateVehicle(currentVehicleId.value, { 
            ...pendingSaveData.value,
            updatedAt: new Date().toISOString(),
        })
        log('Vehicles', 'updated', `Updated vehicle "${pendingSaveData.value.plateNumber}"`, { meta: { id: currentVehicleId.value } })
        toast.success('Vehicle Updated', `${pendingSaveData.value.plateNumber} has been saved.`)
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
        const item = store.vehicles.find(e => e.id === pendingDeleteId.value)
        store.deleteVehicle(pendingDeleteId.value)
        log('Vehicles', 'deleted', `Deleted vehicle "${item?.plateNumber ?? 'Unknown'}"`, { meta: { id: pendingDeleteId.value } })
        toast.error('Vehicle Deleted', 'The vehicle record has been permanently removed.')
        pendingDeleteId.value = null
    }
}

const tableColumns: TableColumn<Vehicle>[] = [
    {
        id: 'plateNumber',
        header: 'Plate Number',
        accessorKey: 'plateNumber',
        cell: ({ row }) => h('div', { class: 'font-bold tracking-wider' }, row.original.plateNumber)
    },
    {
        id: 'vehicleInfo',
        header: 'Make & Model',
        cell: ({ row }) => h('span', { class: 'text-default' }, `${row.original.color} ${row.original.make} ${row.original.model}`)
    },
    {
        id: 'registrationType',
        header: 'Type',
        accessorKey: 'registrationType',
        cell: ({ row }) => h(StatusBadge, { status: row.original.registrationType })
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

const viewMode = ref<'list' | 'card'>(settings.defaultViewMode)
const filteredVehicles = computed(() => {
    if (!globalFilter.value) return store.vehicles
    const search = globalFilter.value.toLowerCase()
    return store.vehicles.filter(item =>
        item.plateNumber.toLowerCase().includes(search) ||
        item.make.toLowerCase().includes(search) ||
        item.model.toLowerCase().includes(search) ||
        item.unitOwnerId.toLowerCase().includes(search) ||
        item.id.toLowerCase().includes(search)
    )
})
</script>

<template>
    <PageHeading forTable title="Resident Vehicles" description="Manage and approve resident vehicle registrations.">
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
            <UButton color="primary" icon="i-lucide-plus" label="Register Vehicle" @click="openCreateModal()" />
        </Teleport>

        <!-- List (table) view -->
        <UTable v-if="viewMode === 'list'" :data="store.vehicles" :columns="tableColumns"
            :loading="store.isLoading" v-model:column-visibility="columnVisibility"
            v-model:global-filter="globalFilter" sticky ref="table" class="flex-1 scrollbar">
            <template #empty>
                <UEmpty variant="naked" icon="i-lucide-car-front" title="No vehicles found"
                    description="Get started by registering a new vehicle.">
                    <template #actions>
                        <UButton label="Register First Vehicle" icon="i-lucide-plus" color="primary" size="lg"
                            @click="openCreateModal()" />
                    </template>
                </UEmpty>
            </template>
        </UTable>

        <!-- Card view -->
        <div v-else class="flex-1 overflow-y-auto scrollbar p-4">
            <div v-if="filteredVehicles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <UCard v-for="item in filteredVehicles" :key="item.id" variant="subtle"
                    :ui="{ header: 'flex items-center justify-between gap-4', footer: 'p-0 sm:p-0' }" class="shadow-sm">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <div class="text-lg font-bold truncate tracking-wider">{{ item.plateNumber }}</div>
                            <StatusBadge :status="item.registrationType" />
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
                            <div class="text-muted w-full">Vehicle</div>
                            <div class="text-right">{{ item.color }} {{ item.make }} {{ item.model }}</div>
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
                <p class="text-sm font-medium">Loading vehicles…</p>
            </div>
            <UEmpty v-else variant="naked" icon="i-lucide-car-front" title="No vehicles found"
                description="Get started by registering a new vehicle.">
                <template #actions>
                    <UButton label="Register First Vehicle" icon="i-lucide-plus" color="primary" size="lg"
                        @click="openCreateModal()" />
                </template>
            </UEmpty>
        </div>
    </ClientOnly>

    <ConfirmationModal v-model:open="isEditConfirmOpen" title="Save changes?"
        description="Are you sure you want to update this vehicle record?" confirm-label="Yes, Save"
        confirm-color="warning" @confirm="confirmSave" />

    <ConfirmationModal v-model:open="isDeleteConfirmOpen" title="Delete vehicle?"
        description="This will permanently remove the vehicle record. This action cannot be undone."
        confirm-label="Yes, Delete" confirm-color="error" @confirm="confirmDelete" />

    <AddVehicleModal ref="modalRef" v-model:open="isOpen" :is-editing="isEditing" @save="handleSave" />
</template>
