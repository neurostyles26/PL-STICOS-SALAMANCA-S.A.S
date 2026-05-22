<template>
  <footer class="bg-brand-dark-950 text-slate-300 pt-16 pb-8 border-t border-brand-dark-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12">
        <!-- Columna 1: Logo e Identidad -->
        <div class="flex flex-col gap-6">
          <NuxtLink to="/" class="inline-block shrink-0">
            <Logo dark size="md" />
          </NuxtLink>
          <p class="text-sm text-slate-400 leading-relaxed">
            Líderes en soluciones plásticas de alta gama para la agricultura y el empaque industrial. Innovación, resistencia y sostenibilidad en cada bucle.
          </p>
          <div class="flex flex-wrap items-center gap-3">
            <span class="text-xs font-semibold text-brand-green-400 bg-brand-green-950/60 px-3 py-1 rounded-md border border-brand-green-900/50">
              ISO 9001 CERTIFICADO
            </span>
          </div>

          <!-- Redes Sociales Dinámicas -->
          <div v-if="hasSocialLinks" class="flex flex-wrap gap-2.5 pt-1">
            <a v-if="socialLinks.facebook" :href="socialLinks.facebook" target="_blank" rel="noopener noreferrer" class="p-2 bg-brand-dark-900 hover:bg-brand-green-600 text-slate-300 hover:text-white rounded-lg transition-all duration-300 flex items-center justify-center shadow-sm" title="Facebook">
              <Facebook class="w-4 h-4" />
            </a>
            <a v-if="socialLinks.instagram" :href="socialLinks.instagram" target="_blank" rel="noopener noreferrer" class="p-2 bg-brand-dark-900 hover:bg-brand-orange-500 text-slate-300 hover:text-white rounded-lg transition-all duration-300 flex items-center justify-center shadow-sm" title="Instagram">
              <Instagram class="w-4 h-4" />
            </a>
            <a v-if="socialLinks.twitter" :href="socialLinks.twitter" target="_blank" rel="noopener noreferrer" class="p-2 bg-brand-dark-900 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all duration-300 flex items-center justify-center shadow-sm" title="Twitter / X">
              <Twitter class="w-4 h-4" />
            </a>
            <a v-if="socialLinks.linkedin" :href="socialLinks.linkedin" target="_blank" rel="noopener noreferrer" class="p-2 bg-brand-dark-900 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg transition-all duration-300 flex items-center justify-center shadow-sm" title="LinkedIn">
              <Linkedin class="w-4 h-4" />
            </a>
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
            <!-- Dirección -->
            <div v-if="companyStore.companyInfo.contact_details?.address" class="flex items-start gap-3">
              <MapPin class="w-5 h-5 text-brand-orange-500 shrink-0 mt-0.5" />
              <span>{{ companyStore.companyInfo.contact_details.address }}</span>
            </div>

            <!-- Teléfono Fijo -->
            <a 
              v-if="companyStore.companyInfo.contact_details?.show_phone && companyStore.companyInfo.contact_details?.phone" 
              :href="`tel:${companyStore.companyInfo.contact_details.phone}`" 
              class="flex items-start gap-3 hover:text-white transition-colors group"
            >
              <Phone class="w-5 h-5 text-brand-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span>{{ companyStore.companyInfo.contact_details.phone }}</span>
            </a>

            <!-- Teléfono Celular -->
            <a 
              v-if="companyStore.companyInfo.contact_details?.show_cellphone && companyStore.companyInfo.contact_details?.cellphone" 
              :href="`tel:${companyStore.companyInfo.contact_details.cellphone}`" 
              class="flex items-start gap-3 hover:text-white transition-colors group"
            >
              <Smartphone class="w-5 h-5 text-brand-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span>{{ companyStore.companyInfo.contact_details.cellphone }}</span>
            </a>

            <!-- NIT -->
            <div 
              v-if="companyStore.companyInfo.contact_details?.show_nit && companyStore.companyInfo.contact_details?.nit" 
              class="flex items-start gap-3 text-slate-400 font-semibold"
            >
              <FileText class="w-5 h-5 text-brand-green-500 shrink-0 mt-0.5" />
              <span>NIT: {{ companyStore.companyInfo.contact_details.nit }}</span>
            </div>

            <!-- Correo Comercial -->
            <a 
              v-if="companyStore.companyInfo.contact_details?.email" 
              :href="`mailto:${companyStore.companyInfo.contact_details.email}`" 
              class="flex items-start gap-3 hover:text-white transition-colors group"
            >
              <Mail class="w-5 h-5 text-brand-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span class="break-all">{{ companyStore.companyInfo.contact_details.email }}</span>
            </a>

            <!-- WhatsApp -->
            <a 
              v-if="companyStore.companyInfo.contact_details?.show_whatsapp !== false"
              :href="whatsappUrl" 
              class="flex items-start gap-3 text-brand-green-400 hover:text-brand-green-300 transition-colors group"
            >
              <MessageSquare class="w-5 h-5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span class="font-semibold">WhatsApp Corporativo</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Barra Inferior de Copyright -->
      <div class="pt-8 border-t border-brand-dark-900 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-5">
        <p class="text-center md:text-left">&copy; {{ new Date().getFullYear() }} PLÁSTICOS SALAMANCA S.A.S. Todos los derechos reservados.</p>
        
        <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <!-- Botón sutil de Login Panel -->
          <NuxtLink to="/admin/login" class="flex items-center gap-1.5 text-slate-500 hover:text-brand-green-400 transition-colors group">
            <Lock class="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span class="font-semibold uppercase tracking-wider text-[10px]">Panel Admin</span>
          </NuxtLink>
          <!-- Derechos de Autor y Licencia (Preservados en código fuente) -->
          <!-- Código desarrollado y propiedad intelectual de Edisson Pinza (Software Developer). Todos los derechos reservados. -->
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
  MessageSquare,
  Lock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Smartphone,
  FileText
} from 'lucide-vue-next'

const companyStore = useCompanyStore()
const productsStore = useProductsStore()

const socialLinks = computed(() => {
  return companyStore.companyInfo.social_links || {
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: ''
  }
})

const hasSocialLinks = computed(() => {
  const links = socialLinks.value
  return !!(links.facebook || links.instagram || links.twitter || links.linkedin)
})

const whatsappUrl = computed(() => {
  const phone = companyStore.companyInfo.contact_details?.whatsapp || '+573102003040'
  const text = encodeURIComponent('Hola, vengo desde el pie de página de su sitio web y me interesa asesoría comercial sobre sus productos.')
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`
})

onMounted(async () => {
  // Asegurar que la info corporativa está cargada
  if (!Object.keys(companyStore.companyInfo).length) {
    await companyStore.fetchCompanyInfo()
  }
  // Asegurar que las categorías están cargadas
  if (productsStore.categories.length === 0) {
    await productsStore.fetchCategories()
  }
})
</script>
