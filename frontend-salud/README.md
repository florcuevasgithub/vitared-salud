# Frontend Salud

Frontend de la aplicación de salud construido con React y Vite.

## Desarrollo Local

1. Instalar dependencias:
```bash
npm install
```

2. Crear archivo `.env` con:
```
VITE_API_URL=http://localhost:8080
```

3. Ejecutar en desarrollo:
```bash
npm run dev
```

## Deployment en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno:
   - `VITE_API_URL`: URL de tu backend en Railway (ej: `https://tu-backend.railway.app`)
3. Vercel detectará automáticamente la configuración de Vite

## Scripts

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

