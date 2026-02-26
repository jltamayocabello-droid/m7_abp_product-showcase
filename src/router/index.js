import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductView.vue'),
    },
    {
      path: '/admin/products',
      name: 'crud-products',
      component: () => import('../views/admin/ProductsCrudView.vue'),
    },
  ],
})

export default router
