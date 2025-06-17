package com.kulimagrolink;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class KulimAgroLinkApplication {
    public static void main(String[] args) {
        SpringApplication.run(KulimAgroLinkApplication.class, args);
    }
} 