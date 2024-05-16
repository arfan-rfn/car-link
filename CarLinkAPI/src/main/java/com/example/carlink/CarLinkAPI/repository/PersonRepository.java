package com.example.carlink.CarLinkAPI.repository;

import com.example.carlink.CarLinkAPI.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<Person> findByEmail(String email);
}
