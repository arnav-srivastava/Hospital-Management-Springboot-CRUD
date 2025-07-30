package com.HospitalManagement.hosManagement.controllers;

import com.HospitalManagement.hosManagement.models.Patient;
import com.HospitalManagement.hosManagement.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    public List<Patient> getAllPatients(){
        System.out.println("Fetching the patients");
        return patientService.getAllPatients();

    }
    @PostMapping
    public Patient createPatient(@RequestBody Patient patient){
        System.out.println("Creating patient");
        return patientService.createPatient(patient);
    }

    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable Long id){
        System.out.println("Fetching id by ID");
        return patientService.getPatientById(id);
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id){
        patientService.deletePatient(id);
        System.out.println("Patient removed from db");

    }

    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id, @RequestBody Patient patient){

        System.out.println("Patient update with ID "+id);
        return  patientService.updatePatient(id, patient);

    }
}
