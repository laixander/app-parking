<script setup lang="ts">
import { Line, Bar, Doughnut, Radar, PolarArea } from 'vue-chartjs'

const { palette, legendLabels, defaultOptions, doughnutOptions, polarAreaOptions, radarOptions, lineDataset, barDataset, doughnutDataset, polarAreaDataset, radarDataset } = useChart()

// ── Line: Single series ───────────────────────────────────────────────────
const activityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [lineDataset({ label: 'Active Users', data: [350, 480, 620, 510, 750, 890, 780] })]
}

// ── Line: Multi-series ────────────────────────────────────────────────────
const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        lineDataset({ label: 'Revenue', data: [4200, 5800, 5100, 7300, 6800, 9100], borderColor: palette.green.solid, backgroundColor: palette.green.soft }),
        lineDataset({ label: 'Expenses', data: [3100, 3900, 4200, 4800, 4100, 5300], borderColor: palette.orange.solid, backgroundColor: palette.orange.soft }),
    ]
}

// ── Bar: Single series ────────────────────────────────────────────────────
const completionData = {
    labels: ['Development', 'Design', 'Marketing', 'Sales', 'Support', 'Operations'],
    datasets: [barDataset({ label: 'Tasks Completed', data: [320, 150, 90, 210, 180, 250] })]
}

// ── Bar: Grouped multi-series ─────────────────────────────────────────────
const groupedBarData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
        barDataset({ label: 'Current Year', data: [540, 720, 890, 1040], backgroundColor: 'rgba(14, 165, 233, 0.85)', hoverBackgroundColor: 'rgb(14, 165, 233)' }),
        barDataset({ label: 'Previous Year', data: [410, 620, 750, 870], backgroundColor: 'rgba(156, 163, 175, 0.35)', hoverBackgroundColor: 'rgba(156, 163, 175, 0.6)' }),
    ]
}

// ── Doughnut ──────────────────────────────────────────────────────────────
const trafficData = {
    labels: ['Direct', 'Organic', 'Referral', 'Social', 'Email'],
    datasets: [doughnutDataset({ label: 'Traffic Sources', data: [38, 27, 15, 12, 8] })]
}

// ── Polar Area ────────────────────────────────────────────────────────────
const polarData = {
    labels: ['Infrastructure', 'Security', 'Performance', 'Availability', 'Compliance', 'Support'],
    datasets: [polarAreaDataset({ label: 'Resource Allocation', data: [72, 58, 89, 95, 63, 44] })]
}

// ── Radar ─────────────────────────────────────────────────────────────────
const radarData = {
    labels: ['Performance', 'Reliability', 'Security', 'Scalability', 'Usability', 'Maintainability'],
    datasets: [
        radarDataset({ label: 'Current', data: [80, 92, 75, 68, 88, 72] }),
        radarDataset({ label: 'Target', data: [90, 95, 90, 85, 92, 88], borderColor: palette.violet.solid, backgroundColor: palette.violet.soft }),
    ]
}
</script>

<template>
    <UPageCard title="Dashboard" description="Key metrics and chart samples for easy reference."
        variant="naked" orientation="horizontal" class="rounded-none" />

    <!-- ── Stat Cards ────────────────────────────────────────────────── -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <UCard :ui="{ body: 'px-4 py-5 sm:p-6' }">
            <div class="flex items-center justify-between">
                <div class="text-sm font-medium">Total Users</div>
                <UIcon name="i-lucide-users" class="text-primary w-5 h-5 opacity-50" />
            </div>
            <div class="text-3xl font-bold mt-2">10,248</div>
            <div class="text-xs text-green-500 font-medium mt-2 flex items-center gap-1">
                <UIcon name="i-lucide-arrow-up-right" class="w-3 h-3" />
                <span>12% from last month</span>
            </div>
        </UCard>
        <UCard :ui="{ body: 'px-4 py-5 sm:p-6' }">
            <div class="flex items-center justify-between">
                <div class="text-sm font-medium">Active Sessions</div>
                <UIcon name="i-lucide-activity" class="text-primary w-5 h-5 opacity-50" />
            </div>
            <div class="text-3xl font-bold mt-2">1,432</div>
            <div class="text-xs text-green-500 font-medium mt-2 flex items-center gap-1">
                <UIcon name="i-lucide-arrow-up-right" class="w-3 h-3" />
                <span>5% from last week</span>
            </div>
        </UCard>
        <UCard :ui="{ body: 'px-4 py-5 sm:p-6' }">
            <div class="flex items-center justify-between">
                <div class="text-sm font-medium">Avg. Response Time</div>
                <UIcon name="i-lucide-zap" class="text-primary w-5 h-5 opacity-50" />
            </div>
            <div class="text-3xl font-bold mt-2">245ms</div>
            <div class="text-xs text-error-500 font-medium mt-2 flex items-center gap-1">
                <UIcon name="i-lucide-arrow-down-right" class="w-3 h-3" />
                <span>12ms from last month</span>
            </div>
        </UCard>
    </div>

    <!-- ── Row 1: Line Charts ─────────────────────────────────────────── -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <UCard>
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h3 class="text-base font-semibold">Active Users Trend</h3>
                    <p class="text-xs text-muted mt-0.5">Single-series line chart</p>
                </div>
                <UBadge variant="soft" color="primary">Weekly</UBadge>
            </div>
            <div class="h-[240px] w-full">
                <Line :data="activityData" :options="defaultOptions" />
            </div>
        </UCard>
        <UCard>
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h3 class="text-base font-semibold">Revenue vs Expenses</h3>
                    <p class="text-xs text-muted mt-0.5">Multi-series line chart</p>
                </div>
                <UBadge variant="soft" color="primary">6 Months</UBadge>
            </div>
            <div class="h-[240px] w-full">
                <Line :data="revenueData" :options="{ ...defaultOptions, plugins: { ...defaultOptions.plugins, legend: { display: true, labels: legendLabels } } }" />
            </div>
        </UCard>
    </div>

    <!-- ── Row 2: Bar Charts ──────────────────────────────────────────── -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <UCard>
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h3 class="text-base font-semibold">Activity by Category</h3>
                    <p class="text-xs text-muted mt-0.5">Single-series bar chart</p>
                </div>
                <UBadge variant="soft" color="primary">All Time</UBadge>
            </div>
            <div class="h-[240px] w-full">
                <Bar :data="completionData" :options="defaultOptions" />
            </div>
        </UCard>
        <UCard>
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h3 class="text-base font-semibold">Quarterly Performance</h3>
                    <p class="text-xs text-muted mt-0.5">Grouped bar chart</p>
                </div>
                <UBadge variant="soft" color="primary">YoY</UBadge>
            </div>
            <div class="h-[240px] w-full">
                <Bar :data="groupedBarData" :options="{ ...defaultOptions, plugins: { ...defaultOptions.plugins, legend: { display: true, labels: legendLabels } } }" />
            </div>
        </UCard>
    </div>

    <!-- ── Row 3: Doughnut + Polar Area + Radar ──────────────────────── -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <UCard>
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h3 class="text-base font-semibold">Traffic Sources</h3>
                    <p class="text-xs text-muted mt-0.5">Doughnut chart</p>
                </div>
                <UBadge variant="soft" color="primary">This Month</UBadge>
            </div>
            <div class="h-[240px] w-full">
                <Doughnut :data="trafficData" :options="doughnutOptions" />
            </div>
        </UCard>
        <UCard>
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h3 class="text-base font-semibold">Resource Allocation</h3>
                    <p class="text-xs text-muted mt-0.5">Polar area chart</p>
                </div>
                <UBadge variant="soft" color="primary">Current Quarter</UBadge>
            </div>
            <div class="h-[240px] w-full">
                <PolarArea :data="polarData" :options="polarAreaOptions" />
            </div>
        </UCard>
        <UCard>
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h3 class="text-base font-semibold">System Health</h3>
                    <p class="text-xs text-muted mt-0.5">Radar chart</p>
                </div>
                <UBadge variant="soft" color="primary">vs Target</UBadge>
            </div>
            <div class="h-[240px] w-full">
                <Radar :data="radarData" :options="radarOptions" />
            </div>
        </UCard>
    </div>


    
    <UAlert variant="subtle" color="warning" icon="i-lucide-bot" class="mt-6"
        title="AI Agent Instructions — How to use charts in this project">
        <template #description>
            <div class="mt-1 space-y-1 text-xs leading-relaxed">
                <p>Charts use <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">useChart()</code> from <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">~/composables/useChart.ts</code>. Import the component from <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">vue-chartjs</code> and destructure helpers from the composable.</p>
                <ul class="list-disc list-inside space-y-0.5 mt-1">
                    <li><strong>Line chart</strong> — use <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">&lt;Line&gt;</code> with <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">lineDataset()</code> and <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">:options="defaultOptions"</code></li>
                    <li><strong>Bar chart</strong> — use <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">&lt;Bar&gt;</code> with <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">barDataset()</code> and <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">:options="defaultOptions"</code></li>
                    <li><strong>Doughnut chart</strong> — use <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">&lt;Doughnut&gt;</code> with <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">doughnutDataset()</code> and <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">:options="doughnutOptions"</code></li>
                    <li><strong>Polar area chart</strong> — use <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">&lt;PolarArea&gt;</code> with <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">polarAreaDataset()</code> and <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">:options="polarAreaOptions"</code></li>
                    <li><strong>Radar chart</strong> — use <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">&lt;Radar&gt;</code> with <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">radarDataset()</code> and <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">:options="radarOptions"</code></li>
                    <li><strong>Multi-series legend</strong> — spread <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">defaultOptions</code> and override <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">plugins.legend</code> with <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">&#123; display: true, labels: legendLabels &#125;</code></li>
                    <li><strong>Custom colors</strong> — use <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">palette.blue/violet/green/orange/pink/teal</code> (each has <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">.solid</code> and <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">.soft</code>)</li>
                </ul>
                <p class="mt-1">All charts must be wrapped in a container with a fixed height, e.g. <code class="font-mono bg-warning-200 dark:bg-warning-700 px-1 rounded">class="h-[240px] w-full"</code>.</p>
            </div>
        </template>
    </UAlert>
</template>

