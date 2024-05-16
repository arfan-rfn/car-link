package com.example.carlink.CarLinkAPI.controller;

import com.example.carlink.CarLinkAPI.model.Car;
import com.example.carlink.CarLinkAPI.model.Person;
import com.example.carlink.CarLinkAPI.service.AuthHelperService;
import com.example.carlink.CarLinkAPI.service.CarService;
import com.example.carlink.CarLinkAPI.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class CarController {

    @Autowired
    private PersonService personService;

    @Autowired
    private AuthHelperService AuthHelper;

    @Autowired
    private CarService carService;

    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Car> getAllCars() {
        return carService.findAll();
    }

    @GetMapping("/{ownerId}")
    public List<Car> getCarsByOwnerId(@PathVariable Long ownerId) {
        boolean hasRole = AuthHelper.hasRole("ADMIN");

        if (!hasRole) {
            Person owner = AuthHelper.getAuthenticatedPerson();
            ownerId = owner.getId();
        }

        return carService.findByOwnerId(ownerId);
    }

    @PostMapping
    public Car createCar(@RequestBody Map<String, String> payload) {
        Car car = new Car();
        car.setModel(payload.get("model"));
        car.setYear(Integer.parseInt(payload.get("year")));

        boolean hasRole = AuthHelper.hasRole("ADMIN");

        if (hasRole) {
            Long ownerId = Long.valueOf(payload.get("ownerId"));
            Person owner = personService.findById(ownerId).orElse(null);
            car.setOwner(owner);
        } else {
            Person owner = AuthHelper.getAuthenticatedPerson();
            car.setOwner(owner);
        }

        return carService.createCar(car);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Car updateCar(@PathVariable Long id, @RequestBody Car carDetails) {
        return carService.save(carDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable Long id) {
        Car car = carService.findById(id);

        boolean hasRole = AuthHelper.hasRole("ADMIN");

        boolean isOwner = car.getOwner().getId().equals(AuthHelper.getAuthenticatedPerson().getId());

        if (hasRole || isOwner) {
            carService.deleteById(id);
        }
    }
}