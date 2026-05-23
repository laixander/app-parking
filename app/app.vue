<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en',
    class: 'scrollbar'
  }
})

const title = 'ParkFlow — Premium Parking Lot Management System'
const description = 'An enterprise-grade, intelligent parking management platform. Optimize space utilization, automate access control, and track real-time occupancy analytics with a seamless, high-performance interface.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80',
  twitterCard: 'summary_large_image'
})
</script>

<template>
    <UApp>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
    <DemoFab />
</template>
