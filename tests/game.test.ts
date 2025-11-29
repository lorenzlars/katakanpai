import { test, expect } from '@nuxt/test-utils/playwright'

test.describe('game', () => {
  test('early reveal', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' })

    await page.getByRole('button', { name: 'Start' }).click()
    await page.getByRole('button', { name: 'Reveal' }).click()

    await expect(page.getByTestId('latin')).toHaveText('Opera')
  })
})
