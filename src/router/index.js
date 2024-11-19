import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import HomeView from '../views/Home.vue'
import LoginView from '../views/Login.vue'
import RegisterView from '../views/Register.vue'
import DashboardView from '../views/Dashboard.vue'
import ProfileSetupView from '../views/ProfileSetup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/profile-setup',
      name: 'profile-setup',
      component: ProfileSetupView,
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const auth = getAuth()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = auth.currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && currentUser) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router