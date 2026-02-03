# Configuración Final - Vitared Salud

## ✅ URLs Configuradas

### Backend (Railway)
- **URL:** `https://vitared-salud-production.up.railway.app`
- **Health Check:** `https://vitared-salud-production.up.railway.app/api/health`

### Frontend (Railway)
- **URL:** `https://tu-frontend.railway.app` (URL que Railway asigne)
- **Proyecto:** https://railway.com/project/48126a3e-7efb-49eb-8628-860b5a247974

## 🔧 Variables de Entorno Requeridas

### En Railway (Frontend)

**Variables → Add Variable**

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `API_URL` | `https://vitared-salud-production.up.railway.app` | URL del backend en Railway |

**⚠️ IMPORTANTE:**
- No incluyas barra final (`/`) al final de la URL
- Railway redeployará automáticamente al guardar

### En Railway (Backend)

**Variables → Add Variable**

#### Variables Básicas (Requeridas)

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `FRONTEND_URL` | `https://tu-frontend.railway.app` | URL de tu frontend en Railway |

#### Variables de Contentful (Opcionales)

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `CONTENTFUL_ENABLED` | `true` | Habilita Contentful |
| `CONTENTFUL_SPACE_ID` | `wvf5ctjvbuns` | ID del espacio de Contentful |
| `CONTENTFUL_ACCESS_TOKEN` | `tu-token` | Token de acceso de Contentful |
| `CONTENTFUL_ENVIRONMENT` | `master` | Ambiente de Contentful |

#### Variables de Redis (Opcionales)

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `REDIS_ENABLED` | `true` | Habilita Redis (por defecto: true) |
| `REDIS_HOST` | `localhost` | Host de Redis (si usas Redis externo) |
| `REDIS_PORT` | `6379` | Puerto de Redis |
| `REDIS_PASSWORD` | `tu-password` | Password de Redis (si aplica) |

**⚠️ IMPORTANTE:**
- Usa la URL exacta que Vercel te asignó para `FRONTEND_URL`
- Railway redeployará automáticamente al guardar
- **Contentful y Redis son opcionales**: La aplicación funciona sin ellos
- Para más detalles, consulta [CONTENTFUL_REDIS_SETUP.md](./CONTENTFUL_REDIS_SETUP.md)

## ✅ Verificación

### 1. Verificar Backend
```bash
curl https://vitared-salud-production.up.railway.app/api/health
```

**Respuesta esperada:**
```json
{
  "status": "OK",
  "message": "Backend Salud está funcionando"
}
```

### 2. Verificar Frontend
1. Visita tu URL de Railway (frontend)
2. La aplicación debería cargar
3. Deberías ver "Estado: OK" si la conexión funciona

### 3. Verificar CORS
- Abre la consola del navegador (F12)
- No deberías ver errores de CORS
- Si ves errores, verifica que `FRONTEND_URL` en Railway (backend) coincida exactamente con la URL del frontend

## 🐛 Troubleshooting

### Frontend no se conecta al backend
1. ✅ Verifica que `API_URL` esté configurada en Railway (frontend)
2. ✅ Verifica que no tenga barra final
3. ✅ Verifica que el backend esté accesible: `curl https://vitared-salud-production.up.railway.app/api/health`
4. ✅ Revisa la consola del navegador para ver errores específicos

### Errores de CORS
1. ✅ Verifica que `FRONTEND_URL` en Railway (backend) coincida EXACTAMENTE con la URL del frontend
2. ✅ Asegúrate de que ambas URLs usen HTTPS
3. ✅ Verifica que no haya diferencias (www vs sin www, trailing slash, etc.)
4. ✅ Después de cambiar `FRONTEND_URL`, espera a que Railway redeploye

### El frontend muestra "Error"
1. ✅ Verifica que el backend esté corriendo en Railway
2. ✅ Verifica que `API_URL` tenga el valor correcto en Railway (frontend)
3. ✅ Railway redeployará automáticamente después de cambiar variables de entorno

## 📝 Checklist Final

- [ ] `API_URL` configurada en Railway (frontend) con la URL del backend
- [ ] `FRONTEND_URL` configurada en Railway (backend) con la URL del frontend
- [ ] Backend responde en `/api/health`
- [ ] Frontend carga correctamente
- [ ] Frontend se conecta al backend (muestra "Estado: OK")
- [ ] No hay errores de CORS en la consola

## 🎉 ¡Listo!

Una vez completado el checklist, tu aplicación estará completamente desplegada y funcionando.



