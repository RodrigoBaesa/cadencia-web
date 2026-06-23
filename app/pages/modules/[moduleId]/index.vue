<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const route = useRoute()

const moduleId = route.params.moduleId

const { data: module, pending, error } = await useFetch<{ lessons: any[] }>(`http://localhost:8080/api/modules/${moduleId}`)

definePageMeta({
    layout: 'default'
})

const items = computed<TimelineItem[]>(() => {
    if (!module.value || !module.value.lessons) return []

    return module.value.lessons.map((lesson:any) => ({
        title: lesson.title,
        description: lesson.description,
        icon: lesson.type === "THEORY" ? "i-lucide-book-open": lesson.type === "PRACTICE" ? "i-lucide-music" : "i-lucide-list-todo",
        lesson_path: lesson.id
    }))
})
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