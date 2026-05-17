<template>
  <footer class="bg-brand-dark-950 text-slate-300 pt-16 pb-8 border-t border-brand-dark-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12">
        <!-- Columna 1: Logo e Identidad -->
        <div class="flex flex-col gap-6">
          <NuxtLink to="/" class="inline-block shrink-0">
            <!-- Logo modificado para contraste oscuro -->
            <div class="flex items-center gap-3 select-none group cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" class="w-12 h-12 shrink-0">
                <defs>
                  <linearGradient id="greenGradFoot" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#259351" />
                    <stop offset="100%" stop-color="#0b5a33" />
                  </linearGradient>
                  <linearGradient id="orangeGradFoot" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ff8b4d" />
                    <stop offset="100%" stop-color="#e06b26" />
                  </linearGradient>
                </defs>
                <path d="M 60,15 C 85,15 105,35 105,60 C 105,75 95,90 85,95 C 80,90 75,75 75,60 C 75,45 65,30 50,25 C 53,18 56,15 60,15 Z" fill="url(#greenGradFoot)" />
                <path d="M 60,105 C 35,105 15,85 15,60 C 15,45 25,30 35,25 C 40,30 45,45 45,60 C 45,75 55,90 70,95 C 67,102 64,105 60,105 Z" fill="url(#orangeGradFoot)" />
                <circle cx="60" cy="60" r="14" fill="#ffffff" />
                <path d="M 57,51 C 62,51 65,54 65,58 C 65,61 62,64 57,64 L 57,69" stroke="#0b5a33" stroke-width="3" stroke-linecap="round" fill="none" />
              </svg>
              <div class="flex flex-col leading-none">
                <span class="font-title font-extrabold text-xl tracking-tight text-white">PLÁSTICOS</span>
                <span class="font-title font-extrabold text-lg tracking-wider text-brand-orange-500">SALAMANCA</span>
                <span class="text-[9px] font-sans font-semibold text-slate-400 uppercase tracking-[0.2em] mt-0.5">Bolsas • Invernaderos • Empaques</span>
              </div>
            </div>
          </NuxtLink>
          <p class="text-sm text-slate-400 leading-relaxed">
            Líderes en soluciones plásticas de alta gama para la agricultura y el empaque industrial. Innovación, resistencia y sostenibilidad en cada bucle.
          </p>
          <div class="flex gap-4">
            <span class="text-xs font-semibold text-brand-green-400 bg-brand-green-950/60 px-3 py-1 rounded-md border border-brand-green-900/50">
              ISO 9001 CERTIFICADO
            </span>
          </div>
        </div>

        <!-- Columna 2: Enlaces de Navegación -->
        <div class="flex flex-col gap-5">
          <h4 class="font-title font-semibold text-base text-white uppercase tracking-wider">
            Navegación
          </h4>
          <ul class="flex flex-col gap-3.5 text-sm font-semibold">
            <li>
              <NuxtLink to="/" class="hover:text-brand-green-400 transition-colors">Inicio</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/quienes-somos" class="hover:text-brand-green-400 transition-colors">Quiénes Somos</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/productos" class="hover:text-brand-green-400 transition-colors">Catálogo de Productos</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contacto" class="hover:text-brand-green-400 transition-colors">Contacto Corporativo</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Columna 3: Categorías Destacadas -->
        <div class="flex flex-col gap-5">
          <h4 class="font-title font-semibold text-base text-white uppercase tracking-wider">
            Categorías
          </h4>
          <ul class="flex flex-col gap-3.5 text-sm">
            <li v-for="cat in productsStore.categories" :key="cat.id">
              <NuxtLink :to="`/productos?categoria=${cat.slug}`" class="hover:text-brand-green-400 transition-colors flex items-center gap-1.5">
                <span class="w-1 h-1 rounded-full bg-brand-orange-500"></span>
                {{ cat.name }}
              </NuxtLink>
            </li>
            <li v-if="productsStore.categories.length === 0" class="text-slate-500 text-sm">
              Cargando categorías...
            </li>
          </ul>
        </div>

        <!-- Columna 4: Datos de Contacto -->
        <div class="flex flex-col gap-5">
          <h4 class="font-title font-semibold text-base text-white uppercase tracking-wider">
            Atención al Cliente
          </h4>
          <div class="flex flex-col gap-4 text-sm text-slate-400">
            <div class="flex items-start gap-3">
              <MapPin class="w-5 h-5 text-brand-orange-500 shrink-0 mt-0.5" />
              <span>{{ companyStore.companyInfo.contact_details?.address || 'Zona Industrial, Bucaramanga, Santander, Colombia' }}</span>
            </div>
            <a :href="`tel:${companyStore.companyInfo.contact_details?.phone}`" class="flex items-start gap-3 hover:text-white transition-colors group">
              <Phone class="w-5 h-5 text-brand-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span>{{ companyStore.companyInfo.contact_details?.phone || '(+57) 607 6351234' }}</span>
            </a>
            <a :href="`mailto:${companyStore.companyInfo.contact_details?.email}`" class="flex items-start gap-3 hover:text-white transition-colors group">
              <Mail class="w-5 h-5 text-brand-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span class="break-all">{{ companyStore.companyInfo.contact_details?.email || 'contacto@plasticossalamanca.com' }}</span>
            </a>
            <a :href="whatsappUrl" class="flex items-start gap-3 text-brand-green-400 hover:text-brand-green-300 transition-colors group">
              <MessageSquare class="w-5 h-5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span class="font-semibold">WhatsApp Corporativo</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Barra Inferior de Copyright -->
      <div class="pt-8 border-t border-brand-dark-900 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {{ new Date().getFullYear() }} PLÁSTICOS SALAMANCA S.A.S. Todos los derechos reservados.</p>
        <div class="flex items-center gap-1.5">
          <span>Diseño y tecnología industrial por</span>
          <a href="#" class="text-slate-400 hover:text-white font-semibold">Antigravity Architect</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCompanyStore } from '~/stores/company'
import { useProductsStore } from '~/stores/products'
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare 
} from 'lucide-vue-next'

const companyStore = useCompanyStore()
const productsStore = useProductsStore()

const whatsappUrl = computed(() => {
  const phone = companyStore.companyInfo.contact_details?.whatsapp || '+573102003040'
  const text = encodeURIComponent('Hola, vengo desde el pie de página de su sitio web y me interesa asesoría comercial sobre sus productos.')
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`
})

onMounted(async () => {
  // Asegurar que las categorías están cargadas
  if (productsStore.categories.length === 0) {
    await productsStore.fetchCategories()
  }
})
</script>
