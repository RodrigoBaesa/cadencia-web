<script setup>
definePageMeta({
    layout: 'default',
    // middleware: 'auth'
})

const modules = [
    {
        name: 'Reading Notes',
        description: 'Learn how to read notes and the basics about clefs and staves.',
        action: 'Start',
        path: 'reading-notes'
    },
    {
        name: 'Reading Notes 2',
        description: 'Learn how to read notes and the basics about clefs and staves.',
        action: 'Start',
        path: 'reading-notes-2'

    }
]
</script>

<template>    
    <div>
        <div v-for="module in modules" :key="module.path">
            <UCard :title="module.name" :description="module.description" class="mb-5">
                <NuxtLink :to="`/modules/${module.path}`">
                    <UButton icon="i-lucide-music">Start</UButton>
                </NuxtLink>
            </UCard>
        </div>
    </div>
</template>