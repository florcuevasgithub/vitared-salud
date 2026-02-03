package com.sancor.salud.config;

import com.contentful.java.cda.CDAClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ContentfulConfig {

    @Value("${contentful.space.id:}")
    private String spaceId;

    @Value("${contentful.access.token:}")
    private String accessToken;

    @Value("${contentful.environment:master}")
    private String environment;

    @Bean
    @ConditionalOnProperty(name = "contentful.enabled", havingValue = "true", matchIfMissing = false)
    public CDAClient contentfulClient() {
        if (spaceId == null || spaceId.isEmpty() || accessToken == null || accessToken.isEmpty()) {
            System.out.println("⚠️ Contentful habilitado pero no configurado correctamente. Usando cliente mock.");
            return null;
        }
        
        System.out.println("✅ Configurando Contentful Client");
        System.out.println("   Space ID: " + spaceId);
        System.out.println("   Environment: " + environment);
        
        return CDAClient.builder()
                .setSpace(spaceId)
                .setToken(accessToken)
                .setEnvironment(environment)
                .build();
    }
}
