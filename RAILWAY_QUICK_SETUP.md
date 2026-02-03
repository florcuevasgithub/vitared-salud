# Guía Rápida: Configurar Railway

## 🎯 Tu proyecto ya está en Railway

Según los links que pasaste:
- **Backend:** https://railway.com/project/48126a3e-7efb-49eb-8628-860b5a247974/service/14c017e6-559d-4c75-b855-1f7eb327293e
- **Frontend:** Necesitas crear el servicio para Angular

## 📋 Checklist Rápido

### Backend (Ya existe)

1. ✅ **Variables de Entorno - Backend:**
   - [ ] `FRONTEND_URL` = URL del frontend (se actualizará después)
   - [ ] `CONTENTFUL_ENABLED` = `true`
   - [ ] `CONTENTFUL_SPACE_ID` = `wvf5ctjvbuns`
   - [ ] `CONTENTFUL_ACCESS_TOKEN` = `0326UXZfUPJQkdHPDTaVdt` (o el token actual)
   - [ ] `CONTENTFUL_ENVIRONMENT` = `master`
   - [ ] `REDIS_ENABLED` = `true` (si agregas Redis)

2. ✅ **Redis (Opcional pero recomendado):**
   - [ ] Clic en "New" → "Database" → "Add Redis"
   - [ ] Railway compartirá automáticamente las variables con el backend

### Frontend (Crear nuevo servicio)

1. ✅ **Crear Servicio Frontend:**
   - [ ] Clic en "New" → "GitHub Repo"
   - [ ] Seleccionar repositorio: `florcuevasgithub/vitared-salud`
   - [ ] **Root Directory:** `frontend-salud`
   - [ ] Railway detectará automáticamente Angular

2. ✅ **Variables de Entorno - Frontend:**
   - [ ] `API_URL` = `https://vitared-salud-production.up.railway.app` (URL de tu backend)

3. ✅ **Después del deploy:**
   - [ ] Copiar la URL del frontend que Railway asigne
   - [ ] Actualizar `FRONTEND_URL` en el backend con esa URL

## 🚀 Pasos Detallados

### Paso 1: Configurar Backend

1. Ve a: https://railway.com/project/48126a3e-7efb-49eb-8628-860b5a247974/service/14c017e6-559d-4c75-b855-1f7eb327293e

2. Clic en **"Variables"**

3. Agrega/Actualiza estas variables:

```
CONTENTFUL_ENABLED=true
CONTENTFUL_SPACE_ID=wvf5ctjvbuns
CONTENTFUL_ACCESS_TOKEN=0326UXZfUPJQkdHPDTaVdt
CONTENTFUL_ENVIRONMENT=master
```

4. (Opcional) Agrega Redis:
   - Clic en "New" → "Database" → "Add Redis"
   - Railway compartirá automáticamente las variables

### Paso 2: Crear Frontend

1. En el mismo proyecto de Railway, clic en **"New"**

2. Selecciona **"GitHub Repo"**

3. Conecta tu repositorio: `florcuevasgithub/vitared-salud`

4. En **"Root Directory"**, escribe: `frontend-salud`

5. Railway detectará automáticamente:
   - ✅ Framework: Angular
   - ✅ Build: `npm install && npm run build`
   - ✅ Start: `npx serve -s dist/frontend-salud -l $PORT`

6. Clic en **"Deploy"**

### Paso 3: Configurar Variables del Frontend

1. Una vez creado el servicio frontend, ve a **"Variables"**

2. Agrega:
   ```
   API_URL=https://vitared-salud-production.up.railway.app
   ```

3. Railway redeployará automáticamente

### Paso 4: Actualizar CORS en Backend

1. Copia la URL del frontend que Railway asignó (ej: `https://frontend-production.up.railway.app`)

2. Ve al servicio **backend** → **Variables**

3. Actualiza:
   ```
   FRONTEND_URL=https://frontend-production.up.railway.app
   ```

4. Railway redeployará automáticamente el backend

## ✅ Verificación Final

1. **Backend:**
   ```bash
   curl https://vitared-salud-production.up.railway.app/api/health
   ```
   Debería responder: `{"status":"OK","message":"Backend Salud está funcionando"}`

2. **Contenidos:**
   ```bash
   curl https://vitared-salud-production.up.railway.app/api/contenido
   ```
   Debería devolver los contenidos (o datos mock si Contentful no está configurado)

3. **Frontend:**
   - Visita la URL de Railway
   - Deberías ver la aplicación Angular
   - Debería mostrar "Estado: OK"
   - Los contenidos deberían cargarse

## 🐛 Problemas Comunes

### El frontend no se conecta al backend
- ✅ Verifica que `API_URL` esté configurada en el frontend
- ✅ Verifica que `FRONTEND_URL` en el backend coincida EXACTAMENTE con la URL del frontend

### Redis no funciona
- ✅ Verifica que Redis esté en el mismo proyecto
- ✅ Railway debería compartir automáticamente las variables
- ✅ La app funciona sin Redis, solo sin caché

### Contentful no funciona
- ✅ Verifica que el token sea correcto
- ✅ Verifica que `CONTENTFUL_ENABLED=true`
- ✅ La app funciona sin Contentful, usa datos mock
