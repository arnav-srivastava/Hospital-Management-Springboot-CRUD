package com.HospitalManagement.hosManagement.controllers;


import com.HospitalManagement.hosManagement.models.Doctor;
import com.HospitalManagement.hosManagement.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/doctors")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})

public class DoctorController {

    @Autowired
    DoctorService doctorService;

    @GetMapping
    public List<Doctor> getAllDoctors(){
        System.out.println("Fetching the doctors");
        return doctorService.getAlLDoctors();

    }
    @PostMapping
    public Doctor createDoctor(@RequestBody Doctor doctor){
        System.out.println("Creating doctor");
        return doctorService.createDoctor(doctor);
    }

    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable Long id){
        System.out.println("Fetching Doctor id by ID");
        return doctorService.getDoctorById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable Long id){
        doctorService.deleteDoctor(id);
        System.out.println("Doctor removed from db");
    }

    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable Long id, @RequestBody Doctor doctor){
        System.out.println("Doctor removed from db");
        return doctorService.updateDoctor(id, doctor);

    }

}
