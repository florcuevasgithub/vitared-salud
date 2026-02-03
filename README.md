# Vitared Salud

Proyecto de aplicación de salud con backend y frontend separados, desplegado en Railway (backend y frontend).

## 🏗️ Estructura del Proyecto

```
vitared-salud/
├── backend-salud/      # Backend Spring Boot (Java 17)
│   ├── src/
│   ├── pom.xml
│   ├── railway.json    # Configuración Railway
│   └── nixpacks.toml   # Build configuration
├── frontend-salud/     # Frontend Angular 17
│   ├── src/
│   ├── package.json
│   ├── angular.json
│   ├── railway.json    # Configuración Railway
│   └── nixpacks.toml   # Build configuration
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

### Backend → Railway
- Configurado con `nixpacks.toml` y `railway.json`
- Base de datos PostgreSQL incluida
- Variables de entorno automáticas

### Frontend → Railway
- Configurado con `railway.json` y `nixpacks.toml`
- Build automático con Angular CLI
- Variables de entorno para API

## 📖 Documentación

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía completa paso a paso para desplegar en Railway
- **[RAILWAY_QUICK_SETUP.md](./RAILWAY_QUICK_SETUP.md)** - Guía rápida paso a paso para Railway
- **[CONTENTFUL_REDIS_SETUP.md](./CONTENTFUL_REDIS_SETUP.md)** - Guía para configurar Contentful y Redis
- **[CONFIGURACION_FINAL.md](./CONFIGURACION_FINAL.md)** - Configuración final y variables de entorno
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

### Backend (Railway)

#### Requeridas
- `PORT` - Puerto del servidor (automático)
- `DATABASE_URL` - URL de PostgreSQL (automático)
- `DB_USER` - Usuario de BD (automático)
- `DB_PASSWORD` - Password de BD (automático)
- `FRONTEND_URL` - URL del frontend en Railway

#### Opcionales (Contentful)
- `CONTENTFUL_ENABLED` - Habilita Contentful (default: false)
- `CONTENTFUL_SPACE_ID` - ID del espacio de Contentful
- `CONTENTFUL_ACCESS_TOKEN` - Token de acceso de Contentful
- `CONTENTFUL_ENVIRONMENT` - Ambiente de Contentful (default: master)

#### Opcionales (Redis)
- `REDIS_ENABLED` - Habilita Redis (default: true)
- `REDIS_HOST` - Host de Redis (default: localhost)
- `REDIS_PORT` - Puerto de Redis (default: 6379)
- `REDIS_PASSWORD` - Password de Redis (opcional)

### Frontend (Railway)
- `API_URL` - URL del backend en Railway

## 📝 Próximos Pasos

1. Sigue la guía en [DEPLOYMENT.md](./DEPLOYMENT.md) para desplegar
2. Configura las variables de entorno en ambos servicios
3. (Opcional) Configura Contentful y Redis siguiendo [CONTENTFUL_REDIS_SETUP.md](./CONTENTFUL_REDIS_SETUP.md)
4. ¡Listo! Tu aplicación estará en producción

## 🎯 Características

- ✅ Backend con Spring Boot y PostgreSQL
- ✅ Frontend con Angular 17
- ✅ Integración con Contentful para gestión de contenidos médicos
- ✅ Caché Redis para optimización de rendimiento
- ✅ Arquitectura de alta disponibilidad
- ✅ Deployment automático en Railway (backend y frontend)

