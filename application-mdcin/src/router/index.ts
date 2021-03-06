import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/components/contents/MainContent.vue') },
  { path: '/item/:id', component: () => import('@/components/items/ItemDetail.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('@/components/contents/NotFound.vue') }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
