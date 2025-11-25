<template>
  <UApp>
    <div class="mx-auto flex flex-col justify-center items-center gap-3 sm:max-w-screen-sm pt-6 px-6 sm:px-0">
      <h1 class="text-secondary text-5xl font-light">
        {{ $t('app.title.1') }}<span class="font-bold">{{ $t('app.title.2') }}</span>
      </h1>

      <GameControls />

      <SettingsDialog />

      <a
        href="https://larslorenz.dev/"
        class="text-gray-700"
      ><small><em>by larslorenz.dev</em></small></a>
    </div>
  </UApp>
</template>
