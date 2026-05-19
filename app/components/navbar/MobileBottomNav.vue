<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
    items: NavigationMenuItem[]
}>()
</script>
<template>
    <div class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 lg:hidden">
        <UNavigationMenu 
        :items="items" 
        orientation="horizontal" 
        class="justify-around py-2"
        />
    </div>
</template>