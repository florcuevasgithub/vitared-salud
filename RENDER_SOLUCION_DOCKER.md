# 🐳 Solución: Usar Docker en Render para Java

## ✅ He Creado un Dockerfile

He creado `backend-salud/Dockerfile` que Render usará para construir y ejecutar tu aplicación Java.

## 🚀 Configuración en Render

### En el Formulario:

1. **Language:** Selecciona **`Docker`**
   - Render detectará automáticamente el Dockerfile
   - No necesitas configurar Build/Start commands manualmente

2. **Root Directory:** `backend-salud` ✅

3. **Build Command:** 
   - **Dejar VACÍO** o borrar lo que hay
   - Render usará el Dockerfile automáticamente

4. **Start Command:**
   - **Dejar VACÍO** o borrar lo que hay
   - Render usará el Dockerfile automáticamente

5. **Environment Variables:** Añadir las 6 variables como antes

6. **Deploy:** Clic en "Deploy web service"

## 📝 Después del Deploy

1. Render construirá la imagen Docker automáticamente
2. Puede tardar 5-10 minutos (primera vez)
3. Una vez completado, obtendrás la URL del backend

## ✅ Ventajas de Usar Docker

- ✅ Render detecta automáticamente Java 17
- ✅ No necesitas configurar Build/Start commands
- ✅ Más confiable y reproducible
- ✅ Funciona perfectamente con Spring Boot

## 🔄 Si Prefieres Sin Docker

Si no quieres usar Docker, puedes:
1. Seleccionar **"Other"** en Language (si está disponible)
2. Configurar manualmente:
   - Build: `./mvnw clean package -DskipTests`
   - Start: `java -jar target/*.jar`

Pero **Docker es más fácil y recomendado**.
