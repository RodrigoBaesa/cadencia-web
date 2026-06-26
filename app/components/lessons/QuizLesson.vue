<script setup lang="ts">
import { useExercise } from '~/composables/useExercise'

interface QuizOption {
  text: string
  isCorrect: boolean
}

interface QuizContent {
  question: string
  rewardXp: number
  options: QuizOption[]
  [key: string]: unknown
}

const props = defineProps<{
  lesson: {
    id: string
    title: string
    type: string
    nextLessonId?: string
    content: QuizContent
  }
  moduleId: string
}>()

const { isFinished, feedbackMessage, checkQuizAnswer, goToNextLesson } = useExercise(props.lesson, props.moduleId)
</script>

<template>
  <div v-if="props.lesson.type === 'QUIZ'">
    <p>{{ props.lesson.content.question }}</p>
    <div class="flex flex-col items-center my-5">
      <div>
        <p
          v-if="isFinished"
          class="text-gray-500"
        >
          Lesson completed! You've earned <span class="text-primary">{{ props.lesson.content.rewardXp }} XP!</span>
        </p>
        <p
          v-if="feedbackMessage === '' && !isFinished"
          class="text-gray-500"
        >
          Select the correct note.
        </p>
        <p
          v-if="feedbackMessage === 'Correct'"
          class="text-green-500"
        >
          {{ feedbackMessage }}
        </p>
        <p
          v-if="feedbackMessage === 'Try again!'"
          class="text-red-500"
        >
          {{ feedbackMessage }}
        </p>
      </div>

      <div v-if="!isFinished">
        <UButton
          v-for="option in props.lesson.content.options"
          :key="option.text"
          class="m-2"
          @click="checkQuizAnswer(option.isCorrect)"
        >
          {{ option.text }}
        </UButton>
      </div>
      <UButton @click="goToNextLesson">
        {{ props.lesson.nextLessonId ? 'Next Lesson' : 'Back to Modules' }}
      </UButton>
    </div>
  </div>
</template>
