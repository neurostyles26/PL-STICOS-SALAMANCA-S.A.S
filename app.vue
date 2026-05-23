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

// Computar la URL del favicon dinámicamente si hay un logotipo personalizado cargado
const faviconUrl = computed(() => {
  const logo = companyStore.companyInfo?.logo
  if (logo?.use_custom && logo?.image_url) {
    return logo.image_url
  }
  return '/favicon.ico'
})

// Determinar el tipo MIME del favicon
const faviconType = computed(() => {
  const url = faviconUrl.value
  if (url.includes('.png')) return 'image/png'
  if (url.includes('.svg')) return 'image/svg+xml'
  if (url.includes('.jpg') || url.includes('.jpeg')) return 'image/jpeg'
  if (url.includes('.webp')) return 'image/webp'
  return 'image/x-icon'
})

// Inyectar bloque de estilos dinámicos y favicon en la cabecera
useHead({
  link: [
    {
      key: 'favicon',
      rel: 'icon',
      type: faviconType,
      href: faviconUrl
    },
    {
      key: 'shortcut-favicon',
      rel: 'shortcut icon',
      type: faviconType,
      href: faviconUrl
    }
  ],
  style: [
    {
      id: 'dynamic-theme-colors',
      innerHTML: () => themeStyles.value
    }
  ]
})
</script>
