package com.sancor.salud.service;

import com.contentful.java.cda.CDAClient;
import com.contentful.java.cda.CDAEntry;
import com.contentful.java.cda.CDAResource;
import com.sancor.salud.model.ContenidoMedico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class ContentfulService {

    private final CDAClient contentfulClient;
    private final RedisTemplate<String, Object> redisTemplate;
    private static final String CACHE_PREFIX = "contentful:";
    private static final long CACHE_TTL_HOURS = 1; // TTL de 1 hora

    @Autowired(required = false)
    public ContentfulService(CDAClient contentfulClient, RedisTemplate<String, Object> redisTemplate) {
        this.contentfulClient = contentfulClient;
        this.redisTemplate = redisTemplate;
    }

    /**
     * Obtiene todos los contenidos médicos desde Contentful con caché Redis
     */
    public List<ContenidoMedico> obtenerTodosLosContenidos() {
        String cacheKey = CACHE_PREFIX + "all";
        
        // Intentar obtener del caché si Redis está disponible
        if (redisTemplate != null) {
            try {
                @SuppressWarnings("unchecked")
                List<ContenidoMedico> cached = (List<ContenidoMedico>) redisTemplate.opsForValue().get(cacheKey);
                if (cached != null) {
                    System.out.println("✅ Contenido obtenido del caché Redis");
                    return cached;
                }
            } catch (Exception e) {
                System.out.println("⚠️ Error al acceder a Redis: " + e.getMessage());
            }
        }

        // Si no está en caché, obtener de Contentful
        List<ContenidoMedico> contenidos = obtenerDeContentful();
        
        // Guardar en caché si Redis está disponible
        if (redisTemplate != null && contenidos != null && !contenidos.isEmpty()) {
            try {
                redisTemplate.opsForValue().set(cacheKey, contenidos, CACHE_TTL_HOURS, TimeUnit.HOURS);
                System.out.println("✅ Contenido guardado en caché Redis");
            } catch (Exception e) {
                System.out.println("⚠️ Error al guardar en Redis: " + e.getMessage());
            }
        }
        
        return contenidos;
    }

    /**
     * Obtiene un contenido médico por ID desde Contentful con caché Redis
     */
    public ContenidoMedico obtenerContenidoPorId(String id) {
        String cacheKey = CACHE_PREFIX + "id:" + id;
        
        // Intentar obtener del caché si Redis está disponible
        if (redisTemplate != null) {
            try {
                ContenidoMedico cached = (ContenidoMedico) redisTemplate.opsForValue().get(cacheKey);
                if (cached != null) {
                    System.out.println("✅ Contenido obtenido del caché Redis para ID: " + id);
                    return cached;
                }
            } catch (Exception e) {
                System.out.println("⚠️ Error al acceder a Redis: " + e.getMessage());
            }
        }

        // Si no está en caché, obtener de Contentful
        ContenidoMedico contenido = obtenerDeContentfulPorId(id);
        
        // Guardar en caché si Redis está disponible
        if (redisTemplate != null && contenido != null) {
            try {
                redisTemplate.opsForValue().set(cacheKey, contenido, CACHE_TTL_HOURS, TimeUnit.HOURS);
                System.out.println("✅ Contenido guardado en caché Redis para ID: " + id);
            } catch (Exception e) {
                System.out.println("⚠️ Error al guardar en Redis: " + e.getMessage());
            }
        }
        
        return contenido;
    }

    /**
     * Obtiene contenidos por tipo desde Contentful con caché Redis
     */
    public List<ContenidoMedico> obtenerContenidosPorTipo(String tipo) {
        String cacheKey = CACHE_PREFIX + "tipo:" + tipo;
        
        // Intentar obtener del caché si Redis está disponible
        if (redisTemplate != null) {
            try {
                @SuppressWarnings("unchecked")
                List<ContenidoMedico> cached = (List<ContenidoMedico>) redisTemplate.opsForValue().get(cacheKey);
                if (cached != null) {
                    System.out.println("✅ Contenido obtenido del caché Redis para tipo: " + tipo);
                    return cached;
                }
            } catch (Exception e) {
                System.out.println("⚠️ Error al acceder a Redis: " + e.getMessage());
            }
        }

        // Si no está en caché, obtener de Contentful
        List<ContenidoMedico> contenidos = obtenerDeContentfulPorTipo(tipo);
        
        // Guardar en caché si Redis está disponible
        if (redisTemplate != null && contenidos != null && !contenidos.isEmpty()) {
            try {
                redisTemplate.opsForValue().set(cacheKey, contenidos, CACHE_TTL_HOURS, TimeUnit.HOURS);
                System.out.println("✅ Contenido guardado en caché Redis para tipo: " + tipo);
            } catch (Exception e) {
                System.out.println("⚠️ Error al guardar en Redis: " + e.getMessage());
            }
        }
        
        return contenidos;
    }

    /**
     * Invalida el caché para un contenido específico
     */
    public void invalidarCache(String id) {
        if (redisTemplate != null) {
            try {
                redisTemplate.delete(CACHE_PREFIX + "id:" + id);
                redisTemplate.delete(CACHE_PREFIX + "all");
                System.out.println("✅ Caché invalidado para ID: " + id);
            } catch (Exception e) {
                System.out.println("⚠️ Error al invalidar caché: " + e.getMessage());
            }
        }
    }

    /**
     * Invalida todo el caché
     */
    public void invalidarTodoElCache() {
        if (redisTemplate != null) {
            try {
                Set<String> keys = redisTemplate.keys(CACHE_PREFIX + "*");
                if (keys != null && !keys.isEmpty()) {
                    redisTemplate.delete(keys);
                    System.out.println("✅ Todo el caché invalidado. Claves eliminadas: " + keys.size());
                }
            } catch (Exception e) {
                System.out.println("⚠️ Error al invalidar caché: " + e.getMessage());
            }
        }
    }

    // Métodos privados para obtener datos de Contentful

    private List<ContenidoMedico> obtenerDeContentful() {
        if (contentfulClient == null) {
            System.out.println("⚠️ Contentful no configurado. Retornando datos mock.");
            return obtenerDatosMock();
        }

        try {
            List<CDAEntry> entries = contentfulClient.fetch(CDAEntry.class)
                    .all()
                    .items();

            List<ContenidoMedico> contenidos = new ArrayList<>();
            for (CDAEntry entry : entries) {
                contenidos.add(convertirEntryAContenidoMedico(entry));
            }
            
            return contenidos;
        } catch (Exception e) {
            System.err.println("❌ Error al obtener contenido de Contentful: " + e.getMessage());
            e.printStackTrace();
            return obtenerDatosMock();
        }
    }

    private ContenidoMedico obtenerDeContentfulPorId(String id) {
        if (contentfulClient == null) {
            System.out.println("⚠️ Contentful no configurado. Retornando datos mock.");
            return obtenerDatoMockPorId(id);
        }

        try {
            CDAEntry entry = contentfulClient.fetch(CDAEntry.class)
                    .one(id);

            return convertirEntryAContenidoMedico(entry);
        } catch (Exception e) {
            System.err.println("❌ Error al obtener contenido de Contentful por ID: " + e.getMessage());
            e.printStackTrace();
            return obtenerDatoMockPorId(id);
        }
    }

    private List<ContenidoMedico> obtenerDeContentfulPorTipo(String tipo) {
        if (contentfulClient == null) {
            System.out.println("⚠️ Contentful no configurado. Retornando datos mock.");
            return obtenerDatosMockPorTipo(tipo);
        }

        try {
            List<CDAEntry> entries = contentfulClient.fetch(CDAEntry.class)
                    .where("content_type", tipo)
                    .all()
                    .items();

            List<ContenidoMedico> contenidos = new ArrayList<>();
            for (CDAEntry entry : entries) {
                contenidos.add(convertirEntryAContenidoMedico(entry));
            }
            
            return contenidos;
        } catch (Exception e) {
            System.err.println("❌ Error al obtener contenido de Contentful por tipo: " + e.getMessage());
            e.printStackTrace();
            return obtenerDatosMockPorTipo(tipo);
        }
    }

    private ContenidoMedico convertirEntryAContenidoMedico(CDAEntry entry) {
        ContenidoMedico contenido = new ContenidoMedico();
        contenido.setId(entry.id());
        contenido.setFechaCreacion(entry.createdAt() != null ? entry.createdAt().toString() : null);
        contenido.setFechaActualizacion(entry.updatedAt() != null ? entry.updatedAt().toString() : null);

        // Extraer campos comunes de Contentful
        Map<String, Object> fields = new HashMap<>();
        entry.fields().forEach((key, value) -> {
            fields.put(key, value);
            
            // Mapear campos comunes
            if (key.equals("title") || key.equals("titulo")) {
                contenido.setTitulo(value != null ? value.toString() : null);
            } else if (key.equals("description") || key.equals("descripcion")) {
                contenido.setDescripcion(value != null ? value.toString() : null);
            } else if (key.equals("content") || key.equals("contenido")) {
                contenido.setContenido(value != null ? value.toString() : null);
            } else if (key.equals("type") || key.equals("tipo")) {
                contenido.setTipo(value != null ? value.toString() : null);
            } else if (key.equals("category") || key.equals("categoria")) {
                contenido.setCategoria(value != null ? value.toString() : null);
            }
        });

        contenido.setMetadata(fields);
        return contenido;
    }

    // Datos mock para cuando Contentful no está configurado
    private List<ContenidoMedico> obtenerDatosMock() {
        List<ContenidoMedico> mock = new ArrayList<>();
        mock.add(new ContenidoMedico(
                "1",
                "Prevención de Enfermedades Cardiovasculares",
                "Guía completa para prevenir enfermedades del corazón",
                "Las enfermedades cardiovasculares son la principal causa de muerte...",
                "articulo",
                "cardiologia",
                Map.of("autor", "Dr. Juan Pérez"),
                new Date().toString(),
                new Date().toString()
        ));
        mock.add(new ContenidoMedico(
                "2",
                "Alimentación Saludable",
                "Consejos para una dieta balanceada",
                "Una alimentación saludable es fundamental para mantener...",
                "articulo",
                "nutricion",
                Map.of("autor", "Dra. María García"),
                new Date().toString(),
                new Date().toString()
        ));
        return mock;
    }

    private ContenidoMedico obtenerDatoMockPorId(String id) {
        List<ContenidoMedico> mock = obtenerDatosMock();
        return mock.stream()
                .filter(c -> c.getId().equals(id))
                .findFirst()
                .orElse(new ContenidoMedico(
                        id,
                        "Contenido no encontrado",
                        "El contenido solicitado no está disponible",
                        "",
                        "desconocido",
                        "general",
                        Map.of(),
                        new Date().toString(),
                        new Date().toString()
                ));
    }

    private List<ContenidoMedico> obtenerDatosMockPorTipo(String tipo) {
        return obtenerDatosMock().stream()
                .filter(c -> c.getTipo().equals(tipo))
                .toList();
    }
}
