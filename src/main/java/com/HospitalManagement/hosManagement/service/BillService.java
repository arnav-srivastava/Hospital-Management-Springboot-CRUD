package com.HospitalManagement.hosManagement.service;

import com.HospitalManagement.hosManagement.models.Bill;
import com.HospitalManagement.hosManagement.models.Doctor;
import com.HospitalManagement.hosManagement.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BillService {

    @Autowired
    BillRepository billRepository;

    public List<Bill> getAllBills(){
        try {
            System.out.println("into service layer getting all bills");
            return billRepository.findAll();
        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());
            return null;
        }
    }

    public Bill getBillById(Long id){
        try {
            System.out.println("getting bill info by id into service layer");
            Optional<Bill> bill=billRepository.findById(id);
            return bill.orElse(null);
        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());
            return null;
        }
    }

    public Bill createBill(Bill bill){
        try {
            System.out.println("creating bills into service layer");
            billRepository.save(bill);
            return bill;
        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());
            return null;
        }
    }

    public void deleteBill(Long id){
        try {
            System.out.println("deleting bill into service layer");
            billRepository.deleteById(id);

        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());

        }
    }


    public Bill updateBill(Long id, Bill updatedbill){
        try {
            System.out.println("updating bill into service layer");
            Optional<Bill> existingBill=billRepository.findById(id);
            if(existingBill.isPresent()) {
                Bill b = existingBill.get();
                b.setAmount(updatedbill.getAmount());
                b.setStatus(updatedbill.getStatus());

                billRepository.save(b);
                return updatedbill;
            }
                return null;

        } catch (Exception e) {
            System.out.println("Error msg "+e.getMessage());
            return null;

        }
    }
}
