<template>
  <UApp>
    <div class="mx-auto flex flex-col justify-center items-center gap-3 sm:max-w-screen-sm pt-6 px-6 sm:px-0">
      <h1 class="text-secondary text-5xl font-light">
        Kata<span class="font-bold">kanpai</span>
      </h1>

      <div class="h-16">
        <HyperText :text="activeWord?.katakana ?? ' '" class="text-4xl font-bold" :duration="800"
          :animate-on-load="true" />
      </div>

      <div
        class="h-30 w-full flex flex-col justify-center items-center rounded-lg overflow-hidden bg-elevated/50 ring ring-default divide-y divide-default">
        <p v-if="showAnswer" class="text-3xl">{{ activeWord?.brand }}</p>
        <p v-if="(showAnswer || fluffy) && romaji" class="text-gray-400"><em>{{ romaji }}</em></p>
      </div>

      <UProgress v-model="progress" />

      <UButton @click="startGame" size="xl" class="w-full justify-center" variant="outline">
        {{ isActive ? 'Reveal' : 'Start' }}
      </UButton>

      <SettingsDialog />

      <a href="https://larslorenz.dev/" class="text-gray-700"><small><em>by larslorenz.dev</em></small></a>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { toRomaji } from 'wanakana'
import type { Level } from './types';

const { interval, level, fluffy } = storeToRefs(useSettingsStore())
const showAnswer = shallowRef(false)
const activeWord = shallowRef<{ brand: string; katakana: string }>()
const progress = shallowRef(0)
const fullRomaji = computed(() => toRomaji(activeWord.value?.katakana))
const romaji = computed(() => {
  if (!fullRomaji.value || !isActive.value) return fullRomaji.value

  const totalChars = fullRomaji.value.length
  const progressRatio = (interval.value - remaining.value) / interval.value
  const charsToShow = Math.floor(progressRatio * totalChars)

  return fullRomaji.value.slice(0, charsToShow)
})

const options = shallowRef([])

const levels: Record<Level, Function> = {
  easy: () => import(`~/assets/levels/easy.json`),
  normal: () => import(`~/assets/levels/normal.json`),
  hard: () => import(`~/assets/levels/hard.json`)
}

watch(level, async (newLevel: Level) => {
  const resolver = levels[newLevel]

  if (resolver) {
    const brands = await resolver()

    options.value = brands.default
  }

}, { immediate: true })

const { isActive, remaining, start, stop } = useCountdown(interval, {
  onComplete() {
    showAnswer.value = true
  },
  onTick() {
    progress.value = 100 / interval.value * remaining.value
  },
  interval: 1_000 / TICKS_PER_SECOND
})

function startGame() {
  if (isActive.value) {
    stop()
    showAnswer.value = true
  } else {
    showAnswer.value = false
    activeWord.value = options.value[Math.floor(Math.random() * options.value.length)]

    start()
  }
}
</script>
