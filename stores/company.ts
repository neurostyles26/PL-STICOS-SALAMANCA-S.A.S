/**
 * @license PROPRIETARY
 * Copyright (c) 2025-2026 Edisson Pinza — NeuroStyles. All rights reserved.
 * Licensed under proprietary terms. See LICENSE file in workspace root.
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { compressImage } from '~/utils/image'

export interface Banner {
  id: string
  title?: string
  subtitle?: string
  image_url: string
  link_url?: string
  sort_order: number
  active: boolean
  created_at?: string
}

export interface CompanyDetails {
  whatsapp: string
  email: string
  phone: string
  address: string
  google_maps_embed?: string
}

export const useCompanyStore = defineStore('company', () => {
  const supabase = useSupabaseClient<any>()

  const banners = ref<Banner[]>([])
  const companyInfo = ref<Record<string, any>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Obtener banners
  async function fetchBanners(adminMode = false) {
    loading.value = true
    error.value = null
    try {
      let queryBuilder = supabase
        .from('banners')
        .select('*')
      
      if (!adminMode) {
        queryBuilder = queryBuilder.eq('active', true)
      }

      const { data, error: fetchError } = await queryBuilder.order('sort_order', { ascending: true })
      
      if (fetchError) throw fetchError
      banners.value = data || []
    } catch (err: any) {
      error.value = err.message || 'Error al cargar banners'
    } finally {
      loading.value = false
    }
  }

  // Obtener información corporativa
  async function fetchCompanyInfo() {
    loading.value = true
    error.value = null
    try {
      const { data, error: fetchError } = await supabase
        .from('company_info')
        .select('*')
      
      if (fetchError) throw fetchError
      
      const infoMap: Record<string, any> = {}
      data?.forEach(item => {
        infoMap[item.key] = item.value
      })
      companyInfo.value = infoMap
    } catch (err: any) {
      error.value = err.message || 'Error al cargar información corporativa'
    } finally {
      loading.value = false
    }
  }

  // Guardar o actualizar banner
  async function saveBanner(bannerData: Partial<Banner>) {
    loading.value = true
    error.value = null
    try {
      let result
      if (bannerData.id) {
        result = await supabase
          .from('banners')
          .update(bannerData)
          .eq('id', bannerData.id)
          .select()
          .single()
      } else {
        result = await supabase
          .from('banners')
          .insert([bannerData])
          .select()
          .single()
      }

      if (result.error) throw result.error
      await fetchBanners(true)
      return result.data
    } catch (err: any) {
      error.value = err.message || 'Error al guardar banner'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Eliminar banner
  async function deleteBanner(id: string) {
    loading.value = true
    error.value = null
    try {
      const { error: deleteError } = await supabase
        .from('banners')
        .delete()
        .eq('id', id)
      
      if (deleteError) throw deleteError
      await fetchBanners(true)
      return true
    } catch (err: any) {
      error.value = err.message || 'Error al eliminar banner'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Guardar información corporativa por clave
  async function saveCompanyInfo(key: string, value: any) {
    loading.value = true
    error.value = null
    try {
      // Verificar si ya existe el registro
      const { data: existing } = await supabase
        .from('company_info')
        .select('id')
        .eq('key', key)
        .maybeSingle()

      let result
      if (existing) {
        result = await supabase
          .from('company_info')
          .update({ value, updated_at: new Date().toISOString() })
          .eq('key', key)
          .select()
          .single()
      } else {
        result = await supabase
          .from('company_info')
          .insert([{ key, value }])
          .select()
          .single()
      }

      if (result.error) throw result.error
      
      // Actualizar estado local
      companyInfo.value[key] = value
      return result.data
    } catch (err: any) {
      error.value = err.message || 'Error al guardar información corporativa'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actualizar toda la información de la empresa en lote
  async function updateCompanyInfo(info: Record<string, any>) {
    loading.value = true
    error.value = null
    try {
      const keys = Object.keys(info)
      for (const key of keys) {
        await saveCompanyInfo(key, info[key])
      }
      return true
    } catch (err: any) {
      error.value = err.message || 'Error al actualizar la información general'
      return false
    } finally {
      loading.value = false
    }
  }

  // Subir imagen a Supabase Storage
  async function uploadImage(file: File, folder: string): Promise<string> {
    loading.value = true
    error.value = null
    try {
      let fileToUpload = file
      let fileExt = file.name.split('.').pop()

      // Comprimir en el cliente si es una imagen (excluyendo SVG)
      if (process.client && file.type.startsWith('image/') && file.type !== 'image/svg+xml') {
        try {
          const compressed = await compressImage(file, {
            maxWidth: 1920,
            maxHeight: 1920,
            quality: 0.8,
            mimeType: 'image/webp'
          })
          fileToUpload = compressed
          fileExt = 'webp'
        } catch (e) {
          console.error('Error al comprimir la imagen:', e)
        }
      }

      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('salamanca-media')
        .upload(fileName, fileToUpload, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      const { data: publicUrlData } = supabase.storage
        .from('salamanca-media')
        .getPublicUrl(fileName)

      return publicUrlData.publicUrl
    } catch (err: any) {
      error.value = err.message || 'Error al subir la imagen'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    banners,
    companyInfo,
    loading,
    error,
    fetchBanners,
    fetchCompanyInfo,
    saveBanner,
    deleteBanner,
    saveCompanyInfo,
    updateCompanyInfo,
    uploadImage
  }
})
