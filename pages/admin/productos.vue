<template>
  <div class="flex flex-col gap-8">
    <!-- Barra Superior de Control -->
    <div class="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm shrink-0 gap-4">
      <div class="flex flex-col gap-1 w-full md:w-auto">
        <h3 class="font-title font-bold text-lg text-brand-dark-800">
          Listado de Productos
        </h3>
        <p class="text-xs text-slate-500">
          Cree y edite fichas técnicas, galerías de fotos y categorías de productos en tiempo real.
        </p>
      </div>

      <!-- Buscador y CTA -->
      <div class="flex items-center gap-3 w-full md:w-auto self-end">
        <div class="relative w-full md:w-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-inner">
          <input 
            v-model="searchTerm" 
            type="text" 
            placeholder="Buscar..."
            class="w-full pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none"
          />
          <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
        <BaseButton variant="primary" size="sm" @click="openCreateModal" class="shrink-0">
          Nuevo Producto
          <template #iconRight>
            <Plus class="w-4 h-4" />
          </template>
        </BaseButton>
      </div>
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

    <!-- Tabla de Productos -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <table class="w-full text-sm text-left border-collapse">
        <thead class="bg-slate-50 text-brand-dark-700 uppercase font-title font-semibold text-xs tracking-wider border-b border-slate-200">
          <tr>
            <th class="px-6 py-4">Foto</th>
            <th class="px-6 py-4">Nombre</th>
            <th class="px-6 py-4">Categoría</th>
            <th class="px-6 py-4 text-center">Destacado</th>
            <th class="px-6 py-4 text-center">Especificaciones</th>
            <th class="px-6 py-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="prod in searchedProducts" :key="prod.id" class="hover:bg-slate-50 transition-colors">
            <!-- Foto Miniatura -->
            <td class="px-6 py-4">
              <div class="w-16 h-12 rounded-lg border border-slate-100 overflow-hidden bg-slate-50 shadow-inner shrink-0">
                <NuxtImg 
                  v-if="prod.images && prod.images[0]" 
                  :src="prod.images[0]" 
                  :alt="prod.name"
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
              <div class="flex flex-col gap-0.5">
                <span>{{ prod.name }}</span>
                <span class="font-mono text-[10px] text-slate-400 font-semibold">{{ prod.slug }}</span>
              </div>
            </td>
            <!-- Categoría -->
            <td class="px-6 py-4 text-brand-green-600 font-semibold whitespace-nowrap">
              {{ prod.category?.name || 'Sin Categoría' }}
            </td>
            <!-- Destacado -->
            <td class="px-6 py-4 text-center">
              <span 
                class="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                :class="[prod.featured ? 'bg-brand-orange-50 text-brand-orange-600 border border-brand-orange-200' : 'bg-slate-100 text-slate-400']"
              >
                {{ prod.featured ? 'Sí' : 'No' }}
              </span>
            </td>
            <!-- Cantidad de Especificaciones -->
            <td class="px-6 py-4 text-center text-slate-500 font-mono text-xs">
              {{ Object.keys(prod.specifications || {}).length }} filas
            </td>
            <!-- Acciones -->
            <td class="px-6 py-4 text-center">
              <div class="flex items-center justify-center gap-2">
                <button 
                  @click="openEditModal(prod)"
                  class="p-2 text-brand-green-600 hover:bg-brand-green-50 rounded-lg transition-all"
                  title="Editar Producto"
                >
                  <Edit class="w-4.5 h-4.5" />
                </button>
                <button 
                  @click="triggerDelete(prod)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Eliminar Producto"
                >
                  <Trash2 class="w-4.5 h-4.5" />
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="searchedProducts.length === 0">
            <td colspan="6" class="text-center py-12 text-slate-400 font-semibold">
              No se encontraron productos coincidentes.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Formulario de Producto (Crear / Editar) -->
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
          class="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <!-- Encabezado Modal -->
          <div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
            <h4 class="font-title font-extrabold text-lg text-brand-dark-800 uppercase tracking-wide">
              {{ isEditing ? 'Editar Producto' : 'Crear Nuevo Producto' }}
            </h4>
            <button @click="closeModal" class="p-1 hover:text-red-500 transition-colors">
              <X class="w-6 h-6" />
            </button>
          </div>

          <!-- Formulario con scroll -->
          <form @submit.prevent="submitForm" class="p-6 flex flex-col gap-6 overflow-y-auto">
            <!-- 1. Campos Base (Nombre, Slug, Categoría, Destacado) -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div class="md:col-span-6 flex flex-col gap-1.5">
                <label for="name" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Nombre del Producto</label>
                <input 
                  id="name" 
                  v-model="form.name" 
                  type="text" 
                  required 
                  class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
                  placeholder="Ej: Bolsa de basura de alta tracción"
                  @input="generateSlug"
                />
              </div>

              <div class="md:col-span-6 flex flex-col gap-1.5">
                <label for="slug" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Slug identificador (URL)</label>
                <input 
                  id="slug" 
                  v-model="form.slug" 
                  type="text" 
                  required 
                  class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono text-brand-orange-500 focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
                  placeholder="bolsa-basura-alta-traccion"
                />
              </div>

              <div class="md:col-span-6 flex flex-col gap-1.5">
                <label for="category" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Categoría del Portafolio</label>
                <select 
                  id="category" 
                  v-model="form.category_id" 
                  required 
                  class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-white focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
                >
                  <option v-for="cat in productsStore.categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>

              <div class="md:col-span-6 flex items-center gap-3 pt-6">
                <input 
                  id="featured" 
                  v-model="form.featured" 
                  type="checkbox" 
                  class="w-5 h-5 text-brand-green-500 border-slate-200 rounded focus:ring-brand-green-500 focus:ring-1"
                />
                <label for="featured" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide cursor-pointer select-none">
                  Marcar como Producto Destacado (Aparece en Home)
                </label>
              </div>
            </div>

            <!-- 2. Descripción Corta -->
            <div class="flex flex-col gap-1.5">
              <label for="description" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Descripción Comercial / Resumen</label>
              <textarea 
                id="description" 
                v-model="form.description" 
                rows="3" 
                required 
                class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none resize-none"
                placeholder="Indique las características más destacadas..."
              ></textarea>
            </div>

            <!-- 3. Especificaciones Técnicas (JSON Dinámico de Llave/Valor en Filas) -->
            <div class="flex flex-col gap-4 border-t border-slate-100 pt-4">
              <div class="flex justify-between items-center">
                <span class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Ficha Técnica Especializada</span>
                <BaseButton variant="outline" size="sm" @click.prevent="addSpecificationRow">
                  Añadir Fila
                  <template #iconRight>
                    <Plus class="w-3.5 h-3.5" />
                  </template>
                </BaseButton>
              </div>

              <!-- Listado de Llave/Valores -->
              <div class="flex flex-col gap-3">
                <div 
                  v-for="(row, idx) in specificationRows" 
                  :key="idx"
                  class="flex items-center gap-3 bg-slate-50 border border-slate-200/60 p-3 rounded-xl"
                >
                  <input 
                    v-model="row.key" 
                    type="text" 
                    placeholder="Ej: Calibre" 
                    class="w-1/3 px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:border-brand-green-500 outline-none"
                  />
                  <input 
                    v-model="row.value" 
                    type="text" 
                    placeholder="Ej: 2.5 mm" 
                    class="flex-grow px-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-brand-green-500 outline-none"
                  />
                  <button 
                    @click.prevent="removeSpecificationRow(idx)"
                    class="text-red-500 hover:text-red-600 transition-colors p-1"
                    title="Eliminar Especificación"
                  >
                    <Trash2 class="w-4.5 h-4.5" />
                  </button>
                </div>
                <div v-if="specificationRows.length === 0" class="text-center py-3 text-xs text-slate-400">
                  Sin especificaciones asignadas. Se presentará vacío.
                </div>
              </div>
            </div>

            <!-- 4. Subida y Gestión de Galería de Imágenes (Múltiples Archivos) -->
            <div class="flex flex-col gap-4 border-t border-slate-100 pt-4">
              <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Galería de Imágenes del Producto</label>
              
              <div class="flex items-center gap-4">
                <input 
                  type="file" 
                  ref="galleryFilesRef"
                  accept="image/*"
                  multiple
                  class="hidden" 
                  @change="uploadGalleryImages"
                />
                <BaseButton 
                  variant="outline" 
                  size="sm" 
                  :loading="uploadingGallery"
                  @click.prevent="$refs.galleryFilesRef.click()"
                >
                  Subir Foto(s) de Galería
                </BaseButton>
                <span class="text-xs text-slate-400">
                  Puede seleccionar varios archivos a la vez. Se subirán de forma directa.
                </span>
              </div>

              <!-- Listado de miniaturas cargadas -->
              <div v-if="form.images.length > 0" class="flex flex-wrap gap-4 mt-2">
                <div 
                  v-for="(url, idx) in form.images" 
                  :key="idx"
                  class="relative w-28 h-20 border border-slate-200 rounded-xl overflow-hidden bg-slate-50 shadow-inner group"
                >
                  <NuxtImg :src="url" alt="Gallery Preview" class="w-full h-full object-cover" />
                  <!-- Overlay de eliminación rápido -->
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <button 
                      @click.prevent="removeGalleryImage(idx)"
                      class="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow"
                      title="Eliminar imagen"
                    >
                      <Trash2 class="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span class="absolute bottom-1 left-1 bg-brand-dark-900/60 text-white text-[8px] font-bold px-1 py-0.5 rounded">
                    {{ idx === 0 ? 'Portada' : `Foto ${idx + 1}` }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Acciones Pie de Formulario -->
            <div class="flex justify-end gap-3 pt-5 border-t border-slate-100 shrink-0 mt-4">
              <BaseButton variant="outline" size="sm" @click.prevent="closeModal">
                Cancelar
              </BaseButton>
              <BaseButton variant="primary" type="submit" size="sm" :loading="submitting">
                {{ isEditing ? 'Guardar Producto' : 'Crear Producto' }}
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
import { useProductsStore, type Product } from '~/stores/products'
import BaseButton from '~/components/ui/BaseButton.vue'
import { 
  Plus, 
  Trash2, 
  Edit, 
  X, 
  Image, 
  CheckCircle2, 
  XCircle,
  Search
} from 'lucide-vue-next'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

const companyStore = useCompanyStore()
const productsStore = useProductsStore()

const searchTerm = ref('')
const isModalOpen = ref(false)
const isEditing = ref(false)
const editingId = ref<string | null>(null)
const submitting = ref(false)
const uploadingGallery = ref(false)
const galleryFilesRef = ref<HTMLInputElement | null>(null)

const successMessage = ref('')
const errorMessage = ref('')

// Formulario reactivo base
const form = reactive({
  name: '',
  slug: '',
  description: '',
  category_id: '',
  featured: false,
  images: [] as string[],
  specifications: {} as Record<string, string>
})

// Filas para editor visual de Llave / Valor de especificaciones
const specificationRows = ref<{ key: string; value: string }[]>([])

// Filtrar productos del panel de control
const searchedProducts = computed(() => {
  const q = searchTerm.value.toLowerCase().trim()
  if (!q) return productsStore.products
  return productsStore.products.filter(
    p => 
      p.name.toLowerCase().includes(q) || 
      p.slug.toLowerCase().includes(q) ||
      p.category?.name.toLowerCase().includes(q)
  )
})

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

// Subir múltiples fotos de galería de producto a Supabase Storage
async function uploadGalleryImages(e: Event) {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (!files || files.length === 0) return

  uploadingGallery.value = true
  errorMessage.value = ''

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const publicUrl = await companyStore.uploadImage(file, 'products')
    if (publicUrl) {
      form.images.push(publicUrl)
    } else {
      errorMessage.value = companyStore.error || 'Ocurrió un error al subir alguna de las imágenes.'
      break
    }
  }

  // Limpiar el selector
  if (galleryFilesRef.value) {
    galleryFilesRef.value.value = ''
  }
  uploadingGallery.value = false
}

function removeGalleryImage(index: number) {
  form.images.splice(index, 1)
}

function addSpecificationRow() {
  specificationRows.value.push({ key: '', value: '' })
}

function removeSpecificationRow(index: number) {
  specificationRows.value.splice(index, 1)
}

function openCreateModal() {
  isEditing.value = false
  editingId.value = null
  
  form.name = ''
  form.slug = ''
  form.description = ''
  form.featured = false
  form.images = []
  form.specifications = {}
  
  // Seleccionar la primera categoría como default si existe
  form.category_id = productsStore.categories[0]?.id || ''
  
  specificationRows.value = [
    { key: 'Material', value: 'Polietileno' },
    { key: 'Presentación', value: 'Rollo / Paquete' }
  ]
  
  isModalOpen.value = true
}

function openEditModal(prod: Product) {
  isEditing.value = true
  editingId.value = prod.id
  
  form.name = prod.name
  form.slug = prod.slug
  form.description = prod.description
  form.category_id = prod.category_id
  form.featured = prod.featured
  form.images = [...(prod.images || [])]
  form.specifications = { ...(prod.specifications || {}) }
  
  // Transformar el objeto specifications a filas llave/valor
  specificationRows.value = Object.entries(prod.specifications || {}).map(([key, value]) => ({
    key,
    value: value as string
  }))
  
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

// Guardar los datos en Supabase
async function submitForm() {
  submitting.value = true
  successMessage.value = ''
  errorMessage.value = ''

  // Serializar filas del editor visual de especificaciones a un objeto plano JSON
  const specs: Record<string, string> = {}
  specificationRows.value.forEach(row => {
    if (row.key.trim() && row.value.trim()) {
      specs[row.key.trim()] = row.value.trim()
    }
  })
  form.specifications = specs

  let success = false
  if (isEditing.value && editingId.value) {
    success = await productsStore.saveProduct({
      id: editingId.value,
      ...form
    })
  } else {
    success = await productsStore.saveProduct(form)
  }

  if (success) {
    successMessage.value = isEditing.value 
      ? 'Ficha de producto guardada y actualizada con éxito.' 
      : 'Nuevo producto integrado al catálogo de ventas.'
    isModalOpen.value = false
    await productsStore.fetchProducts()
    setTimeout(() => successMessage.value = '', 4000)
  } else {
    errorMessage.value = productsStore.error || 'Error al intentar guardar el producto.'
  }
  submitting.value = false
}

// Eliminar producto
async function triggerDelete(prod: Product) {
  const confirmed = confirm(`¿Está seguro de eliminar el producto "${prod.name}" del catálogo? Esta acción no se puede deshacer.`)
  if (!confirmed) return

  successMessage.value = ''
  errorMessage.value = ''

  const success = await productsStore.deleteProduct(prod.id)
  
  if (success) {
    successMessage.value = 'Producto descontinuado y eliminado correctamente.'
    await productsStore.fetchProducts()
    setTimeout(() => successMessage.value = '', 4000)
  } else {
    errorMessage.value = productsStore.error || 'Error al eliminar producto.'
  }
}

onMounted(async () => {
  if (productsStore.categories.length === 0) {
    await productsStore.fetchCategories()
  }
  await productsStore.fetchProducts()
})
</script>
