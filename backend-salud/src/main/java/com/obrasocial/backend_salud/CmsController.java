package com.obrasocial.backend_salud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class CmsController {

    @Value("${contentful.spaceId}")
    private String spaceId;

    @Value("${contentful.accessToken}")
    private String accessToken;

    @Autowired
    private CmsService cmsService;

    @GetMapping("/planes")
    public ResponseEntity<String> getPlanes() {
        return ResponseEntity.ok(cmsService.ejecutarConsulta(construirUrl("planMedico")));
    }

    @GetMapping("/cartilla")
    public ResponseEntity<String> getCartilla() {
        return ResponseEntity.ok(cmsService.ejecutarConsulta(construirUrl("medico")));
    }

    @GetMapping("/contenido")
    public ResponseEntity<String> getContenido() {
        return ResponseEntity.ok(cmsService.ejecutarConsulta(construirUrl("paginaInformativa")));
    }

    @GetMapping("/empresas")
    public ResponseEntity<String> getEmpresas() {
        return ResponseEntity.ok(cmsService.ejecutarConsulta(construirUrl("empresaSocia")));
    }

    @GetMapping("/categorias-footer")
    public ResponseEntity<String> getFooter() {
        return ResponseEntity.ok(cmsService.ejecutarConsulta(construirUrl("categoriaFooter")));
    }

    @GetMapping("/banner")
    public ResponseEntity<String> getBanner() {
        return ResponseEntity.ok(cmsService.ejecutarConsulta(construirUrl("healthcareHomepage")));
    }

    private String construirUrl(String contentType) {
        return "https://cdn.contentful.com/spaces/" + spaceId +
                "/environments/master/entries?access_token=" + accessToken +
                "&content_type=" + contentType;
    }
}