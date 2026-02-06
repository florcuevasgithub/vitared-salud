# 🔧 Solución: Error en Dockerfile - Maven no encontrado

## ❌ Error

```
./mvnw: exec: line 159: mvn: not found
```

## ✅ Solución Aplicada

He corregido el Dockerfile para usar **multi-stage build**:
1. **Stage 1 (Build):** Usa imagen `maven:3.9-eclipse-temurin-17` que tiene Maven instalado
2. **Stage 2 (Runtime):** Usa imagen más pequeña `eclipse-temurin:17-jre-alpine` solo con JRE

## 🚀 Próximos Pasos

1. **El Dockerfile corregido ya está en Git**
2. **Render debería detectar automáticamente el cambio**
3. **Si no, haz un redeploy:**
   - Ve al servicio `backend-salud` en Render
   - Clic en **"Manual Deploy"** → **"Deploy latest commit"**

## ⏳ Espera el Build

- El build puede tardar 5-10 minutos
- Render construirá la imagen Docker con Maven
- Luego creará la imagen final más pequeña

## ✅ Verificación

Una vez que termine el build:
1. El servicio debería estar "Live"
2. Prueba: `https://tu-backend.onrender.com/api/health`
3. Deberías ver: `{"status":"OK",...}`

## 🐛 Si Sigue Fallando

Si aún hay errores, comparte los logs completos y los reviso.
