# Configuración de Redis en Railway

## ✅ Redis está implementado en el código

El backend ya tiene toda la lógica de caché Redis implementada:
- ✅ Caché automático de contenidos de Contentful
- ✅ TTL de 1 hora por defecto
- ✅ Funciona sin Redis (modo degradado)
- ✅ Invalidación de caché disponible

## 🚂 Configurar Redis en Railway

### Opción 1: Redis en Railway (Recomendado)

1. Ve a tu proyecto en Railway: https://railway.com/project/48126a3e-7efb-49eb-8628-860b5a247974

2. Clic en **"New"** → **"Database"** → **"Add Redis"**

3. Railway creará automáticamente:
   - Servicio Redis
   - Variables de entorno compartidas con el backend:
     - `REDIS_HOST`
     - `REDIS_PORT`
     - `REDIS_PASSWORD` (si aplica)

4. **IMPORTANTE:** Asegúrate de que el servicio Redis esté en el mismo proyecto que el backend

5. Railway compartirá automáticamente las variables con el backend

### Opción 2: Redis Externo (Upstash, Redis Cloud, etc.)

Si prefieres usar un servicio externo:

1. En el servicio **backend** en Railway, ve a **Variables**

2. Añade estas variables:

| Variable | Valor | Ejemplo |
|----------|-------|---------|
| `REDIS_ENABLED` | `true` | `true` |
| `REDIS_HOST` | Host de tu Redis | `tu-redis.upstash.io` |
| `REDIS_PORT` | Puerto de Redis | `6379` |
| `REDIS_PASSWORD` | Password de Redis | `tu-password` |

### Opción 3: Deshabilitar Redis

Si no quieres usar Redis (la app funcionará sin caché):

```
REDIS_ENABLED=false
```

## ✅ Verificación

### 1. Verificar que Redis está configurado

Revisa los logs del backend en Railway. Deberías ver:
```
✅ Configurando Redis Connection
   Host: [tu-host]
   Port: [tu-puerto]
```

### 2. Verificar que el caché funciona

1. Haz una petición a: `https://tu-backend.railway.app/api/contenido`
2. En los logs deberías ver: `✅ Contenido guardado en caché Redis`
3. Haz otra petición inmediatamente
4. Deberías ver: `✅ Contenido obtenido del caché Redis`

### 3. Probar invalidación de caché

```bash
# Invalidar todo el caché
curl -X DELETE https://tu-backend.railway.app/api/contenido/cache

# Invalidar un contenido específico
curl -X DELETE https://tu-backend.railway.app/api/contenido/cache/1
```

## 🔍 Cómo funciona el caché

### Estrategia de Caché

1. **Primera petición:**
   - No hay caché → Obtiene de Contentful
   - Guarda en Redis con TTL de 1 hora
   - Retorna el contenido

2. **Peticiones subsecuentes (dentro de 1 hora):**
   - Encuentra en caché → Retorna inmediatamente
   - No consulta Contentful (más rápido)

3. **Después de 1 hora:**
   - El caché expira automáticamente
   - Próxima petición obtiene de Contentful y actualiza caché

### Claves de Caché

- `contentful:all` - Todos los contenidos
- `contentful:id:{id}` - Contenido específico por ID
- `contentful:tipo:{tipo}` - Contenidos por tipo

### TTL (Time To Live)

- **Por defecto:** 1 hora
- Se puede ajustar en `ContentfulService.java` cambiando `CACHE_TTL_HOURS`

## 🐛 Troubleshooting

### Redis no se conecta

**Síntomas:**
- Logs muestran: `⚠️ Error al acceder a Redis`
- La app funciona pero sin caché

**Soluciones:**
1. Verifica que `REDIS_HOST` y `REDIS_PORT` sean correctos
2. Si Redis requiere password, verifica `REDIS_PASSWORD`
3. Verifica que Redis esté accesible desde Railway
4. Revisa los logs de Redis en Railway

### La app funciona sin Redis

✅ **Esto es normal y esperado**. La aplicación está diseñada para funcionar sin Redis:
- Sin Redis: Funciona normalmente, solo sin caché
- Con Redis: Funciona con caché para mejor rendimiento

### El caché no se actualiza

Si cambias contenido en Contentful y no se refleja:
1. Espera 1 hora (TTL) o
2. Invalida el caché manualmente:
   ```bash
   curl -X DELETE https://tu-backend.railway.app/api/contenido/cache
   ```

## 📊 Beneficios del Caché Redis

- ⚡ **Rendimiento:** Respuestas instantáneas desde caché
- 💰 **Costos:** Menos llamadas a Contentful API
- 🔄 **Disponibilidad:** Funciona aunque Contentful esté lento
- 📈 **Escalabilidad:** Mejor manejo de tráfico alto
