<template>
  <div class="bg-slate-50 min-h-screen pb-24">
    <!-- Loader State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-40 gap-4">
      <div class="w-10 h-10 border-4 border-brand-green-500 border-t-transparent rounded-full animate-spin"></div>
      <span class="text-sm font-semibold text-slate-500">Cargando artículo...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !post" class="max-w-xl mx-auto px-4 py-20 text-center flex flex-col items-center gap-5">
      <div class="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center">
        <AlertCircle class="w-8 h-8" />
      </div>
      <h2 class="font-title font-extrabold text-2xl text-brand-dark-800">Artículo no encontrado</h2>
      <p class="text-slate-500 text-sm leading-relaxed">
        El artículo al que intenta acceder no existe, ha sido modificado o desactivado de manera temporal.
      </p>
      <BaseButton variant="primary" size="md" to="/blog">
        Regresar al Blog
      </BaseButton>
    </div>

    <!-- Contenido del Artículo -->
    <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-8">
      <!-- 1. Enlace de Regreso -->
      <NuxtLink 
        to="/blog" 
        class="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-green-600 transition-colors uppercase tracking-wider mb-8 group select-none"
      >
        <ArrowLeft class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Volver al Blog
      </NuxtLink>

      <article class="bg-white rounded-3xl border border-slate-150 overflow-hidden shadow-sm">
        <!-- 2. Portada del Artículo (Responsive) -->
        <div class="relative aspect-[21/9] w-full bg-slate-100 overflow-hidden border-b border-slate-100">
          <NuxtImg 
            :src="post.image_url || 'https://images.unsplash.com/photo-1605600611280-146c68e3b9ef?auto=format&fit=crop&w=1200&q=80'" 
            :alt="post.title"
            class="w-full h-full object-cover"
            format="webp"
            loading="eager"
          />
          <div class="absolute top-6 left-6 flex gap-2">
            <span class="bg-brand-green-500 text-white font-title text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-md shadow-md">
              {{ post.category }}
            </span>
          </div>
        </div>

        <!-- 3. Encabezado e Info del Post -->
        <div class="p-8 md:p-12 border-b border-slate-100 flex flex-col gap-6">
          <h1 class="font-title font-extrabold text-3xl sm:text-4xl md:text-5xl text-brand-dark-800 leading-tight">
            {{ post.title }}
          </h1>

          <!-- Meta información -->
          <div class="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-500 font-semibold border-t border-b border-slate-50 py-3.5">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full bg-brand-green-50 text-brand-green-600 font-bold flex items-center justify-center text-[10px] uppercase border border-brand-green-200">
                {{ post.author.substring(0, 2).toUpperCase() }}
              </div>
              <span>Por: {{ post.author }}</span>
            </div>
            
            <span class="hidden sm:inline text-slate-300">|</span>

            <div class="flex items-center gap-1.5">
              <Calendar class="w-4 h-4 text-brand-orange-500" />
              <span>Publicado: {{ formatDate(post.published_at || post.created_at) }}</span>
            </div>

            <span class="hidden sm:inline text-slate-300">|</span>

            <!-- Compartir Rápido -->
            <div class="flex items-center gap-3">
              <span class="text-slate-400 font-medium">Compartir:</span>
              <a 
                :href="whatsappShareUrl"
                target="_blank"
                class="w-7 h-7 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-full flex items-center justify-center transition-colors shadow-sm"
                title="Compartir en WhatsApp"
              >
                <MessageSquare class="w-4 h-4 fill-current" />
              </a>
              <a 
                :href="facebookShareUrl"
                target="_blank"
                class="w-7 h-7 bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white rounded-full flex items-center justify-center transition-colors shadow-sm"
                title="Compartir en Facebook"
              >
                <Facebook class="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>
        </div>

        <!-- 4. Cuerpo de Texto del Artículo (Tailwind Custom Typography) -->
        <div 
          class="p-8 md:p-12 blog-content prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm md:text-base flex flex-col gap-6"
          v-html="post.content"
        ></div>
      </article>

      <!-- 5. Tarjeta de Llamado a la Acción (CTA) Altamente Profesional -->
      <section class="mt-12 bg-gradient-to-br from-brand-dark-900 to-brand-dark-950 text-white rounded-3xl p-8 md:p-12 border border-brand-dark-850 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <!-- Elemento de Fondo -->
        <div class="absolute -right-20 -bottom-20 w-60 h-60 bg-brand-green-500 rounded-full blur-[100px] opacity-25 pointer-events-none"></div>

        <div class="flex flex-col gap-3 max-w-xl relative z-10">
          <span class="text-brand-orange-400 font-title text-xs font-bold uppercase tracking-wider">
            Soluciones Industriales & Agrícolas a Medida
          </span>
          <h3 class="font-title font-extrabold text-2xl md:text-3xl leading-snug">
            ¿Buscas asesoría técnica o cotizar los productos discutidos en este artículo?
          </h3>
          <p class="text-xs md:text-sm text-slate-300 leading-normal mt-1">
            En Plásticos Salamanca S.A.S. te brindamos atención experta directa para garantizar calibres óptimos, durabilidad extrema y los mejores precios por volumen del sector.
          </p>
        </div>

        <BaseButton 
          variant="secondary" 
          size="lg" 
          class="shrink-0 relative z-10 shadow-lg shadow-brand-orange-500/20"
          :href="whatsappConsultationUrl"
        >
          <template #iconLeft>
            <MessageSquare class="w-5 h-5" />
          </template>
          Consultar con un Asesor
        </BaseButton>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore, type Post } from '~/stores/blog'
import { useCompanyStore } from '~/stores/company'
import BaseButton from '~/components/ui/BaseButton.vue'
import { ArrowLeft, Calendar, AlertCircle, MessageSquare, Facebook } from 'lucide-vue-next'
import { useSeoMeta } from '#imports'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()
const companyStore = useCompanyStore()

const post = ref<Post | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Cargar información de contacto si no está cargada
if (!Object.keys(companyStore.companyInfo).length) {
  await companyStore.fetchCompanyInfo()
}

onMounted(async () => {
  loading.value = true
  const slug = route.params.slug as string
  try {
    const data = await blogStore.fetchPostBySlug(slug)
    if (data) {
      post.value = data
      
      // Aplicar SEO dinámico basado en el artículo
      useSeoMeta({
        title: `${data.title} - Plásticos Salamanca S.A.S.`,
        metaDescription: data.excerpt,
        ogTitle: `${data.title} - Plásticos Salamanca S.A.S.`,
        ogDescription: data.excerpt,
        ogImage: data.image_url || 'https://images.unsplash.com/photo-1605600611280-146c68e3b9ef?auto=format&fit=crop&w=1200&q=80',
        ogType: 'article'
      })
    } else {
      error.value = 'Artículo no encontrado'
    }
  } catch (err: any) {
    error.value = err.message || 'Error al cargar el artículo'
  } finally {
    loading.value = false
  }
})

// Links de Compartir Redes Sociales
const pageUrl = computed(() => {
  if (process.client) {
    return window.location.href
  }
  return `https://plasticossalamanca.com/blog/${route.params.slug}`
})

const whatsappShareUrl = computed(() => {
  const text = encodeURIComponent(`Te recomiendo leer este excelente artículo técnico: "${post.value?.title}" en Plásticos Salamanca: ${pageUrl.value}`)
  return `https://api.whatsapp.com/send?text=${text}`
})

const facebookShareUrl = computed(() => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl.value)}`
})

// Enlace de Consulta de WhatsApp Directo con Contexto de Lectura
const whatsappConsultationUrl = computed(() => {
  const phone = companyStore.companyInfo.contact_details?.whatsapp || '+573102003040'
  const text = encodeURIComponent(`Hola, acabo de leer el artículo técnico del blog: "${post.value?.title}" y me gustaría recibir asesoría especializada y una cotización de sus soluciones plásticas relacionadas.`)
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`
})

// Formatear Fecha
function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<style>
/* Estilos profesionales y uniformes para el HTML insertado del Blog */
.blog-content h2 {
  font-family: 'Outfit', 'Inter', sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  color: #0f172a;
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-left: 4px solid #0b5a33;
  padding-left: 0.75rem;
}

.blog-content h3 {
  font-family: 'Outfit', 'Inter', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
  color: #1e293b;
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
}

.blog-content p {
  font-size: 0.95rem;
  line-height: 1.75;
  color: #334155;
  margin-bottom: 1.25rem;
}

.blog-content ul, .blog-content ol {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-col: col;
  gap: 0.5rem;
}

.blog-content ul {
  list-style-type: disc;
}

.blog-content ol {
  list-style-type: decimal;
}

.blog-content li {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #475569;
}

.blog-content strong {
  color: #0f172a;
  font-weight: 700;
}
</style>
