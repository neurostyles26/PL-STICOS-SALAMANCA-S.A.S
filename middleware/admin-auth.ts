import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const user = useSupabaseUser()

  // Sincronizar el estado del store con Supabase User si es necesario
  if (user.value && !authStore.isLoggedIn) {
    authStore.user = user.value
  } else if (!user.value && authStore.isLoggedIn) {
    authStore.user = null
  }

  // Si no está autenticado y trata de ir al panel de administración
  if (!user.value && to.path.startsWith('/admin') && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }

  // Si está autenticado e intenta ir a la vista de login
  if (user.value && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
})
