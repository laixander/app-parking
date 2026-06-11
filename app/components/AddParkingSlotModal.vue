<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{ isEditing: boolean }>()
const emit = defineEmits<{ save: [data: z.output<typeof schema>] }>()

const schema = z.object({
    code: z.string().min(1, 'Code is required'),
    classification: z.enum(['Resident', 'Visitor', 'Reserved', 'Pay Parking']),
    tower: z.string().min(1, 'Tower is required'),
    floor: z.string().min(1, 'Floor is required'),
    zone: z.string().min(1, 'Zone is required'),
    status: z.enum(['Available', 'Occupied', 'Maintenance']),
})
type Schema = z.output<typeof schema>

const formRef = useTemplateRef('formRef')

const state = reactive<Schema>({
    code: '',
    classification: 'Resident',
    tower: '',
    floor: '',
    zone: '',
    status: 'Available',
})

const reset = (initial?: Partial<typeof state>) => {
    state.code = initial?.code ?? ''
    state.classification = initial?.classification ?? 'Resident'
    state.tower = initial?.tower ?? ''
    state.floor = initial?.floor ?? ''
    state.zone = initial?.zone ?? ''
    state.status = initial?.status ?? 'Available'
}
defineExpose({ reset })

async function onSubmit(event: FormSubmitEvent<Schema>) {
    emit('save', event.data)
}
</script>

<template>
    <UModal v-model:open="open" :title="isEditing ? 'Modify Parking Slot Details' : 'Register New Parking Slot'">
        <template #body>
            <UForm ref="formRef" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormField label="Code" name="code" required>
                    <UInput v-model="state.code" placeholder="e.g. A101" class="w-full" />
                </UFormField>
                <UFormField label="Classification" name="classification" required>
                    <USelect v-model="state.classification" :items="['Resident', 'Visitor', 'Reserved', 'Pay Parking']" class="w-full" />
                </UFormField>
                <UFormField label="Tower" name="tower" required>
                    <UInput v-model="state.tower" placeholder="e.g. Tower 1" class="w-full" />
                </UFormField>
                <UFormField label="Floor" name="floor" required>
                    <UInput v-model="state.floor" placeholder="e.g. 1st Floor" class="w-full" />
                </UFormField>
                <UFormField label="Zone" name="zone" required>
                    <UInput v-model="state.zone" placeholder="e.g. North" class="w-full" />
                </UFormField>
                <UFormField label="Status" name="status" required>
                    <USelect v-model="state.status" :items="['Available', 'Occupied', 'Maintenance']" class="w-full" />
                </UFormField>
            </UForm>
        </template>
        <template #footer>
            <div class="flex justify-end gap-2">
                <UButton variant="ghost" color="neutral" @click="open = false">Dismiss</UButton>
                <UButton color="primary" @click="formRef?.submit()">
                    {{ isEditing ? 'Save Changes' : 'Save Record' }}
                </UButton>
            </div>
        </template>
    </UModal>
</template>
