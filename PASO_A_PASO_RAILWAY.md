# 🚀 Guía Paso a Paso: Configurar Railway

Basado en lo que veo en tu Railway, aquí está la guía detallada paso a paso.

## 📋 Lo que ya tienes configurado

Según las capturas que veo:
- ✅ **Backend** (`vitared-salud`) - Online
- ✅ **Redis** - Online y conectado
- ✅ **Postgres** - Online
- ✅ Variables de Redis configuradas
- ✅ Variables de Contentful configuradas (pero con nombres diferentes)

## ⚠️ Problema detectado: Nombres de variables

Veo que en Railway tienes:
- `CONTENTFUL_SPACEID` (sin guión bajo)
- `CONTENTFUL_ACCESSTOKEN` (sin guión bajo)
- `SPRING_DATA_REDIS_HOST`
- `SPRING_DATA_REDIS_PORT`

El código ahora acepta ambos formatos, pero es mejor usar los nombres estándar.

---

## 📝 PASO 1: Corregir Variables de Contentful en Backend

### 1.1. Ir a Variables del Backend

1. Ve a: https://railway.com/project/48126a3e-7efb-49eb-8628-860b5a247974/service/14c017e6-559d-4c75-b855-1f7eb327293e
2. Clic en la pestaña **"Variables"**

### 1.2. Agregar/Corregir Variables de Contentful

Busca estas variables y agrégalas o corrígelas:

#### Variable 1: `CONTENTFUL_ENABLED`
- **Nombre:** `CONTENTFUL_ENABLED`
- **Valor:** `true`
- **Acción:** Si no existe, clic en **"New Variable"** y agrégalo

#### Variable 2: `CONTENTFUL_SPACE_ID` (con guión bajo)
- **Nombre:** `CONTENTFUL_SPACE_ID`
- **Valor:** Copia el valor de `CONTENTFUL_SPACEID` (que ya tienes)
- **Acción:** 
  - Si ya tienes `CONTENTFUL_SPACEID`, copia su valor
  - Agrega nueva variable `CONTENTFUL_SPACE_ID` con ese valor
  - O simplemente renombra la existente

#### Variable 3: `CONTENTFUL_ACCESS_TOKEN` (con guión bajo)
- **Nombre:** `CONTENTFUL_ACCESS_TOKEN`
- **Valor:** Copia el valor de `CONTENTFUL_ACCESSTOKEN` (que ya tienes)
- **Acción:**
  - Si ya tienes `CONTENTFUL_ACCESSTOKEN`, copia su valor
  - Agrega nueva variable `CONTENTFUL_ACCESS_TOKEN` con ese valor
  - O simplemente renombra la existente

#### Variable 4: `CONTENTFUL_ENVIRONMENT`
- **Nombre:** `CONTENTFUL_ENVIRONMENT`
- **Valor:** `master`
- **Acción:** Si no existe, agrégalo

**✅ Resultado esperado:** Deberías tener estas 4 variables:
```
CONTENTFUL_ENABLED=true
CONTENTFUL_SPACE_ID=wvf5ctjvbuns
CONTENTFUL_ACCESS_TOKEN=0326UXZfUPJQkdHPDTaVdt
CONTENTFUL_ENVIRONMENT=master
```

---

## 📝 PASO 2: Verificar Variables de Redis

### 2.1. Verificar que Redis está conectado

1. En Railway, ve al servicio **Redis**
2. Clic en **"Variables"**
3. Deberías ver variables como:
   - `SPRING_DATA_REDIS_HOST`
   - `SPRING_DATA_REDIS_PORT`
   - `REDIS_PASSWORD`

### 2.2. Verificar que el Backend tiene acceso

1. Ve al servicio **vitared-salud** (backend)
2. Clic en **"Variables"**
3. Deberías ver que Railway compartió automáticamente las variables de Redis

**✅ Si no las ves compartidas:**
- En el servicio Redis, busca la opción **"Connect"** o **"Add Variable Reference"**
- Selecciona el servicio **vitared-salud**
- Railway compartirá las variables automáticamente

---

## 📝 PASO 3: Configurar FRONTEND_URL (temporal)

Por ahora, usa una URL temporal. La actualizaremos después de crear el frontend.

1. En el servicio **vitared-salud** → **Variables**
2. Busca o agrega:
   - **Nombre:** `FRONTEND_URL`
   - **Valor:** `http://localhost:4200` (temporal, solo para que no falle)
3. Guarda

**⚠️ IMPORTANTE:** Después de crear el frontend, actualizarás esto con la URL real.

---

## 📝 PASO 4: Crear Servicio Frontend en Railway

### 4.1. Crear Nuevo Servicio

1. En tu proyecto Railway, clic en **"New"** (botón verde/púrpura)
2. Selecciona **"GitHub Repo"**
3. Si te pide conectar GitHub:
   - Autoriza Railway
   - Selecciona el repositorio: `florcuevasgithub/vitared-salud`

### 4.2. Configurar Root Directory

1. Después de seleccionar el repo, busca **"Root Directory"**
2. Escribe: `frontend-salud`
3. Railway debería detectar automáticamente que es Angular

### 4.3. Verificar Configuración Automática

Railway debería detectar:
- ✅ Framework: Angular
- ✅ Build Command: `npm install && npm run build`
- ✅ Start Command: `npx serve -s dist/frontend-salud -l $PORT`

**Si no detecta automáticamente:**
- Ve a **"Settings"** del servicio
- Configura manualmente:
  - Build: `npm install && npm run build`
  - Start: `npx serve -s dist/frontend-salud -l $PORT`

### 4.4. Iniciar Deploy

1. Clic en **"Deploy"** o espera a que Railway inicie automáticamente
2. Espera a que termine el build (puede tardar 3-5 minutos)

---

## 📝 PASO 5: Configurar Variables del Frontend

### 5.1. Obtener URL del Backend

Tu backend está en: `https://vitared-salud-production.up.railway.app`

### 5.2. Agregar Variable API_URL

1. Una vez creado el servicio frontend, ve a **"Variables"**
2. Clic en **"New Variable"**
3. Agrega:
   - **Nombre:** `API_URL`
   - **Valor:** `https://vitared-salud-production.up.railway.app`
   - **⚠️ IMPORTANTE:** Sin barra final `/` al final

4. Guarda

### 5.3. Railway Redeployará Automáticamente

Railway detectará el cambio y redeployará automáticamente.

---

## 📝 PASO 6: Actualizar FRONTEND_URL en Backend

### 6.1. Obtener URL del Frontend

1. Ve al servicio frontend en Railway
2. En la parte superior, verás la URL asignada (ej: `https://frontend-production.up.railway.app`)
3. **Copia esa URL completa**

### 6.2. Actualizar en Backend

1. Ve al servicio **vitared-salud** (backend)
2. Ve a **"Variables"**
3. Busca `FRONTEND_URL`
4. Actualiza el valor con la URL del frontend que copiaste
5. **⚠️ IMPORTANTE:** 
   - Debe ser EXACTAMENTE igual (con https://)
   - Sin barra final `/`
   - Ejemplo: `https://frontend-production.up.railway.app`

6. Guarda

### 6.3. Railway Redeployará el Backend

Railway detectará el cambio y redeployará automáticamente el backend.

---

## ✅ PASO 7: Verificar que Todo Funciona

### 7.1. Verificar Backend

Abre en tu navegador o usa curl:
```
https://vitared-salud-production.up.railway.app/api/health
```

**Deberías ver:**
```json
{
  "status": "OK",
  "message": "Backend Salud está funcionando"
}
```

### 7.2. Verificar Contenidos (Contentful)

```
https://vitared-salud-production.up.railway.app/api/contenido
```

**Deberías ver:**
- Si Contentful está configurado: Contenidos reales de Contentful
- Si no: Datos mock (para desarrollo)

### 7.3. Verificar Frontend

1. Visita la URL del frontend que Railway asignó
2. Deberías ver:
   - ✅ La aplicación Angular cargando
   - ✅ "Estado: OK" en la sección de health check
   - ✅ Contenidos médicos cargándose (si Contentful está configurado)

### 7.4. Verificar Redis (en Logs)

1. Ve al servicio **vitared-salud** → **"Deployments"** → Clic en el último deploy
2. Ve a **"Logs"**
3. Busca mensajes como:
   - `✅ Configurando Redis Connection`
   - `✅ Contenido guardado en caché Redis`
   - `✅ Contenido obtenido del caché Redis`

---

## 🐛 Troubleshooting

### El frontend no carga

**Solución:**
1. Verifica que el build se completó (ve a "Deployments")
2. Revisa los logs del frontend
3. Verifica que `API_URL` esté configurada

### Error de CORS

**Síntoma:** En la consola del navegador ves errores de CORS

**Solución:**
1. Verifica que `FRONTEND_URL` en el backend sea EXACTAMENTE igual a la URL del frontend
2. Debe incluir `https://`
3. No debe tener barra final `/`
4. Después de cambiar, espera a que Railway redeploye

### Contentful no funciona

**Síntoma:** Los contenidos no se cargan o ves datos mock

**Solución:**
1. Verifica que `CONTENTFUL_ENABLED=true`
2. Verifica que `CONTENTFUL_SPACE_ID` y `CONTENTFUL_ACCESS_TOKEN` tengan valores
3. Revisa los logs del backend para ver errores específicos

### Redis no funciona

**Síntoma:** Los logs muestran errores de Redis

**Solución:**
1. Verifica que Redis esté "Online" en Railway
2. Verifica que las variables de Redis estén compartidas con el backend
3. La app funciona sin Redis, solo sin caché

---

## 📊 Checklist Final

Antes de considerar todo listo, verifica:

### Backend
- [ ] `CONTENTFUL_ENABLED=true`
- [ ] `CONTENTFUL_SPACE_ID` tiene valor
- [ ] `CONTENTFUL_ACCESS_TOKEN` tiene valor
- [ ] `FRONTEND_URL` tiene la URL del frontend (sin barra final)
- [ ] Variables de Redis están compartidas (SPRING_DATA_REDIS_HOST, etc.)
- [ ] Backend responde en `/api/health`
- [ ] Backend responde en `/api/contenido`

### Frontend
- [ ] Servicio frontend creado en Railway
- [ ] `API_URL` configurada con URL del backend
- [ ] Frontend carga correctamente
- [ ] Muestra "Estado: OK"
- [ ] Contenidos se cargan

### Redis
- [ ] Redis está "Online"
- [ ] Variables compartidas con backend
- [ ] Logs muestran conexión exitosa

---

## 🎉 ¡Listo!

Una vez completado todo el checklist, tu aplicación estará completamente funcional con:
- ✅ Backend en Railway
- ✅ Frontend Angular en Railway
- ✅ Contentful integrado
- ✅ Redis como caché
- ✅ PostgreSQL como base de datos
