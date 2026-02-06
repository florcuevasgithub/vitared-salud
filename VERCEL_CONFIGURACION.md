# ⚙️ Configuración Vercel - Frontend

## ✅ Estado Actual

- Frontend desplegado en Vercel
- URL de deployment: `vitared-salud-20-mqo8pbjje-florcuevasgithubs-projects.vercel.app`
- ⚠️ Advertencia sobre diferencias de configuración

## 🔧 Pasos para Resolver la Advertencia

### 1. Verificar Configuración del Proyecto

En Vercel Dashboard → Tu Proyecto → **Settings** → **General**:

1. **Root Directory:** Debe ser `frontend-salud`
2. **Framework Preset:** Debe ser `Angular` o `Other`
3. **Build Command:** `npm install && npm run build`
4. **Output Directory:** `dist/frontend-salud/browser`
5. **Install Command:** `npm install`

### 2. Verificar Variables de Entorno

En Vercel Dashboard → Tu Proyecto → **Settings** → **Environment Variables**:

Debe existir:
```
NG_APP_API_URL = https://backend-salud-lhq8.onrender.com
```

Si no existe, agrégalo para **Production**, **Preview** y **Development**.

### 3. Resolver la Advertencia de Configuración

Si ves la advertencia "Configuration Settings in the current Production deployment differ":

1. **Opción A:** Hacer un nuevo deploy con la configuración actual
   - Ve a **Deployments**
   - Clic en los tres puntos (`...`) del último deployment
   - Selecciona **Redeploy**

2. **Opción B:** Ajustar la configuración del proyecto
   - Ve a **Settings** → **General**
   - Asegúrate de que todas las configuraciones coincidan con `vercel.json`
   - Guarda los cambios
   - Esto triggerará un nuevo deploy automáticamente

### 4. Verificar que el Frontend Funcione

1. Obtén la URL de producción de Vercel (debería ser algo como `https://vitared-salud.vercel.app`)
2. Abre la URL en el navegador
3. Deberías ver la aplicación Angular
4. Abre la consola del navegador (F12) y verifica que no haya errores

## 🔄 Conectar Backend y Frontend

Una vez que tengas la URL de producción del frontend:

### En Render (Backend):

1. Ve a `backend-salud` → **Environment** → **Environment Variables**
2. Busca `FRONTEND_URL`
3. Cambia el valor a la URL de producción de Vercel (ej: `https://vitared-salud.vercel.app`)
4. Guarda
5. Render redeployará automáticamente (espera 2-3 min)

### Verificar Conexión:

1. Abre el frontend en Vercel
2. Deberías ver "Estado: OK" (conexión backend exitosa)
3. Deberías ver contenidos médicos cargándose

## 📝 URLs Importantes

- **Backend:** `https://backend-salud-lhq8.onrender.com`
- **Backend Health:** `https://backend-salud-lhq8.onrender.com/api/health`
- **Frontend (Vercel):** (URL de producción de Vercel)

## 🐛 Troubleshooting

### Frontend no se conecta al backend

1. Verifica que `NG_APP_API_URL` esté configurada en Vercel
2. Verifica que la URL del backend sea correcta
3. Revisa la consola del navegador (F12) para ver errores
4. Verifica que `FRONTEND_URL` en Render sea la URL correcta de Vercel

### Error de CORS

1. Verifica que `FRONTEND_URL` en Render sea EXACTAMENTE igual a la URL de Vercel
2. Debe incluir `https://`
3. No debe tener barra final `/`
4. Espera a que Render redeploye después de cambiar

### Build falla en Vercel

1. Revisa los logs del build en Vercel
2. Verifica que `Root Directory` sea `frontend-salud`
3. Verifica que `Output Directory` sea `dist/frontend-salud/browser`
4. Verifica que `package.json` tenga el script `build` correcto
