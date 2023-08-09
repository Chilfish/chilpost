import process from 'node:process'
import genStaticData from './server/utils/mock'

const {
  API_SECRET = 'secret',
  API_URL = '/api',
  SECRET_API_URL = API_URL,
  AUTH_ORIGIN = '/',
} = process.env

export default defineNuxtConfig({
  srcDir: 'src/',
  serverDir: './server',

  modules: [
    '@unocss/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
  ],

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

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: '@use "@/assets/_colors.scss" as *;'
        },
      },
    },
  },

  typescript: {
    strict: true,
  },

  runtimeConfig: {
    apiSecret: API_SECRET,
    authOrigin: AUTH_ORIGIN,
    secretApiURL: SECRET_API_URL,
    public: {
      apiURL: API_URL,
    },
  },

  routeRules: {
    '/': { redirect: '/explore' },
    // '/settings': { ssr: false },
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  hooks: {
    'nitro:build:before': () => genStaticData(), // generate static data before build
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
