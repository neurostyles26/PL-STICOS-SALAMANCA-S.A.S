/**
 * @license PROPRIETARY
 * Copyright (c) 2025-2026 Edisson Pinza — NeuroStyles. All rights reserved.
 * Licensed under proprietary terms. See LICENSE file in workspace root.
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Category {
  id: string
  slug: string
  name: string
  description?: string
  image_url?: string
  created_at?: string
}

export interface Product {
  id: string
  category_id: string
  slug: string
  name: string
  description: string
  specifications: Record<string, string>
  images: string[]
  featured: boolean
  whatsapp_message?: string
  created_at?: string
  category?: Category
}

export const useProductsStore = defineStore('products', () => {
  const supabase = useSupabaseClient()
  
  const categories = ref<Category[]>([])
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Obtener todas las categorías
  async function fetchCategories() {
    loading.value = true
    error.value = null
    try {
      const { data, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true })
      
      if (fetchError) throw fetchError
      categories.value = data || []
    } catch (err: any) {
      error.value = err.message || 'Error al cargar categorías'
    } finally {
      loading.value = false
    }
  }

  // Obtener productos filtrados o destacados
  async function fetchProducts(options?: { categorySlug?: string; query?: string; featuredOnly?: boolean }) {
    loading.value = true
    error.value = null
    try {
      let queryBuilder = supabase
        .from('products')
        .select('*, category:categories(*)')
      
      if (options?.featuredOnly) {
        queryBuilder = queryBuilder.eq('featured', true)
      }
      
      if (options?.categorySlug) {
        // Encontrar ID de categoría por slug
        const category = categories.value.find(c => c.slug === options.categorySlug)
        if (category) {
          queryBuilder = queryBuilder.eq('category_id', category.id)
        }
      }
      
      if (options?.query) {
        queryBuilder = queryBuilder.ilike('name', `%${options.query}%`)
      }
      
      // Ordenar por fecha de creación descendente
      queryBuilder = queryBuilder.order('created_at', { ascending: false })

      const { data, error: fetchError } = await queryBuilder
      
      if (fetchError) throw fetchError
      products.value = data || []
    } catch (err: any) {
      error.value = err.message || 'Error al cargar productos'
    } finally {
      loading.value = false
    }
  }

  // Obtener un solo producto por slug
  async function fetchProductBySlug(slug: string): Promise<Product | null> {
    loading.value = true
    error.value = null
    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('slug', slug)
        .single()
      
      if (fetchError) throw fetchError
      return data
    } catch (err: any) {
      error.value = err.message || 'Error al cargar el producto'
      return null
    } finally {
      loading.value = false
    }
  }

  // Guardar o actualizar categoría
  async function saveCategory(categoryData: Partial<Category>) {
    loading.value = true
    error.value = null
    try {
      let result
      if (categoryData.id) {
        result = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', categoryData.id)
          .select()
          .single()
      } else {
        result = await supabase
          .from('categories')
          .insert([categoryData])
          .select()
          .single()
      }
      
      if (result.error) throw result.error
      await fetchCategories() // Recargar categorías
      return result.data
    } catch (err: any) {
      error.value = err.message || 'Error al guardar categoría'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Eliminar categoría
  async function deleteCategory(id: string) {
    loading.value = true
    error.value = null
    try {
      const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
      
      if (deleteError) throw deleteError
      await fetchCategories() // Recargar categorías
      return true
    } catch (err: any) {
      error.value = err.message || 'Error al eliminar categoría'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Guardar o actualizar producto
  async function saveProduct(productData: Partial<Product>) {
    loading.value = true
    error.value = null
    try {
      let result
      if (productData.id) {
        result = await supabase
          .from('products')
          .update(productData)
          .eq('id', productData.id)
          .select()
          .single()
      } else {
        result = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single()
      }
      
      if (result.error) throw result.error
      return result.data
    } catch (err: any) {
      error.value = err.message || 'Error al guardar producto'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Eliminar producto
  async function deleteProduct(id: string) {
    loading.value = true
    error.value = null
    try {
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
      
      if (deleteError) throw deleteError
      return true
    } catch (err: any) {
      error.value = err.message || 'Error al eliminar producto'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    products,
    loading,
    error,
    fetchCategories,
    fetchProducts,
    fetchProductBySlug,
    saveCategory,
    deleteCategory,
    saveProduct,
    deleteProduct
  }
})
