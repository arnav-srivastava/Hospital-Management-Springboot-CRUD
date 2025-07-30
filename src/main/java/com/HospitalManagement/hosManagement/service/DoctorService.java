package com.HospitalManagement.hosManagement.service;

import com.HospitalManagement.hosManagement.models.Doctor;
import com.HospitalManagement.hosManagement.models.Patient;
import com.HospitalManagement.hosManagement.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    DoctorRepository doctorRepository;

    public List<Doctor> getAlLDoctors(){
        try {
            System.out.println("into service layer");
            return doctorRepository.findAll();
        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());
            return null;
        }
    }

    public Doctor getDoctorById(Long id){
        try {
            System.out.println("getting doctors info by id into service layer");
            Optional<Doctor> doctor=doctorRepository.findById(id);
            return doctor.orElse(null);
        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());
            return null;
        }
    }

    public Doctor createDoctor(Doctor doctor){
        try {
            System.out.println("creating doctor into service layer");
            doctorRepository.save(doctor);
            return doctor;
        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());
            return null;
        }
    }

    public void deleteDoctor(Long id){
        try {
            System.out.println("deleting doctor into service layer");
            doctorRepository.deleteById(id);

        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());

        }
    }


    public Doctor updateDoctor(Long id, Doctor updatedDoctor){
        try {
            System.out.println("updating doctor into service layer");
            Optional<Doctor> existingDoctor=doctorRepository.findById(id);
            if(existingDoctor.isPresent()){
                Doctor d=existingDoctor.get();
                d.setName(updatedDoctor.getName());
                d.setSpeciality(updatedDoctor.getSpeciality());

                doctorRepository.save(d);
                return updatedDoctor;

            }
            return null;

        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());
            return null;

        }
    }
}
