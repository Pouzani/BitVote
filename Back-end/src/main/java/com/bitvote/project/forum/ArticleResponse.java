package com.bitvote.project.forum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleResponse {

    private Long id;
    private String title;
    private String content;
    private String username;
}
