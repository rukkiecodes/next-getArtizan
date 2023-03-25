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
        path: 'signin',
        name: 'Signin',
        component: () => import('@/views/auth/Signin.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Bookings.vue'),
      },
      {
        path: 'overview',
        component: () => import('@/views/Overview.vue'),
      },
      {
        path: 'bookings',
        component: () => import('@/views/Bookings.vue'),
      },
      {
        path: 'subscription ',
        component: () => import('@/views/Subscription.vue'),
      },
      {
        path: 'jobs',
        component: () => import('@/views/Jobs.vue'),
      },
      {
        path: 'profile',
        component: () => import('@/views/Profile.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
