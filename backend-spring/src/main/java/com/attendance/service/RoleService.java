package com.attendance.service;

import com.attendance.entity.Role;
import com.attendance.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Optional<Role> getRoleById(Long id) {
        return roleRepository.findById(id);
    }

    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    public Role updateRole(Long id, Role roleDetails) {
        return roleRepository.findById(id).map(role -> {
            role.setName(roleDetails.getName());
            role.setCode(roleDetails.getCode());
            role.setDescription(roleDetails.getDescription());
            role.setStatus(roleDetails.getStatus());
            return roleRepository.save(role);
        }).orElse(null);
    }

    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }

    public List<Role> searchRoles(String keyword, String status) {
        return roleRepository.findAll().stream()
            .filter(role -> {
                boolean matchKeyword = keyword == null || keyword.isEmpty() ||
                    role.getName().contains(keyword) ||
                    (role.getCode() != null && role.getCode().contains(keyword));
                boolean matchStatus = status == null || status.isEmpty() ||
                    role.getStatus().equals(status);
                return matchKeyword && matchStatus;
            })
            .collect(Collectors.toList());
    }
}
