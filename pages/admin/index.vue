<template>
  <div class="flex flex-col gap-8">
    <div class="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm shrink-0">
      <div class="flex flex-col gap-1">
        <h3 class="font-title font-bold text-lg text-brand-dark-800">
          Información General de la Empresa
        </h3>
        <p class="text-xs text-slate-500">
          Gestione la historia, misión, visión, valores y datos de contacto de Plásticos Salamanca.
        </p>
      </div>
      <BaseButton 
        variant="primary" 
        size="md" 
        :loading="saving"
        @click="saveCompanyInfo"
      >
        Guardar Cambios
        <template #iconRight>
          <Save class="w-4 h-4" />
        </template>
      </BaseButton>
    </div>

    <!-- Mensaje de Éxito / Error -->
    <div v-if="successMessage" class="p-4 bg-brand-green-50 text-brand-green-800 border border-brand-green-200 rounded-xl text-sm font-semibold flex items-center gap-2">
      <CheckCircle2 class="w-5 h-5 text-brand-green-500" />
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="p-4 bg-red-50 text-red-800 border border-red-200 rounded-xl text-sm font-semibold flex items-center gap-2">
      <XCircle class="w-5 h-5 text-red-500" />
      {{ errorMessage }}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Columna 1: Historia, Misión y Visión (Campos de Texto) -->
      <div class="lg:col-span-8 flex flex-col gap-8">
        <!-- 1. Historia -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5">
          <h4 class="font-title font-bold text-base text-brand-dark-800 border-b border-slate-100 pb-2 flex items-center gap-2">
            <BookOpen class="w-5 h-5 text-brand-green-500" />
            Nuestra Historia
          </h4>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Texto de la Historia</label>
            <textarea 
              v-model="info.history.text" 
              rows="6" 
              class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all resize-none"
              placeholder="Describa la historia y trayectoria de la empresa..."
            ></textarea>
          </div>

          <!-- Imagen de la Historia con Selector de Archivo -->
          <div class="flex flex-col md:flex-row gap-5 items-start">
            <div class="flex flex-col gap-1.5 flex-grow w-full">
              <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Imagen Corporativa (Historia)</label>
              <div class="flex items-center gap-3">
                <input 
                  type="file" 
                  ref="historyFileRef"
                  accept="image/*"
                  class="hidden" 
                  @change="uploadHistoryImage"
                />
                <BaseButton 
                  variant="outline" 
                  size="sm" 
                  :loading="uploadingHistory"
                  @click="$refs.historyFileRef.click()"
                >
                  Seleccionar Imagen
                </BaseButton>
                <span class="text-xs text-slate-500 truncate max-w-[200px]">
                  {{ info.history.image_url ? 'Imagen cargada' : 'Sin imagen cargada' }}
                </span>
              </div>
            </div>
            
            <div v-if="info.history.image_url" class="relative w-28 h-28 border border-slate-200 rounded-xl overflow-hidden shadow-inner bg-slate-50 shrink-0">
              <NuxtImg :src="info.history.image_url" alt="Historia Preview" class="w-full h-full object-cover" />
              <button 
                @click="info.history.image_url = ''"
                class="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow"
                title="Eliminar imagen"
              >
                <Trash2 class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- 2. Misión y Visión -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Misión -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <h4 class="font-title font-bold text-base text-brand-dark-800 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Target class="w-5 h-5 text-brand-green-500" />
              Misión
            </h4>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Texto de la Misión</label>
              <textarea 
                v-model="info.mission.text" 
                rows="6" 
                class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all resize-none"
                placeholder="Describa la misión corporativa..."
              ></textarea>
            </div>
          </div>

          <!-- Visión -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <h4 class="font-title font-bold text-base text-brand-dark-800 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Eye class="w-5 h-5 text-brand-orange-500" />
              Visión
            </h4>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Texto de la Visión</label>
              <textarea 
                v-model="info.vision.text" 
                rows="6" 
                class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all resize-none"
                placeholder="Describa la visión a futuro..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- 3. Gestión de Valores Corporativos -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5">
          <h4 class="font-title font-bold text-base text-brand-dark-800 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Award class="w-5 h-5 text-brand-green-500" />
            Valores Corporativos
          </h4>
          
          <div class="flex gap-3">
            <input 
              v-model="newValue" 
              type="text" 
              placeholder="Ej: Calidad: Ofrecer materiales duraderos..."
              class="flex-grow px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all"
              @keyup.enter="addValue"
            />
            <BaseButton variant="outline" size="sm" @click="addValue">
              Agregar
            </BaseButton>
          </div>

          <ul class="flex flex-col gap-2.5">
            <li 
              v-for="(val, idx) in info.values.list" 
              :key="idx"
              class="flex justify-between items-center bg-slate-50 border border-slate-150 p-3.5 rounded-xl text-sm hover:bg-slate-100 transition-colors"
            >
              <span class="font-semibold text-brand-dark-800">{{ val }}</span>
              <button 
                @click="removeValue(idx)"
                class="text-red-500 hover:text-red-600 transition-colors p-1"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </li>
            <li v-if="info.values.list.length === 0" class="text-center py-4 text-xs text-slate-400">
              No hay valores corporativos agregados.
            </li>
          </ul>
        </div>
      </div>

      <!-- Columna 2: Datos de Contacto y Redes (Campos Cortos) -->
      <div class="lg:col-span-4 flex flex-col gap-8">
        <!-- 0. Logo Corporativo -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5">
          <h4 class="font-title font-bold text-base text-brand-dark-800 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Upload class="w-5 h-5 text-brand-green-500" />
            Logo de la Empresa
          </h4>

          <!-- Especificaciones de diseño profesional -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
            <span class="text-xs font-bold text-brand-dark-800">Especificaciones Recomendadas:</span>
            <ul class="text-[11px] text-slate-500 list-disc pl-4 flex flex-col gap-1.5 leading-normal">
              <li><strong>Formato:</strong> PNG con fondo transparente o SVG para una nitidez óptima.</li>
              <li><strong>Proporción:</strong> Formato horizontal (ej. 3:1) o cuadrado (1:1).</li>
              <li><strong>Tamaño óptimo:</strong> 300px a 500px de ancho para evitar peso excesivo.</li>
              <li><strong>Contraste:</strong> Asegúrese de que sea legible sobre fondo claro (Navbar) y fondo oscuro (Footer).</li>
            </ul>
          </div>

          <!-- Selector de archivo y carga del logo -->
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <input 
                type="file" 
                ref="logoFileRef"
                accept="image/*"
                class="hidden" 
                @change="uploadLogoImage"
              />
              <BaseButton 
                variant="outline" 
                size="sm" 
                :loading="uploadingLogo"
                @click="$refs.logoFileRef.click()"
              >
                Subir Logo
              </BaseButton>
              <span class="text-xs text-slate-500 truncate max-w-[150px]">
                {{ info.logo.image_url ? 'Logo cargado' : 'Sin logo cargado' }}
              </span>
            </div>

            <!-- Preview del Logo -->
            <div v-if="info.logo.image_url" class="relative p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-center min-h-[100px] shadow-inner">
              <NuxtImg :src="info.logo.image_url" alt="Logo Preview" class="max-h-12 object-contain" />
              <button 
                @click="info.logo.image_url = ''"
                type="button"
                class="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow"
                title="Eliminar logo"
              >
                <Trash2 class="w-3.5 h-3.5" />
              </button>
            </div>

            <!-- Activar logo personalizado -->
            <div v-if="info.logo.image_url" class="flex items-center gap-2.5 pt-1">
              <input 
                id="useCustomLogo"
                v-model="info.logo.use_custom"
                type="checkbox"
                class="w-4 h-4 text-brand-green-600 border-slate-350 rounded focus:ring-brand-green-500 cursor-pointer"
              />
              <label for="useCustomLogo" class="text-xs font-bold text-brand-dark-700 select-none cursor-pointer">
                Usar este logotipo en la web
              </label>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5">
          <h4 class="font-title font-bold text-base text-brand-dark-800 border-b border-slate-100 pb-2 flex items-center gap-2">
            <PhoneCall class="w-5 h-5 text-brand-orange-500" />
            Atención y Canales
          </h4>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Dirección Física</label>
            <input 
              v-model="info.contact_details.address" 
              type="text" 
              class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
              placeholder="Ej: Zona Industrial, Bucaramanga"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Número de Teléfono</label>
            <input 
              v-model="info.contact_details.phone" 
              type="text" 
              class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
              placeholder="Ej: (+57) 607 6351234"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Correo de Ventas</label>
            <input 
              v-model="info.contact_details.email" 
              type="email" 
              class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
              placeholder="contacto@plasticossalamanca.com"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">WhatsApp Comercial (+ código país)</label>
            <input 
              v-model="info.contact_details.whatsapp" 
              type="text" 
              class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
              placeholder="Ej: +573102003040"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Google Maps Embed URL (Iframe src)</label>
            <textarea 
              v-model="info.contact_details.google_maps_embed" 
              rows="3" 
              class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none resize-none"
              placeholder="Pegue la URL src del iframe de Google Maps..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useCompanyStore } from '~/stores/company'
import BaseButton from '~/components/ui/BaseButton.vue'
import { 
  Save, 
  Trash2, 
  BookOpen, 
  Target, 
  Eye, 
  Award, 
  PhoneCall, 
  CheckCircle2, 
  XCircle,
  Upload
} from 'lucide-vue-next'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

const companyStore = useCompanyStore()

const saving = ref(false)
const uploadingHistory = ref(false)
const uploadingLogo = ref(false)
const historyFileRef = ref<HTMLInputElement | null>(null)
const logoFileRef = ref<HTMLInputElement | null>(null)
const successMessage = ref('')
const errorMessage = ref('')

const newValue = ref('')

const info = reactive({
  logo: { image_url: '', use_custom: false },
  history: { text: '', image_url: '' },
  mission: { text: '' },
  vision: { text: '' },
  values: { list: [] as string[] },
  contact_details: { address: '', phone: '', email: '', whatsapp: '', google_maps_embed: '' }
})

async function loadCompanyData() {
  if (!Object.keys(companyStore.companyInfo).length) {
    await companyStore.fetchCompanyInfo()
  }
  
  const original = companyStore.companyInfo
  info.logo = {
    image_url: original.logo?.image_url || '',
    use_custom: original.logo?.use_custom ?? false
  }
  info.history = { 
    text: original.history?.text || '', 
    image_url: original.history?.image_url || '' 
  }
  info.mission = { text: original.mission?.text || '' }
  info.vision = { text: original.vision?.text || '' }
  info.values = { list: Array.isArray(original.values?.list) ? [...original.values.list] : [] }
  
  const originalContact = original.contact_details || {}
  info.contact_details = {
    address: originalContact.address || '',
    phone: originalContact.phone || '',
    email: originalContact.email || '',
    whatsapp: originalContact.whatsapp || '',
    google_maps_embed: originalContact.google_maps_embed || ''
  }
}

// Subir foto del logo a Supabase Storage
async function uploadLogoImage(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploadingLogo.value = true
  errorMessage.value = ''
  
  const publicUrl = await companyStore.uploadImage(file, 'logo')
  
  if (publicUrl) {
    info.logo.image_url = publicUrl
    info.logo.use_custom = true
    successMessage.value = 'Logotipo corporativo cargado con éxito.'
    setTimeout(() => successMessage.value = '', 4000)
  } else {
    errorMessage.value = companyStore.error || 'Error al intentar subir el logo.'
  }
  uploadingLogo.value = false
}

// Subir foto de la historia a Supabase Storage
async function uploadHistoryImage(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploadingHistory.value = true
  errorMessage.value = ''
  
  const publicUrl = await companyStore.uploadImage(file, 'company')
  
  if (publicUrl) {
    info.history.image_url = publicUrl
    successMessage.value = 'Imagen corporativa cargada con éxito en Supabase.'
    setTimeout(() => successMessage.value = '', 4000)
  } else {
    errorMessage.value = companyStore.error || 'Error al intentar subir la imagen.'
  }
  uploadingHistory.value = false
}

function addValue() {
  if (newValue.value.trim()) {
    info.values.list.push(newValue.value.trim())
    newValue.value = ''
  }
}

function removeValue(index: number) {
  info.values.list.splice(index, 1)
}

// Guardar toda la información de vuelta en la BD
async function saveCompanyInfo() {
  saving.value = true
  successMessage.value = ''
  errorMessage.value = ''
  
  const success = await companyStore.updateCompanyInfo(info)
  
  if (success) {
    successMessage.value = 'Información general de la empresa actualizada con éxito.'
    setTimeout(() => successMessage.value = '', 5000)
  } else {
    errorMessage.value = companyStore.error || 'Error al actualizar información en la base de datos.'
  }
  saving.value = false
}

onMounted(async () => {
  await loadCompanyData()
})
</script>
