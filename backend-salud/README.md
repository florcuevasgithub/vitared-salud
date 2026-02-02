# Backend Salud

Backend de la aplicación de salud construido con Spring Boot y Java 17.

## Requisitos

- Java 17 o superior
- Maven 3.6+
- PostgreSQL (para producción en Railway)

## Desarrollo Local

1. Clonar el repositorio
2. Configurar la base de datos PostgreSQL local
3. Crear archivo `application-local.properties` con:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/salud
spring.datasource.username=postgres
spring.datasource.password=tu_password
```

4. Ejecutar la aplicación:
```bash
mvn spring-boot:run
```

## Deployment en Railway

### Pasos:

1. **Conectar el repositorio:**
   - Ve a [Railway](https://railway.app)
   - Crea un nuevo proyecto
   - Conecta tu repositorio de GitHub

2. **Configurar la base de datos:**
   - Añade un servicio PostgreSQL
   - Railway generará automáticamente las variables `DATABASE_URL`, `DB_USER`, `DB_PASSWORD`

3. **Variables de entorno necesarias:**
   - `PORT`: Railway lo proporciona automáticamente
   - `DATABASE_URL`: Proporcionado por el servicio PostgreSQL
   - `DB_USER`: Proporcionado por el servicio PostgreSQL
   - `DB_PASSWORD`: Proporcionado por el servicio PostgreSQL
   - `FRONTEND_URL`: URL de tu frontend en Vercel (ej: `https://tu-frontend.vercel.app`)

4. **Build y Deploy:**
   - Railway detectará automáticamente el `pom.xml` y usará Nixpacks
   - El build se ejecutará automáticamente
   - La aplicación se iniciará con el comando configurado en `nixpacks.toml`

### Estructura del Build:

- Railway usará Nixpacks para detectar que es un proyecto Maven
- Ejecutará: `mvn clean package -DskipTests`
- Iniciará la aplicación con: `java -jar target/backend-salud-1.0.0.jar`

## Endpoints

- `GET /api/health` - Verifica el estado del backend

## Tecnologías

- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL
- Lombok
- Maven

