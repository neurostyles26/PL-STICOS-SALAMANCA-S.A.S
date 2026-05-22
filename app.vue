<template>
  <div class="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50 antialiased selection:bg-brand-green-500 selection:text-white">
    <!-- PWA Manifest support in Nuxt -->
    <NuxtPwaManifest />
    
    <!-- Renderizado del layout activo -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
    <!-- Botón flotante corporativo de WhatsApp -->
    <WhatsAppButton />
  </div>
</template>

<script setup lang="ts">
/**
 * @license PROPRIETARY
 * Copyright (c) 2025-2026 Edisson Pinza — NeuroStyles. All rights reserved.
 * Licensed under proprietary terms. See LICENSE file in workspace root.
 */
import { computed } from 'vue'
import { useCompanyStore } from '~/stores/company'
import { generatePalette } from '~/utils/colors'
import WhatsAppButton from '~/components/WhatsAppButton.vue'

const companyStore = useCompanyStore()

// Cargar información de la empresa si no está disponible aún
if (!Object.keys(companyStore.companyInfo).length) {
  await companyStore.fetchCompanyInfo()
}

// Computar estilos CSS dinámicos en base a los colores guardados en Supabase
const themeStyles = computed(() => {
  const primaryColor = companyStore.companyInfo.theme?.primary_color || '#0b5a33'
  const secondaryColor = companyStore.companyInfo.theme?.secondary_color || '#e06b26'
  
  const primaryPalette = generatePalette(primaryColor)
  const secondaryPalette = generatePalette(secondaryColor)
  
  let styles = ':root {\n'
  
  // Inyectar paleta verde (primario)
  for (const [shade, val] of Object.entries(primaryPalette)) {
    styles += `  --color-brand-green-${shade}: ${val};\n`
  }
  
  // Inyectar paleta naranja (secundario)
  for (const [shade, val] of Object.entries(secondaryPalette)) {
    styles += `  --color-brand-orange-${shade}: ${val};\n`
  }
  
  styles += '}'
  return styles
})

// Inyectar bloque de estilos dinámicos en la cabecera
useHead({
  style: [
    {
      id: 'dynamic-theme-colors',
      innerHTML: () => themeStyles.value
    }
  ]
})
</script>
