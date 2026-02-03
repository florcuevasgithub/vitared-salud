# ⚡ Quick Start: Vercel + Render

Guía rápida para desplegar en 10 minutos.

## 🎯 Orden de Ejecución

1. **Backend en Render** (obtener URL)
2. **Frontend en Vercel** (usar URL del backend)
3. **Actualizar CORS** (conectar ambos)

---

## 🚀 PARTE 1: Backend en Render (5 min)

### 1. Crear PostgreSQL
- Render Dashboard → **New +** → **PostgreSQL**
- Name: `postgres-salud`
- Plan: **Free**
- Crear

### 2. Crear Redis (Opcional)
- **New +** → **Redis**
- Name: `redis-salud`
- Plan: **Free**
- Crear

### 3. Crear Web Service
- **New +** → **Web Service**
- Repo: `florcuevasgithub/vitared-salud`
- **Root Directory:** `backend-salud`
- **Environment:** Java
- **Build:** `./mvnw clean package -DskipTests`
- **Start:** `java -jar target/*.jar`

### 4. Variables de Entorno
```
FRONTEND_URL=https://tu-frontend.vercel.app (temporal)
CONTENTFUL_ENABLED=true
CONTENTFUL_SPACE_ID=wvf5ctjvbuns
CONTENTFUL_ACCESS_TOKEN=0326UXZfUPJQkdHPDTaVdt
CONTENTFUL_ENVIRONMENT=master
REDIS_ENABLED=true
```

### 5. Conectar Bases de Datos
- En **Addons**, link `postgres-salud` y `redis-salud`
- Render creará las variables automáticamente

### 6. Deploy
- Clic en **Create Web Service**
- ⏳ Espera 5-10 min
- **✅ Copia la URL del backend** (ej: `https://backend-salud.onrender.com`)

---

## 🚀 PARTE 2: Frontend en Vercel (3 min)

### 1. Crear Proyecto
- Vercel Dashboard → **New Project**
- Repo: `florcuevasgithub/vitared-salud`
- **Root Directory:** `frontend-salud`

### 2. Configuración
- Framework: Auto-detect (Angular)
- Build: `npm install && npm run build` (automático)
- Output: `dist/frontend-salud/browser`

### 3. Variable de Entorno
```
NG_APP_API_URL=https://tu-backend.onrender.com
```
(Usa la URL que copiaste del backend)

### 4. Deploy
- Clic en **Deploy**
- ⏳ Espera 2-3 min
- **✅ Copia la URL del frontend** (ej: `https://vitared-salud.vercel.app`)

---

## 🔄 PARTE 3: Conectar Ambos (2 min)

### 1. Actualizar FRONTEND_URL en Render
- Render → `backend-salud` → **Environment**
- Actualizar `FRONTEND_URL` con la URL de Vercel
- Render redeployará automáticamente

### 2. Verificar
- Visita la URL de Vercel
- Deberías ver "Estado: OK"
- Contenidos deberían cargarse

---

## ✅ Checklist Rápido

- [ ] PostgreSQL creado en Render
- [ ] Redis creado en Render (opcional)
- [ ] Backend desplegado en Render
- [ ] URL del backend copiada
- [ ] Frontend desplegado en Vercel
- [ ] `NG_APP_API_URL` configurada en Vercel
- [ ] URL del frontend copiada
- [ ] `FRONTEND_URL` actualizada en Render
- [ ] Todo funciona ✅

---

## 🐛 Problemas Comunes

### Backend no responde
- Verifica que esté "Live" en Render
- Revisa los logs
- Verifica `DATABASE_URL`

### Frontend no se conecta
- Verifica `NG_APP_API_URL` en Vercel
- Haz redeploy en Vercel después de agregar variable
- Verifica que el backend esté accesible

### CORS Error
- Verifica que `FRONTEND_URL` en Render sea EXACTAMENTE igual a la URL de Vercel
- Sin barra final `/`
- Espera a que Render redeploye

---

## 📝 URLs de Referencia

- **Render:** https://render.com
- **Vercel:** https://vercel.com
- **Guía Detallada:** Ver [DEPLOYMENT_VERCEL_RENDER.md](./DEPLOYMENT_VERCEL_RENDER.md)
