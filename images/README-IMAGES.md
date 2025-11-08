Guía y ejemplos para usar las variantes optimizadas generadas por `scripts/generate-images.ps1`

Ubicación de salida
- `images/optimized/` contendrá archivos con nombres tipo `super1-480w.jpg`, `super1-800w.jpg`, `super1-1200w.jpg`, `super1-1600w.jpg` y sus `.webp` equivalentes.

Ejemplo recomendado (usar <picture> con WebP):

<picture>
  <source type="image/webp"
          srcset="images/optimized/super1-480w.webp 480w, images/optimized/super1-800w.webp 800w, images/optimized/super1-1200w.webp 1200w, images/optimized/super1-1600w.webp 1600w"
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw">
  <img
    src="images/optimized/super1-800w.jpg"
    srcset="images/optimized/super1-320w.jpg 320w, images/optimized/super1-480w.jpg 480w, images/optimized/super1-800w.jpg 800w, images/optimized/super1-1200w.jpg 1200w"
    sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
    class="project-img"
    loading="lazy"
    alt="Sistema Supermercado - captura">
</picture>

Notas y mejores prácticas
- Mantén nombres consistentes. El script intenta normalizar espacios en el nombre del fichero quedando `baseName-800w.jpg`.
- Si alguna imagen contiene texto o elementos importantes cerca de los bordes, revisa el recorte y usa `object-position: center top;` en CSS o recorta manualmente antes de generar las variantes.
- Testea en escritorio/móvil y ajusta el atributo `sizes` según tu grid exacto.

Cómo ejecutar (PowerShell)
1) Abre PowerShell
2) Ve al folder del proyecto:
   cd "c:\Users\gabriel\Desktop\Portafolio"
3) Ejecuta:
   .\scripts\generate-images.ps1

Requisitos
- ImageMagick (`magick`) debe estar instalado. Verifica con `magick -version`.
- Opcionalmente puedes usar `cwebp` si prefieres generar WebP con `cwebp` (script actual usa ImageMagick para WebP).

Si quieres, puedo:
- Actualizar automáticamente las etiquetas <img> en `index.html` para usar `srcset`/`sizes` con los nuevos nombres (si confirmas que quieres que lo haga). 
- Ejecutar cambios adicionales para ajustar `object-position` por imagen si me indicas cuáles.
