import process from 'node:process'
import { fileURLToPath } from 'node:url'

const {
  API_PROXY = '/api',
} = process.env

export default defineNuxtConfig({
  srcDir: 'src/',
  serverDir: './server',

  modules: [
    '@unocss/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],

  alias: {
    '@cpa': fileURLToPath(new URL('./src/components_app', import.meta.url)),
  },

  imports: {
    dirs: [
      'stores',
      'server/utils',
    ],
  },

  devtools: {
    enabled: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/shared.scss',
  ],

  typescript: {
    strict: true,
  },

  runtimeConfig: {
    app: {
      apiProxy: API_PROXY,
    },
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    errorHandler: '~/error/nitroErrorHandler.ts',
    routeRules: {
      '/': { redirect: '/explore' },
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.png', sizes: 'any' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },
})
