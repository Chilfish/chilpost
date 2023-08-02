import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { PostService } from './services/postService'
import App from '~/App.vue'
import router from '~/router'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style.scss'

const app = createApp(App)

app
  .use(router)
  .use(createPinia())
  .provide('postService', new PostService())
  .mount('#app')
