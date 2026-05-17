<template>
  <div class="relative w-full h-[50vh] sm:h-[60vh] md:h-[75vh] lg:h-[80vh] bg-brand-dark-950 overflow-hidden select-none">
    <!-- Slider Slides -->
    <div class="relative w-full h-full">
      <div 
        v-for="(slide, index) in slides" 
        :key="slide.id"
        class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
        :class="[currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0']"
      >
        <!-- Imagen de Fondo Optimizado con Nuxt Image o Unsplash -->
        <NuxtImg 
          :src="slide.image_url" 
          :alt="slide.title || 'Plásticos Salamanca'"
          class="w-full h-full object-cover transform scale-105 transition-transform duration-[6000ms]"
          :class="[currentIndex === index ? 'scale-100' : 'scale-105']"
          loading="eager"
          format="webp"
        />

        <!-- Overlay Oscuro Degradado para Legibilidad Premium -->
        <div class="absolute inset-0 bg-gradient-to-r from-brand-dark-950/90 via-brand-dark-900/60 to-transparent"></div>

        <!-- Contenido del Slide (Animaciones suaves con Motion Vue / Tailwind) -->
        <div class="absolute inset-0 flex items-center">
          <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 flex flex-col items-start gap-4 sm:gap-6 text-white">
            <span 
              class="font-sans font-bold uppercase tracking-[0.25em] text-xs md:text-sm text-brand-orange-400 transform translate-y-4 transition-all duration-700 delay-300"
              :class="[currentIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0']"
            >
              PLÁSTICOS SALAMANCA S.A.S.
            </span>
            <h2 
              class="font-title font-extrabold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-[1.1] transform translate-y-6 transition-all duration-700 delay-500"
              :class="[currentIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0']"
            >
              {{ slide.title }}
            </h2>
            <p 
              class="font-sans text-slate-200 text-xs sm:text-sm md:text-lg max-w-xl leading-relaxed transform translate-y-6 transition-all duration-700 delay-700"
              :class="[currentIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0']"
            >
              {{ slide.subtitle }}
            </p>
            <div 
              class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-2 transform translate-y-8 transition-all duration-700 delay-[900ms]"
              :class="[currentIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0']"
            >
              <BaseButton 
                variant="primary" 
                size="lg"
                :to="slide.link_url || '/productos'"
              >
                Ver Catálogo
                <template #iconRight>
                  <ArrowRight class="w-5 h-5" />
                </template>
              </BaseButton>
              <BaseButton 
                variant="outline" 
                class="border-white text-white hover:bg-white hover:text-brand-dark-800"
                size="lg"
                to="/contacto"
              >
                Asesoría Técnica
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Flechas de Navegación (Solo escritorio) -->
    <button 
      @click="prevSlide" 
      class="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm transition-all duration-300"
      aria-label="Anterior slide"
    >
      <ChevronLeft class="w-6 h-6" />
    </button>
    <button 
      @click="nextSlide" 
      class="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm transition-all duration-300"
      aria-label="Siguiente slide"
    >
      <ChevronRight class="w-6 h-6" />
    </button>

    <!-- Indicadores Inferiores (Dots) -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
      <button 
        v-for="(slide, index) in slides" 
        :key="`dot-${slide.id}`"
        @click="goToSlide(index)"
        class="h-2 rounded-full transition-all duration-300"
        :class="[currentIndex === index ? 'w-8 bg-brand-green-500' : 'w-2.5 bg-white/40 hover:bg-white/60']"
        :aria-label="`Ir a diapositiva ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useCompanyStore } from '~/stores/company'
import BaseButton from '~/components/ui/BaseButton.vue'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-vue-next'

const companyStore = useCompanyStore()
const currentIndex = ref(0)
let timer: any = null

// Fallbacks de banners en caso de que la BD esté vacía o en carga
const defaultSlides = [
  {
    id: 'default-1',
    title: 'Bolsas Plásticas de Alta Resistencia',
    subtitle: 'Diseñadas para soportar cargas pesadas y uso rudo en el sector comercial e industrial.',
    image_url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1920&q=80',
    link_url: '/productos?categoria=bolsas'
  },
  {
    id: 'default-2',
    title: 'Tecnología Plástica para Invernaderos',
    subtitle: 'Películas coextruidas con aditivos UV para una protección óptima de sus cultivos y cosechas.',
    image_url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=1920&q=80',
    link_url: '/productos?categoria=invernaderos'
  },
  {
    id: 'default-3',
    title: 'Empaques Flexibles Especializados',
    subtitle: 'Rollos y bolsas industriales a la medida para empaque de insumos químicos, alimenticios y más.',
    image_url: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=1920&q=80',
    link_url: '/productos?categoria=empaques'
  }
]

const slides = computed(() => {
  return companyStore.banners.length > 0 ? companyStore.banners : defaultSlides
})

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
  resetTimer()
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
  resetTimer()
}

function goToSlide(index: number) {
  currentIndex.value = index
  resetTimer()
}

function startTimer() {
  timer = setInterval(nextSlide, 7000)
}

function resetTimer() {
  if (timer) {
    clearInterval(timer)
    startTimer()
  }
}

onMounted(async () => {
  if (companyStore.banners.length === 0) {
    await companyStore.fetchBanners()
  }
  startTimer()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
