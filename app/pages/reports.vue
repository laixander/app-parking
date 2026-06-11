<script setup lang="ts">
definePageMeta({ title: 'System Reports', isTable: true })

import { ref, computed, h } from 'vue'
import { UBadge, UIcon, UButton } from '#components'
import { StatusBadge } from '#components'
import type { TableColumn } from '@nuxt/ui'

import { useVehicleStore } from '~/stores/vehicleStore'
import { useRfidCredentialStore } from '~/stores/rfidCredentialStore'
import { useParkingSlotStore } from '~/stores/parkingSlotStore'
import { useVisitorReservationStore } from '~/stores/visitorReservationStore'
import { useBillingTransactionStore } from '~/stores/billingTransactionStore'

const vehicleStore = useVehicleStore()
const rfidStore = useRfidCredentialStore()
const slotStore = useParkingSlotStore()
const visitorStore = useVisitorReservationStore()
const billingStore = useBillingTransactionStore()

const toast = useAppToast()
const formatter = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' })

const items = [
    { value: 'vehicles', label: 'Vehicle Registry', icon: 'i-lucide-car-front' },
    { value: 'rfids', label: 'Active RFID Inventory', icon: 'i-lucide-nfc' },
    { value: 'slots', label: 'Slot Occupancy', icon: 'i-lucide-circle-parking' },
    { value: 'visitors', label: 'Visitor Parking Activity', icon: 'i-lucide-calendar-clock' },
    { value: 'revenue', label: 'Revenue & Transactions', icon: 'i-lucide-receipt' },
    { value: 'violations', label: 'Parking Violations', icon: 'i-lucide-alert-triangle' },
]

const activeTab = ref('vehicles')
const searchQuery = ref('')

const handleExport = () => {
    const label = items.find(i => i.value === activeTab.value)?.label ?? 'Report'
    toast.success('Export Successful', `The ${label} has been downloaded as CSV.`)
}

// Columns definitions
const vehiclesColumns: TableColumn<any>[] = [
    { id: 'plate', header: 'Plate Number', accessorKey: 'plateNumber', cell: ({ row }) => h('div', { class: 'font-mono font-bold tracking-wider' }, row.original.plateNumber) },
    { id: 'vehicle', header: 'Vehicle Info', cell: ({ row }) => h('div', { class: 'text-sm' }, `${row.original.make} ${row.original.model} (${row.original.color})`) },
    { id: 'type', header: 'Registration Type', accessorKey: 'registrationType' },
    { id: 'status', header: 'Status', accessorKey: 'status', cell: ({ row }) => h(StatusBadge, { status: row.original.status }) },
]

const rfidsColumns: TableColumn<any>[] = [
    { id: 'tag', header: 'Tag Number', accessorKey: 'tagNumber', cell: ({ row }) => h('div', { class: 'font-mono font-bold tracking-wider' }, row.original.tagNumber) },
    { id: 'assignment', header: 'Assignment', cell: ({ row }) => row.original.vehicleId ? h(StatusBadge, { status: 'Assigned' }) : h('span', { class: 'text-muted italic text-sm' }, 'Unassigned') },
    { id: 'lastUsed', header: 'Last Used', cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.lastUsedAt ? new Date(row.original.lastUsedAt).toLocaleDateString() : 'Never') },
    { id: 'status', header: 'Status', accessorKey: 'status', cell: ({ row }) => h(StatusBadge, { status: row.original.status }) },
]

const slotsColumns: TableColumn<any>[] = [
    { id: 'code', header: 'Slot Code', accessorKey: 'code', cell: ({ row }) => h('div', { class: 'font-mono font-bold text-lg' }, row.original.code) },
    { id: 'location', header: 'Location', cell: ({ row }) => h('div', { class: 'text-sm' }, `${row.original.tower} - Floor ${row.original.floor}`) },
    { id: 'classification', header: 'Classification', accessorKey: 'classification' },
    { id: 'status', header: 'Status', accessorKey: 'status', cell: ({ row }) => h(StatusBadge, { status: row.original.status }) },
]

const visitorsColumns: TableColumn<any>[] = [
    { id: 'visitor', header: 'Visitor Name', accessorKey: 'visitorName', cell: ({ row }) => h('div', { class: 'font-semibold' }, row.original.visitorName) },
    { id: 'plate', header: 'Plate Number', accessorKey: 'plateNumber', cell: ({ row }) => h('div', { class: 'font-mono tracking-wider' }, row.original.plateNumber) },
    { id: 'arrival', header: 'Expected Arrival', cell: ({ row }) => h('span', { class: 'text-sm' }, new Date(row.original.expectedArrival).toLocaleString()) },
    { id: 'status', header: 'Status', accessorKey: 'status', cell: ({ row }) => h(StatusBadge, { status: row.original.status }) },
]

const revenueColumns: TableColumn<any>[] = [
    { id: 'date', header: 'Date', cell: ({ row }) => h('span', { class: 'text-sm' }, new Date(row.original.createdAt).toLocaleDateString()) },
    { id: 'receipt', header: 'Receipt No.', accessorKey: 'receiptNumber', cell: ({ row }) => row.original.receiptNumber ? h('div', { class: 'font-mono' }, row.original.receiptNumber) : h('span', { class: 'text-muted' }, '-') },
    { id: 'type', header: 'Transaction Type', accessorKey: 'type' },
    { id: 'amount', header: 'Amount', accessorKey: 'amount', cell: ({ row }) => h('div', { class: 'font-mono font-semibold text-right' }, formatter.format(row.original.amount)) },
    { id: 'status', header: 'Status', accessorKey: 'status', cell: ({ row }) => h(StatusBadge, { status: row.original.status }) },
]

// Data getters
const getTabData = (key: string) => {
    switch (key) {
        case 'vehicles': return vehicleStore.vehicles
        case 'rfids': return rfidStore.rfidCredentials
        case 'slots': return slotStore.parkingSlots
        case 'visitors': return visitorStore.visitorReservations
        case 'revenue': return billingStore.billingTransactions
        case 'violations': return billingStore.billingTransactions.filter(t => t.type === 'VisitorPenalty')
        default: return []
    }
}

const getTabColumns = (key: string) => {
    switch (key) {
        case 'vehicles': return vehiclesColumns
        case 'rfids': return rfidsColumns
        case 'slots': return slotsColumns
        case 'visitors': return visitorsColumns
        case 'revenue': return revenueColumns
        case 'violations': return revenueColumns
        default: return []
    }
}
</script>

<template>
    <PageHeading forTable title="System Reports"
        description="Comprehensive tabular reports and data exports across all modules.">
        <div class="flex gap-2">
            <TableGlobalFilter v-model="searchQuery" placeholder="Search report data..." />
        </div>
    </PageHeading>

    <ClientOnly>
        <Teleport to="#header-actions-teleport">
            <UButton color="success" variant="soft" icon="i-lucide-download" label="Export CSV" @click="handleExport" />
        </Teleport>

        <div class="flex flex-col flex-1 min-h-0 bg-default">
            <UTabs v-model="activeTab" :items="items" variant="link" />

            <div class="flex-1 flex flex-col min-h-0 relative">
                <UTable :data="getTabData(activeTab)" :columns="getTabColumns(activeTab)"
                    v-model:global-filter="searchQuery" sticky class="flex-1 scrollbar absolute inset-0 pb-4">
                    <template #empty>
                        <UEmpty variant="naked" icon="i-lucide-folder-open" title="No data found"
                            description="No records available for this report." />
                    </template>
                </UTable>
            </div>
        </div>
    </ClientOnly>
</template>
