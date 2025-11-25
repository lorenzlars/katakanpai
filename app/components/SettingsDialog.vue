<template>
  <UModal :title="$t('settings.title')">
    <UButton
      :label="$t('settings.title')"
      color="neutral"
      variant="ghost"
      class="mt-12"
    />

    <template #body>
      <div class="flex flex-col gap-6">
        <UFormField
          :label="$t('settings.language')"
          name="locale"
          class="w-full"
        >
          <USelect
            :model-value="locale"
            :items="locales"
            class="w-full"
            @update:model-value="setLocale"
          />
        </UFormField>

        <div class="flex gap-6">
          <UFormField
            :label="$t('settings.difficulty')"
            name="level"
            class="w-full"
          >
            <USelect
              v-model="level"
              :loading
              :items="levels"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="$t('settings.secondsToGuess')"
            name="seconds"
            class="w-full"
          >
            <UInput
              v-model="seconds"
              type="number"
              class="w-full"
              min="1"
              max="120"
            />
          </UFormField>
        </div>

        <UFormField
          name="fluffy"
          class="w-full"
        >
          <UCheckbox
            v-model="fluffy"
            :label="$t('settings.fluffyMode')"
          />
        </UFormField>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import type { Level } from '~/types'

const { seconds, level, fluffy, loading } = storeToRefs(useSettingsStore())
const { t, locale, setLocale, availableLocales } = useI18n()

const levels = computed(() => [
  { label: t('settings.levels.easy'), value: 'easy' as Level },
  { label: t('settings.levels.normal'), value: 'normal' as Level },
  { label: t('settings.levels.hard'), value: 'hard' as Level },
])

const locales = computed(() => availableLocales.map(code => ({
  label: t(`settings.locales.${code}`),
  value: code,
})))
</script>
