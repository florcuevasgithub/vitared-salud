# Configuración de Contentful y Redis

Esta guía te ayudará a configurar Contentful y Redis para la plataforma de salud.

## 📦 Contentful

Contentful es un CMS headless que se utiliza para gestionar contenidos médicos de forma dinámica.

### Paso 1: Obtener Credenciales de Contentful

1. Ve a tu espacio de Contentful: https://app.contentful.com/spaces/wvf5ctjvbuns
2. Ve a **Settings** → **API keys**
3. Copia los siguientes valores:
   - **Space ID**: `wvf5ctjvbuns` (o el que corresponda)
   - **Content Delivery API - access token**: Copia el token de acceso

### Paso 2: Configurar Variables de Entorno en Railway

En tu proyecto de Railway (backend), añade estas variables en la sección **Variables**:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `CONTENTFUL_ENABLED` | `true` | Habilita la integración con Contentful |
| `CONTENTFUL_SPACE_ID` | `wvf5ctjvbuns` | ID del espacio de Contentful |
| `CONTENTFUL_ACCESS_TOKEN` | `tu-token-aqui` | Token de acceso de Contentful |
| `CONTENTFUL_ENVIRONMENT` | `master` | Ambiente de Contentful (por defecto: master) |

**Ejemplo:**
```
CONTENTFUL_ENABLED=true
CONTENTFUL_SPACE_ID=wvf5ctjvbuns
CONTENTFUL_ACCESS_TOKEN=0326UXZfUPJQkdHPDTaVdt
CONTENTFUL_ENVIRONMENT=master
```

### Paso 3: Crear Content Types en Contentful

Para que la aplicación funcione correctamente, necesitas crear content types en Contentful. Los campos esperados son:

- `title` o `titulo` (Texto)
- `description` o `descripcion` (Texto largo)
- `content` o `contenido` (Texto largo)
- `type` o `tipo` (Texto)
- `category` o `categoria` (Texto)

## 🔴 Redis

Redis se utiliza como caché de alta disponibilidad para optimizar el rendimiento.

### Opción 1: Redis en Railway (Recomendado)

1. En tu proyecto de Railway, clic en **"New"**
2. Selecciona **"Database"** → **"Add Redis"**
3. Railway creará automáticamente las variables de entorno:
   - `REDIS_HOST`
   - `REDIS_PORT`
   - `REDIS_PASSWORD`

### Opción 2: Redis Externo (Upstash, Redis Cloud, etc.)

Si usas un servicio externo de Redis, añade estas variables en Railway:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `REDIS_ENABLED` | `true` | Habilita Redis |
| `REDIS_HOST` | `tu-redis-host` | Host de Redis |
| `REDIS_PORT` | `6379` | Puerto de Redis |
| `REDIS_PASSWORD` | `tu-password` | Password de Redis (si aplica) |

**Ejemplo para Upstash:**
```
REDIS_ENABLED=true
REDIS_HOST=tu-redis.upstash.io
REDIS_PORT=6379
REDIS_PASSWORD=tu-password
```

### Opción 3: Deshabilitar Redis

Si no quieres usar Redis, simplemente no configures las variables o establece:

```
REDIS_ENABLED=false
```

La aplicación funcionará sin Redis, pero sin caché.

## ✅ Verificación

### Verificar Contentful

1. Despliega el backend en Railway con las variables configuradas
2. Visita: `https://tu-backend.railway.app/api/contenido`
3. Deberías ver los contenidos de Contentful (o datos mock si no hay contenido)

### Verificar Redis

1. Los logs del backend deberían mostrar: `✅ Configurando Redis Connection`
2. Si Redis está funcionando, verás: `✅ Contenido guardado en caché Redis`
3. En solicitudes subsecuentes: `✅ Contenido obtenido del caché Redis`

## 🐛 Troubleshooting

### Contentful no funciona

- ✅ Verifica que `CONTENTFUL_ENABLED=true`
- ✅ Verifica que `CONTENTFUL_SPACE_ID` y `CONTENTFUL_ACCESS_TOKEN` estén correctos
- ✅ Verifica que el token tenga permisos de lectura
- ✅ Revisa los logs del backend para ver errores específicos

### Redis no funciona

- ✅ Verifica que `REDIS_ENABLED=true` (o no esté configurado, se habilita por defecto)
- ✅ Verifica que `REDIS_HOST` y `REDIS_PORT` sean correctos
- ✅ Si Redis requiere password, verifica `REDIS_PASSWORD`
- ✅ La aplicación funcionará sin Redis, solo sin caché

### La aplicación funciona sin Contentful/Redis

✅ **Esto es normal**. La aplicación está diseñada para funcionar sin estos servicios:
- Sin Contentful: Usa datos mock
- Sin Redis: No usa caché, pero funciona normalmente

## 📝 Notas Importantes

- **Contentful y Redis son opcionales**: La aplicación funciona sin ellos
- **Caché TTL**: El caché de Redis tiene un TTL de 1 hora
- **Invalidar caché**: Puedes invalidar el caché usando los endpoints:
  - `DELETE /api/contenido/cache/{id}` - Invalida un contenido específico
  - `DELETE /api/contenido/cache` - Invalida todo el caché

## 🔗 Enlaces Útiles

- [Contentful Dashboard](https://app.contentful.com/spaces/wvf5ctjvbuns)
- [Contentful API Keys](https://app.contentful.com/spaces/wvf5ctjvbuns/api/keys)
- [Railway Dashboard](https://railway.com/project/48126a3e-7efb-49eb-8628-860b5a247974)
