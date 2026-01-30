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

    // 1. Planes Médicos
    @GetMapping("/planes")
    public ResponseEntity<String> getPlanes() {
        String url = construirUrl("planMedico");
        return ResponseEntity.ok(cmsService.ejecutarConsulta(url));
    }

    // 2. Cartilla Médica (Asegurate que en Contentful se llame 'medico')
    @GetMapping("/cartilla")
    public ResponseEntity<String> getCartilla() {
        String url = construirUrl("medico");
        return ResponseEntity.ok(cmsService.ejecutarConsulta(url));
    }

    // 3. Contenido General (Páginas, textos de la home)
    @GetMapping("/contenido")
    public ResponseEntity<String> getContenido() {
        String url = construirUrl("contenido");
        return ResponseEntity.ok(cmsService.ejecutarConsulta(url));
    }

    // 4. Empresas
    @GetMapping("/empresas")
    public ResponseEntity<String> getEmpresas() {
        String url = construirUrl("empresa");
        return ResponseEntity.ok(cmsService.ejecutarConsulta(url));
    }

    // 5. Footer
    @GetMapping("/categorias-footer")
    public ResponseEntity<String> getFooter() {
        String url = construirUrl("categoriaFooter");
        return ResponseEntity.ok(cmsService.ejecutarConsulta(url));
    }

    // Función auxiliar para no repetir código
    private String construirUrl(String contentType) {
        return "https://cdn.contentful.com/spaces/" + spaceId +
                "/environments/master/entries?access_token=" + accessToken +
                "&content_type=" + contentType;
    }
}