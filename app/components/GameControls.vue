<template>
  <HyperText
    :text="activeBrand?.katakana ?? ' '"
    class="h-16 text-4xl font-bold"
    :duration="800"
    :animate-on-load="true"
  />

  <AnswerDisplay
    :show="showAnswer"
    :fluffy
    :brand="activeBrand"
    :progress="progressPtc"
  />

  <UProgress v-model="progressPtc" />

  <UButton
    size="xl"
    class="w-full justify-center"
    variant="outline"
    @click="toggleGameState"
  >
    {{ isActive ? $t('game.reveal') : $t('game.start') }}
  </UButton>
</template>

<script setup lang="ts">
const { seconds, fluffy, brands } = storeToRefs(useSettingsStore())
const stateStore = useStateStore()
const { activeBrand, showAnswer, isActive, progressPtc } = storeToRefs(stateStore)

function toggleGameState() {
  if (isActive.value) {
    stateStore.stop()
  }
  else {
    const brand = brands.value[Math.floor(Math.random() * brands.value.length)]

    if (brand) {
      stateStore.start(brand, seconds.value)
    }
  }
}
</script>
