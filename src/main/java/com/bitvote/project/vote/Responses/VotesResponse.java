package com.bitvote.project.vote.Responses;

import com.bitvote.project.vote.Vote;
import com.bitvote.project.vote.VoteEnum;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class VotesResponse{
    private List<Vote> votes;
    private Long upVotes;
    private Long downVotes;
    private Integer totalVotes;

}
