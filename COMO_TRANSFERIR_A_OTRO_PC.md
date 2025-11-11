# 📦 Cómo Transferir el Proyecto a Otro PC

## ✅ Archivos y Carpetas que DEBES Copiar

### 📁 Estructura Completa del Proyecto

Copia toda la carpeta del proyecto EXCEPTO las siguientes carpetas/archivos:

### ❌ NO Copiar (se regeneran automáticamente):

- `node_modules/` - Se reinstala con `npm install`
- `.next/` - Se regenera con `npm run build` o `npm run dev`
- `.git/` - Solo si no usas Git (opcional)

### ✅ SÍ Copiar (IMPORTANTE):

```
ANTOHER PORTAFOLIO IDEA revamped/
├── app/                    ✅ TODOS los archivos
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/             ✅ TODOS los componentes
│   ├── About.tsx
│   ├── PhotoGridScroll.tsx
│   ├── ScrollHero.tsx
│   └── ... (todos los demás)
├── hooks/                  ✅ TODOS los hooks
├── utils/                  ✅ TODOS los utils
├── public/                 ✅ MUY IMPORTANTE - Tus fotos y fuentes
│   ├── fonts/
│   │   └── EuropaGroteskSH-LigEx.otf
│   └── images/
│       ├── photo-01.jpeg
│       ├── photo-02.jpeg
│       └── ... (todas tus fotos)
├── package.json            ✅ MUY IMPORTANTE
├── package-lock.json       ✅ Recomendado
├── tsconfig.json           ✅
├── tailwind.config.js     ✅
├── next.config.js          ✅
├── postcss.config.js       ✅
└── *.md                    ✅ (documentación, opcional)

```

---

## 🚀 Pasos para Transferir

### **PASO 1: En tu PC Actual**

1. **Cierra el servidor de desarrollo** si está corriendo (Ctrl+C en la terminal)

2. **Copia toda la carpeta del proyecto** a:
   - USB/Disco externo
   - Google Drive / Dropbox / OneDrive
   - O comprime la carpeta en un ZIP

3. **IMPORTANTE**: Asegúrate de incluir:
   - ✅ Carpeta `public/images/` con todas tus fotos (photo-01.jpeg hasta photo-26.jpeg)
   - ✅ Carpeta `public/fonts/` con tu fuente (EuropaGroteskSH-LigEx.otf)
   - ✅ Archivo `package.json`

---

### **PASO 2: En el Nuevo PC**

1. **Instala Node.js** (si no lo tienes):
   - Descarga desde: https://nodejs.org/
   - Instala la versión LTS
   - Verifica: Abre PowerShell/Terminal y escribe:
     ```powershell
     node --version
     npm --version
     ```

2. **Copia la carpeta del proyecto** al nuevo PC
   - Ejemplo: `C:\Users\TuNombre\Documents\WEB PROJECTS\`

3. **Abre la carpeta del proyecto** en VS Code/Cursor

4. **Abre una terminal** en la carpeta del proyecto

5. **Instala las dependencias**:
   ```powershell
   npm install
   ```
   ⏱️ Esto tomará 2-5 minutos la primera vez

6. **Inicia el servidor de desarrollo**:
   ```powershell
   npm run dev
   ```

7. **Abre en el navegador**:
   ```
   http://localhost:3000
   ```

---

## ✅ Verificación Rápida

Después de instalar, verifica que todo esté bien:

1. ✅ El servidor inicia sin errores
2. ✅ La página carga en el navegador
3. ✅ Las fotos aparecen (verifica `public/images/`)
4. ✅ La fuente personalizada funciona (verifica `public/fonts/`)
5. ✅ Las animaciones funcionan correctamente

---

## 🔧 Si Algo No Funciona

### **Error: "npm no se reconoce"**
- Instala Node.js desde nodejs.org
- Reinicia la terminal después de instalar

### **Error: "Cannot find module"**
- Ejecuta: `npm install` de nuevo
- Asegúrate de estar en la carpeta correcta del proyecto

### **Las fotos no aparecen**
- Verifica que la carpeta `public/images/` tenga todas las fotos
- Verifica que los nombres sean exactos: `photo-01.jpeg`, `photo-02.jpeg`, etc.

### **La fuente no funciona**
- Verifica que `public/fonts/EuropaGroteskSH-LigEx.otf` exista
- Revisa `app/globals.css` para ver la configuración de la fuente

---

## 📋 Checklist de Transferencia

Antes de cerrar el proyecto en el PC actual:

- [ ] Verificar que `public/images/` tiene todas las fotos (26 fotos)
- [ ] Verificar que `public/fonts/` tiene la fuente OTF
- [ ] Verificar que `package.json` existe
- [ ] Cerrar el servidor de desarrollo (Ctrl+C)
- [ ] Copiar toda la carpeta (excepto `node_modules` y `.next`)

En el nuevo PC:

- [ ] Instalar Node.js
- [ ] Copiar la carpeta del proyecto
- [ ] Ejecutar `npm install`
- [ ] Ejecutar `npm run dev`
- [ ] Verificar que todo funciona

---

## 💡 Consejos

1. **Usa un USB o servicio en la nube** para transferir (más rápido que email)
2. **Comprime la carpeta** si tiene muchos archivos (ZIP/RAR)
3. **NO incluyas `node_modules`** - ocupa mucho espacio y se regenera
4. **Guarda una copia de seguridad** antes de transferir

---

## 📦 Tamaño Aproximado

- **Proyecto sin `node_modules`**: ~50-100 MB (depende de tus fotos)
- **Con `node_modules`**: ~500 MB - 1 GB (NO es necesario copiarlo)

---

## 🎯 Resumen Rápido

```powershell
# En el nuevo PC, después de copiar la carpeta:

cd "ruta\a\tu\proyecto"
npm install
npm run dev
```

¡Listo! Tu proyecto debería funcionar igual que en el PC anterior. 🚀

