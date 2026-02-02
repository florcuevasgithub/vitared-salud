# Configuración de Vercel

## Pasos para Desplegar

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Clic en "Add New Project"
3. Conecta tu repositorio de GitHub: `florcuevasgithub/vitared-salud`
4. Configura el proyecto:
   - **Framework Preset:** Vite (debería detectarse automáticamente)
   - **Root Directory:** `frontend-salud`
   - **Build Command:** `npm run build` (automático)
   - **Output Directory:** `dist` (automático)
   - **Install Command:** `npm install` (automático)

## Variables de Entorno

En la sección "Environment Variables", añade:

- **Variable:** `VITE_API_URL`
- **Value:** URL de tu backend en Railway (ej: `https://tu-backend.railway.app`)
- **Environments:** Marca todas las opciones (Production, Preview, Development)

**Ejemplo:**
```
VITE_API_URL=https://backend-production.up.railway.app
```

## Configuración del Dominio

Vercel asignará automáticamente un dominio como:
- `vita-red-salud.vercel.app` o
- `vitared-salud.vercel.app`

Puedes usar un dominio personalizado si lo deseas.

## Verificación

Una vez desplegado:

1. Visita la URL de Vercel
2. La aplicación debería cargar y mostrar el estado de conexión con el backend
3. Si el backend está configurado correctamente, verás "Estado: OK"

## Troubleshooting

### Error de build
- Verifica que `package.json` tenga todas las dependencias
- Revisa los logs de build en Vercel

### Error de conexión al backend
- Verifica que `VITE_API_URL` esté configurada correctamente
- Asegúrate de que la URL del backend no tenga una barra final (`/`)
- Verifica que el backend esté accesible públicamente

### Error de CORS
- Verifica que en Railway esté configurada `FRONTEND_URL` con la URL exacta de Vercel
- Asegúrate de que ambas URLs usen HTTPS en producción

