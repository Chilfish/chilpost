import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { PostService } from './services/post'
import App from '~/App.vue'
import router from '~/router'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style.scss'

const app = createApp(App)

app.provide('postService', new PostService())

app
  .use(router)
  .use(createPinia())
  .mount('#app')
