<script setup lang="ts">
import QuizLesson from '~/components/lessons/QuizLesson.vue'
import PracticeLesson from '~/components/lessons/PracticeLesson.vue'

const route = useRoute()

const moduleId = route.params.moduleId
const lessonId = route.params.lessonId

interface LessonData {
    id: string
    title: string
    type: string
    nextLessonId?: string
    content: any
}

const { data: lesson, pending, error } = await useFetch<LessonData>(`http://localhost:8080/api/lessons/${lessonId}`)

/* const lesson = {
    id: "lesson-2",
    title: "A Pauta e a Clave de Sol",
    type: "PRACTICE",
    content: {
        instruction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc efficitur varius. Sed at felis a enim efficitur commodo. Proin ac ligula a nisl efficitur tincidunt. Curabitur ut odio sed metus efficitur fermentum.",
        rewardXp: 100,
        options: ["c/4", "d/4", "e/4", "f/4", "g/4", "a/4", "b/4"],
        vexFlowData: {
            notes: [
                { keys: ["c/4"], duration: "q" },
                { keys: ["d/4"], duration: "q" },
                { keys: ["e/4"], duration: "q" },
                { keys: ["f/4"], duration: "q" },
            ],
            clef: "treble",
            timeSignature: "4/4",
        },
  }
} */

/* const lesson = {
  id: "lesson-3",
  title: "Identify the Clef",
  type: "QUIZ",
  content: {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc efficitur varius. Sed at felis a enim efficitur commodo. Proin ac ligula a nisl efficitur tincidunt. Curabitur ut odio sed metus efficitur fermentum.",
    options: [
      { text: "Treble Clef", isCorrect: false },
      { text: "Bass Clef", isCorrect: true },
      { text: "Alto Clef", isCorrect: false }
    ],
    rewardXp: 100
  }
} */

async function goToNextLesson() {
    const lessonData = lesson.value
    if (lessonData?.nextLessonId) {
        await navigateTo(`/modules/${moduleId}/${lessonData.nextLessonId}`)
    } else {
        await navigateTo(`/modules/${moduleId}`)
    }
}
</script>
<template>
    <UCard class="h-full flex flex-col">
        <template #header>
            <h2 class="text-2xl font-bold">{{ lesson?.title || "Loading"}}</h2>
            <p class="text-sm text-gray-500">{{ lesson?.type || "Loading"}}</p>
        </template>

        <div v-if="pending">
            <p>Loading...</p>
        </div>
        <div v-else-if="error">
            <p>Error loading lesson.</p>
        </div>

        <div v-else-if="lesson">
            <TheoryLesson :lesson="lesson" :moduleId="moduleId" />

            <PracticeLesson :lesson="lesson" :moduleId="moduleId" />

            <QuizLesson :lesson="lesson" :moduleId="moduleId" />
        </div>
    </UCard>
</template>