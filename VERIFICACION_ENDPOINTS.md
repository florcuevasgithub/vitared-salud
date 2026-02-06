# ✅ Verificación de Endpoints

## 🎯 URL Base del Servicio

**URL Real:** `https://backend-salud-lhq8.onrender.com`

## 📍 Endpoints Disponibles

### 1. Health Check
```
GET https://backend-salud-lhq8.onrender.com/api/health
```

**Respuesta esperada:**
```json
{
  "status": "OK",
  "message": "Backend Salud está funcionando"
}
```

### 2. Obtener Todos los Contenidos
```
GET https://backend-salud-lhq8.onrender.com/api/contenido
```

**Respuesta esperada:**
```json
{
  "status": "OK",
  "total": 2,
  "data": [
    {
      "id": "1",
      "titulo": "Prevención de Enfermedades Cardiovasculares",
      ...
    }
  ]
}
```

### 3. Obtener Contenido por ID
```
GET https://backend-salud-lhq8.onrender.com/api/contenido/1
```

### 4. Obtener Contenidos por Tipo
```
GET https://backend-salud-lhq8.onrender.com/api/contenido/tipo/articulo
```

## ⚠️ Nota Importante

**NO uses la raíz `/`** - Spring Boot no tiene un mapeo para la raíz, por eso ves el Whitelabel Error Page.

**Siempre usa los endpoints con `/api/...`**

## 🧪 Prueba Rápida

Abre en tu navegador:
```
https://backend-salud-lhq8.onrender.com/api/health
```

Deberías ver el JSON con `{"status":"OK",...}`
