package com.bitvote.project.forum.Mapper;

import com.bitvote.project.forum.Article;
import com.bitvote.project.forum.ArticleResponse;

public class ArticleToArticleResponse {

    public static ArticleResponse mapToArticleResponse(Article article){
        return new ArticleResponse(article.getId(), article.getTitle(), article.getContent(), article.getUser().getUsername());
    }
}
