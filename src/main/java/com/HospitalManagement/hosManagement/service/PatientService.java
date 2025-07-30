package com.HospitalManagement.hosManagement.service;

import com.HospitalManagement.hosManagement.models.Patient;
import com.HospitalManagement.hosManagement.repository.PatientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    private static final Logger logger= LoggerFactory.getLogger(PatientService.class);

    @Autowired
    PatientRepository patientRepository;

    public List<Patient> getAllPatients(){
        try {
            System.out.println("into service layer");
            return patientRepository.findAll();
        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());
            logger.error("An error occurred while fetching all patients {}", e.getMessage());
            return null;
        }
    }

    public Patient getPatientById(Long id){
        try {
            System.out.println("getting patient info by id into service layer");
            Optional<Patient> patient=patientRepository.findById(id);
            return patient.orElse(null);

        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());
            return null;
        }
    }

    public Patient createPatient(Patient patient){
        try {
            System.out.println("creating patient into service layer");
            patientRepository.save(patient);
            return patient;
        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());
            return null;
        }
    }

    public void deletePatient(Long id){
        try {
            patientRepository.deleteById(id);
            System.out.println("deleting patient into service layer");

        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());

        }
    }


    public Patient updatePatient(Long id, Patient updatedPatient){
        try {
            System.out.println("updating patient into service layer");
            Optional<Patient> existingPatient=patientRepository.findById(id);
            if(existingPatient.isPresent()){
                Patient p=existingPatient.get();
                p.setName(updatedPatient.getName());
                p.setAge(updatedPatient.getAge());
                p.setGender(updatedPatient.getGender());

                patientRepository.save(p);
                return updatedPatient;

            }
            else{
                logger.error("Patient with Id {} not found",id);
            }
            return null;

        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());
            return null;

        }
    }
}

