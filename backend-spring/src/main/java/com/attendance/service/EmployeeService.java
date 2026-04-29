package com.attendance.service;

import com.attendance.entity.Employee;
import com.attendance.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee employeeDetails) {
        return employeeRepository.findById(id).map(employee -> {
            employee.setEmployeeNo(employeeDetails.getEmployeeNo());
            employee.setName(employeeDetails.getName());
            employee.setDepartment(employeeDetails.getDepartment());
            employee.setPosition(employeeDetails.getPosition());
            employee.setPhone(employeeDetails.getPhone());
            employee.setEmail(employeeDetails.getEmail());
            employee.setHireDate(employeeDetails.getHireDate());
            employee.setStatus(employeeDetails.getStatus());
            return employeeRepository.save(employee);
        }).orElse(null);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    public List<Employee> searchEmployees(String keyword, String department, String status) {
        return employeeRepository.findAll().stream()
            .filter(employee -> {
                boolean matchKeyword = keyword == null || keyword.isEmpty() ||
                    employee.getName().contains(keyword) ||
                    (employee.getEmployeeNo() != null && employee.getEmployeeNo().contains(keyword));
                boolean matchDepartment = department == null || department.isEmpty() ||
                    employee.getDepartment().equals(department);
                boolean matchStatus = status == null || status.isEmpty() ||
                    employee.getStatus().equals(status);
                return matchKeyword && matchDepartment && matchStatus;
            })
            .collect(Collectors.toList());
    }
}
