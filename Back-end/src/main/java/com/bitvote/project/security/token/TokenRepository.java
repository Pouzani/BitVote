package com.bitvote.project.security.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {
    @Query("SELECT t FROM Token t INNER JOIN User u ON t.user.id = u.id WHERE u.id = :id AND (t.expired = false AND t.revoked = false)")
    List<Token> findAllValidTokenByUserId(Long id);

    Optional<Token> findByToken(String token);
}
