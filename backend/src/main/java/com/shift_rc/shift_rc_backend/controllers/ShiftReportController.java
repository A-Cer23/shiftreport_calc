package com.shift_rc.shift_rc_backend.controllers;

import com.shift_rc.shift_rc_backend.models.ShiftReport;
import com.shift_rc.shift_rc_backend.models.User;
import com.shift_rc.shift_rc_backend.payload.request.PayPeriodRequest;
import com.shift_rc.shift_rc_backend.payload.response.MessageResponse;
import com.shift_rc.shift_rc_backend.repos.ShiftReportRepo;
import com.shift_rc.shift_rc_backend.repos.UserRepo;
import com.shift_rc.shift_rc_backend.security.jwt.JwtUtils;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.logging.Logger;

@CrossOrigin
@RestController
@RequestMapping("/shiftreports")
public class ShiftReportController {

    @Autowired
    private ShiftReportRepo shiftReportRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> createShiftReport(@RequestHeader("Authorization") String authorization, @RequestBody ShiftReport shiftReport) {

        String token = jwtUtils.parseJwt(authorization);

        String username = jwtUtils.getUserNameFromJwtToken(token);

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: Username is not found"));

        shiftReport.setUser(user);
        shiftReport.setTotalHours();

        shiftReportRepo.save(shiftReport);

        return ResponseEntity.ok(new MessageResponse("Shift report created successfully!"));
    }

    @GetMapping("/getbyid")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> getShiftReportById(@RequestParam Long id) {
        ShiftReport shiftReportData = shiftReportRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Shift Report Id doesn't exist"));
        return ResponseEntity.ok(shiftReportData);
    }

    @GetMapping("/get")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> getAllUserShiftReport(@RequestHeader("Authorization") String authorization) {

        String token = jwtUtils.parseJwt(authorization);

        String username = jwtUtils.getUserNameFromJwtToken(token);

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: Username is not found"));



        Set<ShiftReport> shiftReports = shiftReportRepo.findByUserIdDesc(user.getId());

        return ResponseEntity.ok(shiftReports);
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> updateShiftReport(@RequestParam("id") Long id, @RequestBody ShiftReport shiftReport) {

        Optional<ShiftReport> shiftReportData = shiftReportRepo.findById(id);

        if (shiftReportData.isPresent()) {
            ShiftReport _shiftReport = shiftReportData.get();
            _shiftReport.setStartDate(shiftReport.getStartDate());
            _shiftReport.setEndDate(shiftReport.getEndDate());
            _shiftReport.setStartTime(shiftReport.getStartTime());
            _shiftReport.setEndTime(shiftReport.getEndTime());
            _shiftReport.setTotalHours();

            shiftReportRepo.save(_shiftReport);

            return ResponseEntity.ok(new MessageResponse("Shift report updated successfully!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Shift report id doesn't exist"));
        }
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> deleteShiftReport(@RequestParam("id") Long id) {
        try {
            shiftReportRepo.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Shift report deleted successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Shift report id doesn't exist"));
        }
    }

    @GetMapping("/payperiod")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> getPayPeriod(@RequestHeader("Authorization") String authorization, @RequestParam String fromDate,
                                          @RequestParam String toDate, @RequestParam Double wagePerHour) {

        String token = jwtUtils.parseJwt(authorization);

        String username = jwtUtils.getUserNameFromJwtToken(token);

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: Username is not found"));

        Long all_shifts_hours_in_minutes = shiftReportRepo.getTotalHoursBetweenDates(user.getId(), fromDate, toDate);

        Double totalPay = all_shifts_hours_in_minutes * ( wagePerHour / 60 );

        return ResponseEntity.ok(totalPay);
    }
}
