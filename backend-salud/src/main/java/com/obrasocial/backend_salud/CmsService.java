package com.obrasocial.backend_salud;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CmsService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Cacheable(value = "contentfulCache", key = "#url")
    public String ejecutarConsulta(String url) {
        System.out.println(">>> BUSCANDO EN CONTENTFUL (Cache falló o es nueva): " + url);
        return restTemplate.getForObject(url, String.class);
    }
}