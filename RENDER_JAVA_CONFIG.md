# ☕ Configurar Java/Spring Boot en Render

## ❌ Problema

Render no muestra "Java" directamente en el dropdown de Language.

## ✅ Soluciones

### Opción 1: Usar "Docker" (Recomendado)

Render detecta automáticamente Java si usas Docker:

1. **Language:** Selecciona `Docker`
2. Render detectará automáticamente que es Java por el `Dockerfile` o `pom.xml`
3. **Build Command:** `./mvnw clean package -DskipTests`
4. **Start Command:** `java -jar target/*.jar`

### Opción 2: Usar "Other" o Configuración Manual

1. Si hay opción **"Other"** o **"Custom"**, selecciónala
2. Luego configura manualmente:
   - **Build Command:** `./mvnw clean package -DskipTests`
   - **Start Command:** `java -jar target/*.jar`

### Opción 3: Crear Dockerfile (Si Docker no funciona)

Si necesitas usar Docker, puedo crear un `Dockerfile` para el backend.

---

## 🚀 Configuración Recomendada

### Si Seleccionas "Docker":

1. **Language:** `Docker`
2. **Root Directory:** `backend-salud`
3. **Build Command:** `./mvnw clean package -DskipTests`
4. **Start Command:** `java -jar target/*.jar`
5. **Environment Variables:** (las mismas que antes)

Render debería detectar automáticamente que es Java por el `pom.xml`.

---

## 📝 Prueba Esto:

1. **Selecciona "Docker"** en el dropdown de Language
2. Deja los Build/Start commands como están configurados:
   - Build: `./mvnw clean package -DskipTests`
   - Start: `java -jar target/*.jar`
3. Render debería detectar Java automáticamente

Si "Docker" no funciona, dime qué otras opciones ves en el dropdown y te ayudo a elegir la correcta.
