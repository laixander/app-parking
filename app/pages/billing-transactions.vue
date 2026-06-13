<script setup lang="ts">
definePageMeta({ title: 'Billing Transactions', isTable: true })

import { ref, h, computed, useTemplateRef } from 'vue'
import { UBadge, UIcon, UButton, UDropdownMenu } from '#components'
import { StatusBadge } from '#components'
import { useBillingTransactionStore } from '~/stores/billingTransactionStore'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'

const store = useBillingTransactionStore()
const settings = useSettingsStore()
const toast = useAppToast()
const { log } = useActivityLog()

type BillingTransaction = typeof store.billingTransactions[0]

const isOpen = ref(false)
const isEditing = ref(false)
const currentTransactionId = ref<string | null>(null)
const pendingSaveData = ref<Omit<BillingTransaction, 'id' | 'createdAt' | 'updatedAt'> | null>(null)
const modalRef = useTemplateRef('modalRef')

const formatter = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' })

const openCreateModal = () => {
    isEditing.value = false
    currentTransactionId.value = null
    modalRef.value?.reset()
    isOpen.value = true
}

const openEditModal = (item: BillingTransaction) => {
    isEditing.value = true
    currentTransactionId.value = item.id
    modalRef.value?.reset({
        type: item.type,
        amount: item.amount,
        status: item.status,
        sessionId: item.sessionId ?? undefined,
        paymentMethod: item.paymentMethod ?? undefined,
        receiptNumber: item.receiptNumber ?? undefined,
        transactionDate: item.transactionDate ? new Date(item.transactionDate).toISOString().slice(0, 16) : undefined,
    })
    isOpen.value = true
}

const handleSave = (data: Omit<BillingTransaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    // If marked Paid but missing transactionDate, auto-stamp it
    if (data.status === 'Paid' && !data.transactionDate) {
        data.transactionDate = new Date().toISOString()
    }

    if (isEditing.value && currentTransactionId.value) {
        pendingSaveData.value = data
        isOpen.value = false
        isEditConfirmOpen.value = true
    } else {
        const newItem: BillingTransaction = {
            id: crypto.randomUUID(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        store.createBillingTransaction(newItem)
        log('BillingTransactions', 'created', `Recorded new transaction (${formatter.format(data.amount)})`, { meta: { id: newItem.id } })
        isOpen.value = false
        toast.success('Transaction Recorded', `Successfully saved transaction record.`)
    }
}

const confirmSave = () => {
    if (currentTransactionId.value && pendingSaveData.value) {
        store.updateBillingTransaction(currentTransactionId.value, { 
            ...pendingSaveData.value,
            updatedAt: new Date().toISOString(),
        })
        log('BillingTransactions', 'updated', `Updated transaction record`, { meta: { id: currentTransactionId.value } })
        toast.success('Transaction Updated', `Changes have been saved.`)
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
        const item = store.billingTransactions.find(e => e.id === pendingDeleteId.value)
        store.deleteBillingTransaction(pendingDeleteId.value)
        log('BillingTransactions', 'deleted', `Deleted transaction record`, { meta: { id: pendingDeleteId.value } })
        toast.error('Transaction Deleted', 'The transaction record has been permanently removed.')
        pendingDeleteId.value = null
    }
}

const tableColumns: TableColumn<BillingTransaction>[] = [
    {
        id: 'date',
        header: 'Date',
        cell: ({ row }) => h('div', { class: 'text-sm text-default' }, new Date(row.original.createdAt).toLocaleDateString())
    },
    {
        id: 'details',
        header: 'Details',
        cell: ({ row }) => h('div', { class: 'flex flex-col' }, [
            h('span', { class: 'font-medium text-default' }, row.original.type),
            row.original.sessionId ? h('span', { class: 'text-xs font-mono text-muted tracking-wide' }, `S-${row.original.sessionId.slice(0, 8)}`) : undefined
        ])
    },
    {
        id: 'amount',
        header: 'Amount',
        cell: ({ row }) => h('div', { class: 'font-mono text-sm tracking-wide text-right w-full pr-4' }, formatter.format(row.original.amount))
    },
    {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => h(StatusBadge, { status: row.original.status })
    },
    {
        id: 'payment',
        header: 'Payment Info',
        cell: ({ row }) => {
            if (row.original.status !== 'Paid') return h('span', { class: 'text-muted italic text-sm' }, '-')
            return h('div', { class: 'flex flex-col' }, [
                h('span', { class: 'text-sm' }, row.original.paymentMethod || ''),
                row.original.receiptNumber ? h('span', { class: 'text-xs font-mono text-muted' }, row.original.receiptNumber) : undefined
            ])
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
const filteredTransactions = computed(() => {
    if (!globalFilter.value) return store.billingTransactions
    const search = globalFilter.value.toLowerCase()
    return store.billingTransactions.filter(item =>
        item.type.toLowerCase().includes(search) ||
        (item.receiptNumber?.toLowerCase().includes(search) ?? false) ||
        (item.sessionId?.toLowerCase().includes(search) ?? false)
    )
})
</script>

<template>
    <PageHeading forTable title="Billing Transactions" description="Manage parking fees, resident charges, and penalties.">
        <div class="flex gap-2">
            <TableGlobalFilter v-model="globalFilter" placeholder="Search receipts or sessions..." />
            <TableColumnToggle v-if="viewMode === 'list'" :table="table" />
            <UTabs v-model="viewMode" variant="pill" size="xs" :content="false" :items="[
                { value: 'card', icon: 'i-lucide-grid-2x2' },
                { value: 'list', icon: 'i-lucide-list' },
            ]" />
        </div>
    </PageHeading>

    <ClientOnly>
        <Teleport to="#header-actions-teleport">
            <UButton color="primary" icon="i-lucide-plus" label="Record Transaction" @click="openCreateModal()" />
        </Teleport>

        <!-- List (table) view -->
        <UTable v-if="viewMode === 'list'" :data="store.billingTransactions" :columns="tableColumns"
            :loading="store.isLoading" v-model:column-visibility="columnVisibility"
            v-model:global-filter="globalFilter" sticky ref="table" class="flex-1 scrollbar">
            <template #empty>
                <UEmpty variant="naked" icon="i-lucide-receipt" title="No transactions"
                    description="Get started by recording a transaction.">
                    <template #actions>
                        <UButton label="Record Transaction" icon="i-lucide-plus" color="primary" size="lg"
                            @click="openCreateModal()" />
                    </template>
                </UEmpty>
            </template>
        </UTable>

        <!-- Card view -->
        <div v-else class="flex-1 overflow-y-auto scrollbar p-4">
            <div v-if="filteredTransactions.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <UCard v-for="item in filteredTransactions" :key="item.id" variant="subtle"
                    :ui="{ header: 'flex items-center justify-between gap-4', footer: 'p-0 sm:p-0' }" class="shadow-sm">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <UIcon name="i-lucide-receipt" class="size-5 text-primary shrink-0" />
                            <div class="text-sm font-medium truncate">{{ item.type }}</div>
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
                            <div class="text-muted w-full">Amount</div>
                            <div class="font-mono text-right text-lg font-bold">{{ formatter.format(item.amount) }}</div>
                        </div>
                        <div>
                            <div class="text-muted w-full">Status</div>
                            <div class="flex items-center gap-1.5 font-medium">
                                <StatusBadge :status="item.status" />
                            </div>
                        </div>
                        <div v-if="item.status === 'Paid'" class="flex-col !items-end py-2">
                            <div class="text-muted w-full text-left">Payment Info</div>
                            <div class="text-xs text-right mt-1">
                                {{ item.paymentMethod }} <br>
                                <span v-if="item.receiptNumber" class="text-muted font-mono">{{ item.receiptNumber }}</span>
                            </div>
                        </div>
                    </div>
                </UCard>
            </div>
            <div v-else-if="store.isLoading" class="flex items-center justify-center h-full gap-3 text-muted">
                <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-primary" />
                <p class="text-sm font-medium">Loading transactions…</p>
            </div>
            <UEmpty v-else variant="naked" icon="i-lucide-receipt" title="No transactions"
                description="Get started by recording a transaction.">
                <template #actions>
                    <UButton label="Record Transaction" icon="i-lucide-plus" color="primary" size="lg"
                        @click="openCreateModal()" />
                </template>
            </UEmpty>
        </div>
    </ClientOnly>

    <ConfirmationModal v-model:open="isEditConfirmOpen" title="Save changes?"
        description="Are you sure you want to update this transaction record?" confirm-label="Yes, Save"
        confirm-color="warning" @confirm="confirmSave" />

    <ConfirmationModal v-model:open="isDeleteConfirmOpen" title="Delete transaction?"
        description="This will permanently remove the transaction record. This action cannot be undone."
        confirm-label="Yes, Delete" confirm-color="error" @confirm="confirmDelete" />

    <AddBillingTransactionModal ref="modalRef" v-model:open="isOpen" :is-editing="isEditing" @save="handleSave" />
</template>
