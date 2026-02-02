package com.sancor.salud.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import jakarta.sql.DataSource;
import java.net.URI;

@Configuration
public class DatabaseConfig {

    @Value("${DATABASE_URL:}")
    private String databaseUrl;

    @Bean
    @Primary
    public DataSource dataSource() {
        // Si Railway proporciona DATABASE_URL, convertir de formato postgresql:// a jdbc:postgresql://
        if (databaseUrl != null && !databaseUrl.isEmpty() && !databaseUrl.startsWith("jdbc:")) {
            try {
                // Railway usa formato: postgresql://user:password@host:port/database
                URI dbUri = new URI(databaseUrl);
                
                if (dbUri.getUserInfo() == null || dbUri.getUserInfo().isEmpty()) {
                    System.err.println("DATABASE_URL no contiene información de usuario");
                    return DataSourceBuilder.create().build();
                }
                
                String[] userInfo = dbUri.getUserInfo().split(":");
                String username = userInfo[0];
                String password = userInfo.length > 1 ? userInfo[1] : "";
                String host = dbUri.getHost();
                int port = dbUri.getPort() > 0 ? dbUri.getPort() : 5432;
                String path = dbUri.getPath();
                String dbName = path != null && path.startsWith("/") ? path.substring(1) : (path != null ? path : "postgres");
                
                // Añadir parámetros de conexión para mejor manejo de errores
                String jdbcUrl = String.format("jdbc:postgresql://%s:%d/%s?connectTimeout=10&socketTimeout=10", host, port, dbName);
                
                System.out.println("Configurando DataSource con DATABASE_URL de Railway");
                System.out.println("Host: " + host + ", Port: " + port + ", Database: " + dbName);
                
                return DataSourceBuilder.create()
                        .url(jdbcUrl)
                        .username(username)
                        .password(password)
                        .driverClassName("org.postgresql.Driver")
                        .build();
            } catch (Exception e) {
                // Si falla la conversión, Spring Boot usará la configuración por defecto de application.properties
                System.err.println("Error parsing DATABASE_URL: " + e.getMessage());
                e.printStackTrace();
                return DataSourceBuilder.create().build();
            }
        }
        // Si no hay DATABASE_URL o ya está en formato JDBC, Spring Boot usará application.properties
        System.out.println("Usando configuración de application.properties para DataSource");
        return DataSourceBuilder.create().build();
    }
}
