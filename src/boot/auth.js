import { boot } from 'quasar/wrappers'
import { useAuthStore } from '../stores/auth-store'

export default boot(async ({ router }) => {
  const authStore = useAuthStore()

  // Initialize auth state
  await authStore.initialize()

  // Global Navigation Guard
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const isAuthenticated = !!authStore.user

    if (requiresAuth && !isAuthenticated) {
      // Redirect to login if trying to access a protected route without being authenticated
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else if (to.path === '/login' && isAuthenticated) {
      // Redirect to dashboard if trying to access login page while already authenticated
      next('/dashboard')
    } else {
      next()
    }
  })
})
