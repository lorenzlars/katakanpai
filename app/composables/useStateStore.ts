import type { Brand } from "~/types"

const TICKS_PER_SECOND = 10

export const useStateStore = defineStore('state', () => {
    const isActive = shallowRef(false)
    const showAnswer = shallowRef(false)
    const activeBrand = shallowRef<Brand>()
    const progressStartTime = shallowRef(0)
    const progressEndTime = shallowRef(0)
    const progressPtc = shallowRef(0)
    const interval = shallowRef<NodeJS.Timeout | null>(null)

    function start(brand: Brand, durationInSeconds: number) {
        progressStartTime.value = Date.now()
        progressEndTime.value = progressStartTime.value + (durationInSeconds * 1_000)
        isActive.value = true
        showAnswer.value = false
        activeBrand.value = brand

        startInterval(TICKS_PER_SECOND)
    }

    function stop() {
        isActive.value = false
        showAnswer.value = true
        stopInterval()
    }

    function startInterval(ticks: number) {
        stopInterval()

        interval.value = setInterval(() => {
            const now = Date.now()
            if (now >= progressEndTime.value) {
                progressPtc.value = 100
                stop()
            } else {
                const elapsed = now - progressStartTime.value
                const total = progressEndTime.value - progressStartTime.value

                progressPtc.value = Math.min((elapsed / total) * 100, 100)
            }
        }, ticks)
    }

    function stopInterval() {
        if (interval.value) {
            clearInterval(interval.value)
            interval.value = null
        }
    }

    return {
        isActive,
        showAnswer,
        activeBrand,
        progressPtc,
        start,
        stop
    }
})