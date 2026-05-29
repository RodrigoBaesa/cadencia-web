<script setup lang="ts">
const route = useRoute()

const moduleId = route.params.moduleId
const lessonId = route.params.lessonId

/* const lesson = {
    id: "lesson-1",
    title: "A Pauta e a Clave de Sol",
    type: "THEORY",
    content: {
        text: "A pauta musical é formada por 5 linhas e 4 espaços. A Clave de Sol define que a nota na segunda linha é o Sol.A pauta musical é formada por 5 linhas e 4 espaços. A Clave de Sol define que a nota na segunda linha é o Sol.A pauta musical é formada por 5 linhas e 4 espaços. A Clave de Sol define que a nota na segunda linha é o Sol.A pauta musical é formada por 5 linhas e 4 espaços. A Clave de Sol define que a nota na segunda linha é o Sol.",
        imageUrl: "/images/clef-explanation.png",
        vexFlowExample: {
            notes: [
                { keys: ["c/4"], duration: "q" },
                { keys: ["d/4"], duration: "q" },
                { keys: ["e/4"], duration: "q" },
                { keys: ["f/4"], duration: "q" },
            ],
            clef: "treble",
            timeSignature: "4/4",
        },
        hasAudioExample: true,
  }
} */

const lesson = {
    id: "lesson-1",
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
}

const currentNoteIndex = ref(0)
const isFinished = ref(false)
const feedbackMessage = ref("")
const shuffledOptions = ref([...lesson.content.options].sort(() => Math.random() - 0.5))

const currentChallenge = computed(() => {
    return lesson.content.vexFlowData.notes[currentNoteIndex.value]
})

function checkAnswer(answer: string) {
    if (!currentChallenge.value) return
    if (answer === currentChallenge.value.keys[0]) {
        feedbackMessage.value = "Correct"

        if (currentNoteIndex.value < lesson.content.vexFlowData.notes.length - 1) {
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
</script>
<template>
    <UCard>
        <template #header>
            <h2 class="text-2xl font-bold">{{ lesson.title }}</h2>
            <p class="text-sm text-gray-500">{{ lesson.type }}</p>
        </template>
        <div v-if="lesson.type === 'THEORY'">
            <p>{{ lesson.content.text }}</p>
            <img :src="lesson.content.imageUrl" alt="Lesson image" class="mx-auto block max-w-full my-4 rounded" />
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
                        <div v-if="!isFinished" v-for="option in shuffledOptions">
                            <UButton @click="checkAnswer(option)"class="">{{ option.toUpperCase() }}</UButton>
                        </div>
                        <div v-if="isFinished" class="flex flex-col items-center">
                            <UButton @click="currentNoteIndex = 0; isFinished = false; feedbackMessage = ''; shuffledOptions = [...lesson.content.options].sort(() => Math.random() - 0.5)" class="opacity-50 ">Play again</UButton>
                            <UButton to="/modules" class="m-2">Back to Modules</UButton>
                        </div>
                    </div>
                </div>
                
            </div>
            <p class="text-sm text-gray-500 flex">Reward:<p class="ml-1 text-primary">{{ lesson.content.rewardXp }} XP</p></p>
        </div>
    </UCard>
</template>