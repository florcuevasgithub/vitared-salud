package com.sancor.salud.controller;

import com.sancor.salud.model.ContenidoMedico;
import com.sancor.salud.service.ContentfulService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contenido")
public class ContenidoMedicoController {

    private final ContentfulService contentfulService;

    @Autowired
    public ContenidoMedicoController(ContentfulService contentfulService) {
        this.contentfulService = contentfulService;
    }

    /**
     * Obtiene todos los contenidos médicos
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> obtenerTodosLosContenidos() {
        try {
            List<ContenidoMedico> contenidos = contentfulService.obtenerTodosLosContenidos();
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "OK");
            response.put("total", contenidos.size());
            response.put("data", contenidos);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Error al obtener contenidos: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Obtiene un contenido médico por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> obtenerContenidoPorId(@PathVariable String id) {
        try {
            ContenidoMedico contenido = contentfulService.obtenerContenidoPorId(id);
            
            if (contenido == null) {
                Map<String, Object> error = new HashMap<>();
                error.put("status", "NOT_FOUND");
                error.put("message", "Contenido no encontrado con ID: " + id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "OK");
            response.put("data", contenido);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Error al obtener contenido: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Obtiene contenidos médicos por tipo
     */
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<Map<String, Object>> obtenerContenidosPorTipo(@PathVariable String tipo) {
        try {
            List<ContenidoMedico> contenidos = contentfulService.obtenerContenidosPorTipo(tipo);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "OK");
            response.put("tipo", tipo);
            response.put("total", contenidos.size());
            response.put("data", contenidos);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Error al obtener contenidos por tipo: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Invalida el caché de un contenido específico
     */
    @DeleteMapping("/cache/{id}")
    public ResponseEntity<Map<String, String>> invalidarCache(@PathVariable String id) {
        try {
            contentfulService.invalidarCache(id);
            
            Map<String, String> response = new HashMap<>();
            response.put("status", "OK");
            response.put("message", "Caché invalidado para ID: " + id);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Error al invalidar caché: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Invalida todo el caché
     */
    @DeleteMapping("/cache")
    public ResponseEntity<Map<String, String>> invalidarTodoElCache() {
        try {
            contentfulService.invalidarTodoElCache();
            
            Map<String, String> response = new HashMap<>();
            response.put("status", "OK");
            response.put("message", "Todo el caché ha sido invalidado");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Error al invalidar caché: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
