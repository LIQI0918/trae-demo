package com.attendance.service;

import com.attendance.entity.LeaveRequest;
import com.attendance.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    public List<LeaveRequest> getAllRequests() {
        return leaveRequestRepository.findAll();
    }

    public LeaveRequest createRequest(LeaveRequest request) {
        return leaveRequestRepository.save(request);
    }

    public LeaveRequest updateStatus(Long id, String status) {
        Optional<LeaveRequest> optionalRequest = leaveRequestRepository.findById(id);
        if (optionalRequest.isPresent()) {
            LeaveRequest request = optionalRequest.get();
            request.setStatus(status);
            return leaveRequestRepository.save(request);
        }
        return null;
    }

    public void deleteRequest(Long id) {
        leaveRequestRepository.deleteById(id);
    }
}
