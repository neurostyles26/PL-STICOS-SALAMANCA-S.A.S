<template>
  <div class="flex flex-col gap-8">
    <!-- Barra Superior de Control -->
    <div class="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm shrink-0">
      <div class="flex flex-col gap-1">
        <h3 class="font-title font-bold text-lg text-brand-dark-800">
          Listado de Categorías
        </h3>
        <p class="text-xs text-slate-500">
          Administre las categorías del catálogo, incluyendo fotos de portada y descripciones técnicas.
        </p>
      </div>
      <BaseButton variant="primary" size="md" @click="openCreateModal">
        Nueva Categoría
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

    <!-- Tabla / Lista de Categorías -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <table class="w-full text-sm text-left border-collapse">
        <thead class="bg-slate-50 text-brand-dark-700 uppercase font-title font-semibold text-xs tracking-wider border-b border-slate-200">
          <tr>
            <th class="px-6 py-4">Portada</th>
            <th class="px-6 py-4">Nombre</th>
            <th class="px-6 py-4">Slug</th>
            <th class="px-6 py-4">Descripción</th>
            <th class="px-6 py-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="cat in productsStore.categories" :key="cat.id" class="hover:bg-slate-50 transition-colors">
            <!-- Portada -->
            <td class="px-6 py-4 shrink-0">
              <div class="w-16 h-12 rounded-lg border border-slate-100 overflow-hidden bg-slate-50 shadow-inner">
                <NuxtImg 
                  v-if="cat.image_url" 
                  :src="cat.image_url" 
                  :alt="cat.name"
                  class="w-full h-full object-cover"
                  format="webp"
                />
                <div v-else class="w-full h-full bg-slate-150 flex items-center justify-center text-slate-400">
                  <Image class="w-5 h-5" />
                </div>
              </div>
            </td>
            <!-- Nombre -->
            <td class="px-6 py-4 font-bold text-brand-dark-800 whitespace-nowrap">
              {{ cat.name }}
            </td>
            <!-- Slug -->
            <td class="px-6 py-4 font-mono text-xs text-brand-orange-500">
              {{ cat.slug }}
            </td>
            <!-- Descripción -->
            <td class="px-6 py-4 text-slate-500 max-w-xs truncate" :title="cat.description">
              {{ cat.description }}
            </td>
            <!-- Acciones -->
            <td class="px-6 py-4 text-center">
              <div class="flex items-center justify-center gap-2">
                <button 
                  @click="openEditModal(cat)"
                  class="p-2 text-brand-green-600 hover:bg-brand-green-50 rounded-lg transition-all"
                  title="Editar Categoría"
                >
                  <Edit class="w-4.5 h-4.5" />
                </button>
                <button 
                  @click="triggerDelete(cat)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Eliminar Categoría"
                >
                  <Trash2 class="w-4.5 h-4.5" />
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="productsStore.categories.length === 0">
            <td colspan="5" class="text-center py-12 text-slate-400 font-semibold">
              No hay categorías cargadas en el catálogo.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Formulario de Categoría (Crear / Editar) -->
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
          <div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h4 class="font-title font-extrabold text-lg text-brand-dark-800 uppercase tracking-wide">
              {{ isEditing ? 'Editar Categoría' : 'Nueva Categoría' }}
            </h4>
            <button @click="closeModal" class="p-1 hover:text-red-500 transition-colors">
              <X class="w-6 h-6" />
            </button>
          </div>

          <!-- Formulario -->
          <form @submit.prevent="submitForm" class="p-6 flex flex-col gap-5 overflow-y-auto">
            <!-- Nombre -->
            <div class="flex flex-col gap-1.5">
              <label for="name" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Nombre de la Categoría</label>
              <input 
                id="name" 
                v-model="form.name" 
                type="text" 
                required 
                class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
                placeholder="Ej: Bolsas Comerciales"
                @input="generateSlug"
              />
            </div>

            <!-- Slug -->
            <div class="flex flex-col gap-1.5">
              <label for="slug" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Slug identificador (URL)</label>
              <input 
                id="slug" 
                v-model="form.slug" 
                type="text" 
                required 
                class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono text-brand-orange-500 focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
                placeholder="ej-bolsas-comerciales"
              />
            </div>

            <!-- Descripción -->
            <div class="flex flex-col gap-1.5">
              <label for="description" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Descripción Técnica</label>
              <textarea 
                id="description" 
                v-model="form.description" 
                rows="4" 
                required 
                class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none resize-none"
                placeholder="Describa el propósito y calibres comunes..."
              ></textarea>
            </div>

            <!-- Subida de Imagen -->
            <div class="flex flex-col md:flex-row gap-5 items-start">
              <div class="flex flex-col gap-1.5 flex-grow w-full">
                <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Imagen Portada</label>
                <div class="flex items-center gap-3">
                  <input 
                    type="file" 
                    ref="categoryFileRef"
                    accept="image/*"
                    class="hidden" 
                    @change="uploadCategoryImage"
                  />
                  <BaseButton 
                    variant="outline" 
                    size="sm" 
                    :loading="uploadingImage"
                    @click.prevent="categoryFileRef?.click()"
                  >
                    Cargar Portada
                  </BaseButton>
                </div>
              </div>
              
              <div v-if="form.image_url" class="relative w-24 h-20 border border-slate-200 rounded-xl overflow-hidden shadow-inner bg-slate-50 shrink-0">
                <NuxtImg :src="form.image_url" alt="Portada Preview" class="w-full h-full object-cover" />
                <button 
                  @click.prevent="form.image_url = ''"
                  class="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow"
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
                {{ isEditing ? 'Actualizar Categoría' : 'Crear Categoría' }}
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useCompanyStore } from '~/stores/company'
import { useProductsStore, type Category } from '~/stores/products'
import BaseButton from '~/components/ui/BaseButton.vue'
import { 
  Plus, 
  Trash2, 
  Edit, 
  X, 
  Image, 
  CheckCircle2, 
  XCircle 
} from 'lucide-vue-next'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

const companyStore = useCompanyStore()
const productsStore = useProductsStore()

const isModalOpen = ref(false)
const isEditing = ref(false)
const editingId = ref<string | null>(null)
const submitting = ref(false)
const uploadingImage = ref(false)
const categoryFileRef = ref<HTMLInputElement | null>(null)

const successMessage = ref('')
const errorMessage = ref('')

const form = reactive({
  name: '',
  slug: '',
  description: '',
  image_url: ''
})

// Auto-generador de slugs inteligentes
function generateSlug() {
  if (!isEditing.value) {
    form.slug = form.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
}

// Subir portada de categoría a Supabase Storage
async function uploadCategoryImage(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploadingImage.value = true
  errorMessage.value = ''
  
  const publicUrl = await companyStore.uploadImage(file, 'categories')
  
  if (publicUrl) {
    form.image_url = publicUrl
  } else {
    errorMessage.value = companyStore.error || 'No se pudo subir la foto de portada.'
  }
  uploadingImage.value = false
}

function openCreateModal() {
  isEditing.value = false
  editingId.value = null
  form.name = ''
  form.slug = ''
  form.description = ''
  form.image_url = ''
  isModalOpen.value = true
}

function openEditModal(cat: Category) {
  isEditing.value = true
  editingId.value = cat.id
  form.name = cat.name
  form.slug = cat.slug
  form.description = cat.description || ''
  form.image_url = cat.image_url || ''
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

// Envío del CRUD a la base de datos
async function submitForm() {
  submitting.value = true
  successMessage.value = ''
  errorMessage.value = ''

  let success = false
  if (isEditing.value && editingId.value) {
    success = await productsStore.saveCategory({
      id: editingId.value,
      ...form
    })
  } else {
    success = await productsStore.saveCategory(form)
  }

  if (success) {
    successMessage.value = isEditing.value 
      ? 'Categoría actualizada correctamente.' 
      : 'Nueva categoría creada con éxito en el catálogo.'
    isModalOpen.value = false
    await productsStore.fetchCategories()
    setTimeout(() => successMessage.value = '', 4000)
  } else {
    errorMessage.value = productsStore.error || 'Error al guardar la categoría.'
  }
  submitting.value = false
}

// Eliminar categoría
async function triggerDelete(cat: Category) {
  const confirmed = confirm(`¿Está completamente seguro de eliminar la categoría "${cat.name}"? Esto podría afectar a los productos asociados.`)
  if (!confirmed) return

  successMessage.value = ''
  errorMessage.value = ''

  const success = await productsStore.deleteCategory(cat.id)
  
  if (success) {
    successMessage.value = 'Categoría eliminada con éxito del catálogo.'
    await productsStore.fetchCategories()
    setTimeout(() => successMessage.value = '', 4000)
  } else {
    errorMessage.value = productsStore.error || 'No se puede eliminar porque existen productos en esta categoría.'
  }
}

onMounted(async () => {
  if (productsStore.categories.length === 0) {
    await productsStore.fetchCategories()
  }
})
</script>
