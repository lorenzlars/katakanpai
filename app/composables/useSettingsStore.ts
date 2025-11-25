import type { Brand, Level } from "~/types"

const levels: Record<string, Function> = import.meta.glob('~/assets/levels/*.json')

export const useSettingsStore = defineStore('settings', () => {
    const seconds = shallowRef(15)
    const level = shallowRef<Level>('easy')
    const fluffy = shallowRef(false)
    const brands = shallowRef<Brand[]>([])
    const loading = shallowRef(false)

    watch(level, async (newLevel: Level) => {
        loading.value = true

        const resolver = levels[`/assets/levels/${newLevel}.json`]

        if (resolver) {
            const resolvedData = await resolver()

            brands.value = resolvedData.default as Brand[]
        }

        loading.value = false
    }, { immediate: true })

    return { seconds, level, fluffy, brands }
})