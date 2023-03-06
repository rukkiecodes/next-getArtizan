// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/auth/Default.vue'),
    children: [
      {
        path: '',
        name: 'Signup',
        component: () => import('@/views/auth/Signup.vue'),
      },
      {
        path: '/signin',
        name: 'Signin',
        component: () => import('@/views/auth/Signin.vue'),
      },
    ],
  },
  {
    path: '/artisan',
    component: () => import('@/layouts/artisan/Default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/artisan/App.vue'),
      },
      {
        path: 'overview',
        component: () => import('@/views/artisan/App.vue'),
      },
      {
        path: 'profile',
        component: () => import('@/views/artisan/Profile.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
