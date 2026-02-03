# Solución para Error de Railway

## Problema
Railway estaba intentando usar Docker y buscaba `./mvnw` que no existía.

## Solución Aplicada
1. ✅ Creado Maven Wrapper (`mvnw`, `mvnw.cmd`, `.mvn/wrapper/`)
2. ✅ Configurado `railway.json` para usar Nixpacks

## Configuración en Railway

### Opción 1: Forzar Nixpacks (Recomendado)

1. Ve a tu proyecto en Railway
2. Selecciona el servicio backend
3. Ve a la pestaña **Settings**
4. En **Build & Deploy**, busca **Builder**
5. Selecciona **Nixpacks** (en lugar de Docker)
6. Guarda los cambios
7. Haz un nuevo deploy

### Opción 2: Usar Docker con Maven Wrapper

Si Railway sigue usando Docker, ahora el Maven Wrapper está disponible y debería funcionar.

## Verificación

Después del deploy, verifica:
- Los logs deberían mostrar: `mvn clean package -DskipTests` (si usa Nixpacks)
- O: `./mvnw clean package -DskipTests` (si usa Docker)
- La aplicación debería iniciar con: `java -jar target/backend-salud-1.0.0.jar`

## Si Persiste el Error

1. Verifica que el Root Directory en Railway esté configurado como: `backend-salud`
2. Asegúrate de que `railway.json` esté en la raíz de `backend-salud/`
3. Verifica que `nixpacks.toml` esté presente
4. Revisa los logs completos en Railway para ver el error exacto



