<template>
  <div class="flex flex-col gap-8">
    <!-- Barra Superior de Control -->
    <div class="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm shrink-0">
      <div class="flex flex-col gap-1">
        <h3 class="font-title font-bold text-lg text-brand-dark-800">
          Gestión del Blog
        </h3>
        <p class="text-xs text-slate-500">
          Cree, edite y publique artículos técnicos, noticias y guías de interés comercial.
        </p>
      </div>
      <BaseButton variant="primary" size="md" @click="openCreateModal">
        Nuevo Artículo
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

    <!-- Buscador y Filtros -->
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div class="relative w-full sm:max-w-xs">
        <Search class="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        <input 
          v-model="searchTerm" 
          type="text" 
          placeholder="Buscar artículo por título..." 
          class="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 outline-none transition-all"
        />
      </div>
      <div class="flex gap-2">
        <span class="text-xs text-slate-400 font-bold self-center">Filtro:</span>
        <select 
          v-model="filterCategory" 
          class="px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-semibold focus:border-brand-green-500 outline-none"
        >
          <option value="Todos">Todas las Categorías</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <!-- Tabla General de Artículos -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <table class="w-full text-sm text-left border-collapse">
        <thead class="bg-slate-50 text-brand-dark-700 uppercase font-title font-semibold text-xs tracking-wider border-b border-slate-200">
          <tr>
            <th class="px-6 py-4">Foto</th>
            <th class="px-6 py-4">Título</th>
            <th class="px-6 py-4">Categoría</th>
            <th class="px-6 py-4">Fecha</th>
            <th class="px-6 py-4 text-center">Estado</th>
            <th class="px-6 py-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="post in filteredPosts" :key="post.id" class="hover:bg-slate-50 transition-colors">
            <!-- Miniatura de Foto -->
            <td class="px-6 py-4 shrink-0">
              <div class="w-16 h-12 rounded-lg border border-slate-100 overflow-hidden bg-slate-50 shadow-inner flex items-center justify-center">
                <NuxtImg 
                  v-if="post.image_url" 
                  :src="post.image_url" 
                  :alt="post.title"
                  class="w-full h-full object-contain"
                  format="webp"
                />
                <div v-else class="w-full h-full bg-slate-150 flex items-center justify-center text-slate-400">
                  <Image class="w-5 h-5" />
                </div>
              </div>
            </td>
            <!-- Título -->
            <td class="px-6 py-4 font-bold text-brand-dark-800 max-w-sm truncate" :title="post.title">
              {{ post.title }}
            </td>
            <!-- Categoría -->
            <td class="px-6 py-4">
              <span class="text-xs font-bold uppercase tracking-wider bg-brand-green-50 text-brand-green-700 px-2 py-0.5 rounded">
                {{ post.category }}
              </span>
            </td>
            <!-- Fecha -->
            <td class="px-6 py-4 text-slate-500 text-xs">
              {{ formatDate(post.published_at || post.created_at) }}
            </td>
            <!-- Estado -->
            <td class="px-6 py-4 text-center">
              <span 
                class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                :class="[post.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700']"
              >
                {{ post.published ? 'Publicado' : 'Borrador' }}
              </span>
            </td>
            <!-- Acciones -->
            <td class="px-6 py-4 text-center">
              <div class="flex items-center justify-center gap-2">
                <button 
                  @click="openEditModal(post)"
                  class="p-2 text-brand-green-600 hover:bg-brand-green-50 rounded-lg transition-all"
                  title="Editar Artículo"
                >
                  <Edit class="w-4.5 h-4.5" />
                </button>
                <button 
                  @click="triggerDelete(post)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Eliminar Artículo"
                >
                  <Trash2 class="w-4.5 h-4.5" />
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredPosts.length === 0">
            <td colspan="6" class="text-center py-12 text-slate-400 font-semibold">
              No se encontraron artículos en el blog.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL DE CREACIÓN / EDICIÓN (Drawer Lateral Amplio y Profesional) -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto bg-brand-dark-950/60 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6 md:p-10 select-none">
        <div class="bg-white w-full max-w-5xl rounded-3xl border border-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <!-- Encabezado del Modal -->
          <div class="p-6 bg-slate-50 border-b border-slate-150 flex justify-between items-center shrink-0">
            <div class="flex flex-col">
              <span class="text-[10px] font-bold text-brand-green-600 uppercase tracking-widest">
                {{ isEditing ? 'Editar Registro Existente' : 'Nuevo Registro de Blog' }}
              </span>
              <h3 class="font-title font-extrabold text-xl text-brand-dark-800">
                {{ isEditing ? 'Editar Artículo Técnico' : 'Crear Nuevo Artículo' }}
              </h3>
            </div>
            <button @click="closeModal" class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
              <X class="w-6 h-6" />
            </button>
          </div>

          <!-- Formulario con Scroll Interno -->
          <form @submit.prevent="submitForm" class="flex-grow p-6 md:p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Columna Izquierda: Información de Texto y Editor -->
            <div class="lg:col-span-8 flex flex-col gap-6">
              <!-- 1. Título del Post -->
              <div class="flex flex-col gap-1.5">
                <label for="title" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Título del Artículo</label>
                <input 
                  id="title"
                  v-model="form.title"
                  @input="generateSlug"
                  type="text" 
                  required
                  placeholder="Ej: Maximizando tus cultivos con plásticos térmicos..."
                  class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-all"
                />
              </div>

              <!-- 2. Slug e Información de Metadatos -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label for="slug" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Enlace Permanente (Slug)</label>
                  <input 
                    id="slug"
                    v-model="form.slug"
                    type="text" 
                    required
                    class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-mono text-brand-orange-500 bg-slate-50 outline-none"
                    placeholder="ej-enlace-del-articulo"
                  />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label for="author" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Autor del Artículo</label>
                  <input 
                    id="author"
                    v-model="form.author"
                    type="text" 
                    required
                    class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 outline-none"
                    placeholder="Plásticos Salamanca"
                  />
                </div>
              </div>

              <!-- 3. Extracto (Excerpt) -->
              <div class="flex flex-col gap-1.5">
                <label for="excerpt" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Extracto Comercial / Resumen Corto</label>
                <textarea 
                  id="excerpt" 
                  v-model="form.excerpt" 
                  rows="3" 
                  required 
                  class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 outline-none resize-none"
                  placeholder="Resuma brevemente de qué trata la publicación para atraer a los lectores..."
                ></textarea>
              </div>

              <!-- 4. Editor de Contenido HTML Profesional -->
              <div class="flex flex-col gap-1.5">
                <div class="flex justify-between items-center">
                  <label for="content" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Contenido del Artículo (Cuerpo de texto)</label>
                  <span class="text-[10px] text-slate-400 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded">Se admite formato HTML básico</span>
                </div>
                
                <textarea 
                  id="content" 
                  v-model="form.content" 
                  rows="12" 
                  required 
                  class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-sans focus:border-brand-green-500 outline-none"
                  placeholder="Escriba el cuerpo del artículo aquí..."
                ></textarea>
                
                <!-- Guía rápida de diseño HTML -->
                <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col gap-2 mt-1">
                  <span class="text-xs font-bold text-brand-dark-800">Guía rápida de diseño corporativo:</span>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px] text-slate-500 leading-normal font-mono">
                    <div><strong>Subtítulos H3:</strong><br/> &lt;h3&gt;Título&lt;/h3&gt;</div>
                    <div><strong>Párrafos:</strong><br/> &lt;p&gt;Texto&lt;/p&gt;</div>
                    <div><strong>Listas:</strong><br/> &lt;ul&gt;&lt;li&gt;Item&lt;/li&gt;&lt;/ul&gt;</div>
                    <div><strong>Negritas:</strong><br/> &lt;strong&gt;Texto&lt;/strong&gt;</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Columna Derecha: Configuración, Categorías e Imagen -->
            <div class="lg:col-span-4 flex flex-col gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-150">
              <h4 class="font-title font-bold text-xs text-brand-dark-800 uppercase tracking-wider border-b border-slate-200 pb-2">
                Ajustes de Publicación
              </h4>

              <!-- 1. Categoría -->
              <div class="flex flex-col gap-1.5">
                <label for="category" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Categoría</label>
                <select 
                  id="category"
                  v-model="form.category"
                  class="w-full px-4 py-2.5 border border-slate-200 bg-white rounded-xl text-sm focus:border-brand-green-500 outline-none"
                >
                  <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>

              <!-- 2. Estado de Publicación -->
              <div class="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                <input 
                  id="published" 
                  v-model="form.published" 
                  type="checkbox" 
                  class="w-5 h-5 text-brand-green-500 border-slate-200 rounded focus:ring-brand-green-500"
                />
                <label for="published" class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide cursor-pointer select-none">
                  Publicar Artículo Inmediatamente
                </label>
              </div>

              <!-- 3. Portada con Carga de Archivo -->
              <div class="flex flex-col gap-3">
                <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Foto de Portada del Artículo</label>
                
                <div class="flex flex-col gap-3">
                  <input 
                    type="file" 
                    ref="imageFileRef"
                    accept="image/*"
                    class="hidden" 
                    @change="uploadPortadaImage"
                  />
                  <BaseButton 
                    variant="outline" 
                    size="sm" 
                    :loading="uploadingImage"
                    @click.prevent="triggerImageClick"
                    class="w-full bg-white"
                  >
                    Seleccionar Imagen
                  </BaseButton>
                </div>

                <!-- Previsualización de Imagen Cargada -->
                <div v-if="form.image_url" class="relative aspect-[16/9] w-full border border-slate-200 rounded-xl overflow-hidden bg-white shadow-inner flex items-center justify-center mt-1">
                  <NuxtImg :src="form.image_url" alt="Portada Preview" class="w-full h-full object-contain" />
                  <button 
                    @click.prevent="form.image_url = ''"
                    class="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
                    title="Eliminar imagen"
                  >
                    <Trash2 class="w-3.5 h-3.5" />
                  </button>
                </div>
                <div v-else class="aspect-[16/9] w-full border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 text-xs text-center p-4">
                  <ImageIcon class="w-8 h-8 opacity-40" />
                  <span>Sin imagen cargada. Se presentará un marcador por defecto.</span>
                </div>
              </div>
            </div>

          </form>

          <!-- Pie del Modal -->
          <div class="p-6 bg-slate-50 border-t border-slate-150 flex justify-end gap-3 shrink-0">
            <BaseButton variant="outline" size="md" @click.prevent="closeModal">
              Cancelar
            </BaseButton>
            <BaseButton 
              variant="primary" 
              size="md" 
              :loading="submitting"
              @click.prevent="submitForm"
            >
              {{ isEditing ? 'Guardar Cambios' : 'Publicar Artículo' }}
            </BaseButton>
          </div>
        </div>
      </div>
    </transition>

    <!-- CUADRO DE DIÁLOGO DE ELIMINACIÓN -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isDeleteDialogOpen" class="fixed inset-0 z-50 overflow-y-auto bg-brand-dark-950/60 backdrop-blur-sm flex justify-center items-center p-4">
        <div class="bg-white w-full max-w-md rounded-2xl border border-slate-100 shadow-2xl p-6 flex flex-col gap-5">
          <div class="flex items-center gap-3 text-red-600">
            <AlertTriangle class="w-8 h-8" />
            <h4 class="font-title font-extrabold text-lg text-brand-dark-800">¿Eliminar artículo permanentemente?</h4>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed">
            Esta acción es irreversible y eliminará el artículo <strong>"{{ postToDelete?.title }}"</strong> de forma permanente de su base de datos.
          </p>
          <div class="flex justify-end gap-2 pt-2">
            <BaseButton variant="outline" size="sm" @click="closeDeleteDialog">
              Cancelar
            </BaseButton>
            <BaseButton variant="danger" size="sm" :loading="deleting" @click="confirmDelete">
              Confirmar Eliminación
            </BaseButton>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useBlogStore, type Post } from '~/stores/blog'
import { useCompanyStore } from '~/stores/company'
import BaseButton from '~/components/ui/BaseButton.vue'
import { 
  Plus, 
  Search, 
  Trash2, 
  X, 
  CheckCircle2, 
  XCircle, 
  Edit, 
  Image as ImageIcon,
  AlertTriangle,
  Image
} from 'lucide-vue-next'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

const blogStore = useBlogStore()
const companyStore = useCompanyStore()

// Estados Generales
const searchTerm = ref('')
const filterCategory = ref('Todos')
const successMessage = ref('')
const errorMessage = ref('')
const submitting = ref(false)
const deleting = ref(false)

// Estados Modal/Carga
const isModalOpen = ref(false)
const isEditing = ref(false)
const editingId = ref<string | null>(null)
const uploadingImage = ref(false)
const imageFileRef = ref<HTMLInputElement | null>(null)

// Estados Eliminación
const isDeleteDialogOpen = ref(false)
const postToDelete = ref<Post | null>(null)

const categories = ['Agricultura', 'Industria', 'Sostenibilidad', 'General']

// Formulario reactivo
const form = reactive({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image_url: '',
  category: 'General',
  author: 'Plásticos Salamanca',
  published: true
})

// Cargar artículos en modo administrador al montar
onMounted(async () => {
  await blogStore.fetchPosts({ adminMode: true })
})

// Filtrar artículos por término de búsqueda y selector de categorías
const filteredPosts = computed(() => {
  return blogStore.posts.filter(p => {
    const titleMatch = p.title.toLowerCase().includes(searchTerm.value.toLowerCase().trim())
    const catMatch = filterCategory.value === 'Todos' || p.category === filterCategory.value
    return titleMatch && catMatch
  })
})

function triggerImageClick() {
  imageFileRef.value?.click()
}

function generateSlug() {
  if (!isEditing.value) {
    form.slug = form.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
}

// Subir foto de portada a Supabase Storage
async function uploadPortadaImage(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploadingImage.value = true
  errorMessage.value = ''
  
  try {
    const publicUrl = await companyStore.uploadImage(file, 'blog')
    if (publicUrl) {
      form.image_url = publicUrl
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'Error al subir la foto de portada.'
  } finally {
    uploadingImage.value = false
    if (imageFileRef.value) {
      imageFileRef.value.value = ''
    }
  }
}

function openCreateModal() {
  isEditing.value = false
  editingId.value = null
  
  form.title = ''
  form.slug = ''
  form.excerpt = ''
  form.content = ''
  form.image_url = ''
  form.category = 'General'
  form.author = 'Plásticos Salamanca'
  form.published = true
  
  isModalOpen.value = true
}

function openEditModal(post: Post) {
  isEditing.value = true
  editingId.value = post.id
  
  form.title = post.title
  form.slug = post.slug
  form.excerpt = post.excerpt
  form.content = post.content
  form.image_url = post.image_url || ''
  form.category = post.category
  form.author = post.author
  form.published = post.published
  
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

// Guardar datos en Supabase
async function submitForm() {
  submitting.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    let result
    if (isEditing.value && editingId.value) {
      result = await blogStore.savePost({
        id: editingId.value,
        ...form
      })
    } else {
      result = await blogStore.savePost(form)
    }

    if (result) {
      successMessage.value = isEditing.value 
        ? 'Artículo actualizado y guardado correctamente.' 
        : 'Artículo creado y publicado con éxito.'
      
      // Recargar lista de posts
      await blogStore.fetchPosts({ adminMode: true })
      isModalOpen.value = false
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'Error al guardar los datos del artículo.'
  } finally {
    submitting.value = false
  }
}

// Lógica de eliminación
function triggerDelete(post: Post) {
  postToDelete.value = post
  isDeleteDialogOpen.value = true
}

function closeDeleteDialog() {
  isDeleteDialogOpen.value = false
  postToDelete.value = null
}

async function confirmDelete() {
  if (!postToDelete.value) return
  deleting.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const success = await blogStore.deletePost(postToDelete.value.id)
    if (success) {
      successMessage.value = 'El artículo fue eliminado permanentemente.'
      await blogStore.fetchPosts({ adminMode: true })
      isDeleteDialogOpen.value = false
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'Error al eliminar el artículo.'
  } finally {
    deleting.value = false
    postToDelete.value = null
  }
}

// Formateador de fecha
function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>
