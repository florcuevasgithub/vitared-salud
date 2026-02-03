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

## 🚂 Deployment del Frontend en Railway

### Paso 1: Preparar el repositorio
1. El frontend debe estar en la carpeta `frontend-salud/`

### Paso 2: Crear servicio en Railway
1. Ve a tu proyecto en Railway: https://railway.com/project/48126a3e-7efb-49eb-8628-860b5a247974
2. Clic en "New" → "GitHub Repo"
3. Conecta tu repositorio de GitHub
4. En "Root Directory", selecciona `frontend-salud`

### Paso 3: Configurar Variables de Entorno
En la sección "Variables" de tu servicio frontend, añade:
- `API_URL`: URL de tu backend en Railway (ej: `https://tu-backend.railway.app`)

**Importante:** No incluyas barra final (`/`) al final de la URL

### Paso 4: Configurar Build Settings
Railway debería detectar automáticamente:
- Framework: Angular (por `angular.json`)
- Build Command: `npm install && npm run build`
- Start Command: `npx serve -s dist/frontend-salud -l $PORT`
- Output Directory: `dist/frontend-salud`

Si no se detecta automáticamente, Railway usará `railway.json` y `nixpacks.toml`.

### Paso 5: Deploy
1. Railway comenzará el build automáticamente
2. Una vez completado, obtendrás la URL del frontend (ej: `https://tu-frontend.railway.app`)
3. **IMPORTANTE:** Actualiza `FRONTEND_URL` en el servicio backend con esta nueva URL

---

## 🔄 Configuración Final

### Actualizar Variables de Entorno

1. **En Railway (Backend):**
   - Actualiza `FRONTEND_URL` con la URL real del frontend en Railway

2. **En Railway (Frontend):**
   - Actualiza `API_URL` con la URL real del backend en Railway

3. **Redeploy ambos servicios** para que los cambios surtan efecto

---

## ✅ Verificación

1. **Backend:**
   - Visita: `https://tu-backend.railway.app/api/health`
   - Deberías ver: `{"status":"OK","message":"Backend Salud está funcionando"}`

2. **Frontend:**
   - Visita: `https://tu-frontend.railway.app`
   - Deberías ver la aplicación funcionando y conectada al backend

---

## 🐛 Troubleshooting

### Backend no inicia en Railway
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs en Railway para ver errores específicos
- Asegúrate de que el puerto esté configurado correctamente (Railway usa `PORT`)

### Frontend no se conecta al backend
- Verifica que `API_URL` esté configurada correctamente en Railway (frontend)
- Asegúrate de que el backend esté accesible públicamente
- Revisa la configuración de CORS en el backend

### Errores de CORS
- Verifica que `FRONTEND_URL` en Railway (backend) coincida exactamente con la URL del frontend
- Asegúrate de incluir el protocolo `https://` en las URLs

---

## 📝 Notas Importantes

- **Railway** proporciona un dominio gratuito para ambos servicios (backend y frontend)
- Puedes usar dominios personalizados si lo deseas
- Railway tiene planes gratuitos generosos para proyectos pequeños
- Las variables de entorno son críticas para que todo funcione correctamente
- Ambos servicios (backend y frontend) están en Railway, lo que facilita la gestión

