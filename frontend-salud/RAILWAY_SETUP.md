# Configuración de Railway para Frontend Angular

## 🚂 Pasos para Desplegar el Frontend en Railway

### Paso 1: Crear Servicio en Railway

1. Ve a tu proyecto en Railway: https://railway.com/project/48126a3e-7efb-49eb-8628-860b5a247974
2. Clic en **"New"** → **"GitHub Repo"**
3. Selecciona tu repositorio: `florcuevasgithub/vitared-salud`
4. En **"Root Directory"**, selecciona: `frontend-salud`

### Paso 2: Configurar Variables de Entorno

En la sección **Variables** de tu servicio frontend, añade:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `API_URL` | `https://vitared-salud-production.up.railway.app` | URL del backend en Railway |

**⚠️ IMPORTANTE:**
- No incluyas barra final (`/`) al final de la URL
- Railway redeployará automáticamente al guardar

### Paso 3: Configuración Automática

Railway detectará automáticamente:
- ✅ Es un proyecto Angular (por `angular.json`)
- ✅ Build command: `npm install && npm run build`
- ✅ Start command: `npx serve -s dist/frontend-salud -l $PORT`
- ✅ Puerto: Usará la variable `PORT` automáticamente

### Paso 4: Deploy

1. Railway comenzará el build automáticamente
2. Una vez completado, obtendrás la URL del frontend (ej: `https://tu-frontend.railway.app`)
3. **IMPORTANTE:** Actualiza `FRONTEND_URL` en el servicio backend con esta nueva URL

## 🔄 Actualizar CORS en Backend

Después de obtener la URL del frontend:

1. Ve al servicio **backend** en Railway
2. Ve a **Variables**
3. Actualiza `FRONTEND_URL` con la URL exacta del frontend:
   ```
   FRONTEND_URL=https://tu-frontend.railway.app
   ```
4. Railway redeployará automáticamente el backend

## ✅ Verificación

### Frontend
1. Visita la URL de Railway asignada
2. La aplicación debería cargar
3. Deberías ver "Estado: OK" si la conexión funciona

### Backend
1. Verifica que `FRONTEND_URL` coincida exactamente con la URL del frontend
2. Revisa los logs del backend para confirmar que CORS está configurado

## 🐛 Troubleshooting

### El frontend no carga

- Verifica que el build se completó exitosamente
- Revisa los logs en Railway
- Asegúrate de que `API_URL` esté configurada

### Error de conexión al backend

- Verifica que `API_URL` tenga el valor correcto
- Verifica que el backend esté accesible públicamente
- Revisa la consola del navegador para ver errores específicos

### Errores de CORS

- Verifica que `FRONTEND_URL` en el backend coincida EXACTAMENTE con la URL del frontend
- Asegúrate de que ambas URLs usen HTTPS
- Verifica que no haya diferencias (www vs sin www, trailing slash, etc.)
