<template>
  <div class="flex items-center gap-3 select-none group cursor-pointer">
    <!-- Logotipo: Imagen Personalizada o SVG de alta gama -->
    <template v-if="customLogoUrl">
      <NuxtImg 
        :src="customLogoUrl" 
        alt="Logo Plásticos Salamanca"
        :class="[customLogoClass, 'object-contain shrink-0 transform transition-transform duration-500 group-hover:scale-105']"
      />
    </template>
    <svg 
      v-else
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 120 120" 
      :class="[sizeClass, 'shrink-0 transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-6']"
    >
      <defs>
        <!-- Degradados premium industriales -->
        <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#259351" />
          <stop offset="100%" stop-color="#0b5a33" />
        </linearGradient>
        <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff8b4d" />
          <stop offset="100%" stop-color="#e06b26" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="3" stdDeviation="2" flood-opacity="0.15" />
        </filter>
      </defs>

      <!-- Isotipo: Símbolo de reciclaje y hojas (Sostenibilidad e Industria) -->
      <g filter="url(#shadow)">
        <!-- Hoja / Bucle Verde (Representa Invernaderos e Industria Agrícola) -->
        <path 
          d="M 60,15 C 85,15 105,35 105,60 C 105,75 95,90 85,95 C 80,90 75,75 75,60 C 75,45 65,30 50,25 C 53,18 56,15 60,15 Z" 
          fill="url(#greenGrad)" 
        />
        <!-- Bucle Naranja (Representa Bolsas, Empaques y Dinamismo) -->
        <path 
          d="M 60,105 C 35,105 15,85 15,60 C 15,45 25,30 35,25 C 40,30 45,45 45,60 C 45,75 55,90 70,95 C 67,102 64,105 60,105 Z" 
          fill="url(#orangeGrad)" 
        />
        <!-- Núcleo enlazado central (P y S abstractas en color blanco) -->
        <circle cx="60" cy="60" r="14" fill="#ffffff" />
        <path d="M 57,51 C 62,51 65,54 65,58 C 65,61 62,64 57,64 L 57,69" stroke="#0b5a33" stroke-width="3" stroke-linecap="round" fill="none" />
        <circle cx="57" cy="57" r="1" fill="#0b5a33" />
      </g>
    </svg>

    <!-- Texto Corporativo (Ocultar si se usa logo personalizado, ya que suele contener la marca) -->
    <div v-if="!iconOnly && !customLogoUrl" class="flex flex-col leading-none">
      <span 
        class="font-title font-extrabold text-xl md:text-2xl tracking-tight transition-colors duration-300"
        :class="dark ? 'text-white' : 'text-brand-dark-800'"
      >
        PLÁSTICOS
      </span>
      <span class="font-title font-extrabold text-lg md:text-xl tracking-wider text-brand-orange-500">
        SALAMANCA
      </span>
      <span 
        class="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] mt-0.5 transition-colors duration-300"
        :class="dark ? 'text-slate-400' : 'text-brand-dark-500'"
      >
        Bolsas • Invernaderos • Empaques
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCompanyStore } from '~/stores/company'

const props = defineProps({
  size: {
    type: String,
    default: 'md' // xs, sm, md, lg, xl
  },
  iconOnly: {
    type: Boolean,
    default: false
  },
  dark: {
    type: Boolean,
    default: false
  }
})

const companyStore = useCompanyStore()

const customLogoUrl = computed(() => {
  const logo = companyStore.companyInfo?.logo
  if (logo?.use_custom && logo?.image_url) {
    return logo.image_url
  }
  return null
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs': return 'w-8 h-8'
    case 'sm': return 'w-10 h-10'
    case 'lg': return 'w-16 h-16 md:w-20 md:h-20'
    case 'xl': return 'w-24 h-24 md:w-32 md:h-32'
    case 'md':
    default: return 'w-12 h-12 md:w-14 md:h-14'
  }
})

const customLogoClass = computed(() => {
  switch (props.size) {
    case 'xs': return 'h-8 w-auto'
    case 'sm': return 'h-10 w-auto'
    case 'lg': return 'h-12 md:h-16 w-auto'
    case 'xl': return 'h-20 md:h-24 w-auto'
    case 'md':
    default: return 'h-10 md:h-12 w-auto'
  }
})
</script>
