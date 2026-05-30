<template>
  <div class="bg-slate-50">
    <!-- 1. Hero Slider Corporativo Premium -->
    <HeroSlider />

    <!-- 2. Categorías Destacadas (Banners Dinámicos - Ahora debajo de Hero Slider) -->
    <section class="py-20 bg-white border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div class="flex flex-col gap-3">
            <span class="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange-500">
              Nuestro Portafolio
            </span>
            <h2 class="text-2xl sm:text-3xl md:text-5xl text-brand-dark-800 font-bold leading-tight">
              Categorías de Productos
            </h2>
            <div class="w-16 h-1 bg-brand-green-500 rounded-full mt-1"></div>
          </div>
          <p class="text-slate-600 max-w-md text-sm md:text-base leading-relaxed">
            Fabricamos polietilenos de alta y baja densidad adaptados a las exigencias más rigurosas de la agricultura, el comercio y la industria pesada.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div 
            v-for="(cat, i) in visibleCategories" 
            :key="cat.id"
            v-motion-slide-visible-bottom
            :delay="i * 150"
            class="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl group cursor-pointer border border-slate-100 bg-brand-dark-950"
          >
            <!-- Imagen de fondo optimizada con fallbacks robustos -->
            <NuxtImg 
              :src="getCategoryFallbackImage(cat)" 
              :alt="cat.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              format="webp"
              @error="handleImageError($event, cat)"
            />
            <!-- Overlay visual sofisticado (Optimizado con menor opacidad para mayor claridad de la imagen) -->
            <div class="absolute inset-0 bg-gradient-to-t from-brand-dark-950/60 via-brand-dark-950/15 to-transparent transition-opacity duration-300"></div>

            <!-- Contenido textual -->
            <div class="absolute inset-x-0 bottom-0 p-8 flex flex-col gap-3 justify-end h-1/2">
              <h3 class="text-2xl font-bold text-white font-title group-hover:text-brand-orange-400 transition-colors">
                {{ cat.name }}
              </h3>
              <p class="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {{ cat.description }}
              </p>
              <NuxtLink 
                :to="`/productos?categoria=${cat.slug}`"
                class="inline-flex items-center gap-2 text-xs font-bold text-brand-green-400 group-hover:text-white mt-2 transition-colors uppercase tracking-widest"
              >
                Explorar Categoría
                <ArrowRight class="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Botón Ver Más Categorías -->
        <div class="flex justify-center mt-12" v-if="productsStore.categories.length > 3">
          <button 
            @click="showAllCategories = !showAllCategories"
            type="button"
            class="inline-flex items-center gap-2.5 px-6 py-3 border border-slate-200 hover:border-brand-green-500 text-sm font-bold tracking-wider uppercase text-slate-800 hover:text-white hover:bg-brand-green-500 rounded-full transition-all duration-300 shadow-md group shrink-0"
          >
            <span>{{ showAllCategories ? 'Ver Menos Categorías' : 'Ver Más Categorías' }}</span>
            <ChevronDown class="w-4.5 h-4.5 transition-transform duration-300" :class="{ 'rotate-180': showAllCategories }" />
          </button>
        </div>
      </div>
    </section>

    <!-- 3. Sección Corporativa de Bienvenida -->
    <section class="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
      <div v-motion-slide-visible-left class="flex flex-col gap-6">
        <span class="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange-500">
          ¿Quiénes Somos?
        </span>
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-dark-800 font-bold leading-tight">
          Líderes en Fabricación de Soluciones Plásticas Industriales y Agrícolas
        </h2>
        <div class="w-20 h-1 bg-brand-green-500 rounded-full"></div>
        <p class="text-slate-600 leading-relaxed text-base md:text-lg">
          {{ companyStore.companyInfo.history?.text || 'En PLÁSTICOS SALAMANCA S.A.S. nos especializamos en diseñar y fabricar empaques flexibles, bolsas de alta resistencia y películas plásticas avanzadas para invernaderos. Nos impulsa ofrecer materiales con los más altos estándares de calidad y durabilidad para proteger y potenciar tus proyectos agrícolas e industriales.' }}
        </p>
        <div class="flex flex-wrap gap-4 mt-2">
          <BaseButton variant="primary" to="/quienes-somos">
            Conoce Nuestra Historia
          </BaseButton>
          <BaseButton variant="outline" to="/contacto">
            Hablar con Asesor
          </BaseButton>
        </div>
      </div>
      <div v-motion-slide-visible-right class="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl group">
        <NuxtImg 
          :src="companyStore.companyInfo.history?.image_url || 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'" 
          alt="Instalaciones Plásticos Salamanca"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          format="webp"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-brand-dark-950/40 to-transparent"></div>
      </div>
    </section>

    <!-- 4. Beneficios Empresariales -->
    <section class="py-16 sm:py-20 md:py-24 bg-white px-4 sm:px-6 md:px-12 border-b border-slate-100">
      <div class="max-w-7xl mx-auto">
        <div class="text-center flex flex-col items-center gap-4 mb-20">
          <span class="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange-500">
            Garantía Salamanca
          </span>
          <h2 class="text-2xl sm:text-3xl md:text-5xl text-brand-dark-800 font-bold max-w-2xl leading-tight">
            ¿Por qué Elegir Plásticos Salamanca?
          </h2>
          <div class="w-16 h-1 bg-brand-green-500 rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          <div 
            v-for="(benefit, index) in benefits" 
            :key="index"
            v-motion-slide-visible-bottom
            :delay="index * 100"
            class="flex flex-col gap-4 p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
          >
            <div class="w-12 h-12 rounded-xl bg-brand-green-50 flex items-center justify-center text-brand-green-500 group-hover:bg-brand-green-500 group-hover:text-white transition-colors duration-300 shrink-0">
              <component :is="benefit.icon" class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-bold text-brand-dark-800 font-title group-hover:text-brand-green-500 transition-colors">
              {{ benefit.title }}
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              {{ benefit.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Productos Destacados -->
    <section class="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <div class="flex flex-col gap-3">
          <span class="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange-500">
            Selección Especial
          </span>
          <h2 class="text-2xl sm:text-3xl md:text-5xl text-brand-dark-800 font-bold leading-tight">
            Productos Destacados
          </h2>
          <div class="w-16 h-1 bg-brand-green-500 rounded-full mt-1"></div>
        </div>
        <BaseButton variant="outline" to="/productos" size="md">
          Ver Todo el Catálogo
          <template #iconRight>
            <ArrowRight class="w-4 h-4" />
          </template>
        </BaseButton>
      </div>

      <!-- Grid de Productos Destacados -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div 
          v-for="(product, idx) in featuredProducts" 
          :key="product.id"
          v-motion-slide-visible-bottom
          :delay="idx * 150"
          class="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
        >
          <!-- Galería rápida del card -->
          <NuxtLink :to="`/productos/${product.slug}`" class="relative block aspect-[4/3] bg-slate-100 overflow-hidden shrink-0">
            <NuxtImg 
              :src="product.images[0] || 'https://images.unsplash.com/photo-1605600611280-146c68e3b9ef?auto=format&fit=crop&w=800&q=80'" 
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              format="webp"
            />
            <span class="absolute top-4 left-4 bg-brand-orange-500 text-white font-title text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
              Destacado
            </span>
          </NuxtLink>

          <!-- Datos del Producto -->
          <div class="p-6 flex flex-col gap-4">
            <div class="flex flex-col gap-1">
              <span class="text-xs font-semibold text-brand-green-500 uppercase tracking-widest">
                {{ product.category?.name }}
              </span>
              <h3 class="text-xl font-bold text-brand-dark-800 font-title hover:text-brand-green-600 transition-colors line-clamp-1">
                <NuxtLink :to="`/productos/${product.slug}`">{{ product.name }}</NuxtLink>
              </h3>
            </div>
            
            <p class="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-2">
              {{ product.description }}
            </p>

            <!-- Ficha Técnica Rápida -->
            <div v-if="Object.keys(product.specifications).length" class="flex flex-wrap gap-2 py-1 border-t border-slate-50 mt-1">
              <span 
                v-for="(val, key) in Object.fromEntries(Object.entries(product.specifications).slice(0, 2))" 
                :key="key"
                class="bg-slate-100 text-brand-dark-700 text-[10px] font-semibold px-2 py-1 rounded capitalize"
              >
                {{ key }}: {{ val }}
              </span>
            </div>

            <!-- Botones de Acción -->
            <div class="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 mt-1">
              <BaseButton 
                variant="outline" 
                size="sm" 
                :to="`/productos/${product.slug}`"
                class="w-full font-bold"
              >
                Ver Detalle
              </BaseButton>
              <BaseButton 
                variant="secondary" 
                size="sm" 
                :href="getWhatsAppProductUrl(product)"
                class="w-full font-bold"
              >
                Cotizar
                <template #iconRight>
                  <MessageSquare class="w-3.5 h-3.5" />
                </template>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado vacío o de carga -->
      <div v-if="featuredProducts.length === 0" class="text-center py-12 text-slate-500">
        <NuxtImg 
          src="https://images.unsplash.com/photo-1605600611280-146c68e3b9ef?auto=format&fit=crop&w=400&q=80" 
          alt="Cargando productos destacados" 
          class="w-24 h-24 object-cover rounded-full mx-auto mb-4 opacity-90 transition-opacity"
        />
        <p class="text-base font-semibold">Cargando productos destacados...</p>
      </div>
    </section>

    <!-- 6. Banner de Llamado a la Acción WhatsApp -->
    <section class="bg-gradient-to-r from-brand-green-700 to-brand-green-500 text-white py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative z-10 text-center md:text-left">
        <div class="flex flex-col gap-3">
          <span class="text-brand-orange-300 font-bold uppercase tracking-widest text-xs md:text-sm">¿Necesitas una medida especial?</span>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold font-title leading-tight max-w-xl text-white">
            Fabricamos Bolsas y Empaques Plásticos a Medida Industrial
          </h2>
        </div>
        <BaseButton 
          variant="secondary" 
          size="lg"
          :href="whatsappCorporateUrl"
          class="py-4 shadow-xl hover:shadow-2xl"
        >
          Conversar con un Asesor Técnico
          <template #iconRight>
            <MessageSquare class="w-5 h-5" />
          </template>
        </BaseButton>
      </div>
    </section>

    <!-- 7. Sección de Contacto Directo -->
    <section class="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
      <!-- Datos informativos -->
      <div v-motion-slide-visible-left class="lg:col-span-5 flex flex-col gap-8">
        <div class="flex flex-col gap-3">
          <span class="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange-500">Contacto</span>
          <h2 class="text-3xl md:text-4xl text-brand-dark-800 font-bold leading-tight">
            ¿Listo para Trabajar con Nosotros? Escríbenos Hoy Mismo
          </h2>
          <div class="w-16 h-1 bg-brand-green-500 rounded-full mt-1"></div>
        </div>
        
        <p class="text-slate-600 text-sm md:text-base leading-relaxed">
          Si requieres asesoramiento técnico sobre películas para invernadero, calibres específicos de empaques o cotizaciones volumétricas de bolsas comerciales, llena el formulario y nos contactaremos en menos de 24 horas.
        </p>

        <div class="flex flex-col gap-5">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-brand-green-50 flex items-center justify-center text-brand-green-500 shrink-0">
              <MapPin class="w-5 h-5" />
            </div>
            <div class="flex flex-col leading-relaxed">
              <span class="font-title font-bold text-sm text-brand-dark-800">Dirección</span>
              <span class="text-slate-600 text-sm">{{ companyStore.companyInfo.contact_details?.address || 'Zona Industrial, Bucaramanga, Santander, Colombia' }}</span>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-brand-green-50 flex items-center justify-center text-brand-green-500 shrink-0">
              <Phone class="w-5 h-5" />
            </div>
            <div class="flex flex-col leading-relaxed">
              <span class="font-title font-bold text-sm text-brand-dark-800">Teléfono Corporativo</span>
              <span class="text-slate-600 text-sm">{{ companyStore.companyInfo.contact_details?.phone || '(+57) 607 6351234' }}</span>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-brand-green-50 flex items-center justify-center text-brand-green-500 shrink-0">
              <Mail class="w-5 h-5" />
            </div>
            <div class="flex flex-col leading-relaxed">
              <span class="font-title font-bold text-sm text-brand-dark-800">Correo Electrónico</span>
              <span class="text-slate-600 text-sm break-all">{{ companyStore.companyInfo.contact_details?.email || 'contacto@plasticossalamanca.com' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulario interactivo -->
      <div v-motion-slide-visible-right class="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl border border-slate-100 shadow-xl">
        <h3 class="font-title font-bold text-2xl text-brand-dark-800 mb-6">Enviar Mensaje Comercial</h3>
        
        <form @submit.prevent="submitForm" class="flex flex-col gap-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="flex flex-col gap-1.5">
              <label for="name" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Nombre Completo</label>
              <input 
                id="name" 
                v-model="form.name" 
                type="text" 
                required 
                class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all"
                placeholder="Ej: Carlos Pérez"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label for="phone" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Número de Teléfono</label>
              <input 
                id="phone" 
                v-model="form.phone" 
                type="tel" 
                required 
                class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all"
                placeholder="Ej: +57 300 123 4567"
              />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="flex flex-col gap-1.5">
              <label for="email" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Correo Electrónico</label>
              <input 
                id="email" 
                v-model="form.email" 
                type="email" 
                required 
                class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all"
                placeholder="Ej: carlos@empresa.com"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label for="subject" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Asunto de Consulta</label>
              <select 
                id="subject" 
                v-model="form.subject" 
                class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all"
              >
                <option value="Cotización de Bolsas">Cotización de Bolsas</option>
                <option value="Plásticos de Invernadero">Plásticos de Invernadero</option>
                <option value="Empaques Flexibles">Empaques Flexibles</option>
                <option value="Diseño Especial a Medida">Diseño Especial a Medida</option>
                <option value="Otro Asunto">Otro Asunto</option>
              </select>
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="message" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Mensaje / Requerimientos Técnicos</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              rows="4" 
              required 
              class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all resize-none"
              placeholder="Describa el producto, cantidades, calibre y medidas que requiere..."
            ></textarea>
          </div>

          <!-- Botón de Envío -->
          <BaseButton 
            variant="primary" 
            type="submit" 
            :loading="formSending"
            class="mt-2 py-3.5"
          >
            Enviar Formulario Comercial
          </BaseButton>

          <!-- Mensaje de Éxito -->
          <div 
            v-if="formSuccess" 
            class="p-4 bg-brand-green-50 text-brand-green-800 border border-brand-green-200 rounded-xl text-sm font-semibold flex items-center gap-2"
          >
            <ShieldCheck class="w-5 h-5 text-brand-green-500" />
            ¡Formulario enviado con éxito! Nos comunicaremos con usted a la brevedad.
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useCompanyStore } from '~/stores/company'
import { useProductsStore, type Product } from '~/stores/products'
import HeroSlider from '~/components/ui/HeroSlider.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Sun, 
  Headphones, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare,
  ChevronDown
} from 'lucide-vue-next'

// Definición del SEO de la Home Page
useSeoMeta({
  title: 'Plásticos Salamanca S.A.S.',
  titleTemplate: '%s',
  description: 'Fabricación y venta de bolsas de alta resistencia, películas plásticas con protección UV para invernaderos y empaques industriales flexibles. Calidad Salamanca.',
  ogTitle: 'Plásticos Salamanca S.A.S.',
  ogDescription: 'Películas de polietileno de alta y baja densidad para el sector agrícola e industrial nacional con aditivos avanzados.',
  ogImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=1200&q=80',
  twitterCard: 'summary_large_image'
})

const companyStore = useCompanyStore()
const productsStore = useProductsStore()

const showAllCategories = ref(false)

const visibleCategories = computed(() => {
  if (showAllCategories.value) return productsStore.categories
  return productsStore.categories.slice(0, 3)
})

const formSending = ref(false)
const formSuccess = ref(false)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  subject: 'Cotización de Bolsas',
  message: ''
})

// Beneficios corporativos
const benefits = [
  {
    icon: ShieldCheck,
    title: 'Durabilidad Certificada',
    description: 'Nuestros plásticos industriales y agrícolas están fabricados para soportar condiciones climáticas y mecánicas extremas.'
  },
  {
    icon: Zap,
    title: 'Alta Resistencia Térmica',
    description: 'Polietilenos coextruidos de alta y baja densidad que garantizan la integridad de empaques de alta tracción.'
  },
  {
    icon: Sun,
    title: 'Aditivos UV Avanzados',
    description: 'Películas para invernadero formuladas con aditivos que controlan la transmisión lumínica y resisten agroquímicos.'
  },
  {
    icon: Headphones,
    title: 'Asesoramiento de Campo',
    description: 'Ingenieros especializados para asesorarte en la selección ideal de medidas, calibres y densidades plásticas.'
  }
]

// Obtener los 3 primeros productos destacados
const featuredProducts = computed(() => {
  return productsStore.products.filter(p => p.featured).slice(0, 3)
})

const whatsappCorporateUrl = computed(() => {
  const phone = companyStore.companyInfo.contact_details?.whatsapp || '+573102003040'
  const text = encodeURIComponent('Hola, me comunico desde la web de Plásticos Salamanca S.A.S. y requiero asesoría técnica para cotizar plásticos/empaques personalizados.')
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`
})

// Mensaje dinámico de WhatsApp para producto
function getWhatsAppProductUrl(product: Product) {
  const phone = companyStore.companyInfo.contact_details?.whatsapp || '+573102003040'
  const text = encodeURIComponent(`Hola, vengo desde la página web y me interesa:\nProducto: ${product.name}\nCantidad: 1\n¿Me podrían brindar más información?`)
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`
}

async function submitForm() {
  formSending.value = true
  // Simular envío de correo o API en Nuxt
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  formSending.value = false
  formSuccess.value = true
  
  // Limpiar campos del formulario
  form.name = ''
  form.phone = ''
  form.email = ''
  form.message = ''
  
  setTimeout(() => {
    formSuccess.value = false
  }, 5000)
}

// Imagen de fallback premium basada en el nombre/slug de la categoría
function getCategoryFallbackImage(category: any) {
  if (category.image_url && category.image_url.trim() !== '') {
    return category.image_url
  }
  return getUnsplashFallback(category.slug || '')
}

// Manejador de error para cargar el fallback en caso de URLs rotas (404, etc.)
function handleImageError(event: any, category: any) {
  const imgElement = event?.target as HTMLImageElement
  if (imgElement) {
    imgElement.src = getUnsplashFallback(category.slug || '')
  }
}

// Retorna una imagen premium de Unsplash acorde al tipo de línea plástica
function getUnsplashFallback(slug: string): string {
  const s = slug.toLowerCase()
  if (s.includes('agri') || s.includes('inver') || s.includes('campo') || s.includes('culti')) {
    // Línea Agrícola / Invernaderos
    return 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80'
  } else if (s.includes('comerc') || s.includes('bolsa') || s.includes('venta') || s.includes('tienda')) {
    // Línea Comercial / Bolsas
    return 'https://images.unsplash.com/photo-1605600611280-146c68e3b9ef?auto=format&fit=crop&w=800&q=80'
  } else if (s.includes('hosp') || s.includes('salud') || s.includes('medic') || s.includes('clini')) {
    // Línea Hospitalaria / Residuos de salud
    return 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
  } else {
    // Fallback general: Empaques / Industrial
    return 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=800&q=80'
  }
}

onMounted(async () => {
  if (productsStore.categories.length === 0) {
    await productsStore.fetchCategories()
  }
  // Cargar productos en la home
  await productsStore.fetchProducts()
})
</script>
