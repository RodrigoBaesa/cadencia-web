<script setup>
definePageMeta({
    layout: 'default',
    // middleware: 'auth'
})

const { data: modules, pending, error } = await useFetch('http://localhost:8080/api/modules')
</script>

<template>
    <div class="max-w-md mx-auto py-10 px-4">
        <div v-if="pending">
            <USkeleton />
        </div>
        <div v-else-if="error" class="text-center text-red-500">
            <p>An error occurred while loading modules: {{ error.message }}</p>
        </div>

        <div v-else-if="modules" class="flex flex-col items-center space-y-8">
            <div
                v-for="(mod, index) in modules"
                :key="mod.id"
                class="flex flex-col items-center transition-transform hover:scale-105"
                :style="{transform: `translateX(${index % 2 === 0 ? '-30px' : '30px'})`}"
            >
                <UButton 
                    :to="`/modules/${mod.id}`"
                    color="primary"
                    variant="solid"
                    class="w-24 h-24 flex items-center justify-center rounded-full shadow-xl border-4 border-white dark:border-gray-800"
                >
                    <UIcon :name="mod.icon" class="w-10 h-10" />
                </UButton>

                <h2 class="mt-3 font-bold text-lg text-center">{{ mod.title }}</h2>
                <p class="text-sm text-gray-500 text-center w-32">{{ mod.lessons?.length }} Lessons</p>

            </div>
        </div>
    </div>
</template>