package com.sancor.salud.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContenidoMedico {
    private String id;
    private String titulo;
    private String descripcion;
    private String contenido;
    private String tipo;
    private String categoria;
    private Map<String, Object> metadata;
    private String fechaCreacion;
    private String fechaActualizacion;
}
