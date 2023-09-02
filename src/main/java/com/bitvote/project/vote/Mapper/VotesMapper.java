package com.bitvote.project.vote.Mapper;

import com.bitvote.project.vote.Responses.VotesResponse;
import com.bitvote.project.vote.Vote;
import com.bitvote.project.vote.VoteEnum;

import java.util.List;

public class VotesMapper {
    public static VotesResponse mapToVotesResponse(List<Vote> votes){
        Long upVotes = votes.stream().filter(vote -> vote.getVoteType().equals(VoteEnum.UP)).count();
        Long downVotes = votes.stream().filter(vote -> vote.getVoteType().equals(VoteEnum.DOWN)).count();
        return new VotesResponse(votes, upVotes, downVotes, upVotes.intValue() + downVotes.intValue());
    }
}
