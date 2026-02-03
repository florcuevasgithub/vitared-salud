# 🔧 Solución: Listado de Directorios en lugar de la App

## ❌ Problema

Estás viendo un listado de directorios (`Index of frontend-salud/`) en lugar de la aplicación Angular.

## ✅ Solución Aplicada

He actualizado los comandos de inicio para apuntar al directorio correcto donde Angular 17 genera los archivos.

### Cambios Realizados:

**Antes:**
```bash
npx serve -s dist/frontend-salud -l $PORT
```

**Después:**
```bash
npx serve -s dist/frontend-salud/browser -l $PORT
```

Angular 17 genera los archivos en `dist/frontend-salud/browser/`, no directamente en `dist/frontend-salud/`.

## 🚀 Próximos Pasos

### Opción 1: Redeploy en Railway (Recomendado)

1. En Railway, ve al servicio **fortunate-surprise**
2. Clic en **"Redeploy"** o **"Deploy"**
3. Railway usará el nuevo comando con el path correcto
4. Espera a que termine el deploy (1-2 minutos)

### Opción 2: Subir Cambios a Git Primero

```bash
# 1. Agregar cambios
git add frontend-salud/nixpacks.toml
git add frontend-salud/railway.json

# 2. Commit
git commit -m "fix: Corregir path del comando serve para Angular 17"

# 3. Push
git push origin main
```

Railway detectará automáticamente el cambio y redeployará.

## ✅ Verificación

Después del redeploy:

1. Visita la URL: `https://fortunate-surprise-production.up.railway.app`
2. Deberías ver:
   - ✅ La aplicación Angular (no el listado de directorios)
   - ✅ Header "🏥 Aplicación de Salud"
   - ✅ Sección de "Estado del Backend"

## 🐛 Si Sigue Mostrando el Listado

### Verificar el Build

1. Ve a **Deployments** → Último deploy → **Logs**
2. Busca la línea que dice el outputPath del build
3. Verifica que los archivos se generaron en `dist/frontend-salud/browser/`

### Verificar el Comando de Inicio

1. Ve a **Settings** → **Deploy**
2. Verifica que el **Start Command** sea: `npx serve -s dist/frontend-salud/browser -l $PORT`
3. Si no, actualízalo manualmente y guarda

## 📝 Nota sobre Angular 17

Angular 17 con el nuevo builder (`@angular-devkit/build-angular:application`) genera los archivos en una subcarpeta `browser/` dentro del outputPath. Por eso necesitamos apuntar a `dist/frontend-salud/browser` en lugar de solo `dist/frontend-salud`.
