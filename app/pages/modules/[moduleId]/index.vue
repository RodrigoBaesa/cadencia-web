<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const route = useRoute()

const moduleId = route.params.moduleId


definePageMeta({
    layout: 'default'
})

const items = ref<TimelineItem[]>([
    {
        title: 'Module 1',
        description: 'Learn about staves and clefs.',
        icon: 'i-lucide-music'
    },
    {
        title: 'Module 1',
        description: 'Learn about staves and clefs.',
        icon: 'i-lucide-music'
    },
])
</script>

<template>
    <h1>{{ moduleId }}</h1>
    <UTimeline :items="items" />
</template>