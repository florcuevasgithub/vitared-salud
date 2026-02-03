# 🚀 Guía: Deploy Backend Spring Boot en Render

## 📋 Prerrequisitos

- ✅ Cuenta en Render (gratis): https://render.com
- ✅ Repositorio en GitHub: `florcuevasgithub/vitared-salud`
- ✅ Backend Spring Boot configurado

## 🚀 Paso 1: Crear Cuenta y Conectar GitHub

1. Ve a https://render.com
2. Clic en **"Get Started for Free"**
3. Conecta tu cuenta de GitHub
4. Autoriza el acceso a tu repositorio

## 🗄️ Paso 2: Crear Base de Datos PostgreSQL

1. En el dashboard de Render, clic en **"New +"**
2. Selecciona **"PostgreSQL"**
3. Configura:
   - **Name:** `postgres-salud`
   - **Database:** `salud`
   - **User:** `salud_user`
   - **Region:** Elige el más cercano (ej: `Oregon (US West)`)
   - **Plan:** `Free`
4. Clic en **"Create Database"**
5. **IMPORTANTE:** Copia la **Internal Database URL** (la necesitarás después)

## 🔴 Paso 3: Crear Redis (Opcional pero Recomendado)

1. En el dashboard, clic en **"New +"**
2. Selecciona **"Redis"**
3. Configura:
   - **Name:** `redis-salud`
   - **Region:** Mismo que PostgreSQL
   - **Plan:** `Free`
4. Clic en **"Create Redis"**
5. **IMPORTANTE:** Copia la **Internal Redis URL**

## 🚀 Paso 4: Crear Servicio Web (Backend)

1. En el dashboard, clic en **"New +"**
2. Selecciona **"Web Service"**
3. Conecta tu repositorio: `florcuevasgithub/vitared-salud`

### Configuración del Servicio:

1. **Name:** `backend-salud`
2. **Region:** Mismo que las bases de datos
3. **Branch:** `main`
4. **Root Directory:** `backend-salud`
5. **Environment:** `Java`
6. **Build Command:** `./mvnw clean package -DskipTests`
7. **Start Command:** `java -jar target/*.jar`

### Variables de Entorno:

Añade estas variables en la sección **"Environment Variables"**:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `PORT` | (dejar vacío) | Render lo asigna automáticamente |
| `FRONTEND_URL` | `https://tu-frontend.vercel.app` | URL del frontend (actualizar después) |
| `CONTENTFUL_ENABLED` | `true` | Habilitar Contentful |
| `CONTENTFUL_SPACE_ID` | `wvf5ctjvbuns` | Space ID de Contentful |
| `CONTENTFUL_ACCESS_TOKEN` | `0326UXZfUPJQkdHPDTaVdt` | Token de Contentful |
| `CONTENTFUL_ENVIRONMENT` | `master` | Ambiente de Contentful |
| `REDIS_ENABLED` | `true` | Habilitar Redis |

### Conectar Base de Datos PostgreSQL:

1. En la sección **"Addons"** o **"Databases"**, busca `postgres-salud`
2. Clic en **"Link"** para conectar
3. Render creará automáticamente `DATABASE_URL`
4. También creará: `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME`

### Conectar Redis:

1. En la sección **"Addons"** o **"Databases"**, busca `redis-salud`
2. Clic en **"Link"** para conectar
3. Render creará automáticamente:
   - `REDIS_URL`
   - `REDIS_HOST` (o `SPRING_REDIS_HOST`)
   - `REDIS_PORT` (o `SPRING_REDIS_PORT`)
   - `REDIS_PASSWORD`

**Nota:** El código ya está configurado para usar estas variables automáticamente.

## 🚀 Paso 5: Deploy

1. Clic en **"Create Web Service"**
2. Render comenzará el build automáticamente
3. Espera 5-10 minutos (primera vez puede tardar más)
4. Una vez completado, obtendrás una URL como: `https://backend-salud.onrender.com`

## ✅ Paso 6: Verificar Backend

1. Visita: `https://tu-backend.onrender.com/api/health`
2. Deberías ver: `{"status":"OK","message":"Backend Salud está funcionando"}`

## 🔄 Paso 7: Actualizar Variables

### En Render (Backend):

1. Ve a tu servicio **backend-salud**
2. Ve a **Environment**
3. Actualiza `FRONTEND_URL` con la URL real de Vercel
4. Render redeployará automáticamente

### En Vercel (Frontend):

1. Ve a tu proyecto en Vercel
2. Ve a **Settings** → **Environment Variables**
3. Actualiza `NG_APP_API_URL` con la URL de Render
4. Haz un **Redeploy**

## 📝 Notas Importantes

- ⚠️ **Servicios Free se "duermen"** después de 15 min de inactividad
- ⚠️ Primera petición después de dormir puede tardar ~30 segundos
- ✅ Perfecto para desarrollo/MVP
- ✅ SSL automático incluido
- ✅ Deploy automático en cada push a main

## 🐛 Troubleshooting

### Error de Build

- Verifica que `pom.xml` tenga todas las dependencias
- Revisa los logs de build en Render
- Asegúrate de que Java 17 esté disponible

### Error de Conexión a Base de Datos

- Verifica que PostgreSQL esté "Available"
- Verifica que `DATABASE_URL` esté configurada automáticamente
- Revisa los logs del servicio

### Error de Redis

- Verifica que Redis esté "Available"
- Verifica que las variables de Redis estén configuradas
- La app funciona sin Redis, solo sin caché

### El Servicio se Duerme

- Es normal en el plan gratuito
- La primera petición después de dormir tarda ~30 segundos
- Para evitar esto, necesitas el plan de pago ($7/mes)

## 💡 Usar render.yaml (Opcional)

He creado `render.yaml` en el backend que permite configurar todo desde el archivo. Puedes:

1. Subir el archivo `render.yaml` a Git
2. En Render, al crear el servicio, selecciona **"Apply render.yaml"**
3. Render configurará todo automáticamente
