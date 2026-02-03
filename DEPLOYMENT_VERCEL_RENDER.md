# 🚀 Guía Completa: Deploy en Vercel + Render

Esta guía te ayudará a desplegar tu aplicación completa usando **Vercel** para el frontend y **Render** para el backend.

## 📋 Resumen

- **Frontend (Angular)** → Vercel
- **Backend (Spring Boot)** → Render
- **PostgreSQL** → Render (gratis)
- **Redis** → Render (gratis, opcional)

## 🎯 Orden de Deployment

**Recomendado:** Desplegar primero el backend, luego el frontend.

1. ✅ Backend en Render (obtener URL)
2. ✅ Frontend en Vercel (usar URL del backend)
3. ✅ Actualizar CORS en backend con URL del frontend

---

## 🚀 PARTE 1: Deploy Backend en Render

### Paso 1: Crear Cuenta y Conectar GitHub

1. Ve a https://render.com
2. Clic en **"Get Started for Free"**
3. Conecta tu cuenta de GitHub
4. Autoriza el acceso a `florcuevasgithub/vitared-salud`

### Paso 2: Crear PostgreSQL

1. En el dashboard, clic en **"New +"** → **"PostgreSQL"**
2. Configura:
   - **Name:** `postgres-salud`
   - **Database:** `salud`
   - **User:** `salud_user`
   - **Region:** Elige el más cercano
   - **Plan:** `Free`
3. Clic en **"Create Database"**
4. ⏳ Espera 2-3 minutos a que se cree
5. **IMPORTANTE:** Copia la **Internal Database URL** (formato: `postgresql://...`)

### Paso 3: Crear Redis (Opcional)

1. Clic en **"New +"** → **"Redis"**
2. Configura:
   - **Name:** `redis-salud`
   - **Region:** Mismo que PostgreSQL
   - **Plan:** `Free`
3. Clic en **"Create Redis"**
4. ⏳ Espera 2-3 minutos

### Paso 4: Crear Web Service (Backend)

1. Clic en **"New +"** → **"Web Service"**
2. Conecta tu repositorio: `florcuevasgithub/vitared-salud`

#### Configuración Básica:

- **Name:** `backend-salud`
- **Region:** Mismo que las bases de datos
- **Branch:** `main`
- **Root Directory:** `backend-salud`
- **Environment:** `Java`
- **Build Command:** `./mvnw clean package -DskipTests`
- **Start Command:** `java -jar target/*.jar`

#### Variables de Entorno:

Añade estas variables:

| Variable | Valor | Notas |
|----------|-------|-------|
| `PORT` | (dejar vacío) | Render lo asigna automáticamente |
| `FRONTEND_URL` | `https://tu-frontend.vercel.app` | Actualizar después de deployar frontend |
| `CONTENTFUL_ENABLED` | `true` | |
| `CONTENTFUL_SPACE_ID` | `wvf5ctjvbuns` | |
| `CONTENTFUL_ACCESS_TOKEN` | `0326UXZfUPJQkdHPDTaVdt` | Tu token real |
| `CONTENTFUL_ENVIRONMENT` | `master` | |
| `REDIS_ENABLED` | `true` | Si agregaste Redis |

#### Conectar PostgreSQL:

1. En la sección **"Addons"**, busca `postgres-salud`
2. Clic en **"Link"**
3. Render creará automáticamente `DATABASE_URL`

#### Conectar Redis (si lo creaste):

1. En **"Addons"**, busca `redis-salud`
2. Clic en **"Link"**
3. Render creará automáticamente las variables de Redis

### Paso 5: Deploy

1. Clic en **"Create Web Service"**
2. ⏳ Espera 5-10 minutos (primera vez puede tardar más)
3. Una vez completado, obtendrás una URL como: `https://backend-salud.onrender.com`

### Paso 6: Verificar Backend

```bash
curl https://tu-backend.onrender.com/api/health
```

Deberías ver: `{"status":"OK","message":"Backend Salud está funcionando"}`

**✅ Guarda esta URL del backend, la necesitarás para el frontend.**

---

## 🚀 PARTE 2: Deploy Frontend en Vercel

### Paso 1: Crear Cuenta y Conectar GitHub

1. Ve a https://vercel.com
2. Clic en **"Sign Up"** o **"Log In"**
3. Conecta tu cuenta de GitHub
4. Autoriza el acceso a `florcuevasgithub/vitared-salud`

### Paso 2: Crear Nuevo Proyecto

1. Clic en **"Add New Project"** o **"New Project"**
2. Selecciona el repositorio: `florcuevasgithub/vitared-salud`

### Paso 3: Configurar el Proyecto

#### Configuración:

- **Framework Preset:** Dejar en "Other" (Vercel detectará Angular)
- **Root Directory:** `frontend-salud`
- **Build Command:** `npm install && npm run build` (automático)
- **Output Directory:** `dist/frontend-salud/browser`
- **Install Command:** `npm install` (automático)

#### Variables de Entorno:

1. En **"Environment Variables"**, añade:

| Variable | Valor | Environments |
|----------|-------|--------------|
| `NG_APP_API_URL` | `https://tu-backend.onrender.com` | ✅ Production<br>✅ Preview<br>✅ Development |

**⚠️ IMPORTANTE:**
- Usa la URL del backend que obtuviste en Render
- **NO** incluyas barra final `/`
- Ejemplo: `https://backend-salud.onrender.com`

### Paso 4: Deploy

1. Clic en **"Deploy"**
2. ⏳ Espera 2-3 minutos
3. Una vez completado, obtendrás una URL como: `https://vitared-salud.vercel.app`

### Paso 5: Verificar Frontend

1. Visita la URL de Vercel
2. Deberías ver la aplicación Angular
3. Si hay error de conexión al backend, es normal (aún no actualizamos CORS)

---

## 🔄 PARTE 3: Configuración Final

### Paso 1: Actualizar FRONTEND_URL en Render

1. Ve a Render → servicio **backend-salud**
2. Ve a **Environment**
3. Busca `FRONTEND_URL`
4. Actualiza con la URL de Vercel (ej: `https://vitared-salud.vercel.app`)
5. **⚠️ IMPORTANTE:** Sin barra final `/`
6. Render redeployará automáticamente

### Paso 2: Verificar Todo Funciona

1. **Backend:**
   ```bash
   curl https://tu-backend.onrender.com/api/health
   ```
   Debería responder: `{"status":"OK",...}`

2. **Frontend:**
   - Visita la URL de Vercel
   - Deberías ver "Estado: OK" al hacer clic en "Verificar Conexión"
   - Los contenidos médicos deberían cargarse

3. **CORS:**
   - Abre la consola del navegador (F12)
   - No deberías ver errores de CORS

---

## ✅ Checklist Final

### Backend (Render)
- [ ] PostgreSQL creado y conectado
- [ ] Redis creado y conectado (opcional)
- [ ] Web Service creado
- [ ] Variables de entorno configuradas
- [ ] `FRONTEND_URL` actualizada con URL de Vercel
- [ ] Backend responde en `/api/health`
- [ ] Backend responde en `/api/contenido`

### Frontend (Vercel)
- [ ] Proyecto creado en Vercel
- [ ] Root Directory: `frontend-salud`
- [ ] Output Directory: `dist/frontend-salud/browser`
- [ ] Variable `NG_APP_API_URL` configurada con URL de Render
- [ ] Frontend carga correctamente
- [ ] Muestra "Estado: OK"
- [ ] Contenidos se cargan

---

## 🐛 Troubleshooting

### Backend no responde

- Verifica que el servicio esté "Live" en Render
- Revisa los logs en Render
- Verifica que `DATABASE_URL` esté configurada

### Frontend no se conecta al backend

- Verifica que `NG_APP_API_URL` tenga la URL correcta de Render
- Verifica que el backend esté accesible públicamente
- Revisa la consola del navegador para errores

### Errores de CORS

- Verifica que `FRONTEND_URL` en Render sea EXACTAMENTE igual a la URL de Vercel
- Debe incluir `https://`
- No debe tener barra final `/`
- Espera a que Render redeploye después de cambiar la variable

### El backend se "duerme"

- Es normal en el plan gratuito de Render
- Se duerme después de 15 min de inactividad
- La primera petición después de dormir tarda ~30 segundos
- Para evitar esto, necesitas el plan de pago ($7/mes)

---

## 🎉 ¡Listo!

Una vez completado el checklist, tu aplicación estará completamente funcional:
- ✅ Frontend Angular en Vercel (siempre disponible)
- ✅ Backend Spring Boot en Render
- ✅ PostgreSQL en Render
- ✅ Redis en Render (opcional)
- ✅ Contentful integrado
- ✅ Todo conectado y funcionando
