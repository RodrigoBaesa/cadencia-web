<script setup>
import { ref, onMounted, watch } from 'vue'
import { Renderer, Stave, StaveNote, Formatter } from 'vexflow'

const props = defineProps({
  clef: { type: String, default: 'treble' },
  timeSignature: { type: String, default: '4/4' },
  notes: { type: Array, required: true } 
})

const output = ref(null)

function renderScore() {
  if (!output.value) return
  
  output.value.innerHTML = ''

  const renderer = new Renderer(output.value, Renderer.Backends.SVG)
  renderer.resize(300, 150)
  const context = renderer.getContext()

  const stave = new Stave(50, 20, 200)
  stave.addClef(props.clef).addTimeSignature(props.timeSignature)
  stave.setContext(context).draw()

  if (!props.notes || props.notes.length === 0) return

  const vexNotes = props.notes.map(n => {
    return new StaveNote({
      keys: n.keys,
      duration: n.duration,
      clef: props.clef
    })
  })

  Formatter.FormatAndDraw(context, stave, vexNotes)
}

onMounted(() => {
  renderScore()
})

watch(() => props.notes, () => {
  renderScore()
}, { deep: true })

</script>

<template>
  <div class="flex justify-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
    <div ref="output"></div>
  </div>
</template>