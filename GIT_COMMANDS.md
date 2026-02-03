# Comandos Git para Subir los Cambios

## ⚠️ IMPORTANTE: Revisa los cambios antes de hacer commit

```bash
# 1. Ver qué archivos cambiaron
git status

# 2. Ver los cambios en detalle (opcional)
git diff

# 3. Agregar todos los cambios
git add .

# 4. Hacer commit con un mensaje descriptivo
git commit -m "feat: Migrar frontend a Angular y agregar integración Contentful/Redis

- Migrar frontend de React a Angular 17
- Configurar Railway para frontend Angular
- Agregar integración con Contentful para contenidos médicos
- Implementar caché Redis para optimización
- Actualizar documentación para Railway
- Remover referencias a Vercel"

# 5. Subir los cambios al repositorio
git push origin main
```

## 📝 Si prefieres hacer commits separados:

```bash
# Backend (Contentful y Redis)
git add backend-salud/
git commit -m "feat(backend): Agregar integración Contentful y Redis"

# Frontend (Angular)
git add frontend-salud/
git commit -m "feat(frontend): Migrar de React a Angular 17"

# Documentación
git add *.md
git commit -m "docs: Actualizar documentación para Railway y Angular"

# Push todo
git push origin main
```
