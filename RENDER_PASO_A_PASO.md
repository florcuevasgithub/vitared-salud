# 🚀 Render: Paso a Paso Detallado

## ✅ Paso 1: PostgreSQL - COMPLETADO

Ya tienes PostgreSQL creado:
- **Nombre:** `postgres-salud`
- **Status:** Available ✅
- **URL:** `postgresql://salud_user:XRGx2ss3Vp5NthW0WiBDbMTFwj7aCig1@dpg-d6173g5actks73fmhigg-a/salud_5gvn`

---

## 🔴 Paso 2: Crear Redis

### Instrucciones:

1. En Render, clic en el botón **"+ New"** (arriba a la derecha)

2. En el menú desplegable, busca y selecciona **"Key Value"** o **"Redis"**
   - Si no ves "Redis" directamente, busca "Key Value" (es el nombre que Render usa para Redis)

3. Configura Redis:
   - **Name:** `redis-salud`
   - **Region:** `Oregon` (mismo que PostgreSQL)
   - **Plan:** `Free`
   - **Type:** Redis (si hay opción)

4. Clic en **"Create"**

5. ⏳ Espera 2-3 minutos a que se cree

6. Una vez creado, verás:
   - Status: "Available" ✅
   - Internal Redis URL (la necesitarás después)

---

## 🚀 Paso 3: Crear Web Service (Backend)

### Instrucciones:

1. Clic en **"+ New"** → **"Web Service"**

2. Conecta tu repositorio:
   - Si es la primera vez, autoriza Render para acceder a GitHub
   - Selecciona: `florcuevasgithub/vitared-salud`

3. Configura el servicio:

   **Configuración Básica:**
   - **Name:** `backend-salud`
   - **Region:** `Oregon` (mismo que las bases de datos)
   - **Branch:** `main`
   - **Root Directory:** `backend-salud` ⚠️ **IMPORTANTE**
   - **Environment:** `Java`
   - **Build Command:** `./mvnw clean package -DskipTests`
   - **Start Command:** `java -jar target/*.jar`

4. **Variables de Entorno:**

   En la sección **"Environment Variables"**, añade estas variables:

   | Variable | Valor | Notas |
   |----------|-------|-------|
   | `FRONTEND_URL` | `https://tu-frontend.vercel.app` | Temporal, actualizar después |
   | `CONTENTFUL_ENABLED` | `true` | |
   | `CONTENTFUL_SPACE_ID` | `wvf5ctjvbuns` | |
   | `CONTENTFUL_ACCESS_TOKEN` | `0326UXZfUPJQkdHPDTaVdt` | Tu token real |
   | `CONTENTFUL_ENVIRONMENT` | `master` | |
   | `REDIS_ENABLED` | `true` | |

   **⚠️ NO agregues `PORT` ni `DATABASE_URL`** - Render los crea automáticamente

5. **Conectar PostgreSQL:**

   - En la sección **"Addons"** o **"Databases"**, busca `postgres-salud`
   - Clic en **"Link"** o **"Connect"**
   - Render creará automáticamente `DATABASE_URL`

6. **Conectar Redis:**

   - En la sección **"Addons"** o **"Databases"**, busca `redis-salud`
   - Clic en **"Link"** o **"Connect"**
   - Render creará automáticamente las variables de Redis:
     - `REDIS_URL`
     - `REDIS_HOST` (o `SPRING_REDIS_HOST`)
     - `REDIS_PORT` (o `SPRING_REDIS_PORT`)
     - `REDIS_PASSWORD`

7. **Deploy:**

   - Clic en **"Create Web Service"**
   - ⏳ Espera 5-10 minutos (primera vez puede tardar más)
   - Una vez completado, obtendrás una URL como: `https://backend-salud.onrender.com`

---

## ✅ Paso 4: Verificar Backend

1. Una vez que el deploy termine, copia la URL del backend
2. Prueba en tu navegador o con curl:
   ```
   https://tu-backend.onrender.com/api/health
   ```
3. Deberías ver: `{"status":"OK","message":"Backend Salud está funcionando"}`

---

## 🔍 Si No Ves la Opción Redis

### Opción A: Buscar "Key Value"

Render a veces llama a Redis "Key Value":
1. **"+ New"** → **"Key Value"**
2. Debería ser Redis

### Opción B: Crear Manualmente

Si no aparece la opción:
1. Puedes crear el backend sin Redis primero
2. Redis es opcional - la app funciona sin él (solo sin caché)
3. Puedes agregar Redis después

### Opción C: Verificar Plan

- Asegúrate de estar en el plan Free
- Redis debería estar disponible en el plan gratuito

---

## 📝 Notas Importantes

- ✅ PostgreSQL ya está creado y funcionando
- ⚠️ Redis es opcional pero recomendado para caché
- ✅ El backend funcionará sin Redis (solo sin caché)
- ✅ Render crea las variables de conexión automáticamente al linkear las bases de datos

---

## 🚀 Siguiente Paso

Una vez que tengas:
- ✅ PostgreSQL (ya lo tienes)
- ✅ Redis (crear ahora)
- ✅ Web Service backend (crear después)

Continúa con el frontend en Vercel siguiendo `VERCEL_SETUP.md`
