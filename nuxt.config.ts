import process from 'node:process'
import { fileURLToPath } from 'node:url'
import sqlToTs from './server/utils/sqlToTs.server'
import { pwa } from './src/config/pwa'
import { appDescription } from './src/constants/index'

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
  dir: {
    public: '../public',
  },

  modules: [
    '@unocss/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@nuxtjs/color-mode',
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

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  devtools: {
    enabled: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/shared.scss',
  ],

  colorMode: {
    classSuffix: '',
  },

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
      '/': { redirect: '/home' },
      '/proxy/**': { proxy: `${API_PROXY}/**` },
      '/_ipx/_/proxy/**': { proxy: `${API_PROXY}/**` },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/settings'],
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  pwa,
})
