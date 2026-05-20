<template>
  <div class="bg-slate-50 min-h-screen">
    <!-- 1. Banner de Cabecera de Página -->
    <section class="relative bg-brand-dark-950 text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 overflow-hidden border-b border-brand-dark-900">
      <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <!-- Fondo difuminado de color de marca -->
      <div class="absolute top-0 right-1/4 w-96 h-96 bg-brand-green-700/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto flex flex-col items-center text-center gap-4 relative z-10">
        <span class="text-xs font-bold uppercase tracking-[0.3em] text-brand-orange-400">Sobre Nosotros</span>
        <h1 class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-extrabold tracking-tight leading-tight max-w-4xl">
          Comprometidos con la Calidad y la Sostenibilidad Industrial
        </h1>
        <div class="w-20 h-1.5 bg-brand-green-500 rounded-full my-2"></div>
        <p class="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed">
          Conoce nuestra trayectoria, misión y los sólidos valores que rigen la producción de empaques, bolsas y plásticos técnicos de alto rendimiento.
        </p>
      </div>
    </section>

    <!-- 2. Trayectoria e Historia Empresarial -->
    <section class="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
      <div v-motion-slide-visible-left class="lg:col-span-7 flex flex-col gap-6">
        <span class="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange-500">Nuestra Trayectoria</span>
        <h2 class="text-3xl md:text-4xl text-brand-dark-800 font-bold leading-tight">
          Nuestra Historia en el Mercado del Plástico
        </h2>
        <div class="w-16 h-1 bg-brand-green-500 rounded-full"></div>
        <p class="text-slate-600 leading-relaxed text-sm md:text-base text-justify">
          {{ companyStore.companyInfo.history?.text || 'PLÁSTICOS SALAMANCA S.A.S. se fundó con el firme compromiso de proveer soluciones plásticas de alta calidad para el sector agrícola e industrial. A lo largo de los años, nos hemos consolidado como líderes en la fabricación de empaques, bolsas de alta y baja densidad y plásticos técnicos para invernaderos, impulsados por la innovación constante y el compromiso con nuestros clientes.' }}
        </p>
        <p class="text-slate-600 leading-relaxed text-sm md:text-base text-justify">
          Nuestros procesos industriales integran la más alta tecnología de coextrusión, lo que nos permite desarrollar productos plásticos multicapa con propiedades de barrera, térmicas y mecánicas optimizadas para las exigentes condiciones geográficas y climáticas colombianas.
        </p>
      </div>
      <div v-motion-slide-visible-right class="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden shadow-2xl group border border-slate-100 bg-white">
        <NuxtImg 
          :src="companyStore.companyInfo.history?.image_url || 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'" 
          alt="Historia de Plásticos Salamanca"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          format="webp"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-brand-dark-950/20 to-transparent"></div>
      </div>
    </section>

    <!-- 3. Misión y Visión (Tarjetas sofisticadas enfrentadas) -->
    <section class="py-12 sm:py-16 md:py-20 bg-slate-100 px-4 sm:px-6 md:px-12">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
        <!-- Misión -->
        <div 
          v-motion-slide-visible-left
          class="bg-white p-8 md:p-12 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(11,90,51,0.12)] hover:-translate-y-1 transition-all duration-500 flex flex-col gap-6 group relative overflow-hidden"
        >
          <div class="absolute top-0 left-0 right-0 h-1.5 bg-brand-green-500"></div>
          <span class="text-xs font-bold uppercase tracking-[0.25em] text-brand-green-500 text-center w-full">El Propósito</span>
          <h3 class="text-2xl md:text-3xl font-extrabold text-brand-dark-800 font-title group-hover:text-brand-green-500 transition-colors text-center w-full">
            Nuestra Misión
          </h3>
          <p class="text-slate-600 text-sm md:text-base leading-relaxed text-justify">
            {{ companyStore.companyInfo.mission?.text || 'Nuestra misión es desarrollar, fabricar y comercializar soluciones plásticas de alta calidad e innovación para el sector industrial y agrícola, asegurando la durabilidad, eficiencia y satisfacción de nuestros clientes, apoyados en procesos sostenibles y un talento humano comprometido.' }}
          </p>
        </div>

        <!-- Visión -->
        <div 
          v-motion-slide-visible-right
          class="bg-white p-8 md:p-12 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(224,107,38,0.12)] hover:-translate-y-1 transition-all duration-500 flex flex-col gap-6 group relative overflow-hidden"
        >
          <div class="absolute top-0 left-0 right-0 h-1.5 bg-brand-orange-500"></div>
          <span class="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange-500 text-center w-full">La Proyección</span>
          <h3 class="text-2xl md:text-3xl font-extrabold text-brand-dark-800 font-title group-hover:text-brand-orange-500 transition-colors text-center w-full">
            Nuestra Visión
          </h3>
          <p class="text-slate-600 text-sm md:text-base leading-relaxed text-justify">
            {{ companyStore.companyInfo.vision?.text || 'Para el 2030, ser reconocidos como el proveedor líder y más confiable de empaques plásticos e invernaderos a nivel nacional, destacándonos por la sostenibilidad ambiental, tecnología de vanguardia y la excelencia en el servicio al cliente.' }}
          </p>
        </div>
      </div>
    </section>

    <!-- 4. Valores Corporativos (Grilla dinámica) -->
    <section class="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      <div class="text-center flex flex-col items-center gap-4 mb-20">
        <span class="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange-500">Pilares</span>
        <h2 class="text-3xl md:text-5xl text-brand-dark-800 font-bold leading-tight">
          Nuestros Valores Corporativos
        </h2>
        <div class="w-16 h-1 bg-brand-green-500 rounded-full mt-1"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          v-for="(val, idx) in valuesList" 
          :key="idx"
          v-motion-slide-visible-bottom
          :delay="idx * 100"
          class="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col sm:flex-row justify-between gap-6 group"
        >
          <div class="flex items-start gap-5 flex-grow">
            <div class="w-10 h-10 rounded-lg bg-brand-green-50 text-brand-green-500 flex items-center justify-center font-bold font-title text-lg shrink-0 group-hover:bg-brand-green-500 group-hover:text-white transition-colors duration-300">
              0{{ idx + 1 }}
            </div>
            <div class="flex flex-col gap-2">
              <h3 class="text-lg font-bold text-brand-dark-800 font-title group-hover:text-brand-green-500 transition-colors">
                {{ val.title }}
              </h3>
              <p class="text-slate-600 text-sm leading-relaxed text-justify">
                {{ val.description }}
              </p>
            </div>
          </div>
          
          <!-- Espacio para la imagen a la derecha -->
          <div v-if="val.image_url" class="w-full sm:w-28 md:w-32 aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 shrink-0 self-center">
            <NuxtImg 
              :src="val.image_url" 
              :alt="val.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              format="webp"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCompanyStore } from '~/stores/company'

useSeoMeta({
  title: 'Quiénes Somos',
  description: 'Conozca la trayectoria corporativa, misión, visión y sólidos valores de Plásticos Salamanca S.A.S., líderes en soluciones plásticas industriales.',
  ogTitle: 'Quiénes Somos - Plásticos Salamanca S.A.S.',
  ogDescription: 'Nuestra dedicación y trayectoria en la industria de empaques plásticos e invernaderos de alto rendimiento en Colombia.',
  ogImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  twitterCard: 'summary_large_image'
})

const companyStore = useCompanyStore()

// Estructura de valores por defecto en caso de que no haya lista
const defaultValues = [
  {
    title: 'Calidad Superior',
    description: 'Buscamos la excelencia técnica y estructural en cada bolsa, empaque e invernadero que sale de nuestra planta industrial.',
    image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Innovación Tecnológica',
    description: 'Incorporamos constantemente aditivos avanzados y procesos industriales que aumentan la durabilidad y flexibilidad de nuestros plásticos.',
    image_url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Compromiso Sostenible',
    description: 'Optimizamos la eficiencia energética y los procesos de reciclaje industrial internos para reducir la huella ambiental.',
    image_url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Servicio y Asesoría Técnica',
    description: 'Brindamos acompañamiento en campo y asesoramiento personalizado para calibres y especificaciones agrícolas y comerciales.',
    image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
  }
]

const valuesList = computed(() => {
  const storeList = companyStore.companyInfo.values?.list
  if (Array.isArray(storeList) && storeList.length > 0) {
    return storeList.map((item: any, idx: number) => {
      // Si ya viene como objeto (nuevo formato)
      if (typeof item === 'object' && item !== null) {
        return {
          title: item.title || '',
          description: item.description || '',
          image_url: item.image_url || ''
        }
      }
      // Si viene como string (formato antiguo)
      if (typeof item === 'string') {
        if (item.includes(':')) {
          const parts = item.split(':')
          return { 
            title: parts[0].trim(), 
            description: parts[1].trim(), 
            image_url: defaultValues[idx]?.image_url || '' 
          }
        }
        return { 
          title: item, 
          description: defaultValues[idx]?.description || 'Compromiso constante con la excelencia operativa y satisfacción del cliente.',
          image_url: defaultValues[idx]?.image_url || ''
        }
      }
      return { title: '', description: '', image_url: '' }
    })
  }
  return defaultValues
})

onMounted(async () => {
  if (!Object.keys(companyStore.companyInfo).length) {
    await companyStore.fetchCompanyInfo()
  }
})
</script>
