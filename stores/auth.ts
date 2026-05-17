import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isLoggedIn = computed(() => !!user.value)

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (signInError) throw signInError
      return true
    } catch (err: any) {
      error.value = err.message || 'Error al iniciar sesión. Verifique sus credenciales.'
      return false
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    error.value = null
    try {
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) throw signOutError
      navigateTo('/admin/login')
    } catch (err: any) {
      error.value = err.message || 'Error al cerrar sesión.'
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    error,
    isLoggedIn,
    login,
    logout
  }
})
