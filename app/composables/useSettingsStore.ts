import { useStorage } from '@vueuse/core'
import type { Brand, Level } from '~/types'

type Module<T> = {
  default: T
}

type Resolver = () => Promise<Module<Brand[]>>

const testModeMock: Record<string, Resolver> = {
  '/assets/levels/easy.json': () => Promise.resolve({ default: [{ latin: 'Opera', katakana: 'オペラ' }] }),
  '/assets/levels/medium.json': () => Promise.resolve({ default: [] }),
  '/assets/levels/hard.json': () => Promise.resolve({ default: [] }),
}

export const useSettingsStore = defineStore('settings', () => {
  const config = useRuntimeConfig()
  const levels = config.public.mode === 'test' ? testModeMock : import.meta.glob('~/assets/levels/*.json')

  const seconds = useStorage('seconds', 15)
  const level = useStorage<Level>('level', 'easy')
  const fluffy = useStorage('fluffy', false)
  const brands = shallowRef<Brand[]>([])
  const loading = shallowRef(false)

  watch(level, async (newLevel: Level) => {
    loading.value = true

    const resolver = levels[`/assets/levels/${newLevel}.json`] as Resolver

    if (resolver instanceof Function) {
      const resolvedData = await resolver()

      brands.value = resolvedData.default
    }

    loading.value = false
  }, { immediate: true })

  return { seconds, level, fluffy, brands, loading }
})
