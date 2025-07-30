package com.HospitalManagement.hosManagement.service;

import com.HospitalManagement.hosManagement.models.Appointment;
import com.HospitalManagement.hosManagement.models.Bill;
import com.HospitalManagement.hosManagement.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    AppointmentRepository appointmentRepository;


    public List<Appointment> getAllAppointments(){
        try {
            System.out.println("into service layer appointments");
            return appointmentRepository.findAll();
        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());
            return null;
        }

    }

    public Appointment createAppointment(Appointment appointment){
        try {
            System.out.println("creating appointment info by id into service layer");
          return appointmentRepository.save(appointment);
        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());
            return null;
        }
    }


    public Appointment getAppointmentById(Long id){
        try {
            System.out.println("getting appointment info by id into service layer");
            Optional<Appointment> app=appointmentRepository.findById(id);
            return app.orElse(null);

        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());
            return null;
        }
    }


    public void deleteAppointment(Long id){
        try {
            System.out.println("deleting appointment into service layer");
            appointmentRepository.deleteById(id);

        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());

        }
    }


    public Appointment updateAppointment(Long id, Appointment updatedAppointment){
        try {
            System.out.println("updating appointment into service layer");
            Optional<Appointment> existingAppointment=appointmentRepository.findById(id);
            if(existingAppointment.isPresent()) {
                Appointment a = existingAppointment.get();
                a.setDate(updatedAppointment.getDate());

                appointmentRepository.save(a);
                return updatedAppointment;
            }
            return null;

        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());
            return null;

        }
    }

}
