# Guía de Deployment

Esta guía te ayudará a desplegar el proyecto completo en Railway (backend) y Vercel (frontend).

## 🚂 Deployment del Backend en Railway

### Paso 1: Preparar el repositorio
1. Asegúrate de que todos los archivos estén en el repositorio
2. El backend debe estar en la carpeta `backend-salud/`

### Paso 2: Crear proyecto en Railway
1. Ve a [railway.app](https://railway.app) e inicia sesión
2. Clic en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Conecta tu repositorio y selecciona la carpeta `backend-salud/`

### Paso 3: Configurar Base de Datos
1. En tu proyecto de Railway, clic en "New"
2. Selecciona "Database" → "Add PostgreSQL"
3. Railway creará automáticamente las variables de entorno:
   - `DATABASE_URL`
   - `DB_USER`
   - `DB_PASSWORD`

### Paso 4: Configurar Variables de Entorno
En la sección "Variables" de tu servicio backend, añade:
- `FRONTEND_URL`: URL de tu frontend en Vercel (ej: `https://tu-app.vercel.app`)

### Paso 5: Deploy
1. Railway detectará automáticamente que es un proyecto Maven
2. Usará `nixpacks.toml` para el build
3. El deploy comenzará automáticamente
4. Una vez completado, obtendrás la URL del backend (ej: `https://tu-backend.railway.app`)

---

## ▲ Deployment del Frontend en Vercel

### Paso 1: Preparar el repositorio
1. El frontend debe estar en la carpeta `frontend-salud/`

### Paso 2: Crear proyecto en Vercel
1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Clic en "Add New Project"
3. Conecta tu repositorio de GitHub
4. En "Root Directory", selecciona `frontend-salud`

### Paso 3: Configurar Variables de Entorno
En la sección "Environment Variables", añade:
- `VITE_API_URL`: URL de tu backend en Railway (ej: `https://tu-backend.railway.app`)

**Importante:** Asegúrate de añadir esta variable para todos los ambientes (Production, Preview, Development)

### Paso 4: Configurar Build Settings
Vercel debería detectar automáticamente:
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

Si no se detecta automáticamente, configúralo manualmente.

### Paso 5: Deploy
1. Clic en "Deploy"
2. Vercel construirá y desplegará tu aplicación
3. Una vez completado, obtendrás la URL del frontend (ej: `https://tu-app.vercel.app`)

---

## 🔄 Configuración Final

### Actualizar Variables de Entorno

1. **En Railway (Backend):**
   - Actualiza `FRONTEND_URL` con la URL real de Vercel

2. **En Vercel (Frontend):**
   - Actualiza `VITE_API_URL` con la URL real de Railway

3. **Redeploy ambos servicios** para que los cambios surtan efecto

---

## ✅ Verificación

1. **Backend:**
   - Visita: `https://tu-backend.railway.app/api/health`
   - Deberías ver: `{"status":"OK","message":"Backend Salud está funcionando"}`

2. **Frontend:**
   - Visita: `https://tu-app.vercel.app`
   - Deberías ver la aplicación funcionando y conectada al backend

---

## 🐛 Troubleshooting

### Backend no inicia en Railway
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs en Railway para ver errores específicos
- Asegúrate de que el puerto esté configurado correctamente (Railway usa `PORT`)

### Frontend no se conecta al backend
- Verifica que `VITE_API_URL` esté configurada correctamente en Vercel
- Asegúrate de que el backend esté accesible públicamente
- Revisa la configuración de CORS en el backend

### Errores de CORS
- Verifica que `FRONTEND_URL` en Railway coincida exactamente con la URL de Vercel
- Asegúrate de incluir el protocolo `https://` en las URLs

---

## 📝 Notas Importantes

- **Railway** proporciona un dominio gratuito, pero puedes usar un dominio personalizado
- **Vercel** también proporciona un dominio gratuito con SSL automático
- Ambos servicios tienen planes gratuitos generosos para proyectos pequeños
- Las variables de entorno son críticas para que todo funcione correctamente

