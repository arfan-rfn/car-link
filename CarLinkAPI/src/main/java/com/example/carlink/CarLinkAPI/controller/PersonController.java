package com.example.carlink.CarLinkAPI.controller;

import com.example.carlink.CarLinkAPI.model.Person;
import com.example.carlink.CarLinkAPI.security.SecurityConfig;
import com.example.carlink.CarLinkAPI.service.PersonService;
import com.example.carlink.CarLinkAPI.service.AuthHelperService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/person")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class PersonController {

    @Autowired
    private SecurityConfig securityConfig;

    @Autowired
    private PersonService personService;

    @Autowired
    private AuthHelperService AuthHelper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public Person getPerson() {
        return AuthHelper.getAuthenticatedPerson();
    }

    @GetMapping("/all")
    public List<Person> getAllPersons() {
        boolean hasRole = AuthHelper.hasRole("ADMIN");
        if (hasRole) {
            return personService.findAll();
        }
        return null;
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public Optional<Person> getPersonById(@PathVariable Long id) {
        return personService.findById(id);
    }

    @PostMapping
    public Person createPerson(@RequestBody Person person) {
        boolean hasRole = AuthHelper.hasRole("ADMIN");
        if (!hasRole) {
            return null;
        }

        person.setPassword(passwordEncoder.encode(person.getPassword()));
        return personService.save(person);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Person updatePerson(@PathVariable Long id, @RequestBody Person personDetails) {
        Optional<Person> optionalPerson = personService.findById(id);
        if (optionalPerson.isPresent()) {
            Person person = optionalPerson.get();
            person.setName(personDetails.getName());
            person.setEmail(personDetails.getEmail());
            person.setPassword(personDetails.getPassword());
            person.setRole(personDetails.getRole());
            return personService.save(person);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deletePerson(@PathVariable Long id) {
        boolean hasRole = AuthHelper.hasRole("ADMIN");
        if (!hasRole) {
            return;
        }
        Optional<Person> optionalPerson = personService.findById(id);
        if (optionalPerson.isPresent()) {
            personService.deleteById(id);
        }
    }
}