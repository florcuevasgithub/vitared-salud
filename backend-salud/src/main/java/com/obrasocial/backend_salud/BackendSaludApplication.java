package com.obrasocial.backend_salud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching; // Este import es clave

@SpringBootApplication
public class BackendSaludApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendSaludApplication.class, args);
	}

}