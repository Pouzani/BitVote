package com.bitvote.project.vote.Mapper;

import com.bitvote.project.vote.VotesResponse;
import com.bitvote.project.vote.Vote;
import com.bitvote.project.vote.VoteEnum;

import java.util.List;

public class VotesMapper {
    public static VotesResponse mapToVotesResponse(List<Vote> votes){
        Long upVotes = votes.stream().filter(vote -> vote.getVoteType().equals(VoteEnum.UP)).count();
        Long downVotes = votes.stream().filter(vote -> vote.getVoteType().equals(VoteEnum.DOWN)).count();
        Double upVotesPercentageAvg = votes.stream().filter(vote -> vote.getVoteType().equals(VoteEnum.UP)).mapToDouble(Vote::getVotePercentage).average().orElse(0);
        Double downVotesPercentageAvg = votes.stream().filter(vote -> vote.getVoteType().equals(VoteEnum.DOWN)).mapToDouble(Vote::getVotePercentage).average().orElse(0);
        return new VotesResponse(votes, upVotes, downVotes, upVotesPercentageAvg, downVotesPercentageAvg, upVotes.intValue() + downVotes.intValue());
    }
}
