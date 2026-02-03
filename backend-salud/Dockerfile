# Dockerfile para Spring Boot en Render
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copiar archivos Maven
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Dar permisos de ejecución a mvnw
RUN chmod +x ./mvnw

# Construir la aplicación
RUN ./mvnw clean package -DskipTests

# Encontrar el JAR generado
RUN find target -name "*.jar" -not -name "*sources.jar" -exec cp {} app.jar \;

# Exponer el puerto
EXPOSE 8080

# Variable de entorno para el puerto (Render lo inyecta)
ENV PORT=8080

# Comando para ejecutar
CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]
