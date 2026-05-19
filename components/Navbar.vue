<template>
  <header class="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300" :class="[isScrolled ? 'shadow-md border-b border-slate-200/50' : '']">
    <!-- Barra superior fina para datos de contacto corporativo (solo escritorio) -->
    <div class="hidden lg:block bg-brand-dark-900 text-slate-300 py-2.5 text-xs px-4 xl:px-6 border-b border-brand-dark-800">
      <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <div class="flex items-center gap-3 xl:gap-6 flex-wrap">
          <a :href="`tel:${companyStore.companyInfo.contact_details?.phone}`" class="flex items-center gap-2 hover:text-brand-orange-400 transition-colors">
            <Phone class="w-3.5 h-3.5 text-brand-orange-500" />
            <span>{{ companyStore.companyInfo.contact_details?.phone || '(+57) 607 6351234' }}</span>
          </a>
          <a :href="`mailto:${companyStore.companyInfo.contact_details?.email}`" class="flex items-center gap-2 hover:text-brand-orange-400 transition-colors">
            <Mail class="w-3.5 h-3.5 text-brand-orange-500" />
            <span>{{ companyStore.companyInfo.contact_details?.email || 'contacto@plasticossalamanca.com' }}</span>
          </a>
          <div class="flex items-center gap-2 text-slate-400">
            <MapPin class="w-3.5 h-3.5 text-brand-green-500" />
            <span>{{ companyStore.companyInfo.contact_details?.address || 'Zona Industrial, Bucaramanga, Colombia' }}</span>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-brand-green-400 font-semibold tracking-wide uppercase text-[10px] bg-brand-green-950 px-2.5 py-0.5 rounded-full">
            Lunes a Sábado • 7:00 AM - 5:30 PM
          </span>
          <NuxtLink v-if="authStore.isLoggedIn" to="/admin" class="flex items-center gap-1.5 text-brand-orange-400 hover:underline">
            <Settings class="w-3.5 h-3.5" />
            <span>Panel Admin</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Navegación Principal (Glassmorphism) -->
    <nav class="w-full bg-white/90 backdrop-blur-md px-4 py-3 sm:px-6 md:px-8 transition-all duration-300" :class="[isScrolled ? 'py-2.5 sm:py-3' : 'py-3 sm:py-4 md:py-5']">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <!-- Logotipo -->
        <NuxtLink to="/" class="shrink-0">
          <Logo size="md" />
        </NuxtLink>

        <!-- Menú de navegación (Escritorio) -->
        <div class="hidden md:flex items-center gap-8 font-title text-sm tracking-wide">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.to"
            :to="link.to"
            class="relative py-1 font-semibold text-brand-dark-700 hover:text-brand-green-600 transition-colors duration-300"
            :class="[route.path === link.to ? 'text-brand-green-500 font-bold' : '']"
          >
            {{ link.label }}
            <!-- Subrayado de pestaña activa -->
            <span 
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-green-500 transition-all duration-300"
              :class="[route.path === link.to ? 'w-full' : '']"
            ></span>
          </NuxtLink>
        </div>

        <!-- Botón de Acción Principal (WhatsApp) -->
        <div class="hidden md:flex items-center gap-3">
          <BaseButton 
            variant="secondary"
            size="sm"
            :href="whatsappUrl"
          >
            <template #iconLeft>
              <PhoneCall class="w-4 h-4" />
            </template>
            Cotizar por WhatsApp
          </BaseButton>
        </div>

        <!-- Botón del menú móvil (Hamburguesa) -->
        <button 
          @click="toggleMobileMenu" 
          class="md:hidden p-2 text-brand-dark-800 hover:text-brand-green-500 focus:outline-none transition-colors"
          aria-label="Menú principal"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-7 h-7" />
          <X v-else class="w-7 h-7" />
        </button>
      </div>
    </nav>

    <!-- Menú Móvil Desplegable (Slide-down con transiciones corporativas) -->
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
        class="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl py-6 px-6 flex flex-col gap-6 md:hidden z-40 rounded-b-2xl"
      >
        <div class="flex flex-col gap-4 font-title text-base font-semibold tracking-wide">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.to"
            :to="link.to"
            class="py-2.5 text-brand-dark-700 hover:text-brand-green-600 border-b border-slate-50 transition-colors"
            :class="[route.path === link.to ? 'text-brand-green-500 border-brand-green-100 pl-2 border-l-4' : '']"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink 
            v-if="authStore.isLoggedIn"
            to="/admin"
            class="py-2.5 text-brand-orange-500 flex items-center gap-2"
            @click="isMobileMenuOpen = false"
          >
            <Settings class="w-5 h-5" />
            Panel de Administración
          </NuxtLink>
        </div>

        <!-- Datos rápidos móviles -->
        <div class="flex flex-col gap-3 py-4 border-t border-slate-100 text-xs text-brand-dark-500">
          <div class="flex items-center gap-2">
            <Phone class="w-4 h-4 text-brand-orange-500" />
            <span>{{ companyStore.companyInfo.contact_details?.phone || '(+57) 607 6351234' }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Mail class="w-4 h-4 text-brand-orange-500" />
            <span>{{ companyStore.companyInfo.contact_details?.email || 'contacto@plasticossalamanca.com' }}</span>
          </div>
        </div>

        <!-- Botón de WhatsApp Móvil -->
        <BaseButton 
          variant="secondary"
          class="w-full text-center py-3.5"
          :href="whatsappUrl"
          @click="isMobileMenuOpen = false"
        >
          <template #iconLeft>
            <PhoneCall class="w-5 h-5" />
          </template>
          Cotizar por WhatsApp
        </BaseButton>
      </div>
    </transition>
  </header>
  <!-- Espaciador para evitar que el header fijo tape el contenido superior -->
  <div class="h-[64px] sm:h-[72px] lg:h-[112px]"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCompanyStore } from '~/stores/company'
import { useAuthStore } from '~/stores/auth'
import Logo from '~/components/ui/Logo.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  PhoneCall, 
  Settings 
} from 'lucide-vue-next'

const route = useRoute()
const companyStore = useCompanyStore()
const authStore = useAuthStore()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Quiénes Somos', to: '/quienes-somos' },
  { label: 'Productos', to: '/productos' },
  { label: 'Contacto', to: '/contacto' }
]

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

const whatsappUrl = computed(() => {
  const phone = companyStore.companyInfo.contact_details?.whatsapp || '+573102003040'
  const text = encodeURIComponent('Hola, vengo desde la página web de Plásticos Salamanca S.A.S. y me gustaría obtener más información sobre sus soluciones plásticas y cotizaciones de productos.')
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`
})

// Cargar datos corporativos y banners si no están cargados (SSR + Client)
if (!Object.keys(companyStore.companyInfo).length) {
  await companyStore.fetchCompanyInfo()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
