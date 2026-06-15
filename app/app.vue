<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'ParkFlow'
const description = 'Smart Parking Management System'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '',
  twitterCard: ''
})

const settings = useSettingsStore()
const appConfig = useAppConfig()

watchEffect(() => {
  if (appConfig.ui && appConfig.ui.colors) {
    appConfig.ui.colors.primary = settings.primaryColor
    appConfig.ui.colors.neutral = settings.neutralColor
  }
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <DemoFab />
  </UApp>
</template>
