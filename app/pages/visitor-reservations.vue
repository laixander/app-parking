<script setup lang="ts">
definePageMeta({
    title: 'Visitor Reservations',
    isTable: true,
})

import { ref, h, computed, useTemplateRef } from 'vue'
import { UBadge, UIcon, UButton, UDropdownMenu } from '#components'
import { StatusBadge } from '#components'
import { useVisitorReservationStore } from '~/stores/visitorReservationStore'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'

const store = useVisitorReservationStore()
const settings = useSettingsStore()
const toast = useAppToast()
const { log } = useActivityLog()

type VisitorReservation = typeof store.visitorReservations[0]

const isOpen = ref(false)
const isEditing = ref(false)
const currentReservationId = ref<string | null>(null)
const pendingSaveData = ref<Omit<VisitorReservation, 'id' | 'createdAt' | 'updatedAt'> | null>(null)
const modalRef = useTemplateRef('modalRef')

const openCreateModal = () => {
    isEditing.value = false
    currentReservationId.value = null
    modalRef.value?.reset()
    isOpen.value = true
}

const openEditModal = (item: VisitorReservation) => {
    isEditing.value = true
    currentReservationId.value = item.id
    modalRef.value?.reset({
        residentId: item.residentId,
        visitorName: item.visitorName,
        plateNumber: item.plateNumber,
        expectedArrival: new Date(item.expectedArrival).toISOString().slice(0, 16),
        expectedDeparture: new Date(item.expectedDeparture).toISOString().slice(0, 16),
        status: item.status,
    })
    isOpen.value = true
}

const handleSave = (data: Omit<VisitorReservation, 'id' | 'createdAt' | 'updatedAt' | 'qrCodeRef'>) => {
    if (isEditing.value && currentReservationId.value) {
        const existing = store.visitorReservations.find(r => r.id === currentReservationId.value)
        pendingSaveData.value = { ...data, qrCodeRef: existing?.qrCodeRef ?? '' }
        isOpen.value = false
        isEditConfirmOpen.value = true
    } else {
        const generatedQr = `QR-${Math.random().toString(36).substring(2, 12).toUpperCase()}`
        const newItem: VisitorReservation = {
            id: crypto.randomUUID(),
            ...data,
            qrCodeRef: generatedQr,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        store.createVisitorReservation(newItem)
        log('VisitorReservations', 'created', `Created reservation for visitor "${data.visitorName}"`, { meta: { id: newItem.id } })
        isOpen.value = false
        toast.success('Reservation Created', `Visitor ${data.visitorName} successfully registered.`)
    }
}

const confirmSave = () => {
    if (currentReservationId.value && pendingSaveData.value) {
        store.updateVisitorReservation(currentReservationId.value, { 
            ...pendingSaveData.value,
            updatedAt: new Date().toISOString(),
        })
        log('VisitorReservations', 'updated', `Updated reservation for "${pendingSaveData.value.visitorName}"`, { meta: { id: currentReservationId.value } })
        toast.success('Reservation Updated', `Changes have been saved.`)
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
        const item = store.visitorReservations.find(e => e.id === pendingDeleteId.value)
        store.deleteVisitorReservation(pendingDeleteId.value)
        log('VisitorReservations', 'deleted', `Deleted reservation for "${item?.visitorName ?? 'Unknown'}"`, { meta: { id: pendingDeleteId.value } })
        toast.error('Reservation Deleted', 'The reservation record has been permanently removed.')
        pendingDeleteId.value = null
    }
}

const tableColumns: TableColumn<VisitorReservation>[] = [
    {
        id: 'qrCodeRef',
        header: 'QR Ref',
        accessorKey: 'qrCodeRef',
        cell: ({ row }) => h('div', { class: 'font-mono font-bold text-sm tracking-wider' }, row.original.qrCodeRef)
    },
    {
        id: 'visitor',
        header: 'Visitor / Vehicle',
        cell: ({ row }) => h('div', { class: 'flex flex-col' }, [
            h('span', { class: 'font-medium text-default' }, row.original.visitorName),
            h('span', { class: 'text-xs text-muted tracking-wide' }, row.original.plateNumber)
        ])
    },
    {
        id: 'host',
        header: 'Host (Resident ID)',
        accessorKey: 'residentId',
        cell: ({ row }) => h('span', { class: 'font-mono text-xs text-muted' }, row.original.residentId.slice(0, 8))
    },
    {
        id: 'timeline',
        header: 'Arrival Window',
        cell: ({ row }) => {
            const arr = new Date(row.original.expectedArrival).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
            const dep = new Date(row.original.expectedDeparture).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
            return h('div', { class: 'flex flex-col text-sm text-default' }, [
                h('span', {}, arr),
                h('span', { class: 'text-xs text-muted' }, `until ${dep}`)
            ])
        }
    },
    {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => h(StatusBadge, { status: row.original.status })
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
const filteredReservations = computed(() => {
    if (!globalFilter.value) return store.visitorReservations
    const search = globalFilter.value.toLowerCase()
    return store.visitorReservations.filter(item =>
        item.visitorName.toLowerCase().includes(search) ||
        item.plateNumber.toLowerCase().includes(search) ||
        item.qrCodeRef.toLowerCase().includes(search) ||
        item.residentId.toLowerCase().includes(search)
    )
})
</script>

<template>
    <PageHeading forTable title="Visitor Reservations" description="Pre-register and manage expected visitor arrivals and parking privileges.">
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
            <UButton color="primary" icon="i-lucide-plus" label="New Reservation" @click="openCreateModal()" />
        </Teleport>

        <!-- List (table) view -->
        <UTable v-if="viewMode === 'list'" :data="store.visitorReservations" :columns="tableColumns"
            :loading="store.isLoading" v-model:column-visibility="columnVisibility"
            v-model:global-filter="globalFilter" sticky ref="table" class="flex-1 scrollbar">
            <template #empty>
                <UEmpty variant="naked" icon="i-lucide-calendar-clock" title="No visitor reservations"
                    description="Get started by creating a visitor reservation.">
                    <template #actions>
                        <UButton label="Create Reservation" icon="i-lucide-plus" color="primary" size="lg"
                            @click="openCreateModal()" />
                    </template>
                </UEmpty>
            </template>
        </UTable>

        <!-- Card view -->
        <div v-else class="flex-1 overflow-y-auto scrollbar p-4">
            <div v-if="filteredReservations.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <UCard v-for="item in filteredReservations" :key="item.id" variant="subtle"
                    :ui="{ header: 'flex items-center justify-between gap-4', footer: 'p-0 sm:p-0' }" class="shadow-sm">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <UIcon name="i-lucide-qr-code" class="size-5 text-primary shrink-0" />
                            <div class="text-sm font-mono font-bold truncate">{{ item.qrCodeRef }}</div>
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
                            <div class="text-muted w-full">Visitor</div>
                            <div class="font-medium text-right">{{ item.visitorName }}</div>
                        </div>
                        <div>
                            <div class="text-muted w-full">Plate No.</div>
                            <UBadge :label="item.plateNumber" variant="subtle" color="neutral" size="sm" />
                        </div>
                        <div>
                            <div class="text-muted w-full">Status</div>
                            <div class="flex items-center gap-1.5">
                                <StatusBadge :status="item.status" />
                            </div>
                        </div>
                        <div class="flex-col !items-end py-2">
                            <div class="text-muted w-full text-left">Arrival Window</div>
                            <div class="text-xs text-right mt-1">
                                {{ new Date(item.expectedArrival).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) }} <br>
                                <span class="text-muted">to</span> <br>
                                {{ new Date(item.expectedDeparture).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) }}
                            </div>
                        </div>
                    </div>
                </UCard>
            </div>
            <div v-else-if="store.isLoading" class="flex items-center justify-center h-full gap-3 text-muted">
                <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-primary" />
                <p class="text-sm font-medium">Loading reservations…</p>
            </div>
            <UEmpty v-else variant="naked" icon="i-lucide-calendar-clock" title="No visitor reservations"
                description="Get started by creating a visitor reservation.">
                <template #actions>
                    <UButton label="Create Reservation" icon="i-lucide-plus" color="primary" size="lg"
                        @click="openCreateModal()" />
                </template>
            </UEmpty>
        </div>
    </ClientOnly>

    <ConfirmationModal v-model:open="isEditConfirmOpen" title="Save changes?"
        description="Are you sure you want to update this visitor reservation?" confirm-label="Yes, Save"
        confirm-color="warning" @confirm="confirmSave" />

    <ConfirmationModal v-model:open="isDeleteConfirmOpen" title="Delete reservation?"
        description="This will permanently remove the reservation record. This action cannot be undone."
        confirm-label="Yes, Delete" confirm-color="error" @confirm="confirmDelete" />

    <AddVisitorReservationModal ref="modalRef" v-model:open="isOpen" :is-editing="isEditing" @save="handleSave" />
</template>
