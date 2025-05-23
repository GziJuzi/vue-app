import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/user'
import AppLayout from '@/layouts/AppLayout.vue'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Auth/Login.vue'),
    meta: { title: 'Login' }
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home/Home.vue'),
        meta: { requiresAuth: true, title: 'Home' }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/About/About.vue'),
        meta: { requiresAuth: true, title: 'About' }
      },
      {
        path: 'users/:id',
        name: 'UserDetail',
        component: () => import('@/views/Users/UserDetail.vue'),
        meta: { requiresAuth: true, title: 'Profile' }
      },
      {
        path: 'management/users',
        name: 'ManagementUsers',
        component: () => import('@/views/Management/Users.vue'),
        meta: { requiresAuth: true, title: 'Management Users' }
      },
      {
        path: 'management/settings',
        name: 'ManagementSettings',
        component: () => import('@/views/Management/Settings.vue'),
        meta: { requiresAuth: true, title: 'Management Settings' }
      },
      {
        path: ':pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
        meta: { title: 'Page Not Found' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
