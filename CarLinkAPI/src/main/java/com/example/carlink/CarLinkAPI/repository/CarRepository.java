package com.example.carlink.CarLinkAPI.repository;

import com.example.carlink.CarLinkAPI.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByOwnerId(Long ownerId);
}
