// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/artisan/auth/Default.vue'),
    children: [
      {
        path: '',
        name: 'Signup',
        component: () => import('@/views/artisan/auth/Signup.vue'),
      },
      {
        path: '/signin',
        name: 'Signin',
        component: () => import('@/views/artisan/auth/Signin.vue'),
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
  },
  {
    path: '/customer',
    component: () => import('@/layouts/user/auth/Default.vue'),
    children: [
      {
        path: '',
        name: 'customer.Signup',
        component: () => import('@/views/user/auth/Signup.vue'),
      },
      {
        path: '/signin',
        name: 'customer.Signin',
        component: () => import('@/views/user/auth/Signin.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/user/Default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/user/App.vue'),
      },
      {
        path: 'overview',
        component: () => import('@/views/user/App.vue'),
      },
      {
        path: 'bookings',
        component: () => import('@/views/user/Bookings.vue'),
      },
      {
        path: 'profile',
        component: () => import('@/views/user/Profile.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
