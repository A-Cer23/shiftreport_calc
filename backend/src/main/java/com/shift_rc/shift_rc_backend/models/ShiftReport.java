package com.shift_rc.shift_rc_backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


@Entity
@Table(name = "shift_reports")
@Setter
@Getter
public class ShiftReport {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;


    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;


    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;


    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;

    private Long totalHoursInMinutes;

    @ManyToOne()
    @JoinColumn(name="user_id")
    private User user;


    public ShiftReport() { }

    public ShiftReport(LocalDate startDate, LocalDate endDate, LocalTime startTime, LocalTime endTime) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public void setTotalHours() {

        LocalDateTime startDateTime = LocalDateTime.of(this.getStartDate(), this.getStartTime());
        LocalDateTime endDateTime = LocalDateTime.of(this.getEndDate(), this.getEndTime());

        Duration duration = Duration.between(startDateTime, endDateTime);

        this.totalHoursInMinutes = duration.toMinutes();
    }


    public String getTotalHours() {

        Long hours = this.getTotalHoursInMinutes() / 60;
        Long minutes = this.getTotalHoursInMinutes() % 60;

        String stringHours = "";
        String stringMinutes = "";

        if (hours < 10) {
            stringHours = String.format("0%s", hours);
        } else {
            stringHours = String.format("%s", hours);
        }

        if (minutes < 10) {
            stringMinutes = String.format("0%s", minutes);
        } else {
            stringMinutes = String.format("%s", minutes);
        }

        String totalHours = String.format("%s:%s", stringHours, stringMinutes);

        return totalHours;
    }
}
