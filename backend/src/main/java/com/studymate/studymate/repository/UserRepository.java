package com.studymate.studymate.repository;

import com.studymate.studymate.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    // Is this username already used by someone else? (case doesn't matter)
    boolean existsByNameIgnoreCaseAndIdNot(String name, Long id);
}
