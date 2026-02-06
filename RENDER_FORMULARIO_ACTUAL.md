# ✅ Configuración del Web Service en Render - Formulario Actual

## 📋 Campos a Completar (Paso a Paso)

### 1. Source Code
- ✅ Ya está: `florcuevasgithub/vitared-salud`
- ✅ Branch: `main`

### 2. Name
- ✅ Ya está: `backend-salud`

### 3. Project (Opcional)
- Puedes dejarlo en "No project" o crear uno llamado "vitared-salud"

### 4. Environment (Opcional)
- Puedes dejarlo en "No environment"

### 5. Language ⚠️ IMPORTANTE
- **Selecciona:** `Docker` (Render detectará Java automáticamente por el Dockerfile)
- O si hay opción "Other", selecciónala y configura manualmente

### 6. Region
- ✅ Ya está: `Oregon (US West)`

### 7. Root Directory
- ✅ Ya está: `backend-salud`

### 8. Build Command
- Si seleccionaste **Docker:** Dejar vacío (Render usará el Dockerfile automáticamente)
- Si seleccionaste **Other:** `./mvnw clean package -DskipTests`

### 9. Start Command
- Si seleccionaste **Docker:** Dejar vacío (Render usará el Dockerfile automáticamente)
- Si seleccionaste **Other:** `java -jar target/*.jar`

### 10. Instance Type
- ✅ Selecciona: `Free` (para empezar)

### 11. Environment Variables

Añade estas variables (una por una):

1. Clic en **"Add Environment Variable"**
2. Añade cada una:

| NAME | VALUE |
|------|-------|
| `FRONTEND_URL` | `https://tu-frontend.vercel.app` |
| `CONTENTFUL_ENABLED` | `true` |
| `CONTENTFUL_SPACE_ID` | `wvf5ctjvbuns` |
| `CONTENTFUL_ACCESS_TOKEN` | `0326UXZfUPJQkdHPDTaVdt` |
| `CONTENTFUL_ENVIRONMENT` | `master` |
| `REDIS_ENABLED` | `true` |

**⚠️ NO agregues:**
- `PORT` (Render lo asigna automáticamente)
- `DATABASE_URL` (se crea al conectar PostgreSQL)
- Variables de Redis (se crean al conectar Redis)

### 12. Health Check Path (Opcional)
- Puedes dejar: `/healthz`
- O cambiar a: `/api/health`

### 13. Auto-Deploy
- ✅ Dejar activado: `On Commit`

### 14. Conectar Bases de Datos

**IMPORTANTE:** Después de crear el servicio, necesitas:

1. Ve al servicio `backend-salud` que acabas de crear
2. Ve a la sección **"Addons"** o **"Databases"**
3. **Conectar PostgreSQL:**
   - Busca `postgres-salud`
   - Clic en **"Link"** o **"Connect"**
   - Render creará automáticamente `DATABASE_URL`

4. **Conectar Redis:**
   - Busca `redis-salud` (o el nombre que le diste)
   - Clic en **"Link"** o **"Connect"**
   - Render creará automáticamente las variables de Redis

### 15. Deploy

1. Revisa que todo esté correcto
2. Clic en **"Deploy web service"**
3. ⏳ Espera 5-10 minutos

---

## ⚠️ Error Actual

Si ves "There's an error above", probablemente es porque:
- El **Language** está en "Node" en lugar de "Java"
- O el **Build Command** / **Start Command** no son correctos

**Solución:**
1. Cambia **Language** a `Java`
2. Cambia **Build Command** a: `./mvnw clean package -DskipTests`
3. Cambia **Start Command** a: `java -jar target/*.jar`

---

## 📝 Resumen de Cambios Necesarios

1. ✅ **Language:** Cambiar de "Node" a **"Java"**
2. ✅ **Build Command:** Cambiar de `yarn` a `./mvnw clean package -DskipTests`
3. ✅ **Start Command:** Cambiar de `yarn start` a `java -jar target/*.jar`
4. ✅ **Environment Variables:** Añadir las 6 variables mencionadas
5. ✅ **Conectar PostgreSQL y Redis:** Después de crear el servicio

---

## 🚀 Después del Deploy

1. Copia la URL del backend (ej: `https://backend-salud.onrender.com`)
2. Úsala para configurar el frontend en Vercel
3. Actualiza `FRONTEND_URL` en Render con la URL de Vercel
