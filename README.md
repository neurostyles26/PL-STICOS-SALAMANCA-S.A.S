# 🏭 PLÁSTICOS SALAMANCA S.A.S.

> **Bolsas • Invernaderos • Empaques**  
> Portal corporativo premium e industrial con panel de administración autogestionable.

---

## 📋 Tabla de Contenidos

- [Tecnologías](#-tecnologías)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Estructura de Carpetas](#-estructura-de-carpetas)
- [Configuración Inicial](#-configuración-inicial)
- [Base de Datos (Supabase)](#-base-de-datos-supabase)
- [Gestión de Estado (Pinia)](#-gestión-de-estado-pinia)
- [Componentes Principales](#-componentes-principales)
- [Páginas del Portal Público](#-páginas-del-portal-público)
- [Panel de Administración](#-panel-de-administración)
- [SEO y PWA](#-seo-y-pwa)
- [Despliegue en Vercel](#-despliegue-en-vercel)

---

## 🛠 Tecnologías

| Categoría      | Tecnología                                |
|----------------|-------------------------------------------|
| **Framework**  | Nuxt 3.21 + Vue 3 + TypeScript            |
| **Estilos**    | TailwindCSS 3 + Google Fonts (Outfit, Inter) |
| **Estado**     | Pinia                                     |
| **Animaciones**| @vueuse/motion (Motion Vue)               |
| **Imágenes**   | @nuxt/image (WebP, AVIF automático)       |
| **Backend**    | Supabase (PostgreSQL + Auth + Storage)    |
| **SEO**        | @nuxtjs/seo (meta dinámico, sitemap, og)  |
| **PWA**        | @vite-pwa/nuxt (Service Worker, manifest) |
| **Iconos**     | lucide-vue-next                           |
| **Deploy**     | Vercel (SSR)                              |

---

## 🏗 Arquitectura del Proyecto

```
┌──────────────────────────────────────────────────────┐
│                    NAVEGADOR (CLIENTE)                │
│  ┌─────────────┐ ┌─────────────┐ ┌───────────────┐   │
│  │  Vue 3 SFC  │ │ Pinia Store │ │ Motion Vue    │   │
│  │ Components  │ │  (Reactivo) │ │ (Animaciones) │   │
│  └──────┬──────┘ └──────┬──────┘ └───────────────┘   │
│         │               │                            │
│         └───────┬───────┘                            │
│                 ▼                                    │
│  ┌──────────────────────────────┐                    │
│  │    Nuxt 3 SSR / Hydration   │                    │
│  │    (SEO + PWA + Routing)    │                    │
│  └──────────────┬──────────────┘                    │
└─────────────────┼────────────────────────────────────┘
                  │  HTTPS
                  ▼
┌──────────────────────────────────────────────────────┐
│                     SUPABASE                         │
│  ┌────────────┐ ┌────────────┐ ┌─────────────────┐   │
│  │ PostgreSQL │ │ Auth       │ │ Storage         │   │
│  │ (Tablas)   │ │ (JWT)      │ │ (salamanca-     │   │
│  │            │ │            │ │  media bucket)  │   │
│  └────────────┘ └────────────┘ └─────────────────┘   │
│  Row Level Security (RLS):                           │
│  • Lectura: pública                                  │
│  • Escritura: solo usuarios autenticados             │
└──────────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Carpetas

```
Plasticos-Salamanca/
├── .env.example          # Variables de entorno de ejemplo
├── .gitignore            # Archivos excluidos de Git
├── nuxt.config.ts        # Configuración central de Nuxt
├── tailwind.config.js    # Paleta de colores y tipografías
├── package.json          # Dependencias del proyecto
├── tsconfig.json         # Configuración de TypeScript
│
├── assets/
│   └── css/
│       └── main.css      # Estilos globales (fuentes, scrollbar, glass effects)
│
├── components/
│   ├── Navbar.vue        # Barra de navegación sticky con glassmorphism
│   ├── Footer.vue        # Pie de página corporativo oscuro
│   ├── WhatsAppButton.vue# Botón flotante de WhatsApp con ping animation
│   └── ui/
│       ├── Logo.vue      # Logotipo SVG vectorial animado
│       ├── BaseButton.vue# Botón reutilizable (primary, secondary, outline, dark)
│       └── HeroSlider.vue# Carrusel de banners de pantalla completa
│
├── database/
│   └── schema.sql        # Script completo de creación de tablas + RLS
│
├── layouts/
│   ├── default.vue       # Layout público (Navbar + Footer + WhatsApp)
│   └── admin.vue         # Layout privado (sidebar + contenido protegido)
│
├── middleware/
│   └── admin-auth.ts     # Middleware de protección de rutas admin
│
├── pages/
│   ├── index.vue         # Página de inicio (Home)
│   ├── quienes-somos.vue # Página Quiénes Somos
│   ├── contacto.vue      # Página de Contacto + Google Maps
│   ├── productos/
│   │   ├── index.vue     # Catálogo con filtros y buscador
│   │   └── [slug].vue    # Detalle de producto dinámico
│   └── admin/
│       ├── login.vue     # Login administrativo (Supabase Auth)
│       ├── index.vue     # Gestión de información corporativa
│       ├── categorias.vue# CRUD de categorías del portafolio
│       ├── productos.vue # CRUD de productos + ficha técnica JSON
│       └── banners.vue   # CRUD de slides del carrusel Hero
│
├── public/
│   ├── favicon.ico       # Icono del sitio
│   └── icon.png          # Icono PWA (192x192 / 512x512)
│
├── server/
│   └── tsconfig.json     # Configuración de TypeScript del servidor Nitro
│
└── stores/
    ├── auth.ts           # Store de autenticación (login, logout, sesión)
    ├── company.ts        # Store de datos corporativos + banners + storage
    └── products.ts       # Store de productos + categorías + CRUD
```

---

## ⚙ Configuración Inicial

### 1. Clonar e Instalar

```bash
git clone <repositorio>
cd Plasticos-Salamanca
npm install
```

### 2. Variables de Entorno

Copiar `.env.example` a `.env` y completar:

```env
SUPABASE_URL=https://TU-PROYECTO.supabase.co
SUPABASE_KEY=tu-clave-publica-anon
```

### 3. Ejecutar en Desarrollo

```bash
npm run dev
```

El servidor arrancará en `http://localhost:3000`.

### 4. Compilar para Producción

```bash
npm run build
```

---

## 🗄 Base de Datos (Supabase)

### Tablas

| Tabla          | Descripción                                          |
|----------------|------------------------------------------------------|
| `categories`   | Categorías del catálogo (nombre, slug, imagen)       |
| `products`     | Productos con FK a categoría, imágenes[] y specs{}   |
| `banners`      | Slides del carrusel Hero (título, imagen, orden)     |
| `company_info` | Información corporativa (misión, visión, valores)    |

### Ejecución del Schema

1. Ir a **Supabase Dashboard → SQL Editor**
2. Copiar el contenido de `database/schema.sql`
3. Hacer clic en **Run**

### Storage

Crear un bucket público llamado **`salamanca-media`** con:
- **Lectura pública** (para servir imágenes en el portal)
- **Escritura** solo para usuarios autenticados (panel admin)

---

## 📦 Gestión de Estado (Pinia)

### `stores/auth.ts`
- `login(email, password)` → Autentica con Supabase Auth
- `logout()` → Cierra sesión
- `isLoggedIn` → Computed reactivo de sesión activa

### `stores/company.ts`
- `fetchCompanyInfo()` → Carga misión, visión, valores desde `company_info`
- `saveCompanyInfo(data)` → Guarda datos corporativos
- `fetchBanners()` → Lista slides del carrusel
- `saveBanner(data)` / `deleteBanner(id)` → CRUD de banners
- `uploadImage(file, folder)` → Sube archivo a Supabase Storage

### `stores/products.ts`
- `fetchCategories()` → Lista categorías del catálogo
- `saveCategory(data)` / `deleteCategory(id)` → CRUD de categorías
- `fetchProducts()` → Lista todos los productos con JOIN de categoría
- `fetchProductBySlug(slug)` → Obtiene un producto por slug (SSR)
- `saveProduct(data)` / `deleteProduct(id)` → CRUD de productos

---

## 🧱 Componentes Principales

| Componente           | Función                                                      |
|----------------------|--------------------------------------------------------------|
| `Navbar.vue`         | Header sticky con glassmorphism, menú móvil slide-down       |
| `Footer.vue`         | Pie de página oscuro con 4 columnas y categorías dinámicas   |
| `HeroSlider.vue`     | Carrusel automático con animaciones CSS, flechas y dots      |
| `BaseButton.vue`     | Botón universal: NuxtLink / `<a>` / `<button>` automático   |
| `WhatsAppButton.vue` | Botón flotante con pulse animation, oculto en rutas `/admin` |
| `Logo.vue`           | Isologotipo SVG con gradientes de marca                      |

---

## 🌐 Páginas del Portal Público

| Ruta                   | Archivo                        | Función                               |
|------------------------|--------------------------------|---------------------------------------|
| `/`                    | `pages/index.vue`              | Home: slider, categorías, beneficios  |
| `/quienes-somos`       | `pages/quienes-somos.vue`      | Historia, misión, visión, valores     |
| `/productos`           | `pages/productos/index.vue`    | Catálogo con filtros y buscador       |
| `/productos/:slug`     | `pages/productos/[slug].vue`   | Detalle con galería y ficha técnica   |
| `/contacto`            | `pages/contacto.vue`           | Formulario + canales + Google Maps    |

---

## 🔐 Panel de Administración

| Ruta                   | Archivo                        | Función                               |
|------------------------|--------------------------------|---------------------------------------|
| `/admin/login`         | `pages/admin/login.vue`        | Autenticación con Supabase Auth       |
| `/admin`               | `pages/admin/index.vue`        | Editar info corporativa               |
| `/admin/categorias`    | `pages/admin/categorias.vue`   | CRUD de categorías + imágenes         |
| `/admin/productos`     | `pages/admin/productos.vue`    | CRUD de productos + ficha técnica     |
| `/admin/banners`       | `pages/admin/banners.vue`      | CRUD de slides del carrusel           |

**Protección:** Todas las rutas `/admin/*` (excepto login) están protegidas por el middleware `admin-auth.ts` que verifica la sesión de Supabase Auth.

---

## 🔍 SEO y PWA

### SEO
- **Metadatos dinámicos** por página vía `useSeoMeta()`
- **Open Graph** con imágenes, títulos y descripciones por ruta
- **Sitemap automático** generado por `@nuxtjs/seo`
- **Robots.txt** autogenerado
- **HTML semántico** con headings jerárquicos (`h1` > `h2` > `h3`)

### PWA
- **Manifest** con nombre, colores y orientación de la app
- **Service Worker** (Workbox) con precaching de assets estáticos
- **Instalable** en dispositivos móviles como app nativa

---

## 🚀 Despliegue en Vercel

### Pasos

1. Subir el repositorio a GitHub / GitLab / Bitbucket
2. Ir a [vercel.com](https://vercel.com) → **Add New Project**
3. Seleccionar el repositorio `Plasticos-Salamanca`
4. Vercel detecta automáticamente **Nuxt** como framework
5. Configurar **Environment Variables**:
   - `SUPABASE_URL` → URL de tu proyecto Supabase
   - `SUPABASE_KEY` → Clave pública `anon`
6. Hacer clic en **Deploy**

### Build Output

```
Preset:   node-server (SSR)
Client:   ~44s de compilación
Server:   ~17s de compilación
PWA:      43 entries precacheadas (629 KB)
Total:    ~30 MB (11 MB gzip)
```

---

## 📞 Contacto del Proyecto

- **Empresa:** PLÁSTICOS SALAMANCA S.A.S.
- **Sector:** Industrial / Agrícola / Empaques
- **Stack:** Nuxt 3 + Supabase + TailwindCSS + Vercel

