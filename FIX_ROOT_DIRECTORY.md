# 🔧 Solución: Error Root Directory con Espacios

## ❌ Problema

```
The specified Root Directory "   frontend-salud" does not exist.
```

El Root Directory tiene espacios en blanco al inicio: `"   frontend-salud"` en lugar de `"frontend-salud"`.

## ✅ Solución

### Paso 1: Corregir Root Directory en Vercel

1. Ve a **Settings** → **General**
2. Busca la sección **"Root Directory"**
3. **Borra todos los espacios** al inicio
4. Debe quedar exactamente: `frontend-salud` (sin espacios)
5. Clic en **"Save"**

### Paso 2: Verificar Configuración

Asegúrate de que estos valores estén correctos:

- **Root Directory:** `frontend-salud` (sin espacios)
- **Build Command:** `npm install && npm run build`
- **Output Directory:** `dist/frontend-salud/browser`
- **Install Command:** `npm install`

### Paso 3: Hacer Nuevo Deploy

Después de corregir:

1. Ve a **Deployments**
2. Clic en los tres puntos (`...`) del último deployment
3. Selecciona **"Redeploy"**
4. O simplemente espera - Vercel debería detectar el cambio y hacer un nuevo deploy automáticamente

## ✅ Verificar Variables de Entorno

Antes de continuar, asegúrate de tener:

1. Ve a **Settings** → **Environment Variables**
2. Debe existir:
   ```
   NG_APP_API_URL = https://backend-salud-lhq8.onrender.com
   ```
3. Si no existe, agrégalo para **Production**, **Preview** y **Development**
