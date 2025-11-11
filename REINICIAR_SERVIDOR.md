# Cómo Reiniciar el Servidor de Desarrollo

## Pasos para Reiniciar

### 1. Detener el Servidor Actual

En la terminal donde está corriendo el servidor, presiona:
- **Windows/Linux**: `Ctrl + C`
- **Mac**: `Cmd + C`

Espera a que el proceso se detenga completamente.

### 2. Reiniciar el Servidor

Ejecuta el siguiente comando:

```bash
npm run dev
```

O si usas yarn:

```bash
yarn dev
```

### 3. Verificar que Funciona

El servidor debería iniciar y mostrar un mensaje como:

```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
```

## Notas Importantes

- **Puerto**: Por defecto, Next.js usa el puerto 3000. Si ese puerto está ocupado, usará el siguiente disponible (3001, 3002, etc.)

- **Instalación de Dependencias**: Si acabas de instalar nuevas dependencias (como Three.js), asegúrate de que la instalación se haya completado antes de reiniciar:

```bash
npm install
```

- **Errores**: Si el servidor no inicia, revisa la terminal para ver mensajes de error.

## Comandos Útiles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Detener servidor
Ctrl + C (o Cmd + C en Mac)

# Reconstruir el proyecto
npm run build
```

