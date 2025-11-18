<template>
    <UModal title="Settings">
        <UButton label="Settings" color="neutral" variant="ghost" class="mt-12" />

        <template #body>
            <div class="flex flex-col gap-6">
                <div class="flex gap-6">
                    <UFormField label="Difficulty" name="level" class="w-full">
                        <USelect v-model="level" :items="levels" class="w-full" />
                    </UFormField>

                    <UFormField label="Seconds to guess" name="seconds" class="w-full">
                        <UInput v-model="seconds" type="number" class="w-full" />
                    </UFormField>
                </div>

                <UFormField name="fluffy" class="w-full">
                    <UCheckbox label="Fluffy mode" v-model="fluffy" />
                </UFormField>
            </div>
        </template>
    </UModal>
</template>

<script lang="ts" setup>
import type { Level } from '~/types';

const levels: { label: string, value: Level }[] = [
    { label: 'Easy', value: 'easy' },
    { label: 'Normal', value: 'normal' },
    { label: 'Hard', value: 'hard' },
]

const { seconds, level, fluffy } = storeToRefs(useSettingsStore())
</script>
