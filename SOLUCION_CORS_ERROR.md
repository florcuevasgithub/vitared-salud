# 🔧 Solución: Error CORS "0 Unknown Error"

## ❌ Problema

El frontend no puede conectarse al backend:
```
Error: Http failure response for https://backend-salud-lhq8.onrender.com/api/health: 0 Unknown Error
```

## 🔍 Posibles Causas

1. **CORS no configurado correctamente** - El backend no permite peticiones desde el frontend
2. **Backend "dormido"** - En plan gratuito de Render, se duerme después de 15 min de inactividad
3. **FRONTEND_URL no configurada** - El backend no sabe qué origen permitir
4. **Backend no accesible** - Problema de red o servidor

## ✅ Soluciones

### Solución 1: Verificar y Configurar FRONTEND_URL en Render

1. Ve a Render Dashboard → `backend-salud` → **Environment** → **Environment Variables**
2. Busca `FRONTEND_URL`
3. **Si no existe**, agrégalo con el valor:
   ```
   https://vitared-salud-20.vercel.app
   ```
4. **Si existe pero tiene otro valor**, cámbialo a:
   ```
   https://vitared-salud-20.vercel.app
   ```
5. **IMPORTANTE:**
   - Debe incluir `https://`
   - NO debe tener barra final `/`
   - Debe ser EXACTAMENTE igual a la URL de Vercel
6. Guarda los cambios
7. Render redeployará automáticamente (espera 2-3 min)

### Solución 2: Despertar el Backend

Si el backend está "dormido" (plan gratuito):

1. Abre directamente en el navegador:
   ```
   https://backend-salud-lhq8.onrender.com/api/health
   ```
2. Espera 30-60 segundos (puede tardar en despertar)
3. Deberías ver: `{"status":"OK","message":"Backend Salud está funcionando"}`
4. Luego prueba el frontend nuevamente

### Solución 3: Verificar Configuración de CORS

El backend ya tiene CORS configurado en `CorsConfig.java` y `application.properties`, pero verifica:

1. En Render → `backend-salud` → **Environment Variables**
2. Debe existir:
   ```
   FRONTEND_URL = https://vitared-salud-20.vercel.app
   ```
3. Si no existe, agrégalo y guarda

### Solución 4: Verificar que el Backend Esté "Live"

1. Ve a Render Dashboard → `backend-salud`
2. Verifica que el estado sea **"Live"** (no "Sleeping" o "Failed")
3. Si está "Sleeping", haz clic en el servicio para despertarlo
4. Si está "Failed", revisa los logs

## 🧪 Pruebas Paso a Paso

### 1. Probar Backend Directamente

Abre en el navegador:
```
https://backend-salud-lhq8.onrender.com/api/health
```

**Si funciona:** Verás `{"status":"OK",...}`
**Si no funciona:** El backend está dormido o hay un problema

### 2. Verificar CORS

Abre la consola del navegador (F12) en el frontend y busca errores como:
- `CORS policy: No 'Access-Control-Allow-Origin' header`
- `CORS policy: The request client is not a secure context`

### 3. Verificar Variables de Entorno

En Render → `backend-salud` → **Environment Variables**, debe existir:
```
FRONTEND_URL = https://vitared-salud-20.vercel.app
```

## 📝 Checklist

- [ ] `FRONTEND_URL` configurada en Render con la URL correcta de Vercel
- [ ] Backend está "Live" en Render
- [ ] Backend responde en `/api/health` directamente
- [ ] Render redeployó después de cambiar `FRONTEND_URL`
- [ ] Frontend tiene `NG_APP_API_URL` configurada en Vercel

## 🎯 Próximos Pasos

1. **Configura `FRONTEND_URL` en Render** (si no está configurada)
2. **Espera a que Render redeploye** (2-3 min)
3. **Despierta el backend** (abre `/api/health` en el navegador)
4. **Prueba el frontend nuevamente**
