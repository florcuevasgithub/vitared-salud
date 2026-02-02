# Configuración de Vercel - vita-salud-2

## URLs Configuradas

- **Backend (Railway):** `https://vitared-salud-production.up.railway.app`
- **Frontend (Vercel):** `https://vita-salud-2.vercel.app` (o la URL que Vercel asignó)

## Variables de Entorno en Vercel

### Configurar VITE_API_URL

1. Ve a tu proyecto en Vercel: https://vercel.com/florcuevasgithubs-projects/vita-salud-2
2. Ve a **Settings** → **Environment Variables**
3. Añade o actualiza:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://vitared-salud-production.up.railway.app`
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
4. Guarda los cambios
5. Haz un **Redeploy** para que los cambios surtan efecto

## Variables de Entorno en Railway

### Configurar FRONTEND_URL

1. Ve a tu proyecto en Railway
2. Selecciona el servicio **backend**
3. Ve a **Variables**
4. Añade o actualiza:
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://vita-salud-2.vercel.app` (o la URL que Vercel te asignó)
5. Railway redeployará automáticamente

## Verificación

### Backend
```bash
curl https://vitared-salud-production.up.railway.app/api/health
```
Debería responder: `{"status":"OK","message":"Backend Salud está funcionando"}`

### Frontend
1. Visita tu URL de Vercel
2. La aplicación debería cargar
3. Debería mostrar "Estado: OK" si la conexión con el backend funciona

## Troubleshooting

### Si el frontend no se conecta al backend:
1. Verifica que `VITE_API_URL` esté configurada en Vercel
2. Verifica que no tenga barra final (`/`) al final
3. Verifica que el backend esté accesible públicamente
4. Revisa la consola del navegador para ver errores de CORS

### Si hay errores de CORS:
1. Verifica que `FRONTEND_URL` en Railway coincida exactamente con la URL de Vercel
2. Asegúrate de que ambas URLs usen HTTPS
3. Verifica que no haya diferencias en el dominio (www vs sin www)

