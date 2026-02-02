# Vitared Salud

Proyecto de aplicación de salud con backend y frontend separados, desplegado en Railway (backend) y Vercel (frontend).

## 🏗️ Estructura del Proyecto

```
vitared-salud/
├── backend-salud/      # Backend Spring Boot (Java 17)
│   ├── src/
│   ├── pom.xml
│   ├── railway.json    # Configuración Railway
│   └── nixpacks.toml   # Build configuration
├── frontend-salud/     # Frontend React + Vite
│   ├── src/
│   ├── package.json
│   └── vercel.json     # Configuración Vercel
└── DEPLOYMENT.md       # Guía completa de deployment
```

## 🚀 Tecnologías

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **PostgreSQL**
- **Maven**

### Frontend
- **React 18**
- **Vite**
- **Axios**

## 📦 Deployment

### Backend → Railway
- Configurado con `nixpacks.toml` y `railway.json`
- Base de datos PostgreSQL incluida
- Variables de entorno automáticas

### Frontend → Vercel
- Configurado con `vercel.json`
- Build automático con Vite
- Variables de entorno para API

## 📖 Documentación

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía completa paso a paso para desplegar en Railway y Vercel
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
npm run dev
```

## 🔧 Variables de Entorno

### Backend (Railway)
- `PORT` - Puerto del servidor (automático)
- `DATABASE_URL` - URL de PostgreSQL (automático)
- `DB_USER` - Usuario de BD (automático)
- `DB_PASSWORD` - Password de BD (automático)
- `FRONTEND_URL` - URL del frontend en Vercel

### Frontend (Vercel)
- `VITE_API_URL` - URL del backend en Railway

## 📝 Próximos Pasos

1. Sigue la guía en [DEPLOYMENT.md](./DEPLOYMENT.md) para desplegar
2. Configura las variables de entorno en ambos servicios
3. ¡Listo! Tu aplicación estará en producción

