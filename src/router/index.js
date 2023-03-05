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
    path: '/app',
    component: () => import('@/layouts/app/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/app/App.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
