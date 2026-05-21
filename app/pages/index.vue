<script setup>
definePageMeta({
    layout: 'default',
    // middleware: 'auth'
})

const modules = [
    {
        name: 'Reading Notes',
        description: 'Learn how to read notes and the basics about clefs and staves.',
        action: 'Start'
    },
    {
        name: 'Reading Notes',
        description: 'Learn how to read notes and the basics about clefs and staves.',
        action: 'Start'
    }
]
</script>

<template>
    <div>
        <div v-for="module in modules" :key="module.name">
            <UCard :title="module.name" :description="module.description" class="mb-5">
                <NuxtLink to="/module">
                    <UButton icon="i-lucide-music">Start</UButton>
                </NuxtLink>
            </UCard>
        </div>
    </div>
</template>