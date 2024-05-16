package com.example.carlink.CarLinkAPI.controller;

import com.example.carlink.CarLinkAPI.model.AuthRequest;
import com.example.carlink.CarLinkAPI.model.AuthResponse;
import com.example.carlink.CarLinkAPI.model.Person;
import com.example.carlink.CarLinkAPI.security.JwtUtils;
import com.example.carlink.CarLinkAPI.security.SecurityConfig;
import com.example.carlink.CarLinkAPI.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private SecurityConfig securityConfig;

    @Autowired
    private PersonService personService;

    @PostMapping( "/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(),
                            authRequest.getPassword()
                    )
            );

            String jwt = jwtUtils.generateJwtToken(authRequest.getEmail());

            return ResponseEntity.ok().body(new AuthResponse(jwt));
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }


    @PostMapping( "/signup")
    public ResponseEntity<?> registerUser(@RequestBody Person person) {
        if (personService.findByEmail(person.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }
        person.setPassword(securityConfig.passwordEncoder().encode(person.getPassword()));
        person.setRole("USER"); // Default role

        personService.save(person);
        String jwt = jwtUtils.generateJwtToken(person.getEmail());
        return ResponseEntity.ok().body(new AuthResponse(jwt));
    }
}