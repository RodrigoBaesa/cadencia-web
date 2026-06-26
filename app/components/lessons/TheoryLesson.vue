<script setup lang="ts">
import { useExercise } from '~/composables/useExercise'

const props = defineProps<{
  lesson: {
    id: string
    title: string
    type: string
    nextLessonId?: string
    content: any
  }
  moduleId?: any
}>()

const { goToNextLesson } = useExercise(props.lesson, props.moduleId)
</script>

<template>
  <div v-if="lesson.type === 'THEORY'">
    <p>{{ lesson.content.text }}</p>
    <img
      :src="lesson.content.imageUrl"
      alt="Lesson image"
      class="mx-auto block max-w-full my-4 rounded"
    >
    <UButton @click="goToNextLesson">
      {{ lesson.nextLessonId ? 'Next Lesson' : 'Back to Modules' }}
    </UButton>
  </div>
</template>
