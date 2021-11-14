import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/components/main/MainContent.vue') },
  { path: '/v/:id', component: () => import('@/components/detail/DetailView.vue') }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
