package com.bitvote.project.security.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<List<User>> findAllByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(String search1,String search2);
    Optional<User> findByUsername(String username);
    boolean existsUserByUsername(String username);
}
