import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/explore',
    children: [
      {
        path: 'explore',
        component: () => import('@pg/index.vue'),
      },
    ],
  },
  {
    path: '/@:username/:postId',
    component: () => import('@pg/post.vue'),
  },
  {
    path: '/@:username',
    component: () => import('@pg/profile.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
