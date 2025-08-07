package com.HospitalManagement.hosManagement.controllers;

import com.HospitalManagement.hosManagement.models.Appointment;
import com.HospitalManagement.hosManagement.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;


    @GetMapping
    public List<Appointment> getAllAppointments(){
        System.out.println("Fetching All Appointments till date");
        return appointmentService.getAllAppointments();

    }
    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment){
        System.out.println("Generating Appointment");
        return appointmentService.createAppointment(appointment);
    }

    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id){
        System.out.println("Fetching Appointment details by ID");
        return appointmentService.getAppointmentById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id){
        appointmentService.deleteAppointment(id);
        System.out.println("Appointment removed from db");
    }

    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable Long id, @RequestBody Appointment appointment){

        System.out.println("APPOINTMENTS Details updated");
        return  appointmentService.updateAppointment(id, appointment);
    }
}
