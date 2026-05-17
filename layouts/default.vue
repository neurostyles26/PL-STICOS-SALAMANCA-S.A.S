<template>
  <div class="flex flex-col min-h-screen">
    <!-- Barra de Navegación Premium -->
    <Navbar />

    <!-- Contenido Principal -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Pie de Página Premium -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
</script>
