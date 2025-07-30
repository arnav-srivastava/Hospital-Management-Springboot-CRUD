package com.HospitalManagement.hosManagement.controllers;


import com.HospitalManagement.hosManagement.models.Bill;
import com.HospitalManagement.hosManagement.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bills")
public class BillController {

    @Autowired
    BillService billService;

    @GetMapping
    public List<Bill> getAllBills(){
        System.out.println("Fetching your bill keep patience");
        return billService.getAllBills();

    }
    @PostMapping
    public Bill createBill(@RequestBody Bill bill){
        System.out.println("Generating Bill");
        return billService.createBill(bill);
    }

    @GetMapping("/{id}")
    public Bill getBillById(@PathVariable Long id){
        System.out.println("Fetching Bill id by ID");
        return billService.getBillById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteBill(@PathVariable Long id){
        billService.deleteBill(id);
        System.out.println("Bill removed from db");
    }

    @PutMapping("/{id}")
    public Bill updateBill(@PathVariable Long id, @RequestBody Bill bill)
    {
        System.out.println("Bill updated");
        return  billService.updateBill(id, bill);
    }

}
