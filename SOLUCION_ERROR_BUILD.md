# 🔧 Solución: Error de Build en Railway

## ❌ Problema Detectado

El build está fallando con el error:
```
npm error
Failed to build an image
```

El problema es que `nixpacks.toml` está usando `npm ci` que requiere un archivo `package-lock.json`, pero probablemente no existe.

## ✅ Solución Aplicada

He actualizado `nixpacks.toml` para usar `npm install` en lugar de `npm ci`.

### Cambio Realizado:

**Antes:**
```toml
[phases.install]
cmds = ["npm ci"]
```

**Después:**
```toml
[phases.install]
cmds = ["npm install"]
```

## 🚀 Próximos Pasos

### Opción 1: Redeploy en Railway (Recomendado)

1. En Railway, ve al servicio que está fallando
2. Clic en **"Deploy"** o **"Redeploy"**
3. Railway usará el nuevo `nixpacks.toml` con `npm install`

### Opción 2: Subir Cambios a Git Primero

Si prefieres subir los cambios primero:

```bash
# 1. Agregar cambios
git add frontend-salud/nixpacks.toml
git add frontend-salud/README.md

# 2. Commit
git commit -m "fix: Cambiar npm ci a npm install en nixpacks.toml"

# 3. Push
git push origin main
```

Railway detectará automáticamente el cambio y redeployará.

## 📋 Verificación

Después del redeploy, verifica:

1. **Logs del Build:**
   - Deberías ver: `npm install` ejecutándose
   - No deberías ver errores de `npm ci`

2. **Estado del Deploy:**
   - Debería cambiar de "FAILED" a "SUCCESS"

3. **Servicio Online:**
   - El servicio debería estar "Online"
   - Deberías poder acceder a la URL

## 🐛 Si Sigue Fallando

### Verificar Root Directory

1. Ve a **Settings** del servicio en Railway
2. Verifica que **Root Directory** sea: `frontend-salud`
3. Si no, cámbialo y guarda

### Verificar Build Command

1. Ve a **Settings** → **Build**
2. Verifica que el build command sea: `npm install && npm run build`
3. Si no, configúralo manualmente

### Verificar Start Command

1. Ve a **Settings** → **Deploy**
2. Verifica que el start command sea: `npx serve -s dist/frontend-salud -l $PORT`
3. Si no, configúralo manualmente

## 💡 Nota sobre npm ci vs npm install

- **`npm ci`**: Requiere `package-lock.json`, más rápido, más estricto
- **`npm install`**: Funciona sin `package-lock.json`, más flexible

Para proyectos nuevos o cuando no hay `package-lock.json`, es mejor usar `npm install`.
