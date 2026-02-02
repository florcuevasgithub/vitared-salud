# Configuración de Railway

## Variables de Entorno Requeridas

Railway proporciona automáticamente estas variables cuando añades PostgreSQL:

- `DATABASE_URL` - URL completa de la base de datos (formato: `postgresql://user:password@host:port/database`)
- `PORT` - Puerto donde correrá la aplicación (Railway lo asigna automáticamente)

## Variables de Entorno Opcionales

Añade estas variables en la sección "Variables" de tu servicio en Railway:

- `FRONTEND_URL` - URL de tu frontend en Vercel (ej: `https://vita-red-salud.vercel.app`)
  - **Importante:** Añade esta variable después de desplegar el frontend en Vercel

## Configuración del Servicio

1. **Root Directory:** `backend-salud`
2. **Build Command:** Se detecta automáticamente (Maven)
3. **Start Command:** Se detecta automáticamente desde `nixpacks.toml`

## Verificación

Una vez desplegado, verifica que el backend esté funcionando:

```bash
curl https://tu-backend.railway.app/api/health
```

Deberías recibir:
```json
{
  "status": "OK",
  "message": "Backend Salud está funcionando"
}
```

## Troubleshooting

### Error de conexión a la base de datos
- Verifica que el servicio PostgreSQL esté corriendo
- Verifica que `DATABASE_URL` esté configurada automáticamente
- Revisa los logs en Railway para ver errores específicos

### Error de puerto
- Railway asigna el puerto automáticamente a través de la variable `PORT`
- La aplicación está configurada para usar `${PORT}` automáticamente

### Error de CORS
- Asegúrate de configurar `FRONTEND_URL` con la URL exacta de Vercel
- Incluye el protocolo `https://` en la URL

