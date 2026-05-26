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
        icon: 'i-lucide-music',
        lesson_path: 'lesson-1' 
    },
    {
        title: 'Module 2',
        description: 'Learn about staves and clefs.',
        icon: 'i-lucide-music',
        lesson_path: 'lesson-2'
    },
])
</script>

<template>
    <UTimeline :items="items">
        <template #description="{item}">
            <p>{{ item.description }}</p>
            <NuxtLink :to="`/modules/${moduleId}/${item.lesson_path}`">
                <UButton label="Go to lesson" class="mt-2"/>
            </NuxtLink>
        </template>
    </UTimeline>
</template>