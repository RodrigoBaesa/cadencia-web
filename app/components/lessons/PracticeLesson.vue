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

const { currentChallenge, isFinished, feedbackMessage, checkAnswer, goToNextLesson, shuffledOptions } = useExercise(props.lesson, props.moduleId)
</script>

<template>
  <div v-if="lesson.type === 'PRACTICE'">
    <p>{{ lesson.content.instruction }}</p>
    <div class="flex flex-col justify-center content-center items-center">
      <VexFlowBoard
        class="my-4 w-min"
        :clef="lesson.content.vexFlowData.clef"
        :time-signature="lesson.content.vexFlowData.timeSignature"
        :notes="[currentChallenge]"
      />

      <div>
        <p
          v-if="isFinished"
          class="text-gray-500"
        >
          Lesson completed! You've earned <span class="text-primary">{{ lesson.content.rewardXp }} XP!</span>
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

      <div>
        <div class="flex m-4 gap-2">
          <div v-if="!isFinished">
            <div class="flex flex-wrap justify-center gap-2 mt-4">
              <UButton
                v-for="option in shuffledOptions"
                :key="option"
                @click="checkAnswer(option)"
              >
                {{ option.toUpperCase() }}
              </UButton>
            </div>
          </div>

          <div
            v-if="isFinished"
            class="flex flex-col items-center"
          >
            <UButton @click="goToNextLesson">
              Back to Modules
            </UButton>
          </div>
        </div>
      </div>
    </div>
    <p class="text-sm text-gray-500 flex">
      Reward:<span class="ml-1 text-primary">{{ lesson.content.rewardXp }} XP</span>
    </p>
  </div>
</template>
