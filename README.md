# Vitared Salud

Proyecto de aplicación de salud con backend y frontend separados, desplegado en **Render** (backend) y **Vercel** (frontend).

## 🏗️ Estructura del Proyecto

```
vitared-salud/
├── backend-salud/      # Backend Spring Boot (Java 17)
│   ├── src/
│   ├── pom.xml
│   └── render.yaml     # Configuración Render
├── frontend-salud/     # Frontend Angular 17
│   ├── src/
│   ├── package.json
│   ├── angular.json
│   └── vercel.json     # Configuración Vercel
└── DEPLOYMENT.md       # Guía completa de deployment
```

## 🚀 Tecnologías

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **PostgreSQL**
- **Redis** (Caché de alta disponibilidad)
- **Contentful** (CMS headless para contenidos médicos)
- **Maven**

### Frontend
- **Angular 17**
- **TypeScript**
- **RxJS**
- **HTTP Client**

## 📦 Deployment

### Backend → Render
- Configurado con `render.yaml`
- Base de datos PostgreSQL gratuita incluida
- Redis gratuito incluido
- Variables de entorno automáticas
- ⚠️ Plan gratuito: se "duerme" después de 15 min de inactividad

### Frontend → Vercel
- Configurado con `vercel.json`
- Build automático con Angular CLI
- CDN global
- SSL automático
- ✅ No se duerme (siempre disponible)

## 📖 Documentación

- **[VERCEL_SETUP.md](./VERCEL_SETUP.md)** - Guía paso a paso para desplegar frontend en Vercel
- **[RENDER_SETUP.md](./RENDER_SETUP.md)** - Guía paso a paso para desplegar backend en Render
- **[CONTENTFUL_REDIS_SETUP.md](./CONTENTFUL_REDIS_SETUP.md)** - Guía para configurar Contentful y Redis
- **[ALTERNATIVAS_GRATUITAS_DEPLOY.md](./ALTERNATIVAS_GRATUITAS_DEPLOY.md)** - Comparación de alternativas
- **[backend-salud/README.md](./backend-salud/README.md)** - Documentación del backend
- **[frontend-salud/README.md](./frontend-salud/README.md)** - Documentación del frontend

## 🚀 Inicio Rápido

### Backend Local
```bash
cd backend-salud
mvn spring-boot:run
```

### Frontend Local
```bash
cd frontend-salud
npm install
npm start
```

## 🔧 Variables de Entorno

### Backend (Render)

#### Requeridas
- `PORT` - Puerto del servidor (automático)
- `DATABASE_URL` - URL de PostgreSQL (automático, al conectar BD)
- `FRONTEND_URL` - URL del frontend en Vercel

#### Opcionales (Contentful)
- `CONTENTFUL_ENABLED` - Habilita Contentful (default: false)
- `CONTENTFUL_SPACE_ID` - ID del espacio de Contentful
- `CONTENTFUL_ACCESS_TOKEN` - Token de acceso de Contentful
- `CONTENTFUL_ENVIRONMENT` - Ambiente de Contentful (default: master)

#### Opcionales (Redis)
- `REDIS_ENABLED` - Habilita Redis (default: true)
- `SPRING_REDIS_HOST` - Host de Redis (automático al conectar Redis)
- `SPRING_REDIS_PORT` - Puerto de Redis (automático al conectar Redis)
- `REDIS_PASSWORD` - Password de Redis (automático al conectar Redis)

### Frontend (Vercel)
- `NG_APP_API_URL` - URL del backend en Render

## 📝 Próximos Pasos

1. Sigue la guía en [VERCEL_SETUP.md](./VERCEL_SETUP.md) para desplegar el frontend
2. Sigue la guía en [RENDER_SETUP.md](./RENDER_SETUP.md) para desplegar el backend
3. Configura las variables de entorno en ambos servicios
4. (Opcional) Configura Contentful y Redis siguiendo [CONTENTFUL_REDIS_SETUP.md](./CONTENTFUL_REDIS_SETUP.md)
5. ¡Listo! Tu aplicación estará en producción

## 🎯 Características

- ✅ Backend con Spring Boot y PostgreSQL
- ✅ Frontend con Angular 17
- ✅ Integración con Contentful para gestión de contenidos médicos
- ✅ Caché Redis para optimización de rendimiento
- ✅ Arquitectura de alta disponibilidad
- ✅ Deployment automático en Render (backend) y Vercel (frontend)
- ✅ Planes gratuitos disponibles para ambos servicios

