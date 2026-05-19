/**
 * Comprime y redimensiona una imagen en el cliente utilizando la API nativa de Canvas de HTML5.
 * Convierte el archivo resultante a formato WebP para máxima optimización de peso.
 * 
 * @param file El archivo original tipo File (debe ser de tipo imagen).
 * @param options Opciones de compresión como dimensiones máximas y calidad.
 * @returns Promesa que resuelve en un nuevo objeto File optimizado en formato WebP (o JPEG si falla).
 */
export async function compressImage(
  file: File,
  options = { maxWidth: 1920, maxHeight: 1920, quality: 0.8, mimeType: 'image/webp' }
): Promise<File> {
  // Si no es una imagen, devolver el archivo original intacto
  if (!file.type.startsWith('image/')) {
    return file
  }

  // Evitar procesar archivos SVG, ya que son vectoriales y perderían sus propiedades
  if (file.type === 'image/svg+xml') {
    return file
  }

  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()

      img.onload = () => {
        let width = img.width
        let height = img.height

        // Redimensionar proporcionalmente si excede las dimensiones máximas
        if (width > options.maxWidth || height > options.maxHeight) {
          if (width > height) {
            height = Math.round((height * options.maxWidth) / width)
            width = options.maxWidth
          } else {
            width = Math.round((width * options.maxHeight) / height)
            height = options.maxHeight
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          // Si no se puede obtener el contexto 2d del canvas, devolver archivo original
          return resolve(file)
        }

        // Dibujar la imagen redimensionada en el canvas
        ctx.drawImage(img, 0, 0, width, height)

        // Convertir el canvas a Blob en formato WebP con la calidad indicada
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return resolve(file)
            }

            // Generar el nombre de archivo con la extensión correspondiente
            const newName = file.name.replace(/\.[^/.]+$/, '') + '.webp'

            // Crear el nuevo archivo optimizado
            const compressedFile = new File([blob], newName, {
              type: options.mimeType,
              lastModified: Date.now()
            })

            resolve(compressedFile)
          },
          options.mimeType,
          options.quality
        )
      }

      img.onerror = () => {
        // En caso de error al cargar la imagen, resolver con el archivo original
        resolve(file)
      }

      img.src = event.target?.result as string
    }

    reader.onerror = () => {
      // En caso de error en FileReader, resolver con el archivo original
      resolve(file)
    }

    reader.readAsDataURL(file)
  })
}
