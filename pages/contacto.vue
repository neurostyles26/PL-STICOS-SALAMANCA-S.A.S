<template>
  <div class="bg-slate-50 min-h-screen">
    <!-- 1. Banner de Cabecera -->
    <section class="relative bg-brand-dark-950 text-white py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 overflow-hidden border-b border-brand-dark-900">
      <div class="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <div class="max-w-7xl mx-auto flex flex-col items-center text-center gap-4 relative z-10">
        <span class="text-xs font-bold uppercase tracking-[0.3em] text-brand-orange-400">Atención al Cliente</span>
        <h1 class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-extrabold tracking-tight leading-tight max-w-4xl">
          Contacto Corporativo y Técnico
        </h1>
        <div class="w-20 h-1.5 bg-brand-green-500 rounded-full my-2"></div>
        <p class="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed">
          Comuníquese directamente con nuestros asesores especializados. Estamos listos para proveer las mejores soluciones plásticas agrícolas y comerciales.
        </p>
      </div>
    </section>

    <!-- 2. Información y Formulario -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
      <!-- Columna Izquierda: Datos y Detalles Corporativos -->
      <div v-motion-slide-visible-left class="lg:col-span-5 flex flex-col gap-10">
        <div class="flex flex-col gap-3">
          <span class="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange-500">Canales Directos</span>
          <h2 class="text-3xl font-bold text-brand-dark-800 leading-tight">
            Oficina Central de Ventas
          </h2>
          <p class="text-slate-500 text-sm md:text-base">
            Visítenos en Bucaramanga o comuníquese a través de nuestros canales corporativos en horarios comerciales.
          </p>
        </div>

        <div class="flex flex-col gap-6">
          <div class="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
            <div class="w-12 h-12 rounded-xl bg-brand-green-50 text-brand-green-500 flex items-center justify-center shrink-0 group-hover:bg-brand-green-500 group-hover:text-white transition-colors duration-300">
              <MapPin class="w-6 h-6" />
            </div>
            <div class="flex flex-col leading-relaxed">
              <span class="font-title font-bold text-sm text-brand-dark-800">Dirección Física</span>
              <span class="text-slate-600 text-sm mt-1">{{ companyStore.companyInfo.contact_details?.address || 'Zona Industrial, Bucaramanga, Santander, Colombia' }}</span>
            </div>
          </div>

          <a :href="`tel:${companyStore.companyInfo.contact_details?.phone}`" class="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
            <div class="w-12 h-12 rounded-xl bg-brand-green-50 text-brand-green-500 flex items-center justify-center shrink-0 group-hover:bg-brand-green-500 group-hover:text-white transition-colors duration-300">
              <Phone class="w-6 h-6" />
            </div>
            <div class="flex flex-col leading-relaxed">
              <span class="font-title font-bold text-sm text-brand-dark-800">Línea Telefónica</span>
              <span class="text-slate-600 text-sm mt-1">{{ companyStore.companyInfo.contact_details?.phone || '(+57) 607 6351234' }}</span>
            </div>
          </a>

          <a :href="`mailto:${companyStore.companyInfo.contact_details?.email}`" class="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
            <div class="w-12 h-12 rounded-xl bg-brand-green-50 text-brand-green-500 flex items-center justify-center shrink-0 group-hover:bg-brand-green-500 group-hover:text-white transition-colors duration-300">
              <Mail class="w-6 h-6" />
            </div>
            <div class="flex flex-col leading-relaxed">
              <span class="font-title font-bold text-sm text-brand-dark-800">Correo Comercial</span>
              <span class="text-slate-600 text-sm mt-1 break-all">{{ companyStore.companyInfo.contact_details?.email || 'contacto@plasticossalamanca.com' }}</span>
            </div>
          </a>

          <a :href="whatsappUrl" class="flex items-start gap-4 p-5 bg-brand-green-50/50 border border-brand-green-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
            <div class="w-12 h-12 rounded-xl bg-brand-green-500 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <MessageSquare class="w-6 h-6" />
            </div>
            <div class="flex flex-col leading-relaxed">
              <span class="font-title font-bold text-sm text-brand-green-700">Canal WhatsApp</span>
              <span class="text-brand-green-800 text-sm mt-1 font-semibold">Iniciar chat inmediato</span>
            </div>
          </a>
        </div>
      </div>

      <!-- Columna Derecha: Formulario -->
      <div v-motion-slide-visible-right class="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-slate-150 shadow-xl">
        <h3 class="font-title font-bold text-2xl text-brand-dark-800 mb-6">Asesoría e Información</h3>
        
        <form @submit.prevent="submitForm" class="flex flex-col gap-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-1.5">
              <label for="name" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Nombre Completo</label>
              <input 
                id="name" 
                v-model="form.name" 
                type="text" 
                required 
                class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all"
                placeholder="Ej: Carlos Pérez"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label for="phone" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Número de Teléfono</label>
              <input 
                id="phone" 
                v-model="form.phone" 
                type="tel" 
                required 
                class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all"
                placeholder="Ej: +57 300 123 4567"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-1.5">
              <label for="email" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Correo Electrónico</label>
              <input 
                id="email" 
                v-model="form.email" 
                type="email" 
                required 
                class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all"
                placeholder="Ej: carlos@empresa.com"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label for="subject" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Asunto de Consulta</label>
              <select 
                id="subject" 
                v-model="form.subject" 
                class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all"
              >
                <option value="Cotización de Bolsas">Cotización de Bolsas</option>
                <option value="Plásticos de Invernadero">Plásticos de Invernadero</option>
                <option value="Empaques Flexibles">Empaques Flexibles</option>
                <option value="Diseño Especial a Medida">Diseño Especial a Medida</option>
                <option value="Otro Asunto">Otro Asunto</option>
              </select>
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="message" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Mensaje / Requerimientos Técnicos</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              rows="5" 
              required 
              class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all resize-none"
              placeholder="Describa a detalle las medidas, calibre, tipo de material y la cantidad requerida para brindarle una cotización formal..."
            ></textarea>
          </div>

          <!-- Botón de Envío -->
          <BaseButton 
            variant="primary" 
            type="submit" 
            :loading="formSending"
            class="py-3.5"
          >
            Enviar Mensaje Comercial
          </BaseButton>

          <!-- Alerta de Éxito -->
          <div 
            v-if="formSuccess" 
            class="p-4 bg-brand-green-50 text-brand-green-800 border border-brand-green-200 rounded-xl text-sm font-semibold flex items-center gap-2"
          >
            <ShieldCheck class="w-5 h-5 text-brand-green-500" />
            ¡Mensaje comercial enviado! Un asesor especializado se comunicará en breve.
          </div>
        </form>
      </div>
    </section>

    <!-- 3. Integración de Google Maps -->
    <section class="w-full h-96 bg-slate-200 overflow-hidden relative shadow-inner">
      <iframe 
        v-if="googleMapsSrc" 
        :src="googleMapsSrc" 
        width="100%" 
        height="100%" 
        style="border:0;" 
        allowfullscreen="false" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
        title="Ubicación Física de Plásticos Salamanca S.A.S."
      ></iframe>
      <!-- Fallback en caso de que esté vacío -->
      <div v-else class="w-full h-full flex items-center justify-center bg-slate-300 text-slate-500">
        Mapa no disponible
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useCompanyStore } from '~/stores/company'
import BaseButton from '~/components/ui/BaseButton.vue'
import { MapPin, Phone, Mail, MessageSquare, ShieldCheck } from 'lucide-vue-next'

useSeoMeta({
  title: 'Contacto Comercial',
  description: 'Contáctenos para cotizar bolsas plásticas, plásticos de invernadero y empaques flexibles a la medida. Asesoramiento técnico inmediato en Bucaramanga.',
  ogTitle: 'Contacto Corporativo - Plásticos Salamanca S.A.S.',
  ogDescription: 'Formulario de contacto oficial e información de canales corporativos para atención a nivel nacional.',
  ogImage: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=1200&q=80',
  twitterCard: 'summary_large_image'
})

const companyStore = useCompanyStore()

const formSending = ref(false)
const formSuccess = ref(false)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  subject: 'Cotización de Bolsas',
  message: ''
})

const whatsappUrl = computed(() => {
  const phone = companyStore.companyInfo.contact_details?.whatsapp || '+573102003040'
  const text = encodeURIComponent('Hola, me comunico desde su página de contacto y me interesa solicitar una cotización comercial de sus productos.')
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`
})

const googleMapsSrc = computed(() => {
  return companyStore.companyInfo.contact_details?.google_maps_embed || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.0831634568853!2d-73.132644!3d7.116234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDYnNTguNCJOIDczwrAwNyc1Ny41Ilc!5e0!3m2!1ses!2sco!4v1680000000000'
})

async function submitForm() {
  formSending.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  formSending.value = false
  formSuccess.value = true
  
  form.name = ''
  form.phone = ''
  form.email = ''
  form.message = ''
  
  setTimeout(() => {
    formSuccess.value = false
  }, 5000)
}

onMounted(async () => {
  if (!Object.keys(companyStore.companyInfo).length) {
    await companyStore.fetchCompanyInfo()
  }
})
</script>
