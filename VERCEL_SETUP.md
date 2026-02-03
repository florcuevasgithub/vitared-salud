# 🚀 Guía: Deploy Frontend Angular en Vercel

## 📋 Prerrequisitos

- ✅ Cuenta en Vercel (gratis): https://vercel.com
- ✅ Repositorio en GitHub: `florcuevasgithub/vitared-salud`
- ✅ Frontend Angular configurado

## 🚀 Paso 1: Crear Proyecto en Vercel

1. Ve a https://vercel.com e inicia sesión
2. Clic en **"Add New Project"** o **"New Project"**
3. Conecta tu cuenta de GitHub si no lo has hecho
4. Selecciona el repositorio: `florcuevasgithub/vitared-salud`

## ⚙️ Paso 2: Configurar el Proyecto

### Configuración del Proyecto:

1. **Framework Preset:** Dejar en "Other" o "Angular" (Vercel lo detectará)
2. **Root Directory:** `frontend-salud`
3. **Build Command:** `npm install && npm run build` (automático)
4. **Output Directory:** `dist/frontend-salud/browser`
5. **Install Command:** `npm install` (automático)

### Variables de Entorno:

1. En la sección **"Environment Variables"**, añade:

| Variable | Valor | Environments |
|----------|-------|--------------|
| `NG_APP_API_URL` | `https://backend-salud.onrender.com` | ✅ Production<br>✅ Preview<br>✅ Development |

**⚠️ IMPORTANTE:**
- El valor será la URL de tu backend en Render (la obtendrás después del deploy)
- Por ahora usa una URL temporal: `https://backend-salud.onrender.com`
- **NO** incluyas barra final `/`
- El script `replace-env.js` reemplazará automáticamente esta URL en el build

## 🚀 Paso 3: Deploy

1. Clic en **"Deploy"**
2. Vercel comenzará el build automáticamente
3. Espera 2-3 minutos
4. Una vez completado, obtendrás una URL como: `https://vitared-salud.vercel.app`

## ✅ Paso 4: Verificar

1. Visita la URL que Vercel te asignó
2. Deberías ver la aplicación Angular cargando
3. Si hay errores de conexión al backend, es normal (aún no está desplegado)

## 🔄 Paso 5: Actualizar API_URL Después de Deployar Backend

Una vez que tengas el backend en Render:

1. Ve a tu proyecto en Vercel
2. Ve a **Settings** → **Environment Variables**
3. Actualiza `NG_APP_API_URL` con la URL real de Render
4. Haz un **Redeploy** para que los cambios surtan efecto

## 📝 Notas Importantes

- ✅ Vercel detecta automáticamente Angular
- ✅ El archivo `vercel.json` ya está configurado
- ✅ Vercel usa `NG_APP_` como prefijo para variables de Angular
- ✅ El build se ejecuta automáticamente en cada push a main

## 🐛 Troubleshooting

### Error de Build

- Verifica que `package.json` tenga todas las dependencias
- Revisa los logs de build en Vercel
- Asegúrate de que Node.js 18+ esté disponible

### Error de Variables de Entorno

- Verifica que la variable se llame `NG_APP_API_URL` (con el prefijo)
- Asegúrate de que esté configurada para todos los ambientes
- Haz un redeploy después de agregar variables

### La App No Carga

- Verifica que el Output Directory sea: `dist/frontend-salud/browser`
- Revisa los logs de deploy en Vercel
- Verifica que el build se completó exitosamente
