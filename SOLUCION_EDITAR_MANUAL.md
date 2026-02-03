# ✏️ Solución: Editar Start Command Manualmente en Railway

## ❌ Problema

Railway sigue mostrando el comando antiguo aunque el archivo `railway.json` está correcto en Git.

## ✅ Solución: Editar Manualmente en Railway

Aunque Railway dice que el valor viene de `railway.json`, puedes sobrescribirlo manualmente.

### Paso 1: Ir a Settings → Deploy

1. En Railway, ve al servicio **fortunate-surprise**
2. Clic en **"Settings"**
3. Busca la sección **"Deploy"** o **"Custom Start Command"**

### Paso 2: Editar el Campo

1. Busca el campo de texto que muestra: `npx serve -s dist/frontend-salud -I $PORT`
2. **Haz clic en el campo** (debería permitir edición)
3. Si no se puede editar directamente:
   - Busca un botón **"Override"** o **"Edit"** cerca del campo
   - O busca un ícono de lápiz/edit
   - O intenta hacer doble clic en el campo

### Paso 3: Cambiar el Comando

Cambia el comando a:
```
npx serve -s dist/frontend-salud/browser -l $PORT
```

**Cambios necesarios:**
- Agregar `/browser` después de `dist/frontend-salud`
- Cambiar `-I` (i mayúscula) por `-l` (L minúscula)

### Paso 4: Guardar

1. Guarda los cambios (botón "Save" o similar)
2. Railway debería redeployar automáticamente
3. Espera 1-2 minutos

### Paso 5: Verificar

1. Visita: `https://fortunate-surprise-production.up.railway.app`
2. Deberías ver la aplicación Angular funcionando

## 🔄 Alternativa: Eliminar railway.json y Usar Solo nixpacks.toml

Si no puedes editar manualmente, podemos eliminar `railway.json` y dejar que Railway use solo `nixpacks.toml`:

1. Eliminar `frontend-salud/railway.json`
2. Railway usará `nixpacks.toml` que ya tiene el comando correcto
3. Hacer commit y push
4. Railway redeployará

## 📝 Nota

El comando que Railway muestra tiene:
- ❌ `-I` (i mayúscula) - incorrecto
- ❌ Falta `/browser` - incorrecto

El comando correcto debe tener:
- ✅ `-l` (L minúscula)
- ✅ `/browser` al final del path
