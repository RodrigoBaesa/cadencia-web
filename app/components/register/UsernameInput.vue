<script setup lang="ts">
const value = ref('')
const maxLength = 16
</script>

<template>
    <UFormField label="Username" description="Choose a unique username for your account.">
        <UInput
            v-model="value"
            :maxlength="maxLength"
            aria-describedby="character-count"
            :ui="{ trailing: 'pointer-events-none' }"
            required
            autocomplete="off"
        >
            <template #trailing>
            <div
                id="character-count"
                class="text-xs text-muted tabular-nums"
                aria-live="polite"
                role="status"
            >
                {{ value?.length }}/{{ maxLength }}
            </div>
            </template>
        </UInput>
    </UFormField>
</template>

