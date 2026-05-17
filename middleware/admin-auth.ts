import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const user = useSupabaseUser()


  // Si no está autenticado y trata de ir al panel de administración
  if (!user.value && to.path.startsWith('/admin') && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }

  // Si está autenticado e intenta ir a la vista de login
  if (user.value && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
})
