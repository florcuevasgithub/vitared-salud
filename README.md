# 🏥 Vitared Salud - MVP

Este es el Producto Mínimo Viable (MVP) de **Vitared Salud**, una plataforma diseñada para la gestión eficiente de contenidos médicos y planes de salud. El proyecto utiliza una arquitectura de **Monorepo** y se enfoca en la alta disponibilidad, optimización y seguridad de los datos.

🚀 **Estado del Proyecto:** `En Desarrollo`
Actualmente, el sistema ya cuenta con una integración funcional entre el CMS, la capa de caché y el backend.

## 🚀 Características Técnicas

- **Backend:** Desarrollado en Java 17 con **Spring Boot 3.x**.
- **Frontend:** Interfaz dinámica construida con **Angular**.
- **Gestión de Contenidos:** Integración con **Contentful (Headless CMS)** para actualizaciones en tiempo real.
- **Capa de Caché:** Implementación de **Redis** (In-memory data store) para reducir latencia y garantizar disponibilidad.
- **Infraestructura:** Preparado para **Docker & Docker Compose**.

## 🏗️ Arquitectura de Datos & Caché

El flujo de información está diseñado bajo principios de ingeniería para maximizar el rendimiento:

1. **Consulta Inteligente:** El Backend consulta primero la memoria de **Redis**.
2. **Fallback:** Si el dato no está en caché, se recupera de **Contentful**, se sanitiza y se guarda en Redis para futuras peticiones.
3. **Optimización (Patrón DTO):** Se filtran metadatos innecesarios, enviando al frontend solo el **15% del peso original** del JSON. Los tiempos de respuesta bajan de **500ms a menos de 20ms**.



## 🔒 Seguridad (OWASP Principles)

- **Sanitización de Entradas:** Filtrado de metadatos del CMS para prevenir ataques XSS.
- **CORS Policy:** Acceso restringido únicamente al dominio del frontend autorizado.
- **Abstracción de Secretos:** Uso de variables de entorno y `application.properties` para el manejo de claves de API (no trackeadas en el repositorio).

## 🛠️ Cómo ejecutar el proyecto (Local)

### Requisitos
- Java 17+
- Node.js & Angular CLI
- Docker (para correr Redis)

### Pasos
1. **Clonar el repositorio.**
2. **Configuración:** En `/backend-salud`, crear un archivo `application.properties` con tus credenciales de Contentful.
3. **Levantar Redis:** `docker run -p 6379:6379 redis`.
4. **Backend:** Ejecutar `./mvnw spring-boot:run` dentro de la carpeta del backend.
5. **Frontend:** Ejecutar `npm install` y luego `ng serve` en la carpeta del frontend.

## 📋 Próximos Pasos
- [ ] Implementación de **Spring Security con JWT** para acceso de afiliados.
- [ ] Formulario de contacto sanitizado para prevención de Inyecciones SQL.
- [ ] Despliegue en entorno de staging (**Railway / Render**).

---
*Proyecto desarrollado por Florencia Cuevas*