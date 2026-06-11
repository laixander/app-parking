<script setup lang="ts">
definePageMeta({ title: 'Parking Sessions', isTable: true })

import { ref, computed, useTemplateRef } from 'vue'
import { useParkingSessionStore } from '~/stores/parkingSessionStore'
import { UBadge, UIcon, UButton } from '#components'
import { StatusBadge } from '#components'
import type { SessionType, ParkingSession } from '~/types/parkingSession'

const store = useParkingSessionStore()
const toast = useAppToast()
const { log } = useActivityLog()

// Modal
const isOpen = ref(false)
const isEditing = ref(false)
const currentSessionId = ref<string | null>(null)
const defaultStatusForNew = ref('Active')
const modalRef = useTemplateRef('modalRef')

const openCreateModal = (status = 'Active') => {
    isEditing.value = false
    currentSessionId.value = null
    defaultStatusForNew.value = status
    modalRef.value?.reset({ status: status as any })
    isOpen.value = true
}

const openEditModal = (item: ParkingSession) => {
    isEditing.value = true
    currentSessionId.value = item.id
    modalRef.value?.reset({
        type: item.type,
        plateNumber: item.plateNumber,
        referenceId: item.referenceId ?? undefined,
        slotId: item.slotId ?? undefined,
        entryTime: new Date(item.entryTime).toISOString().slice(0, 16),
        exitTime: item.exitTime ? new Date(item.exitTime).toISOString().slice(0, 16) : undefined,
        status: item.status,
    })
    isOpen.value = true
}

const handleSave = (data: Omit<ParkingSession, 'id' | 'createdAt' | 'updatedAt' | 'validatedBy'>) => {
    if (isEditing.value && currentSessionId.value) {
        store.updateSession(currentSessionId.value, { 
            ...data,
            updatedAt: new Date().toISOString(),
        })
        log('ParkingSessions', 'updated', `Updated session for plate "${data.plateNumber}"`, { meta: { id: currentSessionId.value } })
        toast.success('Session Updated', `Changes saved.`)
    } else {
        const newItem: ParkingSession = {
            id: crypto.randomUUID(),
            ...data,
            validatedBy: 'front-desk-user', // Mocked user
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        store.createSession(newItem)
        log('ParkingSessions', 'created', `Logged entry for plate "${data.plateNumber}"`, { meta: { id: newItem.id } })
        toast.success('Session Started', `Entry logged for ${data.plateNumber}.`)
    }
    isOpen.value = false
}

// Kanban drag and drop
const dragging = ref<{ cardId: string; fromColumnId: string } | null>(null)
const dragOver = ref<{ columnId: string; cardId: string | null } | null>(null)

const onCardDragStart = (e: DragEvent, cardId: string, columnId: string) => {
    dragging.value = { cardId, fromColumnId: columnId }
    e.dataTransfer!.effectAllowed = 'move'
}

const onCardDragOver = (cardId: string, columnId: string) => {
    if (!dragging.value) return
    dragOver.value = { columnId, cardId }
}

const onColumnDragOver = (columnId: string) => {
    if (!dragging.value) return
    dragOver.value = { columnId, cardId: null }
}

const onDrop = (toColumnId: string, insertBeforeCardId?: string) => {
    if (!dragging.value) return
    store.moveSession(dragging.value.cardId, dragging.value.fromColumnId, toColumnId, insertBeforeCardId)
    
    // Log if moved to completed
    if (dragging.value.fromColumnId !== 'Completed' && toColumnId === 'Completed') {
        toast.success('Session Completed', 'Exit logged successfully.')
    }
    
    dragging.value = null
    dragOver.value = null
}

const onDragEnd = () => { dragging.value = null; dragOver.value = null }

const isColumnOver = (columnId: string) => dragOver.value?.columnId === columnId
const isCardOver = (cardId: string) => dragOver.value?.cardId === cardId
const isDraggingCard = (cardId: string) => dragging.value?.cardId === cardId

const searchQuery = ref('')

const displayColumns = computed(() => {
    return store.columns.map(c => {
        const filteredCards = c.cards.filter(card => {
            if (!searchQuery.value) return true
            const query = searchQuery.value.toLowerCase()
            return card.plateNumber.toLowerCase().includes(query) || 
                   (card.referenceId?.toLowerCase().includes(query) ?? false) ||
                   (card.slotId?.toLowerCase().includes(query) ?? false)
        })
        return { ...c, cards: filteredCards }
    })
})

const typeIcons: Record<SessionType, string> = {
    'Resident': 'i-lucide-home',
    'Visitor': 'i-lucide-user',
    'Walk-in': 'i-lucide-car-front',
}
</script>

<template>
    <PageHeading forTable title="Front Desk Operations" description="Kanban board for active parking entries and exits. Drag cards to update their status.">
        <div class="flex gap-2">
            <TableGlobalFilter v-model="searchQuery" placeholder="Search plates or refs..." />
        </div>
    </PageHeading>

    <ClientOnly>
        <div class="flex-1 min-h-0 flex flex-col">
            <div class="flex-1 flex gap-4 overflow-x-auto scrollbar p-4 items-start">
                
                <div v-for="column in displayColumns" :key="column.id" class="flex flex-col w-80 shrink-0 gap-3 max-h-full">
                    <!-- Column Header -->
                    <div class="flex items-center gap-2 p-3 bg-elevated/40 border border-default rounded-xl shadow-sm shrink-0">
                        <span class="size-2.5 rounded-full shrink-0" :class="column.dotColor" />
                        <UIcon :name="column.icon" class="size-4 text-muted shrink-0" />
                        <span class="text-sm font-semibold truncate">{{ column.title }}</span>
                        <UBadge :label="String(column.cards.length)" variant="soft" color="neutral" class="ml-auto shrink-0 font-mono" />
                        <UButton icon="i-lucide-plus" size="xs" color="neutral" variant="ghost" class="ml-1" @click="openCreateModal(column.id)" />
                    </div>

                    <!-- Drop Zone -->
                    <div class="flex flex-col gap-2 flex-1 min-h-[150px] overflow-y-auto scrollbar rounded-xl p-2 transition-all duration-150"
                        :class="isColumnOver(column.id) ? 'bg-primary/5 ring-2 ring-primary/30 ring-dashed' : 'bg-elevated/20'" 
                        @dragover.prevent="onColumnDragOver(column.id)"
                        @drop.prevent="onDrop(column.id)" 
                        @dragend="onDragEnd">
                        
                        <template v-for="card in column.cards" :key="card.id">
                            <div v-if="isCardOver(card.id)" class="h-1 rounded-full bg-primary mx-1 shrink-0" />

                            <UCard :ui="{ root: 'ring-1 ring-default shadow-sm border-none', body: 'p-4 sm:p-4 relative space-y-3' }"
                                class="group transition-all select-none shrink-0 cursor-grab active:cursor-grabbing hover:border-primary/30 hover:shadow-md"
                                :class="isDraggingCard(card.id) && 'opacity-40 scale-95'" 
                                draggable="true"
                                @dragstart="onCardDragStart($event, card.id, column.id)"
                                @dragover.prevent.stop="onCardDragOver(card.id, column.id)"
                                @drop.prevent.stop="onDrop(column.id, card.id)" 
                                @dragend="onDragEnd"
                                @dblclick="openEditModal(card)">
                                
                                <!-- Edit Button -->
                                <UButton icon="i-lucide-pencil" size="xs" color="neutral" variant="ghost" 
                                    class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" 
                                    @click.stop="openEditModal(card)" />

                                <div class="flex items-center gap-2">
                                    <h3 class="text-xl font-bold font-mono tracking-wide">{{ card.plateNumber }}</h3>
                                </div>
                                
                                <div class="text-xs space-y-1.5 text-muted">
                                    <div class="flex justify-between">
                                        <span>Entry:</span>
                                        <span class="font-medium text-default">{{ new Date(card.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
                                    </div>
                                    <div v-if="card.exitTime" class="flex justify-between">
                                        <span>Exit:</span>
                                        <span class="font-medium text-default">{{ new Date(card.exitTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
                                    </div>
                                    <div v-if="card.slotId" class="flex justify-between">
                                        <span>Slot:</span>
                                        <span class="font-mono text-default">{{ card.slotId.slice(0, 6) }}</span>
                                    </div>
                                    <div v-if="card.referenceId" class="flex justify-between">
                                        <span>Ref:</span>
                                        <span class="font-mono text-default">{{ card.referenceId.slice(0, 6) }}</span>
                                    </div>
                                </div>

                                <div class="pt-2 border-t border-default flex items-center justify-between">
                                    <StatusBadge :status="card.type" :icon="typeIcons[card.type]" />
                                </div>
                            </UCard>
                        </template>

                        <UEmpty v-if="column.cards.length === 0" variant="naked"
                            icon="i-lucide-inbox" title="No sessions" description="Drag a session here"
                            class="flex-1 py-8 opacity-50" />
                    </div>
                </div>

            </div>
        </div>
    </ClientOnly>

    <AddParkingSessionModal ref="modalRef" v-model:open="isOpen" :is-editing="isEditing" :default-status="defaultStatusForNew" @save="handleSave" />
</template>
