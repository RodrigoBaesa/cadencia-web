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
</script>
<template>
    <div class="md:m-10">
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
                <!-- vexflow -->
                <p class="text-sm text-gray-500 flex">Reward:<p class="ml-1 text-primary">{{ lesson.content.rewardXp }} XP</p></p>
            </div>
        </UCard>
    </div>
</template>