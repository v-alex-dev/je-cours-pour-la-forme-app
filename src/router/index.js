import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/RegisterViews.vue'
import Login from '../views/LoginViews.vue'
import MonProgramme from '../views/MonProgrammeViews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: () => import('../views/HomeViews.vue') },
    { path: '/register', name: 'Register', component: Register },
    { path: '/login', name: 'Login', component: Login },
    { path: '/mon-programme', name: 'MonProgramme', component: MonProgramme },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFoundViews.vue'),
    },
  ],
})

export default router
