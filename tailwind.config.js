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
            50: '#f0fbf4',
            100: '#dcf7e5',
            200: '#bbeecb',
            300: '#8ae0a7',
            400: '#54cb7e',
            500: '#0b5a33', // Verde corporativo principal
            600: '#084828',
            700: '#06371e',
            800: '#042715',
            900: '#02160c'
          },
          orange: {
            50: '#fff8f3',
            100: '#ffeedc',
            200: '#ffd6b3',
            300: '#ffb580',
            400: '#ff8b4d',
            500: '#e06b26', // Naranja corporativo principal
            600: '#b8541b',
            700: '#8f3e13',
            800: '#662a0c',
            900: '#3e1704'
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
