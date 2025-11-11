# 🎨 Cómo Agregar una Imagen en la Sección Izquierda del Hero

## ✅ Ya está implementado

La funcionalidad ya está lista. Solo necesitas especificar qué imagen quieres usar.

---

## 📝 Cómo Cambiar la Imagen

### **Opción 1: Usar una de tus fotos existentes**

En `app/page.tsx`, línea 68, cambia el nombre de la foto:

```tsx
<ScrollHero
  title="MARGARITA BERNAL"
  subtitle="Pintora de sueños"
  // ... otras props
  leftImage="/images/photo-01.jpeg" // ← Cambia esto
/>
```

**Ejemplos:**
- `/images/photo-01.jpeg` - Usa la foto 1
- `/images/photo-05.jpeg` - Usa la foto 5
- `/images/photo-15.jpeg` - Usa la foto 15
- etc.

---

### **Opción 2: Agregar una nueva imagen**

1. **Copia tu imagen** a la carpeta `public/images/`
   - Ejemplo: `public/images/hero-left.jpg`

2. **Actualiza `app/page.tsx`**:
   ```tsx
   leftImage="/images/hero-left.jpg"
   ```

---

## 🎨 Características de la Imagen

### **Posición:**
- Sección izquierda del hero (5% desde el borde izquierdo)
- Centrada verticalmente
- Tamaño responsive: `clamp(200px, 25vw, 400px)` de ancho

### **Animación:**
- Fade in suave al cargar
- Parallax sutil al hacer scroll
- Efecto de profundidad con sombra

### **Estilo:**
- Bordes redondeados
- Sombra elegante
- Overlay de gradiente sutil
- Filtros de brillo y contraste ajustados

---

## 📐 Tamaño Recomendado de la Imagen

- **Aspecto:** Retrato (vertical) funciona mejor
- **Dimensiones:** 800px × 1200px (o proporción similar)
- **Formato:** JPG o WebP
- **Tamaño de archivo:** Menos de 500KB para carga rápida

---

## 🔧 Personalización Avanzada

Si quieres ajustar el tamaño o posición, edita `components/ScrollHero.tsx`:

```tsx
// Línea ~197-201
style={{
  left: '5%',           // ← Cambia la posición horizontal
  top: '50%',           // ← Cambia la posición vertical
  width: 'clamp(200px, 25vw, 400px)',  // ← Cambia el ancho
  height: 'clamp(300px, 40vh, 600px)', // ← Cambia la altura
  // ...
}}
```

---

## 🚫 Para Ocultar la Imagen

Si no quieres mostrar ninguna imagen, simplemente **elimina o comenta** la prop `leftImage`:

```tsx
<ScrollHero
  title="MARGARITA BERNAL"
  subtitle="Pintora de sueños"
  // ... otras props
  // leftImage="/images/photo-01.jpeg" ← Comenta o elimina esta línea
/>
```

---

## ✅ Verificación

Después de cambiar la imagen:

1. Guarda el archivo `app/page.tsx`
2. Refresca el navegador (Ctrl + Shift + R)
3. La imagen debería aparecer en la sección izquierda del hero

---

## 💡 Consejos

- **Elige una imagen representativa** de tu obra
- **Usa una foto vertical** para mejor composición
- **Asegúrate de que la imagen esté optimizada** (tamaño de archivo pequeño)
- **Prueba diferentes fotos** para ver cuál funciona mejor con el diseño

---

¡Listo! Ya puedes personalizar la imagen del hero izquierdo. 🎨

