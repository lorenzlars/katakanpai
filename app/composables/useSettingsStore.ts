import type { Levels } from "~/types"

export const TICKS_PER_SECOND = 10

export const useSettingsStore = defineStore('settings', () => {
    const seconds = shallowRef(15)
    const interval = computed(() => seconds.value * TICKS_PER_SECOND)
    const level = shallowRef<Levels>('easy')
    const fluffy = shallowRef(false)

    return { seconds, interval, level, fluffy }
})