import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/explore',
  },
  {
    path: '/',
    component: () => import('@pg/index.vue'),
    children: [
      {
        path: 'explore',
        component: () => import('@pg/explore.vue'),
      },
      {
        path: '@:username',
        component: () => import('@pg/profile.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
