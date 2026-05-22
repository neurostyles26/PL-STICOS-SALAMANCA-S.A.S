<template>
  <div class="min-h-screen md:h-screen md:overflow-hidden bg-slate-100 flex flex-col md:flex-row">
    <!-- Sidebar Administrativo (Escritorio) -->
    <aside class="hidden md:flex flex-col w-72 bg-brand-dark-950 text-slate-300 border-r border-brand-dark-900 shrink-0 select-none md:overflow-y-auto">
      <!-- Encabezado / Logo Admin -->
      <div class="p-6 border-b border-brand-dark-900 flex flex-col gap-1">
        <Logo size="sm" />
        <span class="text-[9px] font-bold text-brand-orange-400 uppercase tracking-widest pl-2">
          PANEL DE ADMINISTRACIÓN
        </span>
      </div>

      <!-- Perfil del Admin -->
      <div class="p-5 border-b border-brand-dark-900 bg-brand-dark-900/40 flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-brand-green-800 text-white flex items-center justify-center font-bold">
          AD
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-sm font-bold text-white truncate">Administrador</span>
          <span class="text-[11px] text-slate-400 truncate">{{ authStore.user?.email || 'admin@salamanca.com' }}</span>
        </div>
      </div>

      <!-- Links de Navegación -->
      <nav class="flex-grow p-4 flex flex-col gap-1.5 font-semibold text-sm">
        <NuxtLink 
          v-for="link in menuLinks" 
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
          :class="[route.path === link.to ? 'bg-brand-green-500 text-white shadow-lg shadow-brand-green-150' : 'hover:bg-brand-dark-900 hover:text-white']"
        >
          <component :is="link.icon" class="w-5 h-5 shrink-0" />
          <span>{{ link.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Botón de Salida -->
      <div class="p-4 border-t border-brand-dark-900">
        <button 
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors"
        >
          <LogOut class="w-5 h-5 shrink-0" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>

    <!-- Header y Sidebar Móvil -->
    <header class="sticky top-0 z-50 md:hidden w-full bg-brand-dark-950 text-white p-4 flex justify-between items-center shadow-md">
      <Logo size="sm" />
      <button 
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="p-2 hover:text-brand-green-500 focus:outline-none transition-colors"
        aria-label="Menú admin"
      >
        <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>
    </header>

    <!-- Menú Móvil Desplegable -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-full opacity-0"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="fixed top-16 left-0 right-0 bg-brand-dark-950 text-slate-300 p-6 flex flex-col gap-6 md:hidden z-40 border-t border-brand-dark-900 shadow-2xl"
      >
        <nav class="flex flex-col gap-2 font-semibold text-sm">
          <NuxtLink 
            v-for="link in menuLinks" 
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-3 px-4 py-3 rounded-xl"
            :class="[route.path === link.to ? 'bg-brand-green-500 text-white' : 'hover:bg-brand-dark-900']"
            @click="isMobileMenuOpen = false"
          >
            <component :is="link.icon" class="w-5 h-5 shrink-0" />
            <span>{{ link.label }}</span>
          </NuxtLink>
        </nav>
        
        <button 
          @click="handleLogout"
          class="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold text-sm bg-red-950/20 text-red-400 border border-red-900/30"
        >
          <LogOut class="w-5 h-5" />
          Cerrar Sesión Admin
        </button>
      </div>
    </transition>

    <!-- Área de Contenido Principal del Panel -->
    <div class="flex-grow flex flex-col overflow-y-auto">
      <!-- Barra Superior de Navegación Rápida -->
      <header class="hidden md:flex justify-between items-center bg-white border-b border-slate-200/80 px-8 py-5 shrink-0">
        <h2 class="font-title font-extrabold text-xl text-brand-dark-800 uppercase tracking-wide">
          {{ activePageTitle }}
        </h2>
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            <UserCheck class="w-4 h-4 text-brand-green-500" />
            <span>Sesión Segura Activa</span>
          </div>
          <button 
            @click="handleLogout"
            class="flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200/60 px-3 py-1.5 rounded-lg transition-colors duration-200 cursor-pointer shadow-sm"
          >
            <LogOut class="w-4.5 h-4.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </header>

      <!-- Slot Principal para vistas del panel -->
      <main class="flex-grow p-6 md:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import Logo from '~/components/ui/Logo.vue'
import { 
  Building2, 
  Layers, 
  Package, 
  Image as ImageIcon, 
  Globe, 
  LogOut, 
  Menu, 
  X, 
  UserCheck 
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isMobileMenuOpen = ref(false)

const menuLinks = [
  { label: 'Información Empresa', to: '/admin', icon: Building2 },
  { label: 'Gestión Categorías', to: '/admin/categorias', icon: Layers },
  { label: 'Gestión Productos', to: '/admin/productos', icon: Package },
  { label: 'Gestión Banners', to: '/admin/banners', icon: ImageIcon },
  { label: 'Ver Sitio Web', to: '/', icon: Globe }
]

const activePageTitle = computed(() => {
  const link = menuLinks.find(l => l.to === route.path)
  return link ? link.label : 'Panel de Administración'
})

async function handleLogout() {
  isMobileMenuOpen.value = false
  await authStore.logout()
}
</script>
