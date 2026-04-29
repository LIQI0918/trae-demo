package com.attendance.controller;

import com.attendance.entity.AttendanceRecord;
import com.attendance.service.AttendanceRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceRecordController {

    @Autowired
    private AttendanceRecordService attendanceRecordService;

    @GetMapping
    public ResponseEntity<List<AttendanceRecord>> getAllRecords() {
        return ResponseEntity.ok(attendanceRecordService.getAllRecords());
    }

    @PostMapping
    public ResponseEntity<AttendanceRecord> createRecord(@RequestBody AttendanceRecord record) {
        AttendanceRecord created = attendanceRecordService.createRecord(record);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttendanceRecord> updateRecord(@PathVariable Long id, @RequestBody AttendanceRecord recordUpdates) {
        AttendanceRecord updated = attendanceRecordService.updateRecord(id, recordUpdates);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }
}
