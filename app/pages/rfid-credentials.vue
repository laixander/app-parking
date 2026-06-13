<script setup lang="ts">
definePageMeta({
    title: 'RFID Credentials',
    isTable: true,
})

import { ref, h, computed, useTemplateRef } from 'vue'
import { UBadge, UIcon, UButton, UDropdownMenu } from '#components'
import { StatusBadge } from '#components'
import { useRfidCredentialStore } from '~/stores/rfidCredentialStore'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'

const store = useRfidCredentialStore()
const settings = useSettingsStore()
const toast = useAppToast()
const { log } = useActivityLog()

type RfidCredential = typeof store.rfidCredentials[0]

const isOpen = ref(false)
const isEditing = ref(false)
const currentRfidCredentialId = ref<string | null>(null)
const pendingSaveData = ref<Omit<RfidCredential, 'id' | 'createdAt' | 'updatedAt' | 'assignedDate' | 'lastUsedAt'> | null>(null)
const modalRef = useTemplateRef('modalRef')

const openCreateModal = () => {
    isEditing.value = false
    currentRfidCredentialId.value = null
    modalRef.value?.reset()
    isOpen.value = true
}

const openEditModal = (item: RfidCredential) => {
    isEditing.value = true
    currentRfidCredentialId.value = item.id
    modalRef.value?.reset({
        tagNumber: item.tagNumber,
        vehicleId: item.vehicleId ?? undefined,
        status: item.status,
    })
    isOpen.value = true
}

const handleSave = (data: Omit<RfidCredential, 'id' | 'createdAt' | 'updatedAt' | 'assignedDate' | 'lastUsedAt'>) => {
    if (isEditing.value && currentRfidCredentialId.value) {
        pendingSaveData.value = data
        isOpen.value = false
        isEditConfirmOpen.value = true
    } else {
        const newItem: RfidCredential = {
            id: crypto.randomUUID(),
            ...data,
            assignedDate: data.vehicleId ? new Date().toISOString() : null,
            lastUsedAt: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        store.createRfidCredential(newItem)
        log('RfidCredentials', 'created', `Created RFID tag "${data.tagNumber}"`, { meta: { id: newItem.id } })
        isOpen.value = false
        toast.success('RFID Registered', `${data.tagNumber} has been added.`)
    }
}

const confirmSave = () => {
    if (currentRfidCredentialId.value && pendingSaveData.value) {
        // Find existing to preserve dates if needed
        const existing = store.rfidCredentials.find(r => r.id === currentRfidCredentialId.value)
        const newlyAssigned = !existing?.vehicleId && pendingSaveData.value.vehicleId
        
        store.updateRfidCredential(currentRfidCredentialId.value, { 
            ...pendingSaveData.value,
            assignedDate: newlyAssigned ? new Date().toISOString() : existing?.assignedDate,
            updatedAt: new Date().toISOString(),
        })
        log('RfidCredentials', 'updated', `Updated RFID tag "${pendingSaveData.value.tagNumber}"`, { meta: { id: currentRfidCredentialId.value } })
        toast.success('RFID Updated', `${pendingSaveData.value.tagNumber} has been saved.`)
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
        const item = store.rfidCredentials.find(e => e.id === pendingDeleteId.value)
        store.deleteRfidCredential(pendingDeleteId.value)
        log('RfidCredentials', 'deleted', `Deleted RFID tag "${item?.tagNumber ?? 'Unknown'}"`, { meta: { id: pendingDeleteId.value } })
        toast.error('RFID Deleted', 'The RFID tag record has been permanently removed.')
        pendingDeleteId.value = null
    }
}

const tableColumns: TableColumn<RfidCredential>[] = [
    {
        id: 'tagNumber',
        header: 'Tag Number',
        accessorKey: 'tagNumber',
        cell: ({ row }) => h('div', { class: 'font-mono font-bold text-sm tracking-wider' }, row.original.tagNumber)
    },
    {
        id: 'assignment',
        header: 'Vehicle Assignment',
        cell: ({ row }) => row.original.vehicleId 
            ? h(StatusBadge, { status: 'Assigned' })
            : h('span', { class: 'text-muted italic text-sm' }, 'Unassigned')
    },
    {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => h(StatusBadge, { status: row.original.status })
    },
    {
        id: 'lastUsed',
        header: 'Last Used',
        cell: ({ row }) => h('span', { class: 'text-sm text-muted' }, 
            row.original.lastUsedAt ? new Date(row.original.lastUsedAt).toLocaleDateString() : 'Never'
        )
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
const filteredRfids = computed(() => {
    if (!globalFilter.value) return store.rfidCredentials
    const search = globalFilter.value.toLowerCase()
    return store.rfidCredentials.filter(item =>
        item.tagNumber.toLowerCase().includes(search) ||
        (item.vehicleId && item.vehicleId.toLowerCase().includes(search)) ||
        item.id.toLowerCase().includes(search)
    )
})
</script>

<template>
    <PageHeading forTable title="RFID Management" description="Manage parking access control tags and assignments.">
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
            <UButton color="primary" icon="i-lucide-plus" label="Register Tag" @click="openCreateModal()" />
        </Teleport>

        <!-- List (table) view -->
        <UTable v-if="viewMode === 'list'" :data="store.rfidCredentials" :columns="tableColumns"
            :loading="store.isLoading" v-model:column-visibility="columnVisibility"
            v-model:global-filter="globalFilter" sticky ref="table" class="flex-1 scrollbar">
            <template #empty>
                <UEmpty variant="naked" icon="i-lucide-nfc" title="No RFID tags found"
                    description="Get started by registering a new access tag.">
                    <template #actions>
                        <UButton label="Register First Tag" icon="i-lucide-plus" color="primary" size="lg"
                            @click="openCreateModal()" />
                    </template>
                </UEmpty>
            </template>
        </UTable>

        <!-- Card view -->
        <div v-else class="flex-1 overflow-y-auto scrollbar p-4">
            <div v-if="filteredRfids.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <UCard v-for="item in filteredRfids" :key="item.id" variant="subtle"
                    :ui="{ header: 'flex items-center justify-between gap-4', footer: 'p-0 sm:p-0' }" class="shadow-sm">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <UIcon name="i-lucide-nfc" class="size-6 text-primary shrink-0" />
                            <div class="text-sm font-mono font-bold truncate">{{ item.tagNumber }}</div>
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
                            <StatusBadge v-if="item.vehicleId" status="Assigned" />
                            <span v-else class="text-muted italic">Unassigned</span>
                        </div>
                        <div>
                            <div class="text-muted w-full">Status</div>
                            <div class="flex items-center gap-1.5">
                                <StatusBadge :status="item.status" />
                            </div>
                        </div>
                        <div>
                            <div class="text-muted w-full">Last Used</div>
                            <div class="text-right">{{ item.lastUsedAt ? new Date(item.lastUsedAt).toLocaleDateString() : 'Never' }}</div>
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
                <p class="text-sm font-medium">Loading tags…</p>
            </div>
            <UEmpty v-else variant="naked" icon="i-lucide-nfc" title="No RFID tags found"
                description="Get started by registering a new access tag.">
                <template #actions>
                    <UButton label="Register First Tag" icon="i-lucide-plus" color="primary" size="lg"
                        @click="openCreateModal()" />
                </template>
            </UEmpty>
        </div>
    </ClientOnly>

    <ConfirmationModal v-model:open="isEditConfirmOpen" title="Save changes?"
        description="Are you sure you want to update this RFID record?" confirm-label="Yes, Save"
        confirm-color="warning" @confirm="confirmSave" />

    <ConfirmationModal v-model:open="isDeleteConfirmOpen" title="Delete tag?"
        description="This will permanently remove the RFID record. This action cannot be undone."
        confirm-label="Yes, Delete" confirm-color="error" @confirm="confirmDelete" />

    <AddRfidCredentialModal ref="modalRef" v-model:open="isOpen" :is-editing="isEditing" @save="handleSave" />
</template>
