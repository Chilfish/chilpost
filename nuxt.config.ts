import process from 'node:process'
import { fileURLToPath } from 'node:url'
import sqlToTs from './server/utils/sqlToTs.server'

const {
  API_PROXY = '/api',
} = process.env

console.log('API_PROXY', API_PROXY)

function toAlias(name: string, path: string) {
  return {
    [name]: fileURLToPath(new URL(path, import.meta.url)),
  }
}

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
    ...toAlias('@cpa', './src/components_app'),
    ...toAlias('@db', './database'),
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
      proxy: API_PROXY !== '/api',
    },
  },

  hooks: {
    'nitro:init': sqlToTs,
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
      '/proxy/**': { proxy: `${API_PROXY}/**` },
      '/_ipx/_/proxy/**': { proxy: `${API_PROXY}/**` },
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
