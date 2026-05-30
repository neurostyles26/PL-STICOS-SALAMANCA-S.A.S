<template>
  <div class="bg-slate-50 min-h-screen pb-20">
    <!-- 1. Hero Header del Blog -->
    <section class="relative bg-brand-dark-950 text-white py-16 md:py-24 overflow-hidden select-none">
      <!-- Elementos Abstractos de Diseño -->
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#e06b26_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-brand-green-500 rounded-full blur-[120px] opacity-25"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-orange-500 rounded-full blur-[120px] opacity-20"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center flex flex-col items-center gap-6">
        <h1 class="font-title font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight max-w-3xl leading-tight">
          Blog de Soluciones <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-green-400 to-brand-orange-400">Plásticas</span>
        </h1>
        <p class="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
          Artículos especializados, consejos de aplicación y las últimas tendencias en plásticos agrícolas, empaques industriales y sostenibilidad.
        </p>

        <!-- Buscador Dinámico en el Hero (Diseño Premium) -->
        <div class="w-full max-w-xl mt-6 flex bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-xl focus-within:border-brand-green-500/40 focus-within:ring-1 focus-within:ring-brand-green-500/30 transition-all duration-300">
          <div class="flex items-center pl-3 flex-grow gap-2">
            <Search class="w-5 h-5 text-slate-400" />
            <input 
              v-model="searchQuery"
              @input="handleSearch"
              type="text" 
              placeholder="Buscar artículos por título o palabra clave..." 
              class="w-full bg-transparent border-none outline-none text-white text-sm placeholder-slate-400"
            />
          </div>
          <BaseButton 
            v-if="searchQuery" 
            variant="outline" 
            size="sm"
            class="!text-white !border-white/10 hover:!bg-white/10 !py-2 !px-3"
            @click="clearSearch"
          >
            Limpiar
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- 2. Filtros de Categorías -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-12">
      <div class="flex flex-wrap gap-2.5 justify-center">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectCategory(cat)"
          class="px-5 py-2 rounded-xl text-xs font-bold font-title uppercase tracking-wider transition-all duration-300 select-none"
          :class="[
            selectedCategory === cat 
              ? 'bg-brand-green-500 text-white shadow-md shadow-brand-green-100 scale-102' 
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60 shadow-sm'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- 3. Listado Principal de Contenidos -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-12">
      <!-- Loader State -->
      <div v-if="blogStore.loading" class="flex flex-col items-center justify-center py-20 gap-4">
        <div class="w-10 h-10 border-4 border-brand-green-500 border-t-transparent rounded-full animate-spin"></div>
        <span class="text-sm font-semibold text-slate-500">Cargando publicaciones...</span>
      </div>

      <!-- Vacio State -->
      <div v-else-if="blogStore.posts.length === 0" class="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-xl mx-auto shadow-sm flex flex-col items-center gap-4">
        <div class="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
          <BookOpen class="w-8 h-8" />
        </div>
        <h3 class="font-title font-bold text-lg text-brand-dark-800">No se encontraron artículos</h3>
        <p class="text-xs text-slate-500 leading-normal">
          No encontramos ninguna publicación que coincida con la búsqueda o el filtro seleccionado en este momento. Intente con otros criterios.
        </p>
        <BaseButton variant="outline" size="sm" @click="resetFilters" class="mt-2">
          Ver Todo el Contenido
        </BaseButton>
      </div>

      <!-- Grid de Artículos -->
      <div v-else class="flex flex-col gap-12">
        <!-- 3a. Artículo Destacado Principal (Solo si no hay filtro/búsqueda activa y hay posts disponibles) -->
        <div 
          v-if="featuredPost && !searchQuery && selectedCategory === 'Todos'" 
          class="bg-white rounded-3xl border border-slate-150 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group grid grid-cols-1 lg:grid-cols-12 gap-0"
        >
          <!-- Imagen Destacada -->
          <NuxtLink 
            :to="`/blog/${featuredPost.slug}`" 
            class="lg:col-span-7 aspect-[16/9] lg:aspect-auto bg-slate-50 relative overflow-hidden block"
          >
            <NuxtImg 
              :src="featuredPost.image_url || 'https://images.unsplash.com/photo-1605600611280-146c68e3b9ef?auto=format&fit=crop&w=1200&q=80'" 
              :alt="featuredPost.title"
              class="w-full h-full object-cover group-hover:scale-101 transition-transform duration-700"
              format="webp"
            />
            <span class="absolute top-6 left-6 bg-brand-orange-500 text-white font-title text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-md shadow-sm">
              Destacado
            </span>
          </NuxtLink>

          <!-- Texto Destacado -->
          <div class="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center gap-6">
            <div class="flex items-center gap-3 text-xs text-slate-500 font-semibold">
              <span class="text-brand-green-600 uppercase font-bold tracking-widest bg-brand-green-50 px-2.5 py-0.5 rounded">
                {{ featuredPost.category }}
              </span>
              <span>•</span>
              <span class="flex items-center gap-1">
                <Calendar class="w-3.5 h-3.5" />
                {{ formatDate(featuredPost.published_at || featuredPost.created_at) }}
              </span>
            </div>
            
            <h2 class="font-title font-extrabold text-2xl md:text-3xl text-brand-dark-800 hover:text-brand-green-600 transition-colors leading-tight">
              <NuxtLink :to="`/blog/${featuredPost.slug}`">
                {{ featuredPost.title }}
              </NuxtLink>
            </h2>

            <p class="text-slate-600 text-sm md:text-base leading-relaxed line-clamp-3">
              {{ featuredPost.excerpt }}
            </p>

            <div class="flex items-center justify-between border-t border-slate-100 pt-6 mt-2">
              <span class="text-xs text-slate-500 font-medium">Por: {{ featuredPost.author }}</span>
              <NuxtLink 
                :to="`/blog/${featuredPost.slug}`" 
                class="font-title font-bold text-xs text-brand-green-600 hover:text-brand-green-700 flex items-center gap-1.5 transition-all group/btn"
              >
                Leer Artículo
                <ArrowRight class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- 3b. Resto de Artículos en Grilla Grid -->
        <div>
          <h3 
            v-if="featuredPost && !searchQuery && selectedCategory === 'Todos'"
            class="font-title font-extrabold text-xl text-brand-dark-800 mb-8 border-b border-slate-200 pb-3"
          >
            Últimas Publicaciones
          </h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <article 
              v-for="post in gridPosts" 
              :key="post.id"
              class="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
            >
              <!-- Imagen de la tarjeta -->
              <NuxtLink :to="`/blog/${post.slug}`" class="relative block aspect-[4/3] bg-slate-50 border-b border-slate-100 overflow-hidden shrink-0">
                <NuxtImg 
                  :src="post.image_url || 'https://images.unsplash.com/photo-1605600611280-146c68e3b9ef?auto=format&fit=crop&w=800&q=80'" 
                  :alt="post.title"
                  class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  format="webp"
                  loading="lazy"
                />
                <span class="absolute top-4 left-4 bg-brand-green-500 text-white font-title text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded shadow-sm">
                  {{ post.category }}
                </span>
              </NuxtLink>

              <!-- Detalles de la tarjeta -->
              <div class="p-6 flex flex-col justify-between flex-grow gap-4">
                <div class="flex flex-col gap-2.5">
                  <!-- Fecha -->
                  <div class="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold">
                    <Calendar class="w-3.5 h-3.5" />
                    <span>{{ formatDate(post.published_at || post.created_at) }}</span>
                  </div>
                  
                  <!-- Título -->
                  <h4 class="text-base font-bold text-brand-dark-800 font-title hover:text-brand-green-600 transition-colors line-clamp-2 leading-snug">
                    <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
                  </h4>

                  <!-- Extracto -->
                  <p class="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {{ post.excerpt }}
                  </p>
                </div>

                <!-- Footer de tarjeta -->
                <div class="border-t border-slate-50 pt-4 flex items-center justify-between">
                  <span class="text-[10px] text-slate-400 truncate max-w-[120px]">Por: {{ post.author }}</span>
                  <NuxtLink 
                    :to="`/blog/${post.slug}`" 
                    class="font-title font-bold text-[11px] text-brand-green-600 hover:text-brand-green-700 flex items-center gap-1.5 transition-all group/item"
                  >
                    Leer Más
                    <ArrowRight class="w-3.5 h-3.5 group-hover/item:translate-x-0.5 transition-transform" />
                  </NuxtLink>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBlogStore } from '~/stores/blog'
import BaseButton from '~/components/ui/BaseButton.vue'
import { Search, Calendar, BookOpen, ArrowRight } from 'lucide-vue-next'
import { useSeoMeta } from '#imports'

// Meta SEO dinámico profesional
useSeoMeta({
  title: 'Blog Técnico Agrícola e Industrial - Plásticos Salamanca S.A.S.',
  metaDescription: 'Descubre guías, novedades y consejos técnicos sobre plásticos para invernaderos de alto rendimiento, empaques flexibles y economía circular industrial.',
  ogTitle: 'Blog de Soluciones Plásticas - Plásticos Salamanca S.A.S.',
  ogDescription: 'Artículos y guías de ingeniería sobre cubiertas plásticas, bolsas comerciales y empaques industriales con sello sostenible.',
  ogType: 'website'
})

const blogStore = useBlogStore()
const searchQuery = ref('')
const selectedCategory = ref('Todos')

const categories = ['Todos', 'Agricultura', 'Industria', 'Sostenibilidad', 'General']

// Obtener datos iniciales al montar
onMounted(async () => {
  await blogStore.fetchPosts()
})

// Acciones de búsqueda y filtros
async function loadPosts() {
  await blogStore.fetchPosts({
    query: searchQuery.value.trim(),
    category: selectedCategory.value
  })
}

function handleSearch() {
  // Búsqueda en vivo
  loadPosts()
}

function clearSearch() {
  searchQuery.value = ''
  loadPosts()
}

function selectCategory(category: string) {
  selectedCategory.value = category
  loadPosts()
}

function resetFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'Todos'
  loadPosts()
}

// Clasificación de Post Destacado vs Grilla
const featuredPost = computed(() => {
  return blogStore.posts[0] || null
})

const gridPosts = computed(() => {
  // Si no hay filtros, el primer artículo va como destacado, el resto a la grilla
  if (!searchQuery.value && selectedCategory.value === 'Todos') {
    return blogStore.posts.slice(1)
  }
  return blogStore.posts
})

// Formateador de Fecha Local en Español
function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>
