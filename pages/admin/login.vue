<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden select-none">
    <!-- Fondos difuminados decorativos industriales -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-brand-green-700/20 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-orange-500/20 rounded-full blur-[120px] pointer-events-none"></div>
    
    <div 
      v-motion-pop
      class="w-full max-w-md bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 relative z-10 flex flex-col gap-6"
    >
      <!-- Logotipo central -->
      <div class="flex flex-col items-center gap-2 text-center pb-2 border-b border-slate-100">
        <Logo size="lg" />
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] mt-2">
          PANEL DE ADMINISTRACIÓN PRIVADO
        </span>
      </div>

      <div class="flex flex-col gap-1.5">
        <h2 class="font-title font-extrabold text-2xl text-brand-dark-800 leading-none">
          Iniciar Sesión
        </h2>
        <p class="text-xs text-slate-500">
          Ingrese sus credenciales de Supabase para administrar contenidos.
        </p>
      </div>

      <!-- Formulario interactivo -->
      <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
        <!-- Input de Email -->
        <div class="flex flex-col gap-1.5">
          <label for="email" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Correo Electrónico</label>
          <div class="relative">
            <input 
              id="email" 
              v-model="email" 
              type="email" 
              required 
              class="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all"
              placeholder="admin@plasticossalamanca.com"
            />
            <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>

        <!-- Input de Contraseña -->
        <div class="flex flex-col gap-1.5">
          <label for="password" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Contraseña</label>
          <div class="relative">
            <input 
              id="password" 
              v-model="password" 
              type="password" 
              required 
              class="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all"
              placeholder="••••••••"
            />
            <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>

        <!-- Alerta de Error -->
        <div 
          v-if="errorMessage" 
          class="p-3.5 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs font-semibold flex items-center gap-2"
        >
          <AlertCircle class="w-4.5 h-4.5 text-red-500 shrink-0" />
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Botón de Envío -->
        <BaseButton 
          variant="primary" 
          type="submit" 
          :loading="loading"
          class="w-full py-3.5 mt-2 shadow-lg"
        >
          Autenticar Acceso
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import Logo from '~/components/ui/Logo.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import { Mail, Lock, AlertCircle } from 'lucide-vue-next'

// Deshabilitar Layout Global y registrar middleware de protección
definePageMeta({
  layout: false,
  middleware: ['admin-auth']
})

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''
  
  const success = await authStore.signIn(email.value, password.value)
  
  if (success) {
    // Redirigir al inicio del panel
    router.push('/admin')
  } else {
    errorMessage.value = authStore.error || 'Credenciales inválidas o error de conexión con Supabase.'
  }
  
  loading.value = false
}
</script>
