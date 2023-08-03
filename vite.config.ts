import path from 'node:path'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import autoprefixer from 'autoprefixer'

import { genStaticData } from './src/mock/genMock'

genStaticData() // generate static mock data to ts file

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
  ],
  css: {
    postcss: {
      plugins: [autoprefixer({
        overrideBrowserslist: ['last 2 versions', 'not dead', '> 0.2%'],
      })],
    },
  },
})
