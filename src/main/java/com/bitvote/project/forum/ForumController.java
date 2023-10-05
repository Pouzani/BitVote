package com.bitvote.project.forum;

import com.bitvote.project.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/forum")
@RequiredArgsConstructor
public class ForumController {
    private final ForumService forumService;

    @GetMapping("")
    public List<ArticleResponse> getAllArticles(){
        return forumService.getAllArticles();
    }

    @GetMapping("/{id}")
    public ArticleResponse getArticleById(@PathVariable Long id){
        return forumService.getArticleById(id);
    }

    @GetMapping("/search")
    public List<ArticleResponse> searchArticles(@RequestParam String query){
        return forumService.searchArticles(query);
    }

    @PostMapping("")
    public ArticleResponse createArticle(@RequestBody ArticleRequest article , @AuthenticationPrincipal User user){
        return forumService.createArticle(article, user);
    }

    @PutMapping("/{id}")
    public ArticleResponse updateArticle(@RequestBody ArticleRequest article, @AuthenticationPrincipal User user, @PathVariable Long id){
        return forumService.updateArticle(article, user, id);
    }

    @DeleteMapping("/{id}")
    public void deleteArticle(@PathVariable Long id){
        forumService.deleteArticle(id);
    }

}
