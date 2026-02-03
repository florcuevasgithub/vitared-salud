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

# Exponer el puerto
EXPOSE 8080

# Comando para ejecutar
ENTRYPOINT ["java", "-jar", "target/*.jar"]
