# 🔄 Solución: Desconectar y Reconectar Repositorio en Railway

## ❌ Problema

Railway no está detectando los cambios en `railway.json` y no inicia nuevos deploys automáticamente.

## ✅ Solución: Desconectar y Reconectar

Railway a veces necesita que desconectes y reconectes el repositorio para detectar cambios en archivos de configuración.

### Paso 1: Ir a Settings → Source

1. En Railway, ve al servicio **fortunate-surprise**
2. Clic en la pestaña **"Settings"**
3. Busca la sección **"Source"** (debería estar en la parte superior)

### Paso 2: Desconectar el Repositorio

1. En la sección Source, busca el botón o opción para **"Disconnect"** o **"Unlink"** el repositorio
2. Confirma la desconexión
3. El servicio quedará sin conexión al repositorio

### Paso 3: Reconectar el Repositorio

1. Clic en **"Connect Repo"** o **"Link Repository"**
2. Selecciona tu cuenta de GitHub
3. Selecciona el repositorio: `florcuevasgithub/vitared-salud`
4. **IMPORTANTE:** En **"Root Directory"**, escribe: `frontend-salud`
5. Clic en **"Deploy"** o **"Connect"**

### Paso 4: Verificar Configuración

Después de reconectar:

1. Ve a **Settings** → **Deploy**
2. Verifica que el **Start Command** sea: `npx serve -s dist/frontend-salud/browser -l $PORT`
3. Si no es correcto, ahora deberías poder editarlo manualmente

### Paso 5: Esperar el Deploy

1. Railway comenzará un nuevo deploy automáticamente
2. Espera 1-2 minutos
3. Verifica que el deploy sea exitoso

### Paso 6: Probar la Aplicación

1. Visita: `https://fortunate-surprise-production.up.railway.app`
2. Deberías ver la aplicación Angular (no el listado de directorios)

## 🔍 Alternativa: Editar Manualmente en Settings

Si después de reconectar aún no se actualiza automáticamente:

1. Ve a **Settings** → **Deploy**
2. Busca **"Custom Start Command"**
3. Si hay un botón **"Override"** o puedes editar el campo:
   - Cambia el comando a: `npx serve -s dist/frontend-salud/browser -l $PORT`
   - Guarda
4. Railway redeployará automáticamente

## ⚠️ Nota Importante

Después de desconectar y reconectar:
- ✅ Railway leerá el `railway.json` actualizado
- ✅ El Root Directory debe ser `frontend-salud`
- ✅ El deploy debería usar el comando correcto

## 🐛 Si Sigue Sin Funcionar

### Verificar Root Directory

1. Ve a **Settings** → **Source**
2. Verifica que **Root Directory** sea exactamente: `frontend-salud`
3. Si es diferente, cámbialo y guarda

### Verificar Archivo en Git

Asegúrate de que el archivo `frontend-salud/railway.json` en GitHub tenga:
```json
{
  "deploy": {
    "startCommand": "npx serve -s dist/frontend-salud/browser -l $PORT"
  }
}
```

Puedes verificar en: https://github.com/florcuevasgithub/vitared-salud/blob/main/frontend-salud/railway.json
