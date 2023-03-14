// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // User Routes
  {
    path: '/',
    component: () => import('@/layouts/user/auth/Default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/user/auth/Signup.vue'),
      },
      {
        path: 'signin',
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
  // Artisan Routes
  {
    path: '/artisan',
    component: () => import('@/layouts/artisan/auth/Default.vue'),
    children: [
      {
        path: '',
        name: 'Signup',
        component: () => import('@/views/artisan/auth/Signup.vue'),
      },
      {
        path: 'signin',
        name: 'Signin',
        component: () => import('@/views/artisan/auth/Signin.vue'),
      },
    ],
  },
  {
    path: '/artisanDashboard',
    component: () => import('@/layouts/artisan/Default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/artisan/Bookings.vue'),
      },
      {
        path: 'overview',
        component: () => import('@/views/artisan/Overview.vue'),
      },
      {
        path: 'bookings',
        component: () => import('@/views/artisan/Bookings.vue'),
      },
      {
        path: 'subscription ',
        component: () => import('@/views/artisan/Subscription.vue'),
      },
      {
        path: 'jobs',
        component: () => import('@/views/artisan/Jobs.vue'),
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
