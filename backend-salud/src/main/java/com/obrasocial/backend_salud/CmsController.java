\package com.obrasocial.backend_salud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api")
public class CmsController {

    @Value("${contentful.spaceId}")
    private String spaceId;

    @Value("${contentful.accessToken}")
    private String accessToken;

    @Autowired
    private CmsService cmsService;

    // 1. Contenido de páginas (¿Quiénes somos?, Contacto, etc.)
    @GetMapping("/contenido")
    public ResponseEntity<String> getContenido() {
        return ResponseEntity.ok(cmsService.ejecutarConsulta(construirUrl("paginaInformativa")));
    }

    // 2. Empresas Socias (Seguros Bite, etc.)
    @GetMapping("/empresas")
    public ResponseEntity<String> getEmpresas() {
        return ResponseEntity.ok(cmsService.ejecutarConsulta(construirUrl("empresaSocia")));
    }

    // 3. Footer (Categorías como 'Servicios', 'Información Útil')
    @GetMapping("/categorias-footer")
    public ResponseEntity<String> getFooter() {
        return ResponseEntity.ok(cmsService.ejecutarConsulta(construirUrl("categoriaFooter")));
    }

    // 4. Planes (Plan Oro, etc.)
    @GetMapping("/planes")
    public ResponseEntity<String> getPlanes() {
        return ResponseEntity.ok(cmsService.ejecutarConsulta(construirUrl("planMedico")));
    }

    // 5. Cartilla (Médicos)
    @GetMapping("/cartilla")
    public ResponseEntity<String> getCartilla() {
        return ResponseEntity.ok(cmsService.ejecutarConsulta(construirUrl("medico")));
    }

    // 6. Banner / Home
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