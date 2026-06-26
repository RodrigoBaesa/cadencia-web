<script setup lang="ts">
import { useExercise } from '~/composables/useExercise'

interface TheoryContent {
  text: string
  imageUrl: string
  [key: string]: unknown
}

const props = defineProps<{
  lesson: {
    id: string
    title: string
    type: string
    nextLessonId?: string
    content: TheoryContent
  }
  moduleId: string
}>()

const { goToNextLesson } = useExercise(props.lesson, props.moduleId)
</script>

<template>
  <div v-if="props.lesson.type === 'THEORY'">
    <p>{{ props.lesson.content.text }}</p>

    <img
      :src="props.lesson.content.imageUrl"
      alt="Lesson image"
      class="mx-auto block max-w-full my-4 rounded"
    >

    <UButton @click="goToNextLesson">
      {{ props.lesson.nextLessonId ? 'Next Lesson' : 'Back to Modules' }}
    </UButton>
  </div>
</template>
