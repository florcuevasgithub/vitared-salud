package com.sancor.salud.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnClass(name = "com.contentful.java.cda.CDAClient")
public class ContentfulConfig {

    @Value("${contentful.space.id:}")
    private String spaceId;

    @Value("${contentful.access.token:}")
    private String accessToken;

    @Value("${contentful.environment:master}")
    private String environment;

    // Bean comentado temporalmente - Contentful SDK no disponible
    // Cuando el SDK esté disponible, descomentar y usar el método original comentado abajo
    /*
    @Bean
    @ConditionalOnProperty(name = "contentful.enabled", havingValue = "true", matchIfMissing = false)
    public Object contentfulClient() {
        // Usar reflection para evitar dependencia directa
        try {
            Class<?> clientClass = Class.forName("com.contentful.java.cda.CDAClient");
            Object builder = clientClass.getMethod("builder").invoke(null);
            
            if (spaceId == null || spaceId.isEmpty() || accessToken == null || accessToken.isEmpty()) {
                System.out.println("⚠️ Contentful habilitado pero no configurado correctamente. Usando cliente mock.");
                return null;
            }
            
            System.out.println("✅ Configurando Contentful Client");
            System.out.println("   Space ID: " + spaceId);
            System.out.println("   Environment: " + environment);
            
            builder.getClass().getMethod("setSpace", String.class).invoke(builder, spaceId);
            builder.getClass().getMethod("setToken", String.class).invoke(builder, accessToken);
            builder.getClass().getMethod("setEnvironment", String.class).invoke(builder, environment);
            return builder.getClass().getMethod("build").invoke(builder);
        } catch (Exception e) {
            System.out.println("⚠️ Contentful SDK no disponible. Usando cliente mock.");
            return null;
        }
    }
    */
    
    // Método original comentado - descomentar cuando la dependencia esté disponible
    /*
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
    */
}
