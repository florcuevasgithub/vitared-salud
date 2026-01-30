package com.obrasocial.backend_salud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
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
        return ejecutarSeguro("planMedico");
    }

    @GetMapping("/cartilla")
    public ResponseEntity<String> getCartilla() {
        return ejecutarSeguro("medico");
    }

    @GetMapping("/categorias-footer")
    public ResponseEntity<String> getFooter() {
        return ejecutarSeguro("categoriaFooter");
    }

    @GetMapping("/banner")
    public ResponseEntity<String> getBanner() {
        return ejecutarSeguro("healthcareHomepage");
    }

    private ResponseEntity<String> ejecutarSeguro(String contentType) {
        try {
            if (spaceId == null || spaceId.isEmpty() || spaceId.contains("{")) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error: Las variables de entorno no están cargadas en Railway.");
            }
            String url = "https://cdn.contentful.com/spaces/" + spaceId +
                    "/environments/master/entries?access_token=" + accessToken +
                    "&content_type=" + contentType;
            return ResponseEntity.ok(cmsService.ejecutarConsulta(url));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al conectar con Contentful: " + e.getMessage());
        }
    }
}