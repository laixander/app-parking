<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{ isEditing: boolean }>()

const emit = defineEmits<{ 
    save: [data: Omit<z.output<typeof schema>, 'sessionId' | 'paymentMethod' | 'receiptNumber' | 'transactionDate'> & { 
        sessionId: string | null, 
        paymentMethod: 'Cash' | 'Card' | 'E-Wallet' | null, 
        receiptNumber: string | null, 
        transactionDate: string | null 
    }] 
}>()

const schema = z.object({
    sessionId: z.string().optional(),
    type: z.enum(['ResidentCharge', 'VisitorPenalty', 'PayParking']),
    amount: z.number().min(0, 'Amount must be positive'),
    status: z.enum(['Unpaid', 'Paid', 'Cancelled']),
    paymentMethod: z.enum(['Cash', 'Card', 'E-Wallet']).optional(),
    receiptNumber: z.string().optional(),
    transactionDate: z.string().optional(),
})
type Schema = z.output<typeof schema>

const formRef = useTemplateRef('formRef')

const state = reactive<Schema>({
    sessionId: undefined,
    type: 'PayParking',
    amount: 0,
    status: 'Unpaid',
    paymentMethod: undefined,
    receiptNumber: undefined,
    transactionDate: undefined,
})

const reset = (initial?: Partial<Schema>) => {
    state.sessionId = initial?.sessionId ?? undefined
    state.type = initial?.type ?? 'PayParking'
    state.amount = initial?.amount ?? 0
    state.status = initial?.status ?? 'Unpaid'
    state.paymentMethod = initial?.paymentMethod ?? undefined
    state.receiptNumber = initial?.receiptNumber ?? undefined
    state.transactionDate = initial?.transactionDate ?? undefined
}
defineExpose({ reset })

async function onSubmit(event: FormSubmitEvent<Schema>) {
    emit('save', {
        ...event.data,
        sessionId: event.data.sessionId || null,
        paymentMethod: event.data.paymentMethod || null,
        receiptNumber: event.data.receiptNumber || null,
        transactionDate: event.data.transactionDate || null,
    })
}
</script>

<template>
    <UModal v-model:open="open" :title="isEditing ? 'Modify Transaction' : 'Record Transaction'">
        <template #body>
            <UForm ref="formRef" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Type" name="type" required>
                        <USelect v-model="state.type" :items="['ResidentCharge', 'VisitorPenalty', 'PayParking']" class="w-full" />
                    </UFormField>
                    <UFormField label="Amount (₱)" name="amount" required>
                        <UInput v-model="state.amount" type="number" step="0.01" class="w-full" />
                    </UFormField>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Status" name="status" required>
                        <USelect v-model="state.status" :items="['Unpaid', 'Paid', 'Cancelled']" class="w-full" />
                    </UFormField>
                    <UFormField label="Session ID" name="sessionId">
                        <UInput v-model="state.sessionId" placeholder="Linked Parking Session" class="w-full" />
                    </UFormField>
                </div>

                <div v-if="state.status === 'Paid'" class="grid grid-cols-2 gap-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                    <UFormField label="Payment Method" name="paymentMethod">
                        <USelect v-model="state.paymentMethod" :items="['Cash', 'Card', 'E-Wallet']" class="w-full" />
                    </UFormField>
                    <UFormField label="Receipt Number" name="receiptNumber">
                        <UInput v-model="state.receiptNumber" placeholder="RCPT-..." class="w-full" />
                    </UFormField>
                    <UFormField label="Transaction Date" name="transactionDate" class="col-span-2">
                        <UInput v-model="state.transactionDate" type="datetime-local" class="w-full" />
                    </UFormField>
                </div>
            </UForm>
        </template>
        <template #footer>
            <div class="flex justify-end gap-2">
                <UButton variant="ghost" color="neutral" @click="open = false">Dismiss</UButton>
                <UButton color="primary" @click="formRef?.submit()">
                    {{ isEditing ? 'Save Changes' : 'Record Transaction' }}
                </UButton>
            </div>
        </template>
    </UModal>
</template>
