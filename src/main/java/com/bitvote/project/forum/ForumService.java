package com.bitvote.project.forum;

import com.bitvote.project.exceptions.UserNotFoundException;
import com.bitvote.project.forum.Mapper.ArticleToArticleResponse;
import com.bitvote.project.user.User;
import com.bitvote.project.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ForumService {
    private final ForumRepository forumRepository;

    public ArticleResponse createArticle(ArticleRequest articleRequest, User user){
        Article article = Article.builder().title(articleRequest.title()).content(articleRequest.content()).user(user).build();
        return ArticleToArticleResponse.mapToArticleResponse(forumRepository.save(article));
    }

    public ArticleResponse updateArticle(ArticleRequest articleRequest, User user, Long id){
        Article articleToUpdate = forumRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));
        articleToUpdate.setTitle(articleRequest.title());
        articleToUpdate.setContent(articleRequest.content());
        return ArticleToArticleResponse.mapToArticleResponse(forumRepository.save(articleToUpdate));
    }

    public void deleteArticle(Long id){
        forumRepository.deleteById(id);
    }

    public ArticleResponse getArticleById(Long id){
        return ArticleToArticleResponse.mapToArticleResponse(forumRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found")));
    }

    public List<ArticleResponse> getAllArticles(){
        return forumRepository.findAll().stream().map(ArticleToArticleResponse::mapToArticleResponse).toList();
    }

    public List<ArticleResponse> searchArticles(String query){
        System.out.println(query);
        return forumRepository.searchArticleByContentContainsIgnoreCaseOrTitleContainsIgnoreCaseOrderByIdDesc(query, query).orElse(new ArrayList<>()).stream().map(ArticleToArticleResponse::mapToArticleResponse).toList();
    }
}
