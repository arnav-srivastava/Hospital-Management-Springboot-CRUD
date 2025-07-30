package com.HospitalManagement.hosManagement.repository;

import com.HospitalManagement.hosManagement.models.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}
