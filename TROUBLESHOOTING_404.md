# 🔍 Troubleshooting: Error 404 en `/api/health`

## ❌ Problema

El servicio está "Deployed" en Render pero el endpoint `/api/health` retorna 404 "Not Found".

## ✅ Verificaciones

### 1. Verificar que el servidor esté corriendo

En Render Dashboard:
1. Ve al servicio `backend-salud`
2. Clic en la pestaña **"Logs"**
3. Busca mensajes como:
   - `Started BackendSaludApplication`
   - `Tomcat started on port(s): 8080`
   - `Listening on port 8080`

### 2. Verificar la URL correcta

La URL debería ser:
```
https://backend-salud.onrender.com/api/health
```

**NO usar:** `tu-backend.onrender.com` (eso es un placeholder)

### 3. Verificar el puerto

El Dockerfile expone el puerto 8080, y Render debería mapearlo automáticamente.

### 4. Verificar logs de errores

Si hay errores en los logs, compártelos para revisarlos.

## 🔧 Soluciones Posibles

### Solución 1: Verificar URL real

1. En Render Dashboard, ve al servicio `backend-salud`
2. Copia la **URL real** del servicio (debería ser algo como `https://backend-salud-xxxx.onrender.com`)
3. Prueba: `https://tu-url-real.onrender.com/api/health`

### Solución 2: Verificar que el servidor esté escuchando

Si los logs muestran que el servidor no inició correctamente:
- Revisa los logs completos
- Verifica que no haya errores de conexión a PostgreSQL
- Verifica que el puerto esté correctamente configurado

### Solución 3: Probar endpoint raíz

Prueba primero:
```
https://tu-url-real.onrender.com/
```

Si esto también da 404, el problema es de routing general.

### Solución 4: Verificar Health Check Path en Render

1. En Render Dashboard → `backend-salud` → **Settings**
2. Verifica que **Health Check Path** sea: `/api/health`
3. Si está vacío o incorrecto, cámbialo y guarda

## 📝 Próximos Pasos

1. **Comparte los logs** del servicio `backend-salud` de Render
2. **Comparte la URL real** del servicio (no el placeholder)
3. **Prueba el endpoint** con la URL real

## 🎯 Endpoints Disponibles

Una vez que funcione, estos endpoints deberían estar disponibles:

- `GET /api/health` - Health check
- `GET /api/contenido` - Obtener todos los contenidos
- `GET /api/contenido/{id}` - Obtener contenido por ID
- `GET /api/contenido/tipo/{tipo}` - Obtener contenidos por tipo
