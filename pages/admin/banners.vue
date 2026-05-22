<template>
  <div class="flex flex-col gap-8">
    <!-- Barra Superior de Control -->
    <div class="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm shrink-0">
      <div class="flex flex-col gap-1">
        <h3 class="font-title font-bold text-lg text-brand-dark-800">
          Gestión de Banners del Carrusel
        </h3>
        <p class="text-xs text-slate-500">
          Configure los slides principales del HeroSlider de la Home Page, con títulos de alto impacto.
        </p>
      </div>
      <BaseButton variant="primary" size="md" @click="openCreateModal">
        Nuevo Banner
        <template #iconRight>
          <Plus class="w-4.5 h-4.5" />
        </template>
      </BaseButton>
    </div>

    <!-- Alertas -->
    <div v-if="successMessage" class="p-4 bg-brand-green-50 text-brand-green-800 border border-brand-green-200 rounded-xl text-sm font-semibold flex items-center gap-2">
      <CheckCircle2 class="w-5 h-5 text-brand-green-500" />
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="p-4 bg-red-50 text-red-800 border border-red-200 rounded-xl text-sm font-semibold flex items-center gap-2">
      <XCircle class="w-5 h-5 text-red-500" />
      {{ errorMessage }}
    </div>

    <!-- Lista de Banners -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="slide in sortedBanners" 
        :key="slide.id"
        class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
      >
        <!-- Imagen de Fondo y Badge de Orden -->
        <div class="relative aspect-video bg-slate-100 border-b border-slate-100 overflow-hidden shrink-0">
          <NuxtImg 
            v-if="slide.image_url" 
            :src="slide.image_url" 
            :alt="slide.title"
            class="w-full h-full object-cover"
            format="webp"
          />
          <span class="absolute top-4 left-4 bg-brand-orange-500 text-white font-title text-xs font-bold px-2.5 py-0.5 rounded shadow">
            Orden: {{ slide.sort_order }}
          </span>
        </div>

        <!-- Textos del Slide -->
        <div class="p-6 flex flex-col gap-3 flex-grow">
          <h4 class="font-title font-extrabold text-lg text-brand-dark-800 line-clamp-1">
            {{ slide.title || 'Sin Título' }}
          </h4>
          <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {{ slide.subtitle || 'Sin descripción' }}
          </p>
          <span v-if="slide.link_url" class="font-mono text-[10px] text-slate-400 font-semibold truncate">
            Enlace: {{ slide.link_url }}
          </span>
        </div>

        <!-- Acciones en el Pie de Tarjeta -->
        <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
          <BaseButton variant="outline" size="sm" @click="openEditModal(slide)" class="py-2 px-3 text-xs">
            <Edit class="w-4 h-4 mr-1.5" />
            Editar
          </BaseButton>
          <BaseButton 
            variant="outline" 
            class="border-red-200 text-red-500 hover:bg-red-500 hover:text-white"
            size="sm" 
            @click="triggerDelete(slide)"
          >
            <Trash2 class="w-4 h-4" />
          </BaseButton>
        </div>
      </div>

      <div 
        v-if="companyStore.banners.length === 0" 
        class="col-span-full text-center py-16 bg-white border border-slate-200 rounded-2xl text-slate-400 font-semibold"
      >
        No hay banners agregados. Se mostrarán los slides por defecto en el portal principal.
      </div>
    </div>

    <!-- Modal Formulario de Banner (Crear / Editar) -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isModalOpen" 
        class="fixed inset-0 z-50 bg-brand-dark-950/50 backdrop-blur-sm flex items-center justify-center p-6"
      >
        <div 
          v-motion-slide-bottom
          class="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          <!-- Encabezado Modal -->
          <div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
            <h4 class="font-title font-extrabold text-lg text-brand-dark-800 uppercase tracking-wide">
              {{ isEditing ? 'Editar Slide' : 'Nuevo Slide de Carrusel' }}
            </h4>
            <button @click="closeModal" class="p-1 hover:text-red-500 transition-colors">
              <X class="w-6 h-6" />
            </button>
          </div>

          <!-- Formulario -->
          <form @submit.prevent="submitForm" class="p-6 flex flex-col gap-5 overflow-y-auto">
            <!-- Título del Slide -->
            <div class="flex flex-col gap-1.5">
              <label for="title" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Título Principal del Banner</label>
              <input 
                id="title" 
                v-model="form.title" 
                type="text" 
                required 
                class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
                placeholder="Ej: Invernaderos de Alta Gama"
              />
            </div>

            <!-- Subtítulo / Descripción -->
            <div class="flex flex-col gap-1.5">
              <label for="subtitle" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Subtítulo / Mensaje Secundario</label>
              <textarea 
                id="subtitle" 
                v-model="form.subtitle" 
                rows="3" 
                required 
                class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none resize-none"
                placeholder="Indique las especificaciones o la oferta de valor..."
              ></textarea>
            </div>

            <!-- Enlace del Botón y Orden -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="flex flex-col gap-1.5">
                <label for="link" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">URL del Botón (Enlace)</label>
                <input 
                  id="link" 
                  v-model="form.link_url" 
                  type="text" 
                  class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
                  placeholder="Ej: /productos"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label for="order" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Orden de Aparición</label>
                <input 
                  id="order" 
                  v-model.number="form.sort_order" 
                  type="number" 
                  min="0" 
                  required 
                  class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
                />
              </div>
            </div>

            <!-- Carga de Imagen de Banner -->
            <div class="flex flex-col md:flex-row gap-5 items-start">
              <div class="flex flex-col gap-1.5 flex-grow w-full">
                <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Imagen del Banner</label>
                <div class="flex items-center gap-3">
                  <input 
                    type="file" 
                    ref="bannerFileRef"
                    accept="image/*"
                    class="hidden" 
                    @change="uploadBannerImage"
                  />
                  <BaseButton 
                    variant="outline" 
                    size="sm" 
                    :loading="uploadingImage"
                    @click.prevent="bannerFileRef?.click()"
                  >
                    Seleccionar Foto
                  </BaseButton>
                </div>
              </div>
              
              <div v-if="form.image_url" class="relative w-24 h-16 border border-slate-200 rounded-xl overflow-hidden shadow-inner bg-slate-50 shrink-0">
                <NuxtImg :src="form.image_url" alt="Banner Preview" class="w-full h-full object-cover" />
                <button 
                  @click.prevent="form.image_url = ''"
                  class="absolute top-0.5 right-0.5 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow"
                >
                  <Trash2 class="w-3 h-3" />
                </button>
              </div>
            </div>

            <!-- Acciones Pie de Formulario -->
            <div class="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-2">
              <BaseButton variant="outline" size="sm" @click.prevent="closeModal">
                Cancelar
              </BaseButton>
              <BaseButton variant="primary" type="submit" size="sm" :loading="submitting">
                {{ isEditing ? 'Guardar Cambios' : 'Añadir Banner' }}
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useCompanyStore } from '~/stores/company'
import BaseButton from '~/components/ui/BaseButton.vue'
import { 
  Plus, 
  Trash2, 
  Edit, 
  X, 
  CheckCircle2, 
  XCircle 
} from 'lucide-vue-next'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

const companyStore = useCompanyStore()

const isModalOpen = ref(false)
const isEditing = ref(false)
const editingId = ref<string | null>(null)
const submitting = ref(false)
const uploadingImage = ref(false)
const bannerFileRef = ref<HTMLInputElement | null>(null)

const successMessage = ref('')
const errorMessage = ref('')

const form = reactive({
  title: '',
  subtitle: '',
  image_url: '',
  link_url: '',
  sort_order: 1
})

const sortedBanners = computed(() => {
  return [...companyStore.banners].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
})

// Subir banner a Supabase Storage
async function uploadBannerImage(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploadingImage.value = true
  errorMessage.value = ''
  
  const publicUrl = await companyStore.uploadImage(file, 'banners')
  
  if (publicUrl) {
    form.image_url = publicUrl
  } else {
    errorMessage.value = companyStore.error || 'Error al subir la imagen del banner.'
  }
  uploadingImage.value = false
}

function openCreateModal() {
  isEditing.value = false
  editingId.value = null
  form.title = ''
  form.subtitle = ''
  form.image_url = ''
  form.link_url = '/productos'
  form.sort_order = companyStore.banners.length + 1
  isModalOpen.value = true
}

function openEditModal(slide: any) {
  isEditing.value = true
  editingId.value = slide.id
  form.title = slide.title
  form.subtitle = slide.subtitle
  form.image_url = slide.image_url
  form.link_url = slide.link_url
  form.sort_order = slide.sort_order
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

// Guardar banners en la base de datos
async function submitForm() {
  submitting.value = true
  successMessage.value = ''
  errorMessage.value = ''

  let success = false
  if (isEditing.value && editingId.value) {
    success = await companyStore.saveBanner({
      id: editingId.value,
      ...form
    })
  } else {
    success = await companyStore.saveBanner(form)
  }

  if (success) {
    successMessage.value = isEditing.value 
      ? 'Slide de banner actualizado correctamente.' 
      : 'Nuevo slide añadido al slider corporativo.'
    isModalOpen.value = false
    await companyStore.fetchBanners()
    setTimeout(() => successMessage.value = '', 4000)
  } else {
    errorMessage.value = companyStore.error || 'Error al intentar guardar el slide del banner.'
  }
  submitting.value = false
}

// Eliminar banner
async function triggerDelete(slide: any) {
  const confirmed = confirm('¿Está seguro de eliminar este slide de carrusel? Se quitará de forma inmediata.')
  if (!confirmed) return

  successMessage.value = ''
  errorMessage.value = ''

  const success = await companyStore.deleteBanner(slide.id)
  
  if (success) {
    successMessage.value = 'Slide eliminado correctamente.'
    await companyStore.fetchBanners()
    setTimeout(() => successMessage.value = '', 4000)
  } else {
    errorMessage.value = companyStore.error || 'Error al eliminar slide.'
  }
}

onMounted(async () => {
  await companyStore.fetchBanners()
})
</script>
