<template>
  <div class="bg-slate-50 min-h-screen py-10">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <!-- 1. Breadcrumbs de Navegación -->
      <nav class="flex text-xs md:text-sm font-semibold text-slate-500 mb-8 items-center gap-2">
        <NuxtLink to="/" class="hover:text-brand-green-500 transition-colors">Inicio</NuxtLink>
        <ChevronRight class="w-3.5 h-3.5 text-slate-400" />
        <NuxtLink to="/productos" class="hover:text-brand-green-500 transition-colors">Productos</NuxtLink>
        <ChevronRight class="w-3.5 h-3.5 text-slate-400" />
        <span class="text-brand-dark-800 line-clamp-1">{{ product?.name || 'Cargando...' }}</span>
      </nav>

      <!-- Estado de Carga -->
      <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm animate-pulse">
        <div class="lg:col-span-6 flex flex-col gap-4">
          <div class="w-full aspect-[4/3] bg-slate-200 rounded-xl"></div>
          <div class="flex gap-4">
            <div v-for="n in 3" :key="n" class="w-20 h-20 bg-slate-200 rounded-lg"></div>
          </div>
        </div>
        <div class="lg:col-span-6 flex flex-col gap-6">
          <div class="h-4 w-20 bg-slate-200 rounded"></div>
          <div class="h-8 w-3/4 bg-slate-200 rounded"></div>
          <div class="h-20 w-full bg-slate-200 rounded"></div>
          <div class="h-12 w-48 bg-slate-200 rounded-lg"></div>
        </div>
      </div>

      <!-- Detalle de Producto -->
      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-xl items-start">
        <!-- Columna Izquierda: Galería de Imágenes Interactiva -->
        <div class="lg:col-span-6 flex flex-col gap-4">
          <!-- Contenedor Principal de Imagen -->
          <div class="relative aspect-[4/3] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-inner group">
            <NuxtImg 
              :src="activeImage || 'https://images.unsplash.com/photo-1605600611280-146c68e3b9ef?auto=format&fit=crop&w=800&q=80'" 
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              format="webp"
              loading="eager"
            />
          </div>

          <!-- Carrusel de Miniaturas -->
          <div v-if="product.images && product.images.length > 1" class="flex flex-wrap gap-3">
            <button 
              v-for="(img, idx) in product.images" 
              :key="idx"
              @click="setActiveImage(img)"
              class="w-20 h-20 rounded-lg border-2 overflow-hidden transition-all bg-slate-50"
              :class="[activeImage === img ? 'border-brand-green-500 shadow-md shadow-brand-green-100' : 'border-slate-100 hover:border-slate-300']"
            >
              <NuxtImg :src="img" :alt="`${product.name} miniatura ${idx + 1}`" class="w-full h-full object-cover" format="webp" />
            </button>
          </div>
        </div>

        <!-- Columna Derecha: Detalles, Especificaciones y Widget de Cotización -->
        <div class="lg:col-span-6 flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-semibold text-brand-green-500 uppercase tracking-widest bg-brand-green-50/60 px-3 py-1 rounded-md border border-brand-green-100/50 self-start">
              {{ product.category?.name }}
            </span>
            <h1 class="text-3xl md:text-4xl text-brand-dark-800 font-extrabold font-title tracking-tight leading-tight">
              {{ product.name }}
            </h1>
          </div>

          <!-- Descripción del Producto -->
          <p class="text-slate-600 leading-relaxed text-sm md:text-base">
            {{ product.description }}
          </p>

          <!-- Ficha Técnica / Especificaciones Corporativas -->
          <div v-if="Object.keys(product.specifications).length" class="flex flex-col gap-3">
            <h3 class="font-title font-bold text-base text-brand-dark-800 border-b border-slate-100 pb-2">
              Especificaciones Técnicas
            </h3>
            <div class="border border-slate-200/60 rounded-xl overflow-hidden bg-slate-50 shadow-inner">
              <table class="w-full text-sm text-left border-collapse">
                <tbody>
                  <tr 
                    v-for="(val, key) in product.specifications" 
                    :key="key"
                    class="border-b border-slate-200/60 last:border-0 hover:bg-slate-100/50 transition-colors"
                  >
                    <td class="px-5 py-3.5 font-semibold text-brand-dark-700 capitalize w-1/3 bg-slate-100/30">
                      {{ key }}
                    </td>
                    <td class="px-5 py-3.5 text-slate-600">
                      {{ val }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Widget de Cotización Dinámico por WhatsApp -->
          <div class="p-6 bg-slate-50 rounded-2xl border border-slate-150 flex flex-col gap-5">
            <div class="flex justify-between items-center">
              <span class="font-title font-bold text-sm text-brand-dark-800 uppercase tracking-wide">Cantidad Requerida</span>
              
              <!-- Selector de Cantidad en Números -->
              <div class="flex items-center gap-1.5 border border-slate-200 bg-white rounded-lg overflow-hidden shrink-0">
                <button 
                  @click="decreaseQuantity" 
                  class="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-50 font-bold active:scale-90"
                  aria-label="Disminuir cantidad"
                >
                  -
                </button>
                <input 
                  v-model.number="quantity" 
                  type="number" 
                  min="1" 
                  class="w-12 text-center text-sm font-semibold text-brand-dark-800 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button 
                  @click="increaseQuantity" 
                  class="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-50 font-bold active:scale-90"
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Botón WhatsApp Dinámico -->
            <BaseButton 
              variant="secondary" 
              size="lg"
              :href="whatsappProductUrl"
              class="w-full shadow-lg"
            >
              Cotizar este Producto
              <template #iconRight>
                <MessageSquare class="w-5 h-5" />
              </template>
            </BaseButton>
            <p class="text-[11px] text-slate-500 text-center leading-relaxed">
              *Haga clic para abrir WhatsApp con los detalles de cantidad e iniciar su cotización.
            </p>
          </div>
        </div>
      </div>

      <!-- Error de Carga -->
      <div v-else class="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-md">
        <NuxtImg 
          src="https://images.unsplash.com/photo-1605600611280-146c68e3b9ef?auto=format&fit=crop&w=400&q=80" 
          alt="Producto no encontrado" 
          class="w-24 h-24 object-cover rounded-full mx-auto mb-4 grayscale opacity-45"
        />
        <h2 class="text-2xl font-bold text-brand-dark-800 mb-2">Producto no encontrado</h2>
        <p class="text-slate-500 text-sm max-w-md mx-auto mb-6">
          El enlace al producto que está intentando acceder no existe o ha sido descontinuado por la empresa.
        </p>
        <BaseButton variant="primary" to="/productos">
          Volver al Catálogo
        </BaseButton>
      </div>

      <!-- 3. Productos Relacionados -->
      <section v-if="relatedProducts.length > 0" class="mt-20">
        <h3 class="font-title font-extrabold text-2xl text-brand-dark-800 mb-8 border-b border-slate-200 pb-3">
          Productos Relacionados
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="rel in relatedProducts" 
            :key="rel.id"
            class="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
          >
            <NuxtLink :to="`/productos/${rel.slug}`" class="relative block aspect-[4/3] bg-slate-100 overflow-hidden shrink-0">
              <NuxtImg 
                :src="rel.images[0] || 'https://images.unsplash.com/photo-1605600611280-146c68e3b9ef?auto=format&fit=crop&w=800&q=80'" 
                :alt="rel.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                format="webp"
              />
            </NuxtLink>
            <div class="p-6 flex flex-col justify-between flex-grow gap-4">
              <div class="flex flex-col gap-1.5">
                <span class="text-xs font-semibold text-brand-green-500 uppercase tracking-widest">
                  {{ rel.category?.name }}
                </span>
                <h4 class="text-lg font-bold text-brand-dark-800 font-title hover:text-brand-green-600 transition-colors line-clamp-1">
                  <NuxtLink :to="`/productos/${rel.slug}`">{{ rel.name }}</NuxtLink>
                </h4>
              </div>
              <BaseButton variant="outline" size="sm" :to="`/productos/${rel.slug}`" class="w-full">
                Ver Detalles
              </BaseButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCompanyStore } from '~/stores/company'
import { useProductsStore, type Product } from '~/stores/products'
import BaseButton from '~/components/ui/BaseButton.vue'
import { ChevronRight, MessageSquare } from 'lucide-vue-next'

const route = useRoute()
const companyStore = useCompanyStore()
const productsStore = useProductsStore()

const product = ref<Product | null>(null)
const loading = ref(true)
const activeImage = ref('')
const quantity = ref(1)

// Cargar producto dinámicamente según el slug de la ruta
async function loadProductData() {
  loading.value = true
  const slug = route.params.slug as string
  const data = await productsStore.fetchProductBySlug(slug)
  product.value = data
  
  if (data) {
    activeImage.value = data.images[0] || ''
    
    // Inyectar SEO dinámico
    useSeoMeta({
      title: data.name,
      description: data.description,
      ogTitle: `${data.name} - Plásticos Salamanca S.A.S.`,
      ogDescription: data.description,
      ogImage: data.images[0] || 'https://images.unsplash.com/photo-1605600611280-146c68e3b9ef?auto=format&fit=crop&w=800&q=80',
      twitterCard: 'summary_large_image'
    })
  }
  loading.value = false
}

// Escuchar cambios de ruta por si el usuario navega a un relacionado
watch(() => route.params.slug, loadProductData)

function setActiveImage(img: string) {
  activeImage.value = img
}

function increaseQuantity() {
  quantity.value++
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// Productos relacionados (misma categoría, excluyendo el actual)
const relatedProducts = computed(() => {
  if (!product.value) return []
  return productsStore.products
    .filter(p => p.category_id === product.value?.category_id && p.id !== product.value?.id)
    .slice(0, 3)
})

// WhatsApp dinámico con mensaje estructurado exacto según especificación
const whatsappProductUrl = computed(() => {
  if (!product.value) return '#'
  const phone = companyStore.companyInfo.contact_details?.whatsapp || '+573102003040'
  const text = encodeURIComponent(
    `Hola, vengo desde la página web y me interesa:\n` +
    `Producto: ${product.value.name}\n` +
    `Cantidad: ${quantity.value}\n\n` +
    `¿Me podrían brindar más información?`
  )
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`
})

onMounted(async () => {
  await loadProductData()
  // Si los productos de la tienda general no se han cargado, cargarlos en background para relacionados
  if (productsStore.products.length === 0) {
    await productsStore.fetchProducts()
  }
})
</script>
