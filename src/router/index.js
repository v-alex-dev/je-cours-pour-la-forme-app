import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/RegisterViews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/register', name: 'Register', component: Register }],
})

export default router
