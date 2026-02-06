# 🎯 Próximos Pasos - Guía Práctica

**Fecha:** $(date)  
**Estado:** Backend Dockerfile corregido, listo para deploy

---

## ✅ Lo que ya está hecho:

1. ✅ Dockerfile corregido (multi-stage build)
2. ✅ Código pusheado a GitHub
3. ✅ Configuraciones listas (vercel.json, render.yaml)
4. ✅ Documentación completa

---

## 🚀 PASO 1: Verificar/Crear Backend en Render (AHORA)

### Opción A: Si ya tienes el servicio creado en Render

1. **Ve a Render Dashboard:** https://dashboard.render.com
2. **Busca el servicio:** `backend-salud`
3. **Verifica el estado:**
   - Si dice "Building" → Espera a que termine
   - Si dice "Live" → ✅ ¡Funciona!
   - Si dice "Failed" → Ve a la pestaña "Logs" y comparte el error

4. **Si está fallando o no se actualizó:**
   - Ve a la pestaña **"Manual Deploy"**
   - Clic en **"Deploy latest commit"**
   - Espera 5-10 minutos

### Opción B: Si NO tienes el servicio creado aún

Sigue estos pasos en orden:

#### 1. Crear PostgreSQL (2 min)
1. Render Dashboard → **"New +"** → **"PostgreSQL"**
2. Configura:
   - **Name:** `postgres-salud`
   - **Database:** `salud`
   - **User:** `salud_user`
   - **Plan:** `Free`
3. Clic **"Create Database"**
4. ⏳ Espera 2-3 minutos
5. **IMPORTANTE:** Copia la **Internal Database URL** (formato: `postgresql://...`)

#### 2. Crear Redis (Opcional, 2 min)
1. **"New +"** → **"Redis"**
2. Configura:
   - **Name:** `redis-salud`
   - **Plan:** `Free`
3. Clic **"Create Redis"**
4. ⏳ Espera 2-3 minutos

#### 3. Crear Web Service - Backend (5 min)

1. **"New +"** → **"Web Service"**

2. **Conectar repositorio:**
   - Selecciona: `florcuevasgithub/vitared-salud`
   - O conecta manualmente si no aparece

3. **Configuración básica:**
   ```
   Name: backend-salud
   Region: Oregon (US West) [o el más cercano]
   Branch: main
   Root Directory: backend-salud
   ```

4. **Configuración de build (IMPORTANTE):**
   ```
   Environment: Docker  ← CAMBIAR A "Docker" (no Java)
   Build Command: [DEJAR VACÍO]
   Start Command: [DEJAR VACÍO]
   ```
   ⚠️ **El Dockerfile maneja todo automáticamente**

5. **Instance Type:**
   - Selecciona: **Free** ($0/month)

6. **Variables de entorno - Agregar estas:**
   ```
   FRONTEND_URL=https://tu-frontend.vercel.app
   CONTENTFUL_ENABLED=true
   CONTENTFUL_SPACE_ID=wvf5ctjvbuns
   CONTENTFUL_ACCESS_TOKEN=0326UXZfUPJQkdHPDTaVdt
   CONTENTFUL_ENVIRONMENT=master
   REDIS_ENABLED=true
   ```
   ⚠️ **FRONTEND_URL es temporal, la actualizaremos después**

7. **Conectar bases de datos:**
   - En la sección **"Addons"** o **"Databases"**
   - Link: `postgres-salud`
   - Link: `redis-salud`
   - Render creará las variables automáticamente

8. **Health Check Path:**
   ```
   /api/health
   ```

9. **Clic en "Create Web Service"**

10. ⏳ **Espera 5-10 minutos** mientras construye

11. **Una vez terminado:**
    - Copia la URL del servicio (ej: `https://backend-salud.onrender.com`)
    - Prueba: `https://backend-salud.onrender.com/api/health`
    - Deberías ver: `{"status":"OK","message":"Backend Salud está funcionando"}`

---

## 🚀 PASO 2: Deploy Frontend en Vercel (DESPUÉS del backend)

### 1. Crear proyecto en Vercel

1. Ve a: https://vercel.com
2. Inicia sesión con GitHub
3. Clic en **"New Project"**
4. Selecciona repositorio: `florcuevasgithub/vitared-salud`

### 2. Configuración del proyecto

1. **Root Directory:**
   ```
   frontend-salud
   ```
   ⚠️ **IMPORTANTE:** Cambiar de raíz a `frontend-salud`

2. **Framework Preset:**
   - Dejar en **"Other"** o **"Angular"** (Vercel lo detectará)

3. **Build and Output Settings:**
   ```
   Build Command: npm install && npm run build
   Output Directory: dist/frontend-salud/browser
   Install Command: npm install
   ```

### 3. Variables de entorno

1. Clic en **"Environment Variables"**
2. Agregar:
   ```
   Name: NG_APP_API_URL
   Value: https://tu-backend.onrender.com
   ```
   ⚠️ **Usa la URL que copiaste del backend en Render**

3. Seleccionar: **Production**, **Preview**, **Development**

### 4. Deploy

1. Clic en **"Deploy"**
2. ⏳ Espera 2-3 minutos
3. Una vez terminado:
   - Copia la URL del frontend (ej: `https://vitared-salud.vercel.app`)
   - Prueba abrirla en el navegador

---

## 🔄 PASO 3: Conectar Backend y Frontend

### 1. Actualizar CORS en Render

1. Ve al servicio `backend-salud` en Render
2. Ve a **"Environment"** → **"Environment Variables"**
3. Busca `FRONTEND_URL`
4. Cambia el valor a la URL de Vercel (ej: `https://vitared-salud.vercel.app`)
5. Guarda
6. Render redeployará automáticamente (espera 2-3 min)

### 2. Verificar conexión

1. Abre el frontend en Vercel
2. Deberías ver:
   - ✅ "Estado: OK" (conexión backend exitosa)
   - ✅ Contenidos médicos cargándose

---

## ✅ Checklist Final

### Backend (Render)
- [ ] Servicio creado y "Live"
- [ ] PostgreSQL conectado
- [ ] Redis conectado (opcional)
- [ ] `/api/health` responde correctamente
- [ ] `/api/contenido` responde correctamente
- [ ] `FRONTEND_URL` configurada con URL de Vercel

### Frontend (Vercel)
- [ ] Proyecto creado y deployado
- [ ] `NG_APP_API_URL` configurada con URL de Render
- [ ] Frontend carga correctamente
- [ ] Muestra "Estado: OK"
- [ ] Contenidos se cargan

### Conexión
- [ ] Frontend se conecta al backend
- [ ] No hay errores de CORS
- [ ] Contenidos se muestran correctamente

---

## 🐛 Troubleshooting Rápido

### Backend no responde
- Verifica que esté "Live" en Render
- Revisa logs en Render
- Verifica que PostgreSQL esté conectado

### Frontend no se conecta al backend
- Verifica `NG_APP_API_URL` en Vercel
- Verifica que el backend esté accesible públicamente
- Revisa consola del navegador (F12)

### Error de CORS
- Verifica que `FRONTEND_URL` en Render sea EXACTAMENTE igual a la URL de Vercel
- Debe incluir `https://`
- No debe tener barra final `/`
- Espera a que Render redeploye después de cambiar

### Backend se "duerme"
- Es normal en plan gratuito de Render
- Se duerme después de 15 min de inactividad
- Primera petición después de dormir tarda ~30 segundos

---

## 📞 URLs Esperadas

Después de completar todos los pasos:

- **Backend:** `https://backend-salud.onrender.com`
- **Frontend:** `https://vitared-salud.vercel.app` (o similar)
- **Health Check:** `https://backend-salud.onrender.com/api/health`
- **Contenidos:** `https://backend-salud.onrender.com/api/contenido`

---

## 🎯 ¿Qué hacer ahora?

**Si ya tienes el servicio en Render:**
1. Ve a Render Dashboard
2. Verifica el estado del servicio `backend-salud`
3. Si está fallando, comparte los logs
4. Si está "Live", prueba `/api/health`

**Si NO tienes el servicio en Render:**
1. Sigue el **PASO 1 - Opción B** arriba
2. Crea PostgreSQL, Redis y Web Service
3. Espera a que termine el build
4. Prueba `/api/health`

---

**¿Necesitas ayuda con algún paso específico?** Comparte dónde estás y qué error ves.
