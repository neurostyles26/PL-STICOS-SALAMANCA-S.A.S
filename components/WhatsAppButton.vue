<template>
  <!-- Ocultar en el panel de administración -->
  <a 
    v-if="showButton" 
    :href="whatsappUrl" 
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-[60px] h-[60px] rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:shadow-[0_8px_40px_rgb(37,211,102,0.6)] hover:-translate-y-1 active:scale-95 transition-all duration-300 group"
    aria-label="Contactar por WhatsApp"
  >
    <!-- Fondo Gradiente y Glass -->
    <div class="absolute inset-0 bg-gradient-to-tr from-[#128C7E] to-[#25D366] rounded-full z-0"></div>
    <div class="absolute inset-[2px] bg-gradient-to-tr from-[#25D366] to-[#1ebe5d] rounded-full z-0 opacity-90 backdrop-blur-sm"></div>

    <!-- Anillos expansivos premium -->
    <div class="absolute inset-0 rounded-full border-2 border-white/30 group-hover:scale-[1.3] opacity-0 group-hover:opacity-0 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] z-0"></div>
    <div class="absolute inset-0 rounded-full border-2 border-[#25D366]/60 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_0.5s] z-0"></div>
    
    <!-- Icono SVG oficial de WhatsApp con sombra (Corregido) -->
    <svg class="w-[34px] h-[34px] fill-white relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>

    <!-- Tooltip Glassmorphism -->
    <div class="absolute right-[75px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 pointer-events-none transition-all duration-400 ease-out z-50 flex items-center">
      <div class="bg-white/95 backdrop-blur-md text-brand-dark-900 text-sm font-semibold px-4 py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 flex items-center gap-2.5 whitespace-nowrap">
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-green-500"></span>
        </span>
        ¿En qué podemos asesorarte?
      </div>
      <!-- Triángulo apuntando al botón -->
      <div class="w-0 h-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-white/95 -ml-[1px]"></div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCompanyStore } from '~/stores/company'

const route = useRoute()
const companyStore = useCompanyStore()

const showButton = computed(() => {
  return !route.path.startsWith('/admin')
})

const whatsappUrl = computed(() => {
  const phone = companyStore.companyInfo.contact_details?.whatsapp || '+573102003040'
  const text = encodeURIComponent('Hola, me comunico desde su sitio web y me gustaría hablar con un asesor comercial.')
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`
})
</script>
