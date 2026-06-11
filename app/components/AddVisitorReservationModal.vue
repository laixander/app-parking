<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{ isEditing: boolean }>()
const emit = defineEmits<{ save: [data: Omit<z.output<typeof schema>, 'qrCodeRef'>] }>()

const schema = z.object({
    residentId: z.string().min(1, 'Resident ID is required'),
    visitorName: z.string().min(1, 'Visitor Name is required'),
    plateNumber: z.string().min(1, 'Plate Number is required'),
    expectedArrival: z.string().min(1, 'Expected Arrival is required'),
    expectedDeparture: z.string().min(1, 'Expected Departure is required'),
    status: z.enum(['Pending', 'Approved', 'Validated', 'Expired', 'No-Show']),
})
type Schema = z.output<typeof schema>

const formRef = useTemplateRef('formRef')

const state = reactive<Schema>({
    residentId: '',
    visitorName: '',
    plateNumber: '',
    expectedArrival: new Date().toISOString().slice(0, 16),
    expectedDeparture: new Date().toISOString().slice(0, 16),
    status: 'Pending',
})

const reset = (initial?: Partial<Schema>) => {
    state.residentId = initial?.residentId ?? ''
    state.visitorName = initial?.visitorName ?? ''
    state.plateNumber = initial?.plateNumber ?? ''
    state.expectedArrival = initial?.expectedArrival ?? new Date().toISOString().slice(0, 16)
    state.expectedDeparture = initial?.expectedDeparture ?? new Date().toISOString().slice(0, 16)
    state.status = initial?.status ?? 'Pending'
}
defineExpose({ reset })

async function onSubmit(event: FormSubmitEvent<Schema>) {
    emit('save', event.data)
}
</script>

<template>
    <UModal v-model:open="open" :title="isEditing ? 'Modify Visitor Reservation' : 'Create Visitor Reservation'">
        <template #body>
            <UForm ref="formRef" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormField label="Resident / Host ID" name="residentId" required>
                    <UInput v-model="state.residentId" placeholder="Resident UUID" class="w-full" />
                </UFormField>
                
                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Visitor Name" name="visitorName" required>
                        <UInput v-model="state.visitorName" placeholder="e.g. John Doe" class="w-full" />
                    </UFormField>
                    <UFormField label="Plate Number" name="plateNumber" required>
                        <UInput v-model="state.plateNumber" placeholder="e.g. ABC-1234" class="w-full" />
                    </UFormField>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Expected Arrival" name="expectedArrival" required>
                        <UInput v-model="state.expectedArrival" type="datetime-local" class="w-full" />
                    </UFormField>
                    <UFormField label="Expected Departure" name="expectedDeparture" required>
                        <UInput v-model="state.expectedDeparture" type="datetime-local" class="w-full" />
                    </UFormField>
                </div>

                <UFormField label="Status" name="status" required>
                    <USelect v-model="state.status" :items="['Pending', 'Approved', 'Validated', 'Expired', 'No-Show']" class="w-full" />
                </UFormField>
            </UForm>
        </template>
        <template #footer>
            <div class="flex justify-end gap-2">
                <UButton variant="ghost" color="neutral" @click="open = false">Dismiss</UButton>
                <UButton color="primary" @click="formRef?.submit()">
                    {{ isEditing ? 'Save Changes' : 'Create Reservation' }}
                </UButton>
            </div>
        </template>
    </UModal>
</template>
