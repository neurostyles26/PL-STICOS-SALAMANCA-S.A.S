<template>
  <component
    :is="componentType"
    v-bind="componentProps"
    :class="[
      'inline-flex items-center justify-center font-title font-semibold tracking-wide rounded-lg transition-custom border shadow-sm outline-none',
      sizeClasses,
      variantClasses,
      disabled || loading ? 'opacity-65 cursor-not-allowed' : 'active:scale-[0.98]'
    ]"
    :disabled="isButton ? (disabled || loading) : undefined"
    @click="$emit('click', $event)"
  >
    <!-- Spinner de carga -->
    <span v-if="loading" class="mr-2 animate-spin shrink-0">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    <span v-else-if="$slots.iconLeft" class="mr-2 flex items-center shrink-0">
      <slot name="iconLeft" />
    </span>

    <!-- Contenido -->
    <slot />

    <!-- Icono Derecha -->
    <span v-if="$slots.iconRight && !loading" class="ml-2 flex items-center shrink-0">
      <slot name="iconRight" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  to: {
    type: [String, Object],
    default: null
  },
  href: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'button'
  },
  target: {
    type: String,
    default: '_blank'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

// Determinar el tipo de componente de forma exclusiva
const isButton = computed(() => !props.to && !props.href)

const componentType = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

// Pasar SOLO las props necesarias para cada tipo de componente
const componentProps = computed(() => {
  if (props.to) {
    // NuxtLink: solo 'to', nunca 'href'
    return { to: props.to }
  }
  if (props.href) {
    // Etiqueta <a> nativa: solo 'href'
    return {
      href: props.href,
      target: props.target,
      rel: props.target === '_blank' ? 'noopener noreferrer' : undefined
    }
  }
  // Botón estándar HTML
  return { type: props.type }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'px-4 py-2 text-xs sm:text-sm'
    case 'lg': return 'px-6 py-3.5 text-sm sm:text-base md:px-8 md:py-4 md:text-lg rounded-xl'
    case 'md':
    default: return 'px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-brand-orange-500 hover:bg-brand-orange-600 text-white border-brand-orange-500 hover:border-brand-orange-600 shadow-brand-orange-200/50 hover:shadow-lg'
    case 'outline':
      return 'bg-transparent border-brand-green-500 text-brand-green-500 hover:bg-brand-green-500 hover:text-white hover:shadow-lg'
    case 'outline-orange':
      return 'bg-transparent border-brand-orange-500 text-brand-orange-500 hover:bg-brand-orange-500 hover:text-white hover:shadow-lg'
    case 'dark':
      return 'bg-brand-dark-800 hover:bg-brand-dark-900 text-white border-brand-dark-800 hover:border-brand-dark-900 hover:shadow-lg'
    case 'white':
      return 'bg-white hover:bg-slate-50 text-brand-dark-800 border-slate-200 hover:shadow-lg'
    case 'primary':
    default:
      return 'bg-brand-green-500 hover:bg-brand-green-600 text-white border-brand-green-500 hover:border-brand-green-600 shadow-brand-green-200/50 hover:shadow-lg'
  }
})
</script>
