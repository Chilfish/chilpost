import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { darkStore } from './store/darkStore'
import App from '~/App.vue'
import router from '~/router'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style.scss'

const app = createApp(App)

app
  .use(router)
  .use(createPinia())
  .provide('darkStore', darkStore) // global dark mode store
  .mount('#app')
