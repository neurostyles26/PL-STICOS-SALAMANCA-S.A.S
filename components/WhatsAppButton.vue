<template>
  <!-- Ocultar en el panel de administración -->
  <a 
    v-if="showButton" 
    :href="whatsappUrl" 
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
    aria-label="Contactar por WhatsApp"
  >
    <!-- Efecto de pulsación premium -->
    <span class="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping -z-10 group-hover:animate-none"></span>
    
    <!-- Icono SVG oficial de WhatsApp -->
    <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.728 2.02 14.224.993 11.6.993c-5.437 0-9.863 4.374-9.867 9.806-.002 1.73.457 3.419 1.332 4.937l-.98 3.577 3.69-.949h.002zM17.48 15.39c-.287-.144-1.702-.84-1.965-.936-.264-.096-.456-.144-.648.144-.192.288-.744.936-.912 1.128-.168.192-.336.216-.624.072-1.359-.68-2.35-1.185-3.268-2.766-.24-.413.24-.383.69-1.282.072-.144.036-.264-.018-.36-.054-.096-.456-1.104-.624-1.512-.168-.408-.336-.36-.456-.36-.12 0-.264-.024-.408-.024-.144 0-.384.048-.576.264-.192.216-.744.72-744 1.76s.768 2.04 1.056 2.4c.288.36 2.016 3.096 4.896 4.344.685.297 1.218.474 1.631.605.688.219 1.31.188 1.802.115.549-.081 1.702-.696 1.943-1.368.24-.672.24-1.248.168-1.368-.072-.12-.264-.192-.552-.336z" />
    </svg>

    <!-- Tooltip descriptivo -->
    <span class="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 scale-90 translate-x-3 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 whitespace-nowrap">
      ¿En qué podemos ayudarte?
    </span>
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
