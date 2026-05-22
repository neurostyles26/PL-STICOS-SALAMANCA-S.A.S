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
                  @click="triggerHistoryClick"
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
          
          <!-- Formulario para agregar nuevo valor -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-150 flex flex-col gap-4">
            <h5 class="text-xs font-bold text-brand-dark-800 uppercase tracking-wider">Agregar Nuevo Valor</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase">Título del Valor</label>
                <input 
                  v-model="newTitle" 
                  type="text" 
                  placeholder="Ej: Calidad Superior"
                  class="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none bg-white"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase">Imagen del Valor</label>
                <div class="flex items-center gap-2">
                  <input 
                    type="file" 
                    ref="newValueFileRef"
                    accept="image/*"
                    class="hidden" 
                    @change="uploadNewValueImage"
                  />
                  <BaseButton 
                    variant="outline" 
                    size="sm" 
                    :loading="uploadingNewValueImage"
                    @click="triggerNewValueClick"
                  >
                    Cargar Imagen
                  </BaseButton>
                  <span v-if="newImageUrl" class="text-xs text-brand-green-600 font-semibold truncate max-w-[150px]">¡Cargada!</span>
                  <span v-else class="text-xs text-slate-400">Sin imagen</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase">Descripción</label>
              <textarea 
                v-model="newDescription" 
                rows="2"
                placeholder="Describa cómo aplica este valor en la empresa..."
                class="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none bg-white resize-none"
              ></textarea>
            </div>
            <div class="flex justify-end">
              <BaseButton variant="primary" size="sm" @click="addValue">
                Agregar Valor
              </BaseButton>
            </div>
          </div>

          <!-- Lista de valores actuales -->
          <div class="flex flex-col gap-4 mt-2">
            <h5 class="text-xs font-bold text-brand-dark-800 uppercase tracking-wider">Lista de Valores</h5>
            <div 
              v-for="(val, idx) in info.values.list" 
              :key="idx"
              class="flex flex-col md:flex-row gap-4 bg-white border border-slate-150 p-4 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div class="flex-grow flex flex-col gap-3">
                <div class="flex gap-3 items-center">
                  <div class="w-6 h-6 rounded bg-brand-green-50 text-brand-green-600 font-bold flex items-center justify-center text-xs shrink-0">
                    0{{ idx + 1 }}
                  </div>
                  <input 
                    v-model="val.title" 
                    type="text" 
                    placeholder="Título del Valor"
                    class="font-semibold text-brand-dark-800 text-sm border-b border-transparent focus:border-slate-200 outline-none px-1 py-0.5 w-full"
                  />
                </div>
                <textarea 
                  v-model="val.description" 
                  rows="2"
                  placeholder="Descripción"
                  class="text-xs text-slate-600 border border-slate-100 rounded p-1.5 focus:border-slate-200 outline-none resize-none w-full"
                ></textarea>
              </div>

              <!-- Selector de Imagen en cada valor -->
              <div class="flex md:flex-col justify-between md:justify-center items-center gap-3 shrink-0">
                <div class="relative w-20 h-20 border border-slate-200 rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center">
                  <NuxtImg v-if="val.image_url" :src="val.image_url" class="w-full h-full object-cover" />
                  <span v-else class="text-[10px] text-slate-400 text-center px-1">Sin imagen</span>
                  <button 
                    v-if="val.image_url"
                    @click="val.image_url = ''"
                    class="absolute top-1 right-1 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow animate-fade-in"
                    title="Eliminar imagen"
                  >
                    <Trash2 class="w-2.5 h-2.5" />
                  </button>
                </div>
                
                <div class="flex flex-col gap-1.5 w-full md:w-auto">
                  <input 
                    type="file" 
                    :id="`val-file-${idx}`"
                    accept="image/*"
                    class="hidden" 
                    @change="(e) => uploadValueImage(e, idx)"
                  />
                  <label 
                    :for="`val-file-${idx}`"
                    class="px-2.5 py-1 text-[10px] font-bold border border-slate-200 hover:bg-slate-50 cursor-pointer rounded text-brand-dark-700 transition-colors flex items-center justify-center text-center select-none"
                  >
                    {{ uploadingValueIdx === idx ? 'Cargando...' : 'Subir Imagen' }}
                  </label>
                  
                  <button 
                    @click="removeValue(idx)"
                    class="px-2.5 py-1 text-[10px] font-bold bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 class="w-3 h-3" /> Eliminar
                  </button>
                </div>
              </div>
            </div>
            
            <div v-if="info.values.list.length === 0" class="text-center py-6 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
              No hay valores corporativos agregados.
            </div>
          </div>
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
                @click="triggerLogoClick"
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

        <!-- Colores de la Marca -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5">
          <h4 class="font-title font-bold text-base text-brand-dark-800 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Palette class="w-5 h-5 text-brand-green-500" />
            Colores de la Marca (Personalización)
          </h4>
          <p class="text-xs text-slate-500 leading-relaxed">
            Ajuste los colores principales de su sitio web para alinearlo con su identidad visual corporativa. Los cambios se previsualizan en tiempo real.
          </p>

          <div class="grid grid-cols-2 gap-4">
            <!-- Color Primario -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Color Primario</label>
              <div class="flex items-center gap-2">
                <input 
                  v-model="info.theme.primary_color" 
                  type="color" 
                  class="w-10 h-10 p-0 border border-slate-200 rounded-xl cursor-pointer bg-transparent"
                />
                <input 
                  v-model="info.theme.primary_color" 
                  type="text" 
                  class="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono uppercase focus:border-brand-green-500 outline-none"
                  placeholder="#0B5A33"
                />
              </div>
            </div>

            <!-- Color Secundario -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Color Secundario</label>
              <div class="flex items-center gap-2">
                <input 
                  v-model="info.theme.secondary_color" 
                  type="color" 
                  class="w-10 h-10 p-0 border border-slate-200 rounded-xl cursor-pointer bg-transparent"
                />
                <input 
                  v-model="info.theme.secondary_color" 
                  type="text" 
                  class="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono uppercase focus:border-brand-green-500 outline-none"
                  placeholder="#E06B26"
                />
              </div>
            </div>
          </div>

          <BaseButton 
            variant="outline" 
            size="sm" 
            class="w-full text-xs"
            @click="resetColors"
          >
            <RotateCcw class="w-3.5 h-3.5 mr-1.5" />
            Restablecer Colores por Defecto
          </BaseButton>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5 mt-8">
          <h4 class="font-title font-bold text-base text-brand-dark-800 border-b border-slate-100 pb-2 flex items-center gap-2">
            <PhoneCall class="w-5 h-5 text-brand-orange-500" />
            Atención y Canales
          </h4>

          <!-- Dirección Física -->
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide flex items-center gap-1.5">
              <MapPin class="w-3.5 h-3.5 text-brand-green-500" />
              Dirección Física
            </label>
            <input 
              v-model="info.contact_details.address" 
              type="text" 
              class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
              placeholder="Ej: Zona Industrial, Bucaramanga"
            />
          </div>

          <!-- Correo de Ventas -->
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide flex items-center gap-1.5">
              <Mail class="w-3.5 h-3.5 text-brand-orange-500" />
              Correo de Ventas
            </label>
            <input 
              v-model="info.contact_details.email" 
              type="email" 
              class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
              placeholder="contacto@plasticossalamanca.com"
            />
          </div>

          <!-- NIT Corporativo (Con Toggle) -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col gap-3">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide flex items-center gap-1.5">
                <FileText class="w-3.5 h-3.5 text-brand-green-500" />
                NIT Corporativo
              </label>
              <input 
                v-model="info.contact_details.nit" 
                type="text" 
                class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
                placeholder="Ej: 901.234.567-8"
              />
            </div>
            <div class="flex items-center gap-2">
              <input 
                id="showNit"
                v-model="info.contact_details.show_nit"
                type="checkbox"
                class="w-4 h-4 text-brand-green-600 border-slate-300 rounded focus:ring-brand-green-500 cursor-pointer"
              />
              <label for="showNit" class="text-xs font-semibold text-slate-600 select-none cursor-pointer">
                Mostrar NIT públicamente en la web
              </label>
            </div>
          </div>

          <!-- Teléfono Celular (Con Toggle) -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col gap-3">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide flex items-center gap-1.5">
                <Smartphone class="w-3.5 h-3.5 text-brand-orange-500" />
                Número de Celular
              </label>
              <input 
                v-model="info.contact_details.cellphone" 
                type="text" 
                class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
                placeholder="Ej: (+57) 310 200 3040"
              />
            </div>
            <div class="flex items-center gap-2">
              <input 
                id="showCellphone"
                v-model="info.contact_details.show_cellphone"
                type="checkbox"
                class="w-4 h-4 text-brand-green-600 border-slate-300 rounded focus:ring-brand-green-500 cursor-pointer"
              />
              <label for="showCellphone" class="text-xs font-semibold text-slate-600 select-none cursor-pointer">
                Mostrar Celular en la web
              </label>
            </div>
          </div>

          <!-- Teléfono Fijo (Con Toggle) -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col gap-3">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide flex items-center gap-1.5">
                <Phone class="w-3.5 h-3.5 text-brand-orange-500" />
                Teléfono Fijo
              </label>
              <input 
                v-model="info.contact_details.phone" 
                type="text" 
                class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
                placeholder="Ej: (+57) 607 6351234"
              />
            </div>
            <div class="flex items-center gap-2">
              <input 
                id="showPhone"
                v-model="info.contact_details.show_phone"
                type="checkbox"
                class="w-4 h-4 text-brand-green-600 border-slate-300 rounded focus:ring-brand-green-500 cursor-pointer"
              />
              <label for="showPhone" class="text-xs font-semibold text-slate-600 select-none cursor-pointer">
                Mostrar Teléfono Fijo en la web
              </label>
            </div>
          </div>

          <!-- WhatsApp Comercial (Con Toggle) -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col gap-3">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide flex items-center gap-1.5">
                <MessageSquare class="w-3.5 h-3.5 text-brand-green-500" />
                WhatsApp Comercial (+ código país)
              </label>
              <input 
                v-model="info.contact_details.whatsapp" 
                type="text" 
                class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
                placeholder="Ej: +573102003040"
              />
            </div>
            <div class="flex items-center gap-2">
              <input 
                id="showWhatsapp"
                v-model="info.contact_details.show_whatsapp"
                type="checkbox"
                class="w-4 h-4 text-brand-green-600 border-slate-300 rounded focus:ring-brand-green-500 cursor-pointer"
              />
              <label for="showWhatsapp" class="text-xs font-semibold text-slate-600 select-none cursor-pointer">
                Activar botón y enlaces de WhatsApp
              </label>
            </div>
          </div>

          <!-- Horario de Atención (Con Toggle) -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col gap-3">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide flex items-center gap-1.5">
                <Clock class="w-3.5 h-3.5 text-brand-green-500" />
                Horario de Atención
              </label>
              <input 
                v-model="info.contact_details.schedule" 
                type="text" 
                class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
                placeholder="Ej: Lunes a Viernes 8:00 AM - 6:00 PM"
              />
            </div>
            <div class="flex items-center gap-2">
              <input 
                id="showSchedule"
                v-model="info.contact_details.show_schedule"
                type="checkbox"
                class="w-4 h-4 text-brand-green-600 border-slate-300 rounded focus:ring-brand-green-500 cursor-pointer"
              />
              <label for="showSchedule" class="text-xs font-semibold text-slate-600 select-none cursor-pointer">
                Mostrar Horario en la barra superior
              </label>
            </div>
          </div>

          <!-- Google Maps Embed -->
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide flex items-center gap-1.5">
              <MapPin class="w-3.5 h-3.5 text-brand-orange-500" />
              Google Maps Embed URL (Iframe src)
            </label>
            <textarea 
              v-model="info.contact_details.google_maps_embed" 
              rows="3" 
              class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none resize-none"
              placeholder="Pegue la URL src del iframe de Google Maps..."
            ></textarea>
          </div>
        </div>

        <!-- Redes Sociales -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5 mt-8">
          <h4 class="font-title font-bold text-base text-brand-dark-800 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Share2 class="w-5 h-5 text-brand-green-500" />
            Redes Sociales (Footer)
          </h4>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Facebook URL</label>
            <input 
              v-model="info.social_links.facebook" 
              type="text" 
              class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
              placeholder="https://facebook.com/pagina"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Instagram URL</label>
            <input 
              v-model="info.social_links.instagram" 
              type="text" 
              class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
              placeholder="https://instagram.com/usuario"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">Twitter / X URL</label>
            <input 
              v-model="info.social_links.twitter" 
              type="text" 
              class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
              placeholder="https://twitter.com/usuario"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-brand-dark-700 uppercase tracking-wide">LinkedIn URL</label>
            <input 
              v-model="info.social_links.linkedin" 
              type="text" 
              class="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none"
              placeholder="https://linkedin.com/company/empresa"
            />
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
  Upload,
  Share2,
  Palette,
  RotateCcw,
  MapPin,
  Mail,
  FileText,
  Smartphone,
  Phone,
  MessageSquare,
  Clock
} from 'lucide-vue-next'
import { watch } from 'vue'
import { generatePalette } from '~/utils/colors'

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

// Refs para nuevos valores corporativos
const newTitle = ref('')
const newDescription = ref('')
const newImageUrl = ref('')
const uploadingNewValueImage = ref(false)
const newValueFileRef = ref<HTMLInputElement | null>(null)
const uploadingValueIdx = ref<number | null>(null)

function triggerHistoryClick() {
  historyFileRef.value?.click()
}

function triggerNewValueClick() {
  newValueFileRef.value?.click()
}

function triggerLogoClick() {
  logoFileRef.value?.click()
}

const info = reactive({
  logo: { image_url: '', use_custom: false },
  history: { text: '', image_url: '' },
  mission: { text: '' },
  vision: { text: '' },
  values: { list: [] as any[] },
  social_links: { facebook: '', instagram: '', twitter: '', linkedin: '' },
  contact_details: {
    address: '',
    phone: '',
    show_phone: true,
    cellphone: '',
    show_cellphone: true,
    nit: '',
    show_nit: true,
    email: '',
    whatsapp: '',
    show_whatsapp: true,
    schedule: '',
    show_schedule: true,
    google_maps_embed: ''
  },
  theme: {
    primary_color: '#0b5a33',
    secondary_color: '#e06b26'
  }
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
  
  // Normalizar lista de valores corporativos (legacy strings a objetos)
  const rawList = Array.isArray(original.values?.list) ? [...original.values.list] : []
  info.values.list = rawList.map((item: any) => {
    if (typeof item === 'object' && item !== null) {
      return {
        title: item.title || '',
        description: item.description || '',
        image_url: item.image_url || ''
      }
    }
    if (typeof item === 'string') {
      if (item.includes(':')) {
        const parts = item.split(':')
        return { title: parts[0].trim(), description: parts[1].trim(), image_url: '' }
      }
      return { title: item, description: '', image_url: '' }
    }
    return { title: '', description: '', image_url: '' }
  })

  // Cargar Redes Sociales
  const originalSocial = original.social_links || {}
  info.social_links = {
    facebook: originalSocial.facebook || '',
    instagram: originalSocial.instagram || '',
    twitter: originalSocial.twitter || '',
    linkedin: originalSocial.linkedin || ''
  }
  
  const originalContact = original.contact_details || {}
  info.contact_details = {
    address: originalContact.address || '',
    phone: originalContact.phone || '',
    show_phone: originalContact.show_phone ?? true,
    cellphone: originalContact.cellphone || '',
    show_cellphone: originalContact.show_cellphone ?? true,
    nit: originalContact.nit || '',
    show_nit: originalContact.show_nit ?? true,
    email: originalContact.email || '',
    whatsapp: originalContact.whatsapp || '',
    show_whatsapp: originalContact.show_whatsapp ?? true,
    schedule: originalContact.schedule || '',
    show_schedule: originalContact.show_schedule ?? true,
    google_maps_embed: originalContact.google_maps_embed || ''
  }

  const originalTheme = original.theme || {}
  info.theme = {
    primary_color: originalTheme.primary_color || '#0b5a33',
    secondary_color: originalTheme.secondary_color || '#e06b26'
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

// Subir foto para un valor existente
async function uploadValueImage(e: Event, index: number) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploadingValueIdx.value = index
  errorMessage.value = ''
  
  try {
    const publicUrl = await companyStore.uploadImage(file, 'values')
    if (publicUrl) {
      info.values.list[index].image_url = publicUrl
      successMessage.value = `Imagen para "${info.values.list[index].title}" cargada con éxito.`
      setTimeout(() => successMessage.value = '', 4000)
    } else {
      errorMessage.value = companyStore.error || 'Error al intentar subir la imagen.'
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'Error al subir la imagen.'
  } finally {
    uploadingValueIdx.value = null
  }
}

// Subir foto para el nuevo valor en creación
async function uploadNewValueImage(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploadingNewValueImage.value = true
  errorMessage.value = ''
  
  try {
    const publicUrl = await companyStore.uploadImage(file, 'values')
    if (publicUrl) {
      newImageUrl.value = publicUrl
      successMessage.value = 'Imagen para nuevo valor cargada con éxito.'
      setTimeout(() => successMessage.value = '', 4000)
    } else {
      errorMessage.value = companyStore.error || 'Error al intentar subir la imagen.'
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'Error al subir la imagen.'
  } finally {
    uploadingNewValueImage.value = false
  }
}

function addValue() {
  if (newTitle.value.trim() && newDescription.value.trim()) {
    info.values.list.push({
      title: newTitle.value.trim(),
      description: newDescription.value.trim(),
      image_url: newImageUrl.value
    })
    newTitle.value = ''
    newDescription.value = ''
    newImageUrl.value = ''
  }
}

function removeValue(index: number) {
  info.values.list.splice(index, 1)
}

// Guardar toda la información de vuelta en la BD
// Restablecer colores corporativos por defecto
function resetColors() {
  info.theme.primary_color = '#0b5a33'
  info.theme.secondary_color = '#e06b26'
}

// Watcher para aplicar cambios de color en tiempo real en el navegador
watch(
  () => [info.theme.primary_color, info.theme.secondary_color],
  ([newPrimary, newSecondary]) => {
    if (process.client) {
      const primaryPalette = generatePalette(newPrimary || '#0b5a33')
      const secondaryPalette = generatePalette(newSecondary || '#e06b26')
      
      let styleTag = document.getElementById('dynamic-theme-colors')
      if (!styleTag) {
        styleTag = document.createElement('style')
        styleTag.id = 'dynamic-theme-colors'
        document.head.appendChild(styleTag)
      }
      
      let styles = ':root {\n'
      for (const [shade, val] of Object.entries(primaryPalette)) {
        styles += `  --color-brand-green-${shade}: ${val};\n`
      }
      for (const [shade, val] of Object.entries(secondaryPalette)) {
        styles += `  --color-brand-orange-${shade}: ${val};\n`
      }
      styles += '}'
      styleTag.innerHTML = styles
    }
  },
  { deep: true }
)

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
