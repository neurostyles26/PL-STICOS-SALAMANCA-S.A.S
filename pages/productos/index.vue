<template>
  <div class="bg-slate-50 min-h-screen">
    <!-- 1. Banner de Cabecera -->
    <section class="relative bg-brand-dark-950 text-white py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12 overflow-hidden border-b border-brand-dark-900">
      <div class="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div class="flex flex-col gap-3 text-center md:text-left">
          <span class="text-xs font-bold uppercase tracking-[0.3em] text-brand-orange-400">Portafolio</span>
          <h1 class="text-2xl sm:text-3xl md:text-5xl text-white font-extrabold tracking-tight font-title">
            Catálogo de Soluciones Plásticas
          </h1>
          <div class="w-16 h-1 bg-brand-green-500 rounded-full mx-auto md:mx-0 mt-1"></div>
        </div>
        
        <!-- Buscador Reactivo Integrado en Cabecera -->
        <div class="w-full md:w-96 relative shadow-lg rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Buscar productos..."
            class="w-full pl-12 pr-4 py-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
            @input="handleSearch"
          />
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        </div>
      </div>
    </section>

    <!-- 2. Filtros de Categorías y Grid de Productos -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
      <!-- Barra lateral de Filtros (Escritorio) -->
      <aside class="lg:col-span-3 flex flex-col gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-28">
        <h3 class="font-title font-bold text-lg text-brand-dark-800 border-b border-slate-100 pb-3 flex items-center gap-2">
          <SlidersHorizontal class="w-5 h-5 text-brand-orange-500" />
          Filtrar por Categoría
        </h3>
        
        <div class="flex flex-col gap-2 font-title font-semibold text-sm">
          <!-- Opción "Todos los productos" -->
          <button 
            @click="selectCategory(null)"
            class="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group"
            :class="[selectedCategorySlug === null ? 'bg-brand-green-500 text-white shadow-md shadow-brand-green-150' : 'text-brand-dark-700 hover:bg-slate-50 hover:text-brand-green-500']"
          >
            <span>Todos los Productos</span>
            <span 
              class="text-xs px-2.5 py-0.5 rounded-full"
              :class="[selectedCategorySlug === null ? 'bg-brand-green-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-brand-green-50 group-hover:text-brand-green-500']"
            >
              {{ productsStore.products.length }}
            </span>
          </button>

          <!-- Categorías Dinámicas -->
          <button 
            v-for="cat in productsStore.categories"
            :key="cat.id"
            @click="selectCategory(cat.slug)"
            class="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group"
            :class="[selectedCategorySlug === cat.slug ? 'bg-brand-green-500 text-white shadow-md shadow-brand-green-150' : 'text-brand-dark-700 hover:bg-slate-50 hover:text-brand-green-500']"
          >
            <span>{{ cat.name }}</span>
            <span 
              class="text-xs px-2.5 py-0.5 rounded-full"
              :class="[selectedCategorySlug === cat.slug ? 'bg-brand-green-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-brand-green-50 group-hover:text-brand-green-500']"
            >
              {{ getCategoryProductCount(cat.id) }}
            </span>
          </button>
        </div>
      </aside>

      <!-- Grid de Productos Principal -->
      <main class="lg:col-span-9 flex flex-col gap-8">
        <!-- Encabezado de Resultados -->
        <div class="flex justify-between items-center bg-white py-4 px-6 rounded-2xl border border-slate-100 shadow-sm text-sm text-slate-500">
          <span>Mostrando <strong class="text-brand-dark-800">{{ filteredProducts.length }}</strong> productos en catálogo</span>
          <span v-if="selectedCategoryName" class="font-semibold text-brand-green-500">Filtro: {{ selectedCategoryName }}</span>
        </div>

        <!-- Grid de Productos -->
        <div v-if="!productsStore.loading && filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(product, index) in filteredProducts" 
            :key="product.id"
            v-motion-slide-visible-bottom
            :delay="index * 80"
            class="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
          >
            <!-- Imagen del Producto -->
            <NuxtLink :to="`/productos/${product.slug}`" class="relative block aspect-[4/3] bg-slate-50 border-b border-slate-100 overflow-hidden shrink-0">
              <NuxtImg 
                :src="product.images[0] || 'https://images.unsplash.com/photo-1605600611280-146c68e3b9ef?auto=format&fit=crop&w=800&q=80'" 
                :alt="product.name"
                class="w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                format="webp"
                loading="lazy"
              />
              <!-- Tag de Destacado -->
              <span v-if="product.featured" class="absolute top-4 left-4 bg-brand-orange-500 text-white font-title text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded shadow-sm">
                Destacado
              </span>
            </NuxtLink>

            <!-- Detalles del Producto -->
            <div class="p-6 flex flex-col justify-between flex-grow gap-4">
              <div class="flex flex-col gap-2">
                <span class="text-xs font-semibold text-brand-green-500 uppercase tracking-widest leading-none">
                  {{ product.category?.name }}
                </span>
                <h3 class="text-xl font-bold text-brand-dark-800 font-title hover:text-brand-green-600 transition-colors line-clamp-1 leading-tight">
                  <NuxtLink :to="`/productos/${product.slug}`">{{ product.name }}</NuxtLink>
                </h3>
                <p class="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-2">
                  {{ product.description }}
                </p>
              </div>

              <div class="flex flex-col gap-4">
                <!-- Ficha Técnica Rápida -->
                <div v-if="Object.keys(product.specifications).length" class="flex flex-wrap gap-1.5 pt-2 border-t border-slate-50">
                  <span 
                    v-for="(val, key) in Object.fromEntries(Object.entries(product.specifications).slice(0, 2))" 
                    :key="key"
                    class="bg-slate-100 text-brand-dark-700 text-[10px] font-semibold px-2 py-0.5 rounded capitalize"
                  >
                    {{ key }}: {{ val }}
                  </span>
                </div>

                <!-- Botones de Acción -->
                <div class="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                  <BaseButton 
                    variant="outline" 
                    size="sm" 
                    :to="`/productos/${product.slug}`"
                    class="w-full font-bold py-2.5 text-xs md:text-sm"
                  >
                    Detalle
                  </BaseButton>
                  <BaseButton 
                    variant="secondary" 
                    size="sm" 
                    :href="getWhatsAppProductUrl(product)"
                    class="w-full font-bold py-2.5 text-xs md:text-sm"
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
        </div>

        <!-- Estado de carga -->
        <div v-else-if="productsStore.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="n in 6" :key="n" class="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm h-96 animate-pulse flex flex-col">
            <div class="w-full aspect-[4/3] bg-slate-200"></div>
            <div class="p-6 flex-grow flex flex-col gap-4">
              <div class="h-3 w-16 bg-slate-200 rounded"></div>
              <div class="h-6 w-3/4 bg-slate-200 rounded"></div>
              <div class="h-4 w-full bg-slate-200 rounded"></div>
              <div class="mt-auto grid grid-cols-2 gap-3">
                <div class="h-9 bg-slate-200 rounded-lg"></div>
                <div class="h-9 bg-slate-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sin resultados -->
        <div v-else class="text-center py-24 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-4">
          <NuxtImg 
            src="https://images.unsplash.com/photo-1605600611280-146c68e3b9ef?auto=format&fit=crop&w=300&q=80" 
            alt="Sin resultados en catálogo"
            class="w-32 h-32 object-cover rounded-full opacity-90 mb-2"
          />
          <h3 class="font-title font-bold text-xl text-brand-dark-800">No se encontraron productos</h3>
          <p class="text-slate-500 text-sm max-w-sm">
            Intente cambiar los filtros o busque utilizando otros términos de búsqueda de material.
          </p>
          <BaseButton variant="primary" @click="resetFilters" size="sm" class="mt-2">
            Restablecer Filtros
          </BaseButton>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCompanyStore } from '~/stores/company'
import { useProductsStore, type Product } from '~/stores/products'
import BaseButton from '~/components/ui/BaseButton.vue'
import { Search, SlidersHorizontal, MessageSquare } from 'lucide-vue-next'

useSeoMeta({
  title: 'Catálogo de Productos',
  description: 'Descubra nuestra amplia gama de bolsas plásticas, plásticos técnicos para invernaderos y películas de empaque flexible de alta densidad.',
  ogTitle: 'Catálogo de Soluciones Plásticas - Plásticos Salamanca S.A.S.',
  ogDescription: 'Explora nuestro catálogo industrial y cotiza directo por WhatsApp con asesoramiento especializado.',
  ogImage: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=1200&q=80',
  twitterCard: 'summary_large_image'
})

const route = useRoute()
const router = useRouter()
const companyStore = useCompanyStore()
const productsStore = useProductsStore()

const searchQuery = ref('')
const selectedCategorySlug = ref<string | null>(null)

// Sincronizar filtros con query strings de la URL
watch(
  () => route.query.categoria,
  (newVal) => {
    selectedCategorySlug.value = (newVal as string) || null
  },
  { immediate: true }
)

watch(
  () => route.query.buscar,
  (newVal) => {
    searchQuery.value = (newVal as string) || ''
  },
  { immediate: true }
)

// Obtener nombre de la categoría seleccionada para el filtro
const selectedCategoryName = computed(() => {
  if (!selectedCategorySlug.value) return null
  const cat = productsStore.categories.find(c => c.slug === selectedCategorySlug.value)
  return cat ? cat.name : null
})

// Filtrar productos reactivamente por slug de categoría y búsqueda textual
const filteredProducts = computed(() => {
  let list = productsStore.products

  // Filtrar por categoría
  if (selectedCategorySlug.value) {
    list = list.filter(p => p.category?.slug === selectedCategorySlug.value)
  }

  // Filtrar por búsqueda de texto
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(
      p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category?.name.toLowerCase().includes(q)
    )
  }

  return list
})

// Obtener cantidad de productos en una categoría
function getCategoryProductCount(categoryId: string) {
  return productsStore.products.filter(p => p.category_id === categoryId).length
}

// Cambiar filtro de categoría
function selectCategory(slug: string | null) {
  selectedCategorySlug.value = slug
  updateUrlParams()
}

// Búsqueda interactiva
function handleSearch() {
  updateUrlParams()
}

// Restablecer todos los filtros
function resetFilters() {
  selectedCategorySlug.value = null
  searchQuery.value = ''
  updateUrlParams()
}

// Actualizar parámetros de URL
function updateUrlParams() {
  const query: Record<string, string | null> = {}
  if (selectedCategorySlug.value) query.categoria = selectedCategorySlug.value
  if (searchQuery.value) query.buscar = searchQuery.value
  
  router.push({ path: route.path, query })
}

// Mensaje dinámico de WhatsApp por producto
function getWhatsAppProductUrl(product: Product) {
  const phone = companyStore.companyInfo.contact_details?.whatsapp || '+573102003040'
  const text = encodeURIComponent(`Hola, vengo desde la página web y me interesa:\nProducto: ${product.name}\nCantidad: 1\n¿Me podrían brindar más información?`)
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`
}

onMounted(async () => {
  if (productsStore.categories.length === 0) {
    await productsStore.fetchCategories()
  }
  // Cargar todos los productos (se filtran del lado del cliente para máxima reactividad y velocidad)
  await productsStore.fetchProducts()
})
</script>
