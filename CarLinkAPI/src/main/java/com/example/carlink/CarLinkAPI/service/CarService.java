package com.example.carlink.CarLinkAPI.service;


import com.example.carlink.CarLinkAPI.model.Car;
import com.example.carlink.CarLinkAPI.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;

    public Car createCar(Car car) {
        return carRepository.save(car);
    }

    public List<Car> findByOwnerId(Long ownerId) {
        return carRepository.findByOwnerId(ownerId);
    }

    public Car findById(Long id) {
        return carRepository.findById(id).orElse(null);
    }

    public List<Car> findAll() {
        return carRepository.findAll();
    }

    public Car save(Car car) {
        return carRepository.save(car);
    }

    public void deleteById(Long id) {
        carRepository.deleteById(id);
    }
}