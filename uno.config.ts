import { defineConfig, transformerDirectives } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetWind4 from '@unocss/preset-wind4'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'

export default defineConfig({
    shortcuts: {
        container: 'mx-auto px-5 max-w-screen-xl w-full',
    },
    presets: [
        presetWind4(),
        presetWebFonts({
            provider: 'bunny',
            fonts: {
                sans: {
                    name: 'Inter',
                    weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
                    italic: false,
                },
                mono: 'JetBrains Mono',
            },
            processors: createLocalFontProcessor({
                cacheDir: 'node_modules/.cache/unocss/fonts',
                fontAssetsDir: 'public/fonts',
                fontServeBaseUrl: '/fonts',
            }),
        }),
    ],
    transformers: [
        transformerDirectives(),
    ],
})