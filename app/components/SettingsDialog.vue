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
            v-model="locale"
            :items="locales"
            class="w-full"
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

const { t, locale } = useI18n()

const levels = computed(() => [
  { label: t('settings.levels.easy'), value: 'easy' as Level },
  { label: t('settings.levels.normal'), value: 'normal' as Level },
  { label: t('settings.levels.hard'), value: 'hard' as Level },
])

const locales = computed(() => [
  { label: new Intl.DisplayNames([locale.value], { type: 'language' }).of('en'), value: 'en' },
  { label: new Intl.DisplayNames([locale.value], { type: 'language' }).of('ja'), value: 'ja' },
])

const { seconds, level, fluffy } = storeToRefs(useSettingsStore())
</script>
