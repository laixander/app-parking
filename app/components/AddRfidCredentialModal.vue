<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{ isEditing: boolean }>()
const emit = defineEmits<{ save: [data: Omit<z.output<typeof schema>, 'vehicleId'> & { vehicleId: string | null }] }>()

const schema = z.object({
    tagNumber: z.string().min(1, 'Tag Number is required'),
    vehicleId: z.string().optional(),
    status: z.enum(['Active', 'Inactive', 'Lost', 'Blocked']),
})
type Schema = z.output<typeof schema>

const formRef = useTemplateRef('formRef')

const state = reactive<Schema>({
    tagNumber: '',
    vehicleId: undefined,
    status: 'Active',
})

const reset = (initial?: Partial<Schema>) => {
    state.tagNumber = initial?.tagNumber ?? ''
    state.vehicleId = initial?.vehicleId ?? undefined
    state.status = initial?.status ?? 'Active'
}
defineExpose({ reset })

async function onSubmit(event: FormSubmitEvent<Schema>) {
    emit('save', {
        ...event.data,
        vehicleId: event.data.vehicleId || null
    })
}
</script>

<template>
    <UModal v-model:open="open" :title="isEditing ? 'Modify RFID Credentials' : 'Register New RFID Tag'">
        <template #body>
            <UForm ref="formRef" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormField label="Tag Number" name="tagNumber" required>
                    <UInput v-model="state.tagNumber" placeholder="e.g. RFID-ABCDEF12" class="w-full" />
                </UFormField>
                
                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Status" name="status" required>
                        <USelect v-model="state.status" :items="['Active', 'Inactive', 'Lost', 'Blocked']" class="w-full" />
                    </UFormField>
                    <UFormField label="Linked Vehicle ID" name="vehicleId">
                        <UInput v-model="state.vehicleId" placeholder="Optional Vehicle ID" class="w-full" />
                    </UFormField>
                </div>
            </UForm>
        </template>
        <template #footer>
            <div class="flex justify-end gap-2">
                <UButton variant="ghost" color="neutral" @click="open = false">Dismiss</UButton>
                <UButton color="primary" @click="formRef?.submit()">
                    {{ isEditing ? 'Save Changes' : 'Register Tag' }}
                </UButton>
            </div>
        </template>
    </UModal>
</template>
