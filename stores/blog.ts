/**
 * @license PROPRIETARY
 * Copyright (c) 2025-2026 Edisson Pinza — NeuroStyles. All rights reserved.
 * Licensed under proprietary terms. See LICENSE file in workspace root.
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image_url?: string
  category: string
  author: string
  published: boolean
  published_at?: string
  created_at?: string
}

export const useBlogStore = defineStore('blog', () => {
  const supabase = useSupabaseClient<any>()
  
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Obtener todos los artículos del blog (con filtros opcionales)
  async function fetchPosts(options?: { query?: string; category?: string; adminMode?: boolean }) {
    loading.value = true
    error.value = null
    try {
      let queryBuilder = supabase
        .from('posts')
        .select('*')
      
      // Si no es modo admin, solo traer artículos publicados
      if (!options?.adminMode) {
        queryBuilder = queryBuilder.eq('published', true)
      }
      
      // Filtrar por categoría
      if (options?.category && options.category !== 'Todos') {
        queryBuilder = queryBuilder.eq('category', options.category)
      }
      
      // Filtrar por término de búsqueda (título o extracto)
      if (options?.query) {
        queryBuilder = queryBuilder.or(`title.ilike.%${options.query}%,excerpt.ilike.%${options.query}%`)
      }
      
      // Ordenar por fecha de publicación descendente
      queryBuilder = queryBuilder.order('published_at', { ascending: false })

      const { data, error: fetchError } = await queryBuilder
      
      if (fetchError) throw fetchError
      posts.value = data || []
    } catch (err: any) {
      error.value = err.message || 'Error al cargar los artículos del blog'
    } finally {
      loading.value = false
    }
  }

  // Obtener un solo artículo por slug
  async function fetchPostBySlug(slug: string): Promise<Post | null> {
    loading.value = true
    error.value = null
    try {
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()
      
      if (fetchError) throw fetchError
      return data
    } catch (err: any) {
      error.value = err.message || 'Error al cargar el artículo del blog'
      return null
    } finally {
      loading.value = false
    }
  }

  // Guardar o actualizar artículo del blog
  async function savePost(postData: Partial<Post>) {
    loading.value = true
    error.value = null
    try {
      let result
      if (postData.id) {
        result = await supabase
          .from('posts')
          .update(postData)
          .eq('id', postData.id)
          .select()
          .single()
      } else {
        result = await supabase
          .from('posts')
          .insert([postData])
          .select()
          .single()
      }
      
      if (result.error) throw result.error
      return result.data
    } catch (err: any) {
      error.value = err.message || 'Error al guardar el artículo'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Eliminar artículo
  async function deletePost(id: string) {
    loading.value = true
    error.value = null
    try {
      const { error: deleteError } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
      
      if (deleteError) throw deleteError
      return true
    } catch (err: any) {
      error.value = err.message || 'Error al eliminar el artículo'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    posts,
    loading,
    error,
    fetchPosts,
    fetchPostBySlug,
    savePost,
    deletePost
  }
})
