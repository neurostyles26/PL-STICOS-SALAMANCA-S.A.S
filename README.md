# Plásticos Salamanca S.A.S.

Portal corporativo y catálogo digital para la empresa Plásticos Salamanca S.A.S., diseñado para optimizar la exposición de productos y automatizar la cotización directa mediante canales corporativos de comunicación.

---

## Contenidos

- [Ficha Técnica](#ficha-técnica)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración de Entorno](#configuración-de-entorno)
- [Base de Datos e Infraestructura](#base-de-datos-e-infraestructura)
- [Gestión de Estado](#gestión-de-estado)
- [Arquitectura de Componentes](#arquitectura-de-componentes)
- [Estructura de Enrutamiento](#estructura-de-enrutamiento)
- [Optimización de Buscadores (SEO) y PWA](#optimización-de-buscadores-seo-y-pwa)
- [Despliegue](#despliegue)

---

## Ficha Técnica

| Capa / Tecnología | Especificación |
|-------------------|----------------|
| Framework Principal | Nuxt 3.21 (Vue 3, TypeScript) |
| Estilos y Layout | TailwindCSS 3, Fuentes corporativas (Outfit, Inter) |
| Gestión de Estado | Pinia (Stores modulares para Auth, Company y Products) |
| Animaciones de Interfaz | @vueuse/motion |
| Optimización de Imagen | @nuxt/image (formatos WebP y AVIF autogenerados) |
| Base de Datos y Backend | Supabase (PostgreSQL, Auth y Storage) |
| SEO y Metadata | @nuxtjs/seo (Sitemaps, metadatos estructurados y Open Graph) |
| Funcionalidades PWA | @vite-pwa/nuxt (Service Worker y manifiesto de instalación) |
| Iconografía | Lucide Vue Next |
| Servidor de Producción | Vercel (Server-Side Rendering - SSR) |

---

## Estructura del Proyecto

El código fuente está organizado siguiendo el estándar de Nuxt 3, promoviendo la modularidad y separación de responsabilidades:

- **assets/**: Hojas de estilos globales y tokens de diseño.
- **components/**: Componentes de interfaz de usuario.
  - **ui/**: Bloques modulares reutilizables y carruseles dinámicos.
- **database/**: Esquema de base de datos SQL y directivas RLS.
- **layouts/**: Estructuras de página (pública con navegación general y privada con barra lateral administrativa).
- **middleware/**: Controladores de acceso para rutas restringidas.
- **pages/**: Estructura de vistas del portal y panel administrativo.
- **public/**: Recursos estáticos accesibles directamente por el navegador.
- **server/**: Configuración específica para el motor de ejecución Nitro.
- **stores/**: Gestión de estado global con persistencia de sesión e integración de Supabase.

---

## Configuración de Entorno

### Requisitos Previos
- Node.js (versión 18 o superior)
- Administrador de paquetes npm

### Pasos de Instalación
1. Clonar el repositorio.
2. Instalar dependencias del proyecto:
   ```bash
   npm install
   ```
3. Copiar el archivo de plantilla para las variables de entorno:
   ```bash
   cp .env.example .env
   ```
4. Completar las variables requeridas en el archivo `.env`:
   ```env
   SUPABASE_URL=https://<referencia-de-proyecto>.supabase.co
   SUPABASE_KEY=<clave-anonima-publica>
   ```

### Comandos de Ejecución
- **Desarrollo**: Inicia el servidor de desarrollo local con recarga en caliente.
  ```bash
  npm run dev
  ```
- **Compilación de Producción**: Compila el proyecto generando el servidor SSR optimizado.
  ```bash
  npm run build
  ```

---

## Base de Datos e Infraestructura

La persistencia de datos se gestiona mediante PostgreSQL alojado en Supabase, aplicando políticas de seguridad Row Level Security (RLS) para proteger los datos corporativos.

### Tablas del Sistema
- **`categories`**: Líneas de producto configuradas en la plataforma (nombre, slug único e imagen representativa).
- **`products`**: Catálogo de productos con llave foránea a categorías, arreglo de imágenes y especificaciones técnicas en formato JSON.
- **`banners`**: Elementos gráficos del carrusel dinámico principal (título, subtítulo, URL de imagen, link y orden de visualización).
- **`company_info`**: Colección de valores llave-valor para almacenar información de la empresa (misión, visión, políticas de contacto y branding de marca).
- **`posts`**: Artículos del blog técnico y comercial, incluyendo metadatos de autoría y fecha de publicación.

### Seguridad e Integridad de Datos
1. Las directivas de creación y permisos de tablas se encuentran documentadas en `database/schema.sql` y `database/blog.sql`.
2. Las consultas de lectura son públicas a través del cliente Supabase, mientras que las operaciones de escritura (inserciones, actualizaciones y eliminaciones) requieren autenticación mediante JSON Web Token (JWT).
3. Se requiere un contenedor de almacenamiento público en Supabase Storage denominado `salamanca-media` para gestionar de forma segura los recursos multimedia.

---

## Gestión de Estado

La lógica de negocio se centraliza en stores de Pinia:

### auth
- Gestiona el ciclo de vida de la sesión administrativa a través de Supabase Auth.
- Expone controladores de acceso como `login`, `logout` y estados reactivos como `isLoggedIn`.

### company
- Recupera y actualiza la información corporativa almacenada en la base de datos.
- Administra el flujo de actualización de banners y la subida de imágenes optimizadas a Supabase Storage.
- Controla el esquema de colores y la paleta dinámica de la marca inyectada en tiempo de ejecución.

### products
- Sincroniza las categorías y productos disponibles.
- Implementa el CRUD de productos, categorías y fichas técnicas.

### blog
- Gestiona la carga de artículos para lectores y la administración completa del CMS del Blog.

---

## Arquitectura de Componentes

- **`Navbar`**: Cabecera principal adaptativa con efecto difuminado y menú móvil desplegable.
- **`Footer`**: Estructura de pie de página de alta gama con enlaces de contacto y navegación rápida.
- **`WhatsAppButton`**: Botón flotante para la comunicación instantánea con animaciones de llamada a la acción en rutas públicas.
- **`Logo`**: Representación gráfica vectorial con colores corporativos adaptativa al tema oscuro o claro.
- **`BaseButton`**: Envoltorio de acción que discrimina el tipo de enlace para comportamiento interno en el framework o enlaces web externos de forma transparente.

---

## Estructura de Enrutamiento

### Sección Pública
- **`/`**: Portal de inicio que muestra los banners dinámicos, beneficios y accesos directos.
- **`/quienes-somos`**: Presentación de la empresa, filosofía y objetivos.
- **`/productos`**: Catálogo interactivo con filtrado dinámico por categoría y motor de búsqueda integrado.
- **`/productos/:slug`**: Detalle técnico del producto seleccionado, visor de imágenes y acceso a cotización directa.
- **`/blog`**: Catálogo de artículos técnicos con filtros avanzados y buscador.
- **`/blog/:slug`**: Visor detallado de artículos del blog, herramientas de compartir y llamado a la acción comercial.
- **`/contacto`**: Información de canales de atención y formulario comercial con mapa interactivo.

### Panel de Administración
- **`/admin/login`**: Acceso al panel administrativo seguro.
- **`/admin`**: Gestión de datos corporativos, dirección física y datos de contacto de WhatsApp.
- **`/admin/categorias`**: Administración de líneas del portafolio.
- **`/admin/productos`**: Módulo de administración de productos y especificaciones técnicas.
- **`/admin/banners`**: Administrador del carrusel de inicio.
- **`/admin/blog`**: Panel CMS de gestión completa de artículos del blog.

---

## Optimización de Buscadores (SEO) y PWA

### SEO
- Uso de `useSeoMeta()` en vistas para inyectar títulos limpios y descripciones detalladas por página.
- Generación de Sitemap y directivas robots configurados para indexación rápida.
- Uso exclusivo de HTML5 semántico para jerarquización de contenidos.

### PWA
- Configuración de un Service Worker mediante Workbox para habilitar la navegación offline y cacheado de recursos estáticos.
- Manifiesto web que permite instalar el portal como aplicación nativa en dispositivos iOS y Android.
- Favicon e iconos dinámicos sincronizados con el branding configurado en el panel administrativo.

---

## Despliegue

La aplicación está optimizada para desplegarse en Vercel como un servicio Server-Side Rendered (SSR):
1. Importar el repositorio Git en la consola de Vercel.
2. Definir las variables de entorno `SUPABASE_URL` y `SUPABASE_KEY`.
3. Vercel compila e inicializa el servidor global de Nuxt de forma automática.
