# Solución para Error de Conexión a PostgreSQL en Railway

## Problema
La aplicación falla al conectarse a PostgreSQL con el error: `Connection refused`

## Causas Posibles

1. **PostgreSQL no está desplegado en Railway**
2. **DATABASE_URL no está configurada correctamente**
3. **El servicio PostgreSQL no está corriendo**

## Solución Paso a Paso

### 1. Verificar que PostgreSQL esté desplegado

1. Ve a tu proyecto en Railway: https://railway.com/project/48126a3e-7efb-49eb-8628-860b5a247974
2. Verifica que tengas un servicio **PostgreSQL** en tu proyecto
3. Si no lo tienes:
   - Clic en **"New"**
   - Selecciona **"Database"**
   - Selecciona **"Add PostgreSQL"**
   - Railway creará automáticamente el servicio y las variables de entorno

### 2. Verificar Variables de Entorno

1. En tu servicio **backend**, ve a la pestaña **"Variables"**
2. Verifica que tengas estas variables (Railway las crea automáticamente cuando añades PostgreSQL):
   - `DATABASE_URL` - Debe estar presente
   - `PGHOST`
   - `PGPORT`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGDATABASE`

### 3. Conectar el Servicio Backend con PostgreSQL

1. En tu servicio **PostgreSQL**, ve a la pestaña **"Settings"**
2. Busca la sección **"Connect"** o **"Variables"**
3. Asegúrate de que el servicio **backend** tenga acceso a estas variables
4. Railway debería compartir automáticamente `DATABASE_URL` con el servicio backend

### 4. Verificar que los Servicios estén en el Mismo Proyecto

- Ambos servicios (backend y PostgreSQL) deben estar en el mismo proyecto de Railway
- Railway compartirá automáticamente las variables de entorno entre servicios relacionados

### 5. Redeploy

1. Una vez configurado PostgreSQL y las variables:
2. Ve a tu servicio **backend**
3. Clic en **"Deploy"** o **"Redeploy"**
4. Revisa los logs para verificar que la conexión sea exitosa

## Verificación

Después del deploy, los logs deberían mostrar:
```
Configurando DataSource con DATABASE_URL de Railway
Host: [tu-host], Port: [puerto], Database: [nombre-bd]
```

Y NO deberías ver:
```
Connection refused
```

## Si el Problema Persiste

1. **Verifica los logs de PostgreSQL**: Asegúrate de que el servicio PostgreSQL esté corriendo
2. **Verifica DATABASE_URL**: En las variables de entorno, copia el valor de `DATABASE_URL` y verifica que tenga el formato: `postgresql://user:password@host:port/database`
3. **Revisa la configuración de red**: Asegúrate de que ambos servicios puedan comunicarse

## Nota Importante

Si no necesitas base de datos inmediatamente (solo para el health check), la aplicación puede iniciar sin BD, pero necesitarás PostgreSQL para cualquier funcionalidad que use JPA.

