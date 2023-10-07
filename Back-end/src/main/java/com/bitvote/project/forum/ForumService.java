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

    /**
     * The createArticle function takes in an ArticleRequest object and a User object.
     * It then creates an Article object using the title and content from the request,
     * as well as the user that was passed in. The article is then saved to our database,
     * and returned to us as an ArticleResponse. This function is used by our controller class when we want to create a new article for a user.
     *
     * @param ArticleRequest articleRequest Get the title and content of the article
     * @param User user Associate the article with a user
     *
     * @return An articleresponse object
     *
     * @docauthor Trelent
     */
    public ArticleResponse createArticle(ArticleRequest articleRequest, User user){
        Article article = Article.builder().title(articleRequest.title()).content(articleRequest.content()).user(user).build();
        return ArticleToArticleResponse.mapToArticleResponse(forumRepository.save(article));
    }

    /**
     * The updateArticle function takes in an ArticleRequest object, a User object, and a Long id.
     * It then finds the article with the given id and sets its title to that of the ArticleRequest's title
     * and its content to that of the ArticleRequest's content. The updated article is then saved into our database
     * using our forumRepository save function. Finally, we return an ArticleResponse containing all information about this updated article.

     *
     * @param ArticleRequest articleRequest Get the title and content from the request body
     * @param User user Check if the user is authorized to update the article
     * @param Long id Find the article to update
     *
     * @return An articleresponse object
     *
     * @docauthor Trelent
     */
    public ArticleResponse updateArticle(ArticleRequest articleRequest, User user, Long id){
        Article articleToUpdate = forumRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));
        articleToUpdate.setTitle(articleRequest.title());
        articleToUpdate.setContent(articleRequest.content());
        return ArticleToArticleResponse.mapToArticleResponse(forumRepository.save(articleToUpdate));
    }

    /**
     * The deleteArticle function deletes an article from the database.
     *
     *
     * @param Long id Find the article to delete
     *
     * @return Void
     *
     * @docauthor Trelent
     */
    public void deleteArticle(Long id){
        forumRepository.deleteById(id);
    }

    /**
     * The getArticleById function is used to retrieve an article from the database by its id.
     *
     *
     * @param Long id Find the article by id
     *
     * @return An articleresponse
     *
     * @docauthor Trelent
     */
    public ArticleResponse getArticleById(Long id){
        return ArticleToArticleResponse.mapToArticleResponse(forumRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found")));
    }

    /**
     * The getAllArticles function returns a list of all articles in the database.
     *
     *
     *
     * @return A list of articleresponse objects
     *
     * @docauthor Trelent
     */
    public List<ArticleResponse> getAllArticles(){
        return forumRepository.findAll().stream().map(ArticleToArticleResponse::mapToArticleResponse).toList();
    }

    /**
     * The searchArticles function takes in a query string and returns a list of ArticleResponse objects.
     * The function uses the forumRepository to search for articles that contain the query string in either their title or content.
     * It then maps each article to an ArticleResponse object using the mapToArticleResponse function from ArticleToArticleResponse class, and returns them as a list.

     *
     * @param String query Search for the articles in the database
     *
     * @return A list of articleresponse objects
     *
     * @docauthor Trelent
     */
    public List<ArticleResponse> searchArticles(String query){
        return forumRepository.searchArticleByContentContainsIgnoreCaseOrTitleContainsIgnoreCaseOrderByIdDesc(query, query).orElse(new ArrayList<>()).stream().map(ArticleToArticleResponse::mapToArticleResponse).toList();
    }
}
