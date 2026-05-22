/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            50: 'var(--color-brand-green-50, #f0fbf4)',
            100: 'var(--color-brand-green-100, #dcf7e5)',
            200: 'var(--color-brand-green-200, #bbeecb)',
            300: 'var(--color-brand-green-300, #8ae0a7)',
            400: 'var(--color-brand-green-400, #54cb7e)',
            500: 'var(--color-brand-green-500, #0b5a33)',
            600: 'var(--color-brand-green-600, #084828)',
            700: 'var(--color-brand-green-700, #06371e)',
            800: 'var(--color-brand-green-800, #042715)',
            900: 'var(--color-brand-green-900, #02160c)'
          },
          orange: {
            50: 'var(--color-brand-orange-50, #fff8f3)',
            100: 'var(--color-brand-orange-100, #ffeedc)',
            200: 'var(--color-brand-orange-200, #ffd6b3)',
            300: 'var(--color-brand-orange-300, #ffb580)',
            400: 'var(--color-brand-orange-400, #ff8b4d)',
            500: 'var(--color-brand-orange-500, #e06b26)',
            600: 'var(--color-brand-orange-600, #b8541b)',
            700: 'var(--color-brand-orange-700, #8f3e13)',
            800: 'var(--color-brand-orange-800, #662a0c)',
            900: 'var(--color-brand-orange-900, #3e1704)'
          },
          dark: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617'
          }
        }
      },
      fontFamily: {
        title: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
