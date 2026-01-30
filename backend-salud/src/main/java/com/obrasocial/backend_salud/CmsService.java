package com.obrasocial.backend_salud;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CmsService {
    private final RestTemplate restTemplate = new RestTemplate();

    public String ejecutarConsulta(String url) {
        return restTemplate.getForObject(url, String.class);
    }
}