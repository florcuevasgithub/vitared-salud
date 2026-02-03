# 🔧 Solución Manual: Corregir Start Command en Railway

## ❌ Problema

El deploy está "ACTIVE" y exitoso, pero la aplicación sigue mostrando el listado de directorios.

## ✅ Solución: Verificar Start Command Manualmente

Railway a veces no detecta automáticamente los cambios en `nixpacks.toml` o `railway.json`. Necesitas verificar y actualizar manualmente el Start Command.

### Paso 1: Ir a Settings del Servicio

1. En Railway, ve al servicio **fortunate-surprise**
2. Clic en la pestaña **"Settings"** (última pestaña a la derecha)

### Paso 2: Verificar Start Command

1. En Settings, busca la sección **"Deploy"** o **"Start Command"**
2. Verifica qué comando está configurado actualmente

### Paso 3: Actualizar Start Command

1. Si el comando es diferente a este, actualízalo:
   ```
   npx serve -s dist/frontend-salud/browser -l $PORT
   ```

2. **⚠️ IMPORTANTE:** 
   - Debe ser exactamente: `npx serve -s dist/frontend-salud/browser -l $PORT`
   - El path debe incluir `/browser` al final
   - Debe usar `$PORT` (no un número fijo)

3. Guarda los cambios

### Paso 4: Redeploy

1. Después de guardar, Railway debería redeployar automáticamente
2. Si no, ve a **"Deployments"** y haz clic en **"Redeploy"**
3. Espera 1-2 minutos

### Paso 5: Verificar

1. Visita: `https://fortunate-surprise-production.up.railway.app`
2. Deberías ver la aplicación Angular (no el listado)

## 🔍 Alternativa: Verificar en Logs

Si no encuentras la sección de Start Command:

1. Ve a **"Deployments"** → Último deploy → **"View logs"**
2. Busca la línea que dice el comando de inicio
3. Verifica si está usando el path correcto

## 🐛 Si Sigue Sin Funcionar

### Opción 1: Verificar Estructura del Build

1. En los logs del build, busca dónde se generaron los archivos
2. Verifica que estén en `dist/frontend-salud/browser/`
3. Si están en otro lugar, ajusta el path en el Start Command

### Opción 2: Usar Path Alternativo

Si Angular generó los archivos en otro lugar, prueba:

```
npx serve -s dist/frontend-salud -l $PORT
```

O verifica en los logs dónde se generaron exactamente.

### Opción 3: Verificar Build Output

En los logs del build, busca líneas como:
```
✔ Browser application bundle generation complete.
```

Y verifica el path que muestra.

## 📝 Nota

Railway puede estar usando:
- `nixpacks.toml` (si existe)
- `railway.json` (si existe)
- O configuración manual en Settings

Si hay conflicto, la configuración manual en Settings tiene prioridad.
