package tech.getarrays.employeemanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import tech.getarrays.employeemanager.model.Employee;

//@CrossOrigin("http://localhost:4200")
public interface EmployeeRepo extends JpaRepository<Employee, Long> {
}
