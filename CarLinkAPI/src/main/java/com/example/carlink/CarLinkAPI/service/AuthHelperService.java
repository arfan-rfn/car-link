package com.example.carlink.CarLinkAPI.service;

import com.example.carlink.CarLinkAPI.model.Person;
import com.example.carlink.CarLinkAPI.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AuthHelperService {
    @Autowired
    private PersonRepository personRepository;

    public Person getAuthenticatedPerson() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails) {
            try {
                Person person = personRepository.findByEmail(userDetails.getUsername()).orElse(null);
                return person;
            } catch (Exception e) {
                return null;
            }
        }
        return null;
    }

    public boolean hasRole(String role) {
        Person person = getAuthenticatedPerson();
        return person != null && person.getRole().equals(role.toUpperCase());
    }

    public boolean hasRole(String[] role) {
        Person person = getAuthenticatedPerson();
        for (String r : role) {
            if (person != null && person.getRole().equals(r.toUpperCase())) {
                return true;
            }
        }
        return false;
    }
}
