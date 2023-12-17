package com.shift_rc.shift_rc_backend.repos;

import com.shift_rc.shift_rc_backend.models.ShiftReport;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Set;

@Repository
public interface ShiftReportRepo extends JpaRepository<ShiftReport, Long>{

    @Query(value = "SELECT * FROM shift_reports s WHERE s.user_id = :user_id ORDER BY start_date DESC", nativeQuery = true)
    Set<ShiftReport> findByUserIdDesc(@Param("user_id") Long user_id);

    @Query(value = "SELECT SUM(s.total_hours_in_minutes) FROM shift_reports s WHERE s.user_id = :user_id AND s.start_date BETWEEN DATE(:fromDate) AND DATE(:endDate)", nativeQuery = true)
    Long getTotalHoursBetweenDates(@Param("user_id") Long user_id, @Param("fromDate") String fromDate, @Param("endDate") String endDate);
}
