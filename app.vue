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
import WhatsAppButton from '~/components/WhatsAppButton.vue'
</script>
