import { ref, computed } from 'vue'

interface VexFlowNote {
  keys: string[]
  duration: string
}

interface VexFlowData {
  notes: VexFlowNote[]
  clef?: string
  timeSignature?: string
}

interface QuizOption {
  text: string
  isCorrect: boolean
}

interface SharedLessonContent {
  options?: string[] | QuizOption[]
  vexFlowData?: VexFlowData
  [key: string]: unknown
}

export type Lesson = {
  id: string
  title: string
  type: string
  nextLessonId?: string
  content: SharedLessonContent
}

export function useExercise(lesson: Lesson, moduleId: string) {
  const isFinished = ref(false)
  const feedbackMessage = ref('')
  const currentNoteIndex = ref(0)

  const currentChallenge = computed(() => {
    if (!lesson || !lesson.content.vexFlowData) return null
    return lesson.content.vexFlowData.notes[currentNoteIndex.value]
  })

  const shuffledOptions = computed(() => {
    if (!lesson || !lesson.content.options) return []
    return [...lesson.content.options].sort(() => Math.random() - 0.5)
  })

  function checkQuizAnswer(isCorrect: boolean) {
    feedbackMessage.value = isCorrect ? 'Correct' : 'Try again!'
    if (isCorrect) {
      setTimeout(() => {
        isFinished.value = true
        feedbackMessage.value = ''
      }, 1200)
    }
  }

  async function goToNextLesson() {
    if (lesson.nextLessonId) {
      await navigateTo(`/modules/${moduleId}/${lesson.nextLessonId}`)
    } else {
      await navigateTo(`/modules/${moduleId}`)
    }
  }

  function checkAnswer(answer: string) {
    if (!currentChallenge.value || !lesson.content.vexFlowData) return
    const notes = lesson.content.vexFlowData.notes

    if (answer === currentChallenge.value.keys[0]) {
      feedbackMessage.value = 'Correct'

      if (currentNoteIndex.value < notes.length - 1) {
        setTimeout(() => {
          currentNoteIndex.value++
          feedbackMessage.value = ''
        }, 800)
      } else {
        setTimeout(() => {
          isFinished.value = true
          feedbackMessage.value = ''
        }, 800)
      }
    } else {
      feedbackMessage.value = 'Try again!'
    }
  }

  return { isFinished, feedbackMessage, checkQuizAnswer, goToNextLesson, checkAnswer, currentChallenge, shuffledOptions }
}
