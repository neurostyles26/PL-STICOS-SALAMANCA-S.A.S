// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Registrar módulos
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@vite-pwa/nuxt',
    '@vueuse/motion/nuxt'
  ],

  // Configuración de CSS global
  css: ['~/assets/css/main.css'],

  // Configuración de Supabase
  supabase: {
    redirect: false, // Permitir acceso público a las páginas y manejar la protección manualmente/con middleware
    cookieOptions: {
      maxAge: 60 * 60 * 8, // 8 horas
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    }
  },

  // Configuración de Nuxt Image
  image: {
    quality: 85,
    formats: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  // Configuración de SEO y Site Config
  site: {
    url: 'https://plasticossalamanca.com',
    name: 'Plásticos Salamanca S.A.S.',
    description: 'Bolsas • Invernaderos • Empaques. Soluciones plásticas premium e industriales de alta resistencia y durabilidad.',
    defaultLocale: 'es'
  },

  // Encabezados globales de la aplicación
  app: {
    head: {
      titleTemplate: '%s - Plásticos Salamanca S.A.S.',
      htmlAttrs: {
        lang: 'es'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#0b5a33' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Configuración de la PWA
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Plásticos Salamanca S.A.S.',
      short_name: 'Plásticos Salamanca',
      description: 'Bolsas • Invernaderos • Empaques - Soluciones Plásticas Industriales',
      theme_color: '#0b5a33',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '/icon.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff,woff2}'],
      navigateFallback: '/'
    },
    devOptions: {
      enabled: false // Desactivado en desarrollo para evitar problemas de recarga
    }
  },
})
