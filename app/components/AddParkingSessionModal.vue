<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{ isEditing: boolean, defaultStatus?: string }>()
const emit = defineEmits<{ save: [data: Omit<z.output<typeof schema>, 'exitTime' | 'referenceId' | 'slotId'> & { exitTime: string | null, referenceId: string | null, slotId: string | null }] }>()

const schema = z.object({
    type: z.enum(['Resident', 'Visitor', 'Walk-in']),
    plateNumber: z.string().min(1, 'Plate Number is required'),
    referenceId: z.string().optional(),
    slotId: z.string().optional(),
    entryTime: z.string().min(1, 'Entry Time is required'),
    exitTime: z.string().optional(),
    status: z.enum(['Active', 'Completed', 'Overstay']),
})
type Schema = z.output<typeof schema>

const formRef = useTemplateRef('formRef')

const state = reactive<Schema>({
    type: 'Walk-in',
    plateNumber: '',
    referenceId: undefined,
    slotId: undefined,
    entryTime: new Date().toISOString().slice(0, 16),
    exitTime: undefined,
    status: 'Active',
})

const reset = (initial?: Partial<Schema>) => {
    state.type = initial?.type ?? 'Walk-in'
    state.plateNumber = initial?.plateNumber ?? ''
    state.referenceId = initial?.referenceId ?? undefined
    state.slotId = initial?.slotId ?? undefined
    state.entryTime = initial?.entryTime ?? new Date().toISOString().slice(0, 16)
    state.exitTime = initial?.exitTime ?? undefined
    state.status = initial?.status ?? (props.defaultStatus as any ?? 'Active')
}
defineExpose({ reset })

async function onSubmit(event: FormSubmitEvent<Schema>) {
    emit('save', {
        ...event.data,
        exitTime: event.data.exitTime || null,
        referenceId: event.data.referenceId || null,
        slotId: event.data.slotId || null,
    })
}
</script>

<template>
    <UModal v-model:open="open" :title="isEditing ? 'Modify Session' : 'New Parking Session'">
        <template #body>
            <UForm ref="formRef" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Type" name="type" required>
                        <USelect v-model="state.type" :items="['Resident', 'Visitor', 'Walk-in']" class="w-full" />
                    </UFormField>
                    <UFormField label="Plate Number" name="plateNumber" required>
                        <UInput v-model="state.plateNumber" placeholder="ABC-1234" class="w-full" />
                    </UFormField>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Reference ID" name="referenceId">
                        <UInput v-model="state.referenceId" placeholder="RFID or QR Code" class="w-full" />
                    </UFormField>
                    <UFormField label="Slot ID" name="slotId">
                        <UInput v-model="state.slotId" placeholder="Assigned Slot" class="w-full" />
                    </UFormField>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Entry Time" name="entryTime" required>
                        <UInput v-model="state.entryTime" type="datetime-local" class="w-full" />
                    </UFormField>
                    <UFormField label="Exit Time" name="exitTime">
                        <UInput v-model="state.exitTime" type="datetime-local" class="w-full" />
                    </UFormField>
                </div>

                <UFormField label="Status" name="status" required>
                    <USelect v-model="state.status" :items="['Active', 'Overstay', 'Completed']" class="w-full" />
                </UFormField>
            </UForm>
        </template>
        <template #footer>
            <div class="flex justify-end gap-2">
                <UButton variant="ghost" color="neutral" @click="open = false">Dismiss</UButton>
                <UButton color="primary" @click="formRef?.submit()">
                    {{ isEditing ? 'Save Changes' : 'Log Entry' }}
                </UButton>
            </div>
        </template>
    </UModal>
</template>
