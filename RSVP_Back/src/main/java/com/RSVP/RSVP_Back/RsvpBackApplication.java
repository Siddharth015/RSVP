package com.RSVP.RSVP_Back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;

import com.RSVP.RSVP_Back.service.GiftOptionService;

import java.util.UUID;

@SpringBootApplication
public class RsvpBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(RsvpBackApplication.class, args);
    }

    // Seed some default gift options for local testing (guarded by app.seed-demo)
    @Bean
    CommandLineRunner seedGiftOptions(
            GiftOptionService giftOptionService,
            @Value("${app.seed-demo:false}") boolean seedDemo
    ) {
        return args -> {
            if (!seedDemo) return; // Only seed when explicitly enabled
            try {
                UUID demoEvent = UUID.fromString("417d5715-71d6-46de-8bd9-35393d6cc873");
                String[] defaults = new String[]{"Bicycle", "Cake", "Books", "Flowers", "Board Game"};
                for (String label : defaults) {
                    giftOptionService.resolveOrCreateOption(demoEvent, label);
                }
            } catch (Exception ignored) {
                // Ignore in non-local contexts
            }
        };
    }
}
