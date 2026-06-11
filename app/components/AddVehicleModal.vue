<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{ isEditing: boolean }>()
const emit = defineEmits<{ save: [data: z.output<typeof schema> & { documentUrls: string[] }] }>()

const schema = z.object({
    unitOwnerId: z.string().min(1, 'Owner ID is required'),
    plateNumber: z.string().min(1, 'Plate number is required'),
    make: z.string().min(1, 'Make is required'),
    model: z.string().min(1, 'Model is required'),
    color: z.string().min(1, 'Color is required'),
    registrationType: z.enum(['Primary', 'Secondary']),
    status: z.enum(['Pending', 'Approved', 'Rejected', 'Inactive']),
})
type Schema = z.output<typeof schema>

const formRef = useTemplateRef('formRef')

const state = reactive<Schema & { documentUrls: string[] }>({
    unitOwnerId: '',
    plateNumber: '',
    make: '',
    model: '',
    color: '',
    registrationType: 'Primary',
    status: 'Pending',
    documentUrls: []
})

const reset = (initial?: Partial<typeof state>) => {
    state.unitOwnerId = initial?.unitOwnerId ?? ''
    state.plateNumber = initial?.plateNumber ?? ''
    state.make = initial?.make ?? ''
    state.model = initial?.model ?? ''
    state.color = initial?.color ?? ''
    state.registrationType = initial?.registrationType ?? 'Primary'
    state.status = initial?.status ?? 'Pending'
    state.documentUrls = initial?.documentUrls ?? []
}
defineExpose({ reset })

async function onSubmit(event: FormSubmitEvent<Schema>) {
    emit('save', { ...event.data, documentUrls: state.documentUrls })
}
</script>

<template>
    <UModal v-model:open="open" :title="isEditing ? 'Modify Vehicle Details' : 'Register New Vehicle'">
        <template #body>
            <UForm ref="formRef" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormField label="Unit Owner ID" name="unitOwnerId" required>
                    <UInput v-model="state.unitOwnerId" placeholder="e.g. uuid" class="w-full" />
                </UFormField>
                
                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Plate Number" name="plateNumber" required>
                        <UInput v-model="state.plateNumber" placeholder="e.g. ABC-1234" class="w-full" />
                    </UFormField>
                    <UFormField label="Color" name="color" required>
                        <UInput v-model="state.color" placeholder="e.g. Red" class="w-full" />
                    </UFormField>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Make" name="make" required>
                        <UInput v-model="state.make" placeholder="e.g. Honda" class="w-full" />
                    </UFormField>
                    <UFormField label="Model" name="model" required>
                        <UInput v-model="state.model" placeholder="e.g. Civic" class="w-full" />
                    </UFormField>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Registration Type" name="registrationType" required>
                        <USelect v-model="state.registrationType" :items="['Primary', 'Secondary']" class="w-full" />
                    </UFormField>
                    <UFormField label="Status" name="status" required>
                        <USelect v-model="state.status" :items="['Pending', 'Approved', 'Rejected', 'Inactive']" class="w-full" />
                    </UFormField>
                </div>
            </UForm>
        </template>
        <template #footer>
            <div class="flex justify-end gap-2">
                <UButton variant="ghost" color="neutral" @click="open = false">Dismiss</UButton>
                <UButton color="primary" @click="formRef?.submit()">
                    {{ isEditing ? 'Save Changes' : 'Register Vehicle' }}
                </UButton>
            </div>
        </template>
    </UModal>
</template>
