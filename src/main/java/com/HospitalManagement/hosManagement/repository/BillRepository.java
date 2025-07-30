package com.HospitalManagement.hosManagement.repository;

import com.HospitalManagement.hosManagement.models.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
}
