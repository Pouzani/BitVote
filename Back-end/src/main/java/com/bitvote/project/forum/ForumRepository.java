package com.bitvote.project.forum;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ForumRepository extends JpaRepository<Article, Long> {

    Optional<List<Article>> searchArticleByContentContainsIgnoreCaseOrTitleContainsIgnoreCaseOrderByIdDesc(String content, String title);
}
