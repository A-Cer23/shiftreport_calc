package com.shift_rc.shift_rc_backend.repos;

import com.shift_rc.shift_rc_backend.models.ERole;
import com.shift_rc.shift_rc_backend.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {

    Optional<Role> findByName(ERole name);
}
