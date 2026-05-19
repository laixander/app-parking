<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// ============================================================================
// Page Configuration
// ============================================================================
definePageMeta({
    title: 'Card Variants',
    isTable: true
})

// ============================================================================
// State & Data
// ============================================================================

const navigationItems: NavigationMenuItem[] = [
    { label: 'Card System', to: '/ui/cards/card-system', icon: 'i-lucide-layout-template' },
    { label: 'Analytics Cards', to: '/ui/cards/analytics-card', icon: 'i-lucide-chart-bar-big' },
    { label: 'Ecommerce Cards', to: '/ui/cards/ecommerce-cards', icon: 'i-lucide-shopping-bag' },
    { label: 'Social Cards', to: '/ui/cards/social-cards', icon: 'i-lucide-users' },
    { label: 'SaaS Cards', to: '/ui/cards/saas-cards', icon: 'i-lucide-briefcase' },
    { label: 'Media Cards', to: '/ui/cards/media-cards', icon: 'i-lucide-play-circle' }
]

</script>

<template>
    <div class="flex flex-col min-h-0">
        <UNavigationMenu orientation="horizontal" :items="navigationItems"
            class="w-full px-4 py-2 border-b border-default sticky top-0 z-10" />
        <div class="flex-1 overflow-y-auto scrollbar">
            <UContainer class="py-6 space-y-12">
                <NuxtPage />
            </UContainer>
        </div>
    </div>
</template>