import type { Brand } from "~/types"

export const useStateStore = defineStore('state', () => {
    const showAnswer = shallowRef(false)
    const activeWord = shallowRef<Brand>()

    return {
        showAnswer,
        activeWord
    }
})