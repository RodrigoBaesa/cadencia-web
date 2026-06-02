<script setup lang="ts">
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

const currentNoteIndex = ref(0)
const isFinished = ref(false)
const feedbackMessage = ref("")

const shuffledOptions = computed(() => {
    if(!lesson.value || !lesson.value.content.options) return []
    return [...lesson.value.content.options].sort(() => Math.random() - 0.5)
})

const currentChallenge = computed(() => {
    if(!lesson.value || !lesson.value.content.vexFlowData) return null
    return lesson.value.content.vexFlowData.notes[currentNoteIndex.value]
})

function checkAnswer(answer: string) {
    if (!currentChallenge.value || !lesson.value?.content.vexFlowData) return
    const notes = lesson.value.content.vexFlowData.notes

    if (answer === currentChallenge.value.keys[0]) {
        feedbackMessage.value = "Correct"

        if (currentNoteIndex.value < notes.length - 1) {
            setTimeout(() => {
                currentNoteIndex.value++
                feedbackMessage.value = ""
            }, 800)                
        } else {
            setTimeout(() => {
                isFinished.value = true
                feedbackMessage.value = ""
            }, 800)
        }
    } else {
        feedbackMessage.value = "Try again!"
    }
}

function checkQuizAnswer(isCorrect: boolean) {
    feedbackMessage.value = isCorrect ? "Correct" : "Try again!"
    if (isCorrect) {
        setTimeout(() => {
            isFinished.value = true
            feedbackMessage.value = ""
        }, 1200)
    }
}

async function goToNextLesson() {
    const lessonData = lesson.value
    if (lessonData?.nextLessonId) {
        await navigateTo(`/${moduleId}/${lessonData.nextLessonId}`)
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
            <div v-if="lesson.type === 'THEORY'">
                <p>{{ lesson.content.text }}</p>
                <img :src="lesson.content.imageUrl" alt="Lesson image" class="mx-auto block max-w-full my-4 rounded" />
                <UButton @click="goToNextLesson">{{ lesson.nextLessonId ? 'Next Lesson' : 'Back to Modules' }}</UButton>
            </div>

            <div v-if="lesson.type === 'PRACTICE'">
                <p>{{ lesson.content.instruction }}</p>
                <div class="flex flex-col justify-center content-center items-center">
                    <VexFlowBoard 
                        class="my-4 w-min"
                        :clef="lesson.content.vexFlowData.clef"
                        :timeSignature="lesson.content.vexFlowData.timeSignature"
                        :notes="[currentChallenge]" 
                        />
                    
                    <div>
                        <p v-if="isFinished" class="text-gray-500">Lesson completed! You've earned <span class="text-primary">{{ lesson.content.rewardXp }} XP!</span></p>
                        <p v-if="feedbackMessage === '' && !isFinished" class="text-gray-500"> Select the correct note.</p>
                        <p v-if="feedbackMessage === 'Correct'" class="text-green-500">{{ feedbackMessage }}</p>
                        <p v-if="feedbackMessage === 'Try again!'" class="text-red-500">{{ feedbackMessage }}</p>
                    </div>

                    <div>
                        <div class="flex m-4 gap-2">
                            <div v-if="!isFinished">
                                <div class="flex flex-wrap justify-center gap-2 mt-4">
                                    <UButton v-for="option in shuffledOptions" :key="option" @click="checkAnswer(option)">{{ option.toUpperCase() }}</UButton>
                                </div>
                            </div>
                            
                            <div v-if="isFinished" class="flex flex-col items-center">
                                <UButton @click="goToNextLesson">Back to Modules</UButton>
                            </div>
                        </div>
                    </div>

                </div>
                <p class="text-sm text-gray-500 flex">Reward:<span class="ml-1 text-primary">{{ lesson.content.rewardXp }} XP</span></p>
            </div>

            <div v-if="lesson.type === 'QUIZ'">
                <p>{{ lesson.content.question }}</p>
                <div class="flex flex-col items-center my-5">
                    <div>
                        <p v-if="isFinished" class="text-gray-500">Lesson completed! You've earned <span class="text-primary">{{ lesson.content.rewardXp }} XP!</span></p>
                        <p v-if="feedbackMessage === '' && !isFinished" class="text-gray-500"> Select the correct note.</p>
                        <p v-if="feedbackMessage === 'Correct'" class="text-green-500">{{ feedbackMessage }}</p>
                        <p v-if="feedbackMessage === 'Try again!'" class="text-red-500">{{ feedbackMessage }}</p>
                    </div>
                    
                    <div v-if="!isFinished">
                        <UButton v-for="option in lesson.content.options" :key="option.text" class="m-2" @click="checkQuizAnswer(option.isCorrect)">
                            {{ option.text }}
                        </UButton>
                    </div>
                    <UButton @click="goToNextLesson">{{ lesson.nextLessonId ? 'Next Lesson' : 'Back to Modules' }}</UButton>
                </div>
            </div>
        </div>
    </UCard>
</template>