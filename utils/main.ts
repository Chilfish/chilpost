import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { darkStore } from '../stores/darkStore'
import App from '~/App.vue'
import router from 'utils/router'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style.scss'

const app = createApp(App)

app
  .use(router)
  .use(createPinia())
  .provide('darkStore', darkStore) // global dark mode stores
  .mount('#app')
