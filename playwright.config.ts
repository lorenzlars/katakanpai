import { fileURLToPath } from 'node:url'
import { defineConfig } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'
import { isCI } from 'std-env'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(fileURLToPath(new URL('.', import.meta.url)), '.env') })

/* See https://playwright.dev/docs/test-configuration */
export default defineConfig<ConfigOptions>({
  testDir: './tests',
  /* Run tests in files in parallel. */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!isCI,
  /* Retry on CI only */
  retries: isCI ? 2 : 0,
  /* Opt out of parallel tests */
  workers: 1,
  /* Setting the out dir for the temporary data of playwright */
  outputDir: './.playwright',
  /* Increase timeout for CI environment */
  timeout: isCI ? 60_000 : undefined,
  use: {
    baseURL: 'http://localhost:3000',
    nuxt: {
      host: 'http://localhost:3000',
    },
  },
})
