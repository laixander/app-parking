<script setup lang="ts">
definePageMeta({ title: 'Dashboard' })

import { useDashboardStore } from '~/stores/dashboardStore'
import { UIcon, UCard, UBadge } from '#components'
import { Line } from 'vue-chartjs'
import { computed } from 'vue'

const store = useDashboardStore()
const { defaultOptions } = useChart()

const formatter = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' })

const chartData = computed(() => {
    return {
        labels: store.revenueChart.map(d => d.date),
        datasets: [{
            label: 'Daily Revenue',
            data: store.revenueChart.map(d => d.amount),
            borderColor: 'rgb(14, 165, 233)',
            backgroundColor: 'rgba(14, 165, 233, 0.15)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(14, 165, 233)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            fill: true,
            tension: 0.4,
        }]
    }
})
</script>

<template>
    <PageHeading title="Dashboard" description="Real-time facility operations and revenue metrics." />

    <ClientOnly>
        <!-- ── Stat Cards ────────────────────────────────────────────── -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <StatCard title="Total Revenue" :value="formatter.format(store.overview.totalRevenue)"
                icon="i-lucide-wallet" trend="Live from Billing" trend-direction="up" />
            <StatCard title="Unpaid Invoices" :value="String(store.overview.unpaidInvoices)" icon="i-lucide-receipt"
                trend="Live from Billing" trend-direction="flat" />
            <StatCard title="Active Sessions" :value="String(store.overview.activeSessions)" icon="i-lucide-car-front"
                trend="Live from Sessions" trend-direction="up" />
            <StatCard title="Occupancy Rate" :value="`${store.overview.occupancyRate}%`" icon="i-lucide-pie-chart"
                trend="Live from Slots" trend-direction="flat" />
        </div>

        <div class="mt-6">
            <!-- ── Revenue Chart ─────────────────────────────────────── -->
            <UCard variant="subtle" class="shadow-sm flex flex-col" :ui="{ body: 'flex-1 flex flex-col' }">
                <div class="flex justify-between items-center mb-6 shrink-0">
                    <div>
                        <h3 class="text-base font-semibold">Revenue Trend</h3>
                        <p class="text-xs text-muted mt-0.5">Last 7 Days</p>
                    </div>
                </div>
                <div class="flex-1 min-h-[300px] w-full">
                    <Line v-if="store.revenueChart.length > 0" :data="chartData" :options="defaultOptions" />
                    <UEmpty v-else variant="naked" icon="i-lucide-chart-line" title="No data available"
                        description="No revenue data available yet." />
                </div>
            </UCard>
        </div>
    </ClientOnly>
</template>
