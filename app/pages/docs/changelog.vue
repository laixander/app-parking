<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

definePageMeta({
    layout: false,
    title: 'Changelog'
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

interface ChangelogEntry {
    date: string
    version: string
    title: string
    description: string
    changes: {
        type: 'feature' | 'fix' | 'refactor' | 'chore'
        text: string
    }[]
}

const changelogs: ChangelogEntry[] = [
    {
        date: 'June 16, 2026',
        version: 'v1.1.0',
        title: 'Dynamic Role-Based Access Control',
        description: 'Complete overhaul of the authorization system, migrating from hardcoded roles to a dynamic, store-driven RBAC model.',
        changes: [
            { type: 'feature', text: 'Implemented dynamic RBAC with store-driven route permissions.' },
            { type: 'feature', text: 'Added Roles Management module for full CRUD operations on system roles.' },
            { type: 'refactor', text: 'Replaced hardcoded route guards with soft protection and an AuthGate fallback component.' },
            { type: 'refactor', text: 'Sidebar navigation now dynamically hides empty labels based on user permissions.' },
            { type: 'chore', text: 'Renamed "Property Admin" to "Admin" and granted it global access.' }
        ]
    },
    {
        date: 'June 15, 2026',
        version: 'v1.0.0',
        title: 'Initial Deployment',
        description: 'Initialized Parking Management System based on boilerplate framework.',
        changes: [
            { type: 'feature', text: 'Scaffolded documentation and standard modules for facility management.' }
        ]
    }
]

function getBadgeColor(type: string) {
    switch (type) {
        case 'feature': return 'success'
        case 'fix': return 'error'
        case 'refactor': return 'warning'
        case 'chore': return 'neutral'
        default: return 'neutral'
    }
}
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
            <UBadge label="Changelog" icon="i-lucide-file-text" variant="subtle" color="primary" size="lg" class="rounded-full px-3 py-1.5 w-fit" />
            <div class="flex flex-col gap-3 mt-6">
                <h1 class="text-3xl sm:text-5xl text-pretty font-bold text-highlighted">
                    System Updates &amp; <span class="text-primary-600 dark:text-primary-400">Release Notes</span>
                </h1>
                <p class="text-lg text-pretty text-primary-600 dark:text-primary-700 font-light">
                    Keep track of all new features, improvements, and architectural updates to the Parking Management System.
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
                Changelog &amp; <span class="text-primary-600 dark:text-primary-400">Release Notes</span>
            </h1>
            <div class="flex items-center gap-3">
                <UColorModeButton color="primary" class="cursor-pointer hover:scale-105 transition-transform" />
            </div>
        </UContainer>
    </div>

    <!-- ── Timeline ─────────────────────────────────────────────────── -->
    <UContainer class="py-12">
        <div v-for="(log, index) in changelogs" :key="index" class="relative pl-8 sm:pl-32 pb-6 last:pb-0">
            
            <!-- Timeline Line -->
            <div class="absolute left-[11px] sm:left-[107px] top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800"
                :class="{ 'bottom-auto h-full': index !== changelogs.length - 1 }" />
            
            <!-- Timeline Dot -->
            <div class="absolute left-0 sm:left-24 top-2 flex items-center justify-center w-6 h-6 rounded-full bg-primary-500/20 border-2 border-primary-500 z-10">
                <div class="w-2 h-2 rounded-full bg-primary-500" />
            </div>

            <!-- Date & Version (Desktop: Left, Mobile: Top) -->
            <div class="sm:absolute sm:left-0 sm:w-20 sm:text-right sm:top-1 mb-2 sm:mb-0">
                <span class="block text-xs font-medium text-dimmed whitespace-nowrap">{{ log.date }}</span>
                <span class="block text-sm font-bold text-primary whitespace-nowrap">{{ log.version }}</span>
            </div>

            <!-- Content Card -->
            <UCard variant="subtle" class="shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-1">{{ log.title }}</h2>
                <p class="text-sm text-dimmed mb-6">{{ log.description }}</p>

                <div class="space-y-3">
                    <div v-for="(change, cIndex) in log.changes" :key="cIndex" 
                        class="flex items-start gap-3 text-sm">
                        <div class="shrink-0 w-20">
                            <UBadge :color="getBadgeColor(change.type)" variant="soft" class="uppercase text-[10px] font-bold pt-[5px] w-full rounded-full justify-center">
                                {{ change.type }}
                            </UBadge>
                        </div>
                        <span class="text-toned leading-relaxed">{{ change.text }}</span>
                    </div>
                </div>
            </UCard>
        </div>
    </UContainer>
</template>
