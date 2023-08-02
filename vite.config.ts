import path from 'node:path'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import autoprefixer from 'autoprefixer'
import fs from 'vite-plugin-fs'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@cp/': `${path.resolve(__dirname, 'src/components')}/`,
      '@pg/': `${path.resolve(__dirname, 'src/pages')}/`,
    },
  },
  plugins: [
    // VueDevTools(),
    vue(),
    UnoCSS(),
    Components(), // auto import components
    fs({
      rootDir: './src',
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer({
        overrideBrowserslist: ['last 2 versions', 'not dead', '> 0.2%'],
      })],
    },
  },
  server: {
    watch: {
      ignored: ['**/src/mock/mock.ts'],
    },
  },
})
