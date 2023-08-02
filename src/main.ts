import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { PostService } from './services/postService'
import { genStaticDate } from './mock'
import App from '~/App.vue'
import router from '~/router'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style.scss'

genStaticDate() // generate static mock data to ts file

const app = createApp(App)

app
  .use(router)
  .use(createPinia())
  .provide('postService', new PostService())
  .mount('#app')
