package com.shift_rc.shift_rc_backend.payload.request;

import jakarta.validation.constraints.NotBlank;

public class PayPeriodRequest {

    @NotBlank
    private String fromDate;

    @NotBlank
    private String toDate;

    @NotBlank
    private Integer wagePerHour;

    public PayPeriodRequest(String fromDate, String toDate, Integer wagePerHour) {
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.wagePerHour = wagePerHour;
    }

    public String getFromDate() {
        return this.fromDate;
    }

    public String getToDate() {
        return this.toDate;
    }

    public Integer getWagePerHour() {
        return this.wagePerHour;
    }

    public void setFromDate(String newFromDate) {
        this.fromDate = newFromDate;
    }

    public void setToDate(String newToDate) {
        this.toDate = newToDate;
    }

    public void setWagePerHour(Integer newWagePerHour) {
        this.wagePerHour = newWagePerHour;
    }

    public int getWagePerHourInMinutes() {
        return this.wagePerHour / 60;
    }
}
