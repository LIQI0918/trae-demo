package com.attendance.service;

import com.attendance.entity.AttendanceRecord;
import com.attendance.repository.AttendanceRecordRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttendanceRecordService {

    @Autowired
    private AttendanceRecordRepository attendanceRecordRepository;

    public List<AttendanceRecord> getAllRecords() {
        return attendanceRecordRepository.findAll();
    }

    public AttendanceRecord createRecord(AttendanceRecord record) {
        return attendanceRecordRepository.save(record);
    }

    public AttendanceRecord updateRecord(Long id, AttendanceRecord recordUpdates) {
        Optional<AttendanceRecord> optionalRecord = attendanceRecordRepository.findById(id);
        if (optionalRecord.isPresent()) {
            AttendanceRecord record = optionalRecord.get();
            BeanUtils.copyProperties(recordUpdates, record, "id", "employeeId", "employeeName", "date", "checkIn");
            return attendanceRecordRepository.save(record);
        }
        return null;
    }
}
