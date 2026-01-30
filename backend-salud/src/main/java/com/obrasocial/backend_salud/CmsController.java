package com.obrasocial.backend_salud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*") // Esto permite que Vercel lea los datos
@RestController
@RequestMapping("/api")
public class CmsController {

    @Value("${contentful.spaceId}")
    private String spaceId;

    @Value("${contentful.accessToken}")
    private String accessToken;

    @Autowired
    private CmsService cmsService; // Inyectamos el servicio con caché

    @GetMapping("/planes")
    public ResponseEntity<String> getPlanes() {
        String url = "https://cdn.contentful.com/spaces/" + spaceId +
                "/environments/master/entries?access_token=" + accessToken +
                "&content_type=planMedico";
        return ResponseEntity.ok(cmsService.ejecutarConsulta(url));
    }

    // Puedemos repetir esto para /contenido, /categorias-footer, etc.
}