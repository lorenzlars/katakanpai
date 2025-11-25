import { useStorage } from '@vueuse/core'
import type { Brand, Level } from '~/types'

type Module<T> = {
  default: T
}

const levels = import.meta.glob('~/assets/levels/*.json')

export const useSettingsStore = defineStore('settings', () => {
  const seconds = useStorage('seconds', 15)
  const level = useStorage<Level>('level', 'easy')
  const fluffy = useStorage('fluffy', false)
  const brands = shallowRef<Brand[]>([])
  const loading = shallowRef(false)

  watch(level, async (newLevel: Level) => {
    loading.value = true

    const resolver = levels[`/assets/levels/${newLevel}.json`] as () => Promise<Module<Brand[]>>

    if (resolver instanceof Function) {
      const resolvedData = await resolver()

      brands.value = resolvedData.default
    }

    loading.value = false
  }, { immediate: true })

  return { seconds, level, fluffy, brands, loading }
})
