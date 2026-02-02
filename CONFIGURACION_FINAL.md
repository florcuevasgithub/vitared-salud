# Configuración Final - Vitared Salud

## ✅ URLs Configuradas

### Backend (Railway)
- **URL:** `https://vitared-salud-production.up.railway.app`
- **Health Check:** `https://vitared-salud-production.up.railway.app/api/health`

### Frontend (Vercel)
- **URL:** `https://vita-salud-2.vercel.app` (o la URL que Vercel asignó)
- **Proyecto:** https://vercel.com/florcuevasgithubs-projects/vita-salud-2

## 🔧 Variables de Entorno Requeridas

### En Vercel (Frontend)

**Settings → Environment Variables**

| Variable | Valor | Environments |
|----------|-------|--------------|
| `VITE_API_URL` | `https://vitared-salud-production.up.railway.app` | ✅ Production<br>✅ Preview<br>✅ Development |

**⚠️ IMPORTANTE:**
- No incluyas barra final (`/`) al final de la URL
- Después de añadir la variable, haz un **Redeploy**

### En Railway (Backend)

**Variables → Add Variable**

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `FRONTEND_URL` | `https://vita-salud-2.vercel.app` | URL de tu frontend en Vercel |

**⚠️ IMPORTANTE:**
- Usa la URL exacta que Vercel te asignó
- Railway redeployará automáticamente al guardar

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
1. Visita tu URL de Vercel
2. La aplicación debería cargar
3. Deberías ver "Estado: OK" si la conexión funciona

### 3. Verificar CORS
- Abre la consola del navegador (F12)
- No deberías ver errores de CORS
- Si ves errores, verifica que `FRONTEND_URL` en Railway coincida exactamente con la URL de Vercel

## 🐛 Troubleshooting

### Frontend no se conecta al backend
1. ✅ Verifica que `VITE_API_URL` esté configurada en Vercel
2. ✅ Verifica que no tenga barra final
3. ✅ Verifica que el backend esté accesible: `curl https://vitared-salud-production.up.railway.app/api/health`
4. ✅ Revisa la consola del navegador para ver errores específicos

### Errores de CORS
1. ✅ Verifica que `FRONTEND_URL` en Railway coincida EXACTAMENTE con la URL de Vercel
2. ✅ Asegúrate de que ambas URLs usen HTTPS
3. ✅ Verifica que no haya diferencias (www vs sin www, trailing slash, etc.)
4. ✅ Después de cambiar `FRONTEND_URL`, espera a que Railway redeploye

### El frontend muestra "Error"
1. ✅ Verifica que el backend esté corriendo en Railway
2. ✅ Verifica que `VITE_API_URL` tenga el valor correcto
3. ✅ Haz un redeploy en Vercel después de cambiar variables de entorno

## 📝 Checklist Final

- [ ] `VITE_API_URL` configurada en Vercel con la URL de Railway
- [ ] Redeploy hecho en Vercel después de configurar variables
- [ ] `FRONTEND_URL` configurada en Railway con la URL de Vercel
- [ ] Backend responde en `/api/health`
- [ ] Frontend carga correctamente
- [ ] Frontend se conecta al backend (muestra "Estado: OK")
- [ ] No hay errores de CORS en la consola

## 🎉 ¡Listo!

Una vez completado el checklist, tu aplicación estará completamente desplegada y funcionando.

