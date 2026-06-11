<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{ isEditing: boolean }>()
const emit = defineEmits<{ save: [data: Omit<z.output<typeof schema>, 'endDate'> & { endDate: string | null }] }>()

const schema = z.object({
    vehicleId: z.string().min(1, 'Vehicle is required'),
    slotId: z.string().min(1, 'Slot is required'),
    allocationType: z.enum(['Dedicated', 'Shared', 'Temporary']),
    status: z.enum(['Active', 'Transferred', 'Expired']),
    startDate: z.string().min(1, 'Start Date is required'),
    endDate: z.string().optional(),
})
type Schema = z.output<typeof schema>

const formRef = useTemplateRef('formRef')

const state = reactive<Schema>({
    vehicleId: '',
    slotId: '',
    allocationType: 'Dedicated',
    status: 'Active',
    startDate: new Date().toISOString().split('T')[0],
    endDate: undefined,
})

const reset = (initial?: Partial<Schema>) => {
    state.vehicleId = initial?.vehicleId ?? ''
    state.slotId = initial?.slotId ?? ''
    state.allocationType = initial?.allocationType ?? 'Dedicated'
    state.status = initial?.status ?? 'Active'
    state.startDate = initial?.startDate ?? new Date().toISOString().split('T')[0]
    state.endDate = initial?.endDate ?? undefined
}
defineExpose({ reset })

async function onSubmit(event: FormSubmitEvent<Schema>) {
    emit('save', {
        ...event.data,
        endDate: event.data.endDate || null
    })
}
</script>

<template>
    <UModal v-model:open="open" :title="isEditing ? 'Modify Parking Allocation' : 'Create Parking Allocation'">
        <template #body>
            <UForm ref="formRef" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Vehicle ID" name="vehicleId" required>
                        <UInput v-model="state.vehicleId" placeholder="Vehicle UUID" class="w-full" />
                    </UFormField>
                    <UFormField label="Slot ID" name="slotId" required>
                        <UInput v-model="state.slotId" placeholder="Slot UUID" class="w-full" />
                    </UFormField>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Allocation Type" name="allocationType" required>
                        <USelect v-model="state.allocationType" :items="['Dedicated', 'Shared', 'Temporary']" class="w-full" />
                    </UFormField>
                    <UFormField label="Status" name="status" required>
                        <USelect v-model="state.status" :items="['Active', 'Transferred', 'Expired']" class="w-full" />
                    </UFormField>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Start Date" name="startDate" required>
                        <UInput v-model="state.startDate" type="date" class="w-full" />
                    </UFormField>
                    <UFormField label="End Date" name="endDate">
                        <UInput v-model="state.endDate" type="date" class="w-full" />
                    </UFormField>
                </div>
            </UForm>
        </template>
        <template #footer>
            <div class="flex justify-end gap-2">
                <UButton variant="ghost" color="neutral" @click="open = false">Dismiss</UButton>
                <UButton color="primary" @click="formRef?.submit()">
                    {{ isEditing ? 'Save Changes' : 'Allocate Slot' }}
                </UButton>
            </div>
        </template>
    </UModal>
</template>
