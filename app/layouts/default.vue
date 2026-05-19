<script setup lang="ts">
import type { NavigationMenuItem, SidebarProps } from '@nuxt/ui'

defineProps<Pick<SidebarProps, 'variant' | 'collapsible' | 'side'>>()

const open = ref(true)

const items: NavigationMenuItem[] = [
    { label: 'Home', icon: 'i-lucide-home', to: '/' },
    { label: 'Daily', icon: 'i-lucide-calendar', to: '/daily' },
    { label: 'Battle', icon: 'i-lucide-sword', to: '/battle' },
    { label: 'Profile', icon: 'i-lucide-user', to: '/profile' }

]

</script>

<template>
  <div
    class="flex flex-1"
    :class="[
      variant === 'inset' && 'bg-neutral-50 dark:bg-neutral-950',
      side === 'right' && 'flex-row-reverse'
    ]"
  >
    <USidebar
      class=""
      v-model:open="open"
      :variant="variant"
      :collapsible="collapsible"
      :side="side"
      :ui="{
        container: 'h-full'
      }"
    >
      <template #header>
        <!-- <UIcon name="i-logos-nuxt-icon" class="size-8" /> -->
        <div class="w-full text-center font-bold text-2xl text-primary">
            Cadência
        </div>
      </template>

      <UNavigationMenu
        :items="items"
        orientation="vertical"
        :ui="{ link: 'p-1.5 overflow-hidden' }"
      />
    </USidebar>

    <div
      class="flex-1 flex flex-col overflow-hidden lg:peer-data-[variant=floating]:my-4 peer-data-[variant=inset]:m-4 lg:peer-data-[variant=inset]:not-peer-data-[collapsible=offcanvas]:ms-0 peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-sm peer-data-[variant=inset]:ring peer-data-[variant=inset]:ring-default bg-default"
    >
      <div
        class="hidden md:flex h-(--ui-header-height) shrink-0 items-center px-4"
        :class="[
          variant !== 'floating' && 'border-b border-default',
          side === 'right' && 'justify-end'
        ]"
      >
        <UButton
          :icon="side === 'left' ? 'i-lucide-panel-left' : 'i-lucide-panel-right'"
          color="neutral"
          variant="ghost"
          aria-label="Toggle sidebar"
          @click="open = !open"
        />
      </div>

        <main class="flex-1 overflow-y-auto p-4 md:p-8">
            <slot></slot>
        </main>
    </div>

  </div>
</template>