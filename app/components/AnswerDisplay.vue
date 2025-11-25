<template>
    <div
        class="h-30 w-full flex flex-col justify-center items-center rounded-lg overflow-hidden bg-elevated/50 ring ring-default divide-y divide-default">
        <p v-if="show" class="text-3xl">{{ brand?.latin }}</p>
        <p class="text-gray-400"><em>{{ visibleRomaji }}</em></p>
    </div>
</template>

<script setup lang="ts">
import { toRomaji } from 'wanakana'
import type { Brand } from '~/types';

const props = defineProps<{
    show: boolean
    fluffy: boolean
    progress: number
    brand?: Brand
}>()

const fullRomaji = computed(() => toRomaji(props.brand?.katakana))
const visibleRomaji = computed(() => {
    if (props.show) {
        return fullRomaji.value
    }

    if (props.fluffy) {
        const totalChars = fullRomaji.value.length
        const charsToShow = Math.floor((props.progress / 100) * totalChars)

        return fullRomaji.value.slice(0, charsToShow)
    }

    return undefined
})
</script>
