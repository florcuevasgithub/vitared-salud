package com.sancor.salud.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DatabaseConfig {

    @Value("${DATABASE_URL:}")
    private String databaseUrl;

    @Bean
    @Primary
    public DataSource dataSource() {
        if (databaseUrl != null && !databaseUrl.isEmpty() && !databaseUrl.startsWith("jdbc:")) {
            // Railway proporciona DATABASE_URL en formato: postgresql://user:password@host:port/database
            // Convertir a formato JDBC
            try {
                URI dbUri = new URI(databaseUrl);
                String username = dbUri.getUserInfo().split(":")[0];
                String password = dbUri.getUserInfo().split(":")[1];
                String host = dbUri.getHost();
                int port = dbUri.getPort();
                String path = dbUri.getPath();
                String dbName = path.startsWith("/") ? path.substring(1) : path;
                
                String jdbcUrl = String.format("jdbc:postgresql://%s:%d/%s", host, port, dbName);
                
                return DataSourceBuilder.create()
                        .url(jdbcUrl)
                        .username(username)
                        .password(password)
                        .driverClassName("org.postgresql.Driver")
                        .build();
            } catch (Exception e) {
                // Si falla la conversión, usar configuración por defecto
                return DataSourceBuilder.create().build();
            }
        }
        // Si no hay DATABASE_URL o ya está en formato JDBC, usar configuración por defecto
        return DataSourceBuilder.create().build();
    }
}

