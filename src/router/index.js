import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/RegisterViews.vue'
import Login from '../views/LoginViews.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/register', name: 'Register', component: Register },
    { path: '/login', name: 'Login', component: Login },
  ],
})

export default router
