# 🔧 Solución Final: Error "0 Unknown Error"

## ❌ Problema Persistente

El frontend sigue mostrando:
```
Error: Http failure response for https://backend-salud-lhq8.onrender.com/api/health: 0 Unknown Error
```

## 🔍 Diagnóstico

El error "0 Unknown Error" en Angular generalmente significa:
1. **CORS bloqueado** - El backend no permite el origen del frontend
2. **Backend no accesible** - El backend está "dormido" o no responde
3. **Problema de red/SSL** - Problema de conectividad

## ✅ Solución Paso a Paso

### Paso 1: Verificar que el Backend Responda Directamente

**Abre en tu navegador:**
```
https://backend-salud-lhq8.onrender.com/api/health
```

**Resultados posibles:**
- ✅ **Si ves JSON:** El backend funciona, el problema es CORS
- ❌ **Si ves error o timeout:** El backend está dormido o no funciona

**Si el backend está dormido:**
- Espera 30-60 segundos (puede tardar en despertar)
- Vuelve a intentar
- Una vez que responda, prueba el frontend

### Paso 2: Verificar CORS en Render

1. Ve a **Render Dashboard** → `backend-salud` → **Environment** → **Environment Variables**
2. **DEBE existir:**
   ```
   FRONTEND_URL = https://vitared-salud-20.vercel.app
   ```
3. **Verifica:**
   - ✅ Incluye `https://`
   - ✅ NO tiene barra final `/`
   - ✅ Es EXACTAMENTE igual a la URL de Vercel
4. **Si no existe o está mal:**
   - Agrégalo o corrígelo
   - Guarda
   - Render redeployará automáticamente (espera 2-3 min)

### Paso 3: Verificar Variable de Entorno en Vercel

1. Ve a **Vercel Dashboard** → Tu Proyecto → **Settings** → **Environment Variables**
2. **DEBE existir:**
   ```
   NG_APP_API_URL = https://backend-salud-lhq8.onrender.com
   ```
3. **Si no existe:**
   - Agrégalo para **Production**, **Preview** y **Development**
   - Guarda

### Paso 4: Forzar Nuevo Deploy en Vercel

1. Ve a **Deployments**
2. Clic en los tres puntos (`...`) del último deployment
3. Selecciona **"Redeploy"**
4. Espera a que termine (2-3 min)

### Paso 5: Verificar Logs del Backend

1. Ve a **Render Dashboard** → `backend-salud` → **Logs**
2. Busca mensajes relacionados con CORS:
   - `CORS policy`
   - `Access-Control-Allow-Origin`
   - Errores de conexión

## 🧪 Prueba Directa de CORS

Abre la **consola del navegador** (F12) en el frontend y busca:

1. **Errores de CORS:**
   ```
   Access to XMLHttpRequest at '...' from origin '...' has been blocked by CORS policy
   ```
   
2. **Errores de red:**
   ```
   Failed to fetch
   Network error
   ```

## 🔧 Solución Alternativa: Probar con CORS Deshabilitado Temporalmente

Si nada funciona, podemos hacer una prueba temporal deshabilitando CORS (solo para diagnóstico):

1. En `CorsConfig.java`, cambiar temporalmente:
   ```java
   config.setAllowedOrigins(Arrays.asList("*")); // Permitir todos los orígenes temporalmente
   ```
2. Hacer commit y push
3. Render redeployará
4. Probar el frontend
5. Si funciona, el problema es la configuración de `FRONTEND_URL`

## 📝 Checklist Final

- [ ] Backend responde en `/api/health` directamente en el navegador
- [ ] `FRONTEND_URL` configurada en Render con la URL exacta de Vercel
- [ ] `NG_APP_API_URL` configurada en Vercel con la URL del backend
- [ ] Render redeployó después de cambiar `FRONTEND_URL`
- [ ] Vercel redeployó después de configurar `NG_APP_API_URL`
- [ ] Backend está "Live" (no "Sleeping") en Render

## 🎯 Próximo Paso Inmediato

**PRIMERO:** Abre en tu navegador:
```
https://backend-salud-lhq8.onrender.com/api/health
```

**Comparte el resultado:**
- ¿Ves el JSON con `{"status":"OK",...}`?
- ¿Ves un error?
- ¿Tarda mucho en cargar?

Con esa información podré darte la solución exacta.
