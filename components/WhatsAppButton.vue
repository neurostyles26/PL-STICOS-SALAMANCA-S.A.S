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
    
    <!-- Icono SVG oficial de WhatsApp con sombra -->
    <svg class="w-8 h-8 fill-white relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.728 2.02 14.224.993 11.6.993c-5.437 0-9.863 4.374-9.867 9.806-.002 1.73.457 3.419 1.332 4.937l-.98 3.577 3.69-.949h.002zM17.48 15.39c-.287-.144-1.702-.84-1.965-.936-.264-.096-.456-.144-.648.144-.192.288-.744.936-.912 1.128-.168.192-.336.216-.624.072-1.359-.68-2.35-1.185-3.268-2.766-.24-.413.24-.383.69-1.282.072-.144.036-.264-.018-.36-.054-.096-.456-1.104-.624-1.512-.168-.408-.336-.36-.456-.36-.12 0-.264-.024-.408-.024-.144 0-.384.048-.576.264-.192.216-.744.72-.744 1.76s.768 2.04 1.056 2.4c.288.36 2.016 3.096 4.896 4.344.685.297 1.218.474 1.631.605.688.219 1.31.188 1.802.115.549-.081 1.702-.696 1.943-1.368.24-.672.24-1.248.168-1.368-.072-.12-.264-.192-.552-.336z" />
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
