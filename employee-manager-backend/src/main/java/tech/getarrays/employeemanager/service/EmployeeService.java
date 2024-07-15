package tech.getarrays.employeemanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.getarrays.employeemanager.exceptions.UserNotFoundException;
import tech.getarrays.employeemanager.model.Employee;
import tech.getarrays.employeemanager.repository.EmployeeRepo;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {

   private EmployeeRepo employeeRepo;

   @Autowired
    public EmployeeService(EmployeeRepo employeeRepo){
       this.employeeRepo = employeeRepo;
   }

   public Employee addEmployee(Employee employee){

       employee.setEmployeeCode(UUID.randomUUID().toString());
       return employeeRepo.save(employee);
   }

   public List<Employee> findAllEmployee(){
       return employeeRepo.findAll();
   }

   public Employee updateEmployee(Employee employee){
       return employeeRepo.save(employee);
   }

   public Employee findEmployeeById(Long id){
       return employeeRepo.findById(id).orElseThrow(()->
               new UserNotFoundException("User With ID-> " + id + "Was Not Found"));
   }
   public void deleteEmployee(Long id){
       employeeRepo.deleteById(id);
   }




}
