package com.taskmanager.taskmanager.security.service;

import java.util.Base64;

import javax.crypto.SecretKey;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

// @Component
// public class GenerateSecret implements CommandLineRunner {

//     @Override
//     public void run(String... args) {
//         SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
//         String base64Key = Base64.getEncoder().encodeToString(key.getEncoded());
//         System.out.println("🛡️ Generated HS512 JWT Secret Key:\n\n" + base64Key + "\n");
//     }
// }
