package com.HospitalManagement.hosManagement.repository;

import com.HospitalManagement.hosManagement.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
