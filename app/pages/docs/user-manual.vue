<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

definePageMeta({
    layout: false,
    title: 'User Manual'
})

const isScrolled = ref(false)

onMounted(() => {
    const handleScroll = () => {
        isScrolled.value = window.scrollY > 120
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
    })
})

const items = [
    { label: 'Admin', icon: 'i-lucide-shield-alert', slot: 'admin' },
    { label: 'Parking Operations', icon: 'i-lucide-briefcase', slot: 'operations' },
    { label: 'Front Desk Personnel', icon: 'i-lucide-users', slot: 'frontdesk' },
    { label: 'Finance Staff', icon: 'i-lucide-receipt', slot: 'finance' }
]
</script>

<template>
    <!-- ── Static Banner Header (Standard Flow) ─────────────────────── -->
    <div 
        class="relative border-b border-default py-8 overflow-hidden min-h-[33vh] flex flex-col justify-center transition-all duration-500 ease-in-out"
        :class="isScrolled ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'"
    >
        <UContainer class="relative">
            <div class="absolute -top-18 right-4">
                <UColorModeButton color="primary" />
            </div>
            <UBadge label="User Manual" icon="i-lucide-user" variant="subtle" color="primary" size="lg" class="rounded-full px-3 py-1.5 w-fit" />
            <div class="flex flex-col gap-3 mt-6">
                <h1 class="text-3xl sm:text-5xl text-pretty font-bold text-highlighted">
                    Role-Based <span class="text-primary-600 dark:text-primary-400">Instructions</span>
                </h1>
                <p class="text-lg text-pretty text-primary-600 dark:text-primary-700 font-light">
                    Comprehensive step-by-step instructions for utilizing the Parking Management System.
                </p>
            </div>
        </UContainer>
        <BackgroundGrid bg-color="bg-primary-50 dark:bg-primary-950/50" />
    </div>

    <!-- ── Fixed Mini-Navbar (Slides in smoothly on scroll, zero layout shift) ── -->
    <div 
        class="fixed top-0 left-0 right-0 z-40 border-b border-default bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm transition-all duration-300 ease-in-out"
        :class="isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'"
    >
        <UContainer class="py-3 flex items-center justify-between">
            <h1 class="text-lg font-bold text-highlighted leading-none">
                User <span class="text-primary-600 dark:text-primary-400">Manual</span>
            </h1>
            <div class="flex items-center gap-3">
                <UColorModeButton color="primary" class="cursor-pointer hover:scale-105 transition-transform" />
            </div>
        </UContainer>
    </div>

    <!-- ── Manual Content ─────────────────────────────────────────────────── -->
    <UContainer class="py-12">
        <UTabs :items="items" orientation="vertical" variant="link" class="w-full" :ui="{ root: 'items-start sm:gap-6 md:gap-12', list: 'gap-1 sticky top-20 h-fit' }">
            
            <!-- ADMIN -->
            <template #admin>
                <div class="space-y-6 animate-fade-in w-full">
                    <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
                        <div class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                            <UIcon name="i-lucide-shield-alert" class="size-8 text-primary" />
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">Admin</h3>
                            <p class="text-sm text-neutral-500">Global configurations, system-wide policies, and user/role management.</p>
                        </div>
                    </div>

                    <UCard variant="subtle">
                        <template #header>
                            <h4 class="font-bold flex items-center gap-2"><UIcon name="i-lucide-settings" class="text-primary size-5"/> System Configuration</h4>
                        </template>
                        <ol class="space-y-4 list-decimal list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300">
                            <li class="pl-2">Navigate to <UBadge variant="soft">Admin</UBadge> &gt; <UBadge variant="soft">Settings</UBadge> in the sidebar.</li>
                            <li class="pl-2">Configure default property parameters and global tariff policies.</li>
                            <li class="pl-2">Review system-wide audit logs and security controls.</li>
                        </ol>
                    </UCard>

                    <UCard variant="subtle">
                        <template #header>
                            <h4 class="font-bold flex items-center gap-2"><UIcon name="i-lucide-users" class="text-primary size-5"/> User Directory</h4>
                        </template>
                        <ol class="space-y-4 list-decimal list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300">
                            <li class="pl-2">Navigate to <UBadge variant="soft">Admin</UBadge> &gt; <UBadge variant="soft">System Users</UBadge>.</li>
                            <li class="pl-2">Add new personnel or edit existing ones.</li>
                            <li class="pl-2">Assign appropriate system roles (Admin, Parking Operations, Front Desk, Finance) to control access.</li>
                        </ol>
                    </UCard>

                    <UCard variant="subtle">
                        <template #header>
                            <h4 class="font-bold flex items-center gap-2"><UIcon name="i-lucide-shield-check" class="text-primary size-5"/> Roles Management</h4>
                        </template>
                        <ol class="space-y-4 list-decimal list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300">
                            <li class="pl-2">Navigate to <UBadge variant="soft">Admin</UBadge> &gt; <UBadge variant="soft">Roles Management</UBadge>.</li>
                            <li class="pl-2">Create a new role and grant explicit route permissions via checkboxes.</li>
                            <li class="pl-2">Changes apply dynamically without requiring code redeployments.</li>
                        </ol>
                    </UCard>
                </div>
            </template>

            <!-- OPERATIONS -->
            <template #operations>
                <div class="space-y-6 animate-fade-in w-full">
                    <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
                        <div class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                            <UIcon name="i-lucide-briefcase" class="size-8 text-primary" />
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">Parking Operations</h3>
                            <p class="text-sm text-neutral-500">Managing slots, allocating resident spaces, and monitoring RFIDs.</p>
                        </div>
                    </div>

                    <UCard variant="subtle">
                        <template #header>
                            <h4 class="font-bold flex items-center gap-2"><UIcon name="i-lucide-map" class="text-primary size-5"/> Allocating Resident Slots</h4>
                        </template>
                        <ol class="space-y-4 list-decimal list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300">
                            <li class="pl-2">Navigate to <UBadge variant="soft">Allocations</UBadge> &gt; <UBadge variant="soft">Directory</UBadge>.</li>
                            <li class="pl-2">Select an approved resident vehicle.</li>
                            <li class="pl-2">Assign a specific parking slot (Dedicated or Shared) to the vehicle.</li>
                        </ol>
                    </UCard>

                    <UCard variant="subtle">
                        <template #header>
                            <h4 class="font-bold flex items-center gap-2"><UIcon name="i-lucide-credit-card" class="text-primary size-5"/> Issuing RFIDs</h4>
                        </template>
                        <ol class="space-y-4 list-decimal list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300">
                            <li class="pl-2">Navigate to the <UBadge variant="soft">RFID Inventory</UBadge>.</li>
                            <li class="pl-2">Select an unassigned active RFID tag.</li>
                            <li class="pl-2">Link the tag to an approved resident vehicle and mark it as issued.</li>
                        </ol>
                    </UCard>
                </div>
            </template>

            <!-- FRONT DESK -->
            <template #frontdesk>
                <div class="space-y-6 animate-fade-in w-full">
                    <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
                        <div class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                            <UIcon name="i-lucide-users" class="size-8 text-primary" />
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">Front Desk Personnel</h3>
                            <p class="text-sm text-neutral-500">Validating visitor reservations and managing walk-in entries.</p>
                        </div>
                    </div>

                    <UCard variant="subtle">
                        <template #header>
                            <h4 class="font-bold flex items-center gap-2"><UIcon name="i-lucide-check-circle" class="text-primary size-5"/> Validating Visitors</h4>
                        </template>
                        <ol class="space-y-4 list-decimal list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300">
                            <li class="pl-2">Navigate to the <UBadge variant="soft">Visitor Validation</UBadge> dashboard.</li>
                            <li class="pl-2">Scan the visitor's QR code or search by reference number.</li>
                            <li class="pl-2">Confirm arrival to automatically start the active parking session.</li>
                        </ol>
                    </UCard>
                </div>
            </template>

            <!-- FINANCE -->
            <template #finance>
                <div class="space-y-6 animate-fade-in w-full">
                    <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
                        <div class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                            <UIcon name="i-lucide-receipt" class="size-8 text-primary" />
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">Finance Staff</h3>
                            <p class="text-sm text-neutral-500">Processing payments, managing charges, and generating revenue reports.</p>
                        </div>
                    </div>

                    <UCard variant="subtle">
                        <template #header>
                            <h4 class="font-bold flex items-center gap-2"><UIcon name="i-lucide-shopping-cart" class="text-primary size-5"/> Processing Walk-in Payments</h4>
                        </template>
                        <ol class="space-y-4 list-decimal list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300">
                            <li class="pl-2">Navigate to <UBadge variant="soft">Billing</UBadge> &gt; <UBadge variant="soft">Transactions</UBadge>.</li>
                            <li class="pl-2">Locate the unpaid transient parking session.</li>
                            <li class="pl-2">Process the cash or card payment and mark the transaction as <UBadge variant="subtle" color="success">Paid</UBadge>.</li>
                        </ol>
                    </UCard>
                </div>
            </template>
        </UTabs>
    </UContainer>
</template>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
