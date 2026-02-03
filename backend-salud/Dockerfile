# Dockerfile para Spring Boot en Render
# Usa multi-stage build: construir con Maven, ejecutar con JRE

# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar archivos Maven
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src src

# Dar permisos de ejecución a mvnw
RUN chmod +x ./mvnw

# Construir la aplicación
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copiar el JAR desde el stage de build
COPY --from=build /app/target/*.jar app.jar

# Exponer el puerto
EXPOSE 8080

# Variable de entorno para el puerto (Render lo inyecta)
ENV PORT=8080

# Comando para ejecutar
CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]
