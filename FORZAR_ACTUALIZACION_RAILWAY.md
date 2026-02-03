# 🔄 Forzar Actualización de railway.json en Railway

## ❌ Problema

Railway está mostrando un comando antiguo en Settings:
- **Muestra:** `npx serve -s dist/frontend-salud -I $PORT` ❌
- **Debería ser:** `npx serve -s dist/frontend-salud/browser -l $PORT` ✅

Railway está usando una versión en caché del archivo.

## ✅ Soluciones

### Opción 1: Esperar Redeploy Automático (Recomendado)

He hecho un commit vacío para forzar que Railway detecte cambios. 

1. Ve a Railway → servicio fortunate-surprise
2. Debería iniciarse un nuevo deploy automáticamente
3. Espera 1-2 minutos
4. Después del deploy, verifica Settings → Deploy
5. El comando debería actualizarse a: `npx serve -s dist/frontend-salud/browser -l $PORT`

### Opción 2: Redeploy Manual

Si no se inicia automáticamente:

1. Ve a **Deployments**
2. Clic en **"Redeploy"** o **"Deploy"**
3. Selecciona el último commit
4. Espera a que termine

### Opción 3: Desconectar y Reconectar el Repositorio

Si las opciones anteriores no funcionan:

1. Ve a **Settings** → **Source**
2. **Desconecta** el repositorio de GitHub
3. **Reconecta** el mismo repositorio
4. Asegúrate de que **Root Directory** sea: `frontend-salud`
5. Railway redeployará con la configuración actualizada

### Opción 4: Editar Manualmente (Si Railway lo Permite)

Aunque dice que está bloqueado, intenta:

1. Ve a **Settings** → **Deploy**
2. Busca el campo **"Custom Start Command"**
3. Si hay un botón **"Override"** o **"Edit"**, úsalo
4. Cambia el comando a: `npx serve -s dist/frontend-salud/browser -l $PORT`
5. Guarda

## 🔍 Verificar que Funcionó

Después de cualquiera de las opciones:

1. Ve a **Settings** → **Deploy**
2. Verifica que el comando sea: `npx serve -s dist/frontend-salud/browser -l $PORT`
3. Visita la URL: `https://fortunate-surprise-production.up.railway.app`
4. Deberías ver la aplicación Angular (no el listado de directorios)

## 📝 Nota sobre el Comando

El comando correcto tiene:
- ✅ `/browser` al final del path (Angular 17 genera archivos ahí)
- ✅ `-l` (letra L minúscula, no `-I`)
- ✅ `$PORT` (variable de entorno de Railway)
