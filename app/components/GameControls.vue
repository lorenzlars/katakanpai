<template>
    <HyperText :text="activeWord?.katakana ?? ' '" class="h-16 text-4xl font-bold" :duration="800"
        :animate-on-load="true" />

    <AnswerDisplay :show="showAnswer" :fluffy :brand="activeWord" :progress />

    <UProgress v-model="progress" />

    <UButton @click="startGame" size="xl" class="w-full justify-center" variant="outline">
        {{ isActive ? 'Reveal' : 'Start' }}
    </UButton>
</template>

<script setup lang="ts">
const { interval, fluffy, brands } = storeToRefs(useSettingsStore())
const { activeWord, showAnswer } = storeToRefs(useStateStore())

const progress = shallowRef(0)

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
        activeWord.value = brands.value[Math.floor(Math.random() * brands.value.length)]

        start()
    }
}
</script>