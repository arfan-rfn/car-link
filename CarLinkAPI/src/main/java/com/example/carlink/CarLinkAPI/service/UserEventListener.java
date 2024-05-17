package com.example.carlink.CarLinkAPI.service;

import com.example.carlink.CarLinkAPI.model.Person;
import com.example.carlink.CarLinkAPI.repository.PersonRepository;
import com.example.carlink.CarLinkAPI.security.SecurityConfig;
import com.google.gson.Gson;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.Map;

@Service
public class UserEventListener {

    @Autowired
    private PersonService personService;
    @Autowired
    private SecurityConfig securityConfig;

    @RabbitListener(queues = "user.signup.queue")
    public void handleSignup(String message) {
        System.out.println("Signup Event: " + message);
    }

    @RabbitListener(queues = "user.registration.queue")
    public void handleLogin(String message) {
        try {
            System.out.println("Login Event: " + message);
            Gson gson = new Gson();
            Type mapType = new TypeToken<Map<String, String>>(){}.getType();
            Map<String, String> map = gson.fromJson(message, mapType);

            Person person = new Person();
            person.setName(map.get("name"));
            person.setEmail(map.get("email"));
            person.setPassword(securityConfig.passwordEncoder().encode(map.get("password")));
            person.setRole(map.get("role"));

            personService.save(person);
            System.out.println("User registered complete for " + map);
        } catch (Exception e) {
            System.out.println("Error: Couldn't register user from the message " + message);
        }
    }
}
