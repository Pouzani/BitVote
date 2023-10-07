package com.bitvote.project.vote.Mapper;

import com.bitvote.project.vote.VotesResponse;
import com.bitvote.project.vote.Vote;
import com.bitvote.project.vote.VoteEnum;

import java.util.List;

public class VotesMapper {
    /**
     * The mapToVotesResponse function takes a list of votes and returns a VotesResponse object.
     * The VotesResponse object contains the original list of votes, as well as some statistics about those votes:
     * - upVotes: the number of upvotes in the vote list
     * - downVotes: the number of downvotes in the vote list
     * - upVotePercentageAvg: average percentage value for all upvotes (e.g., if there are two 50% and one 100% vote, this would be 66%)
     * - downVotePercentageAvg: average percentage value for all downvotes (e.g., if
     *
     * @param List&lt;Vote&gt; votes Get the list of votes for a particular post
     *
     * @return A votesresponse object
     *
     * @docauthor Trelent
     */
    public static VotesResponse mapToVotesResponse(List<Vote> votes){
        Long upVotes = votes.stream().filter(vote -> vote.getVoteType().equals(VoteEnum.UP)).count();
        Long downVotes = votes.stream().filter(vote -> vote.getVoteType().equals(VoteEnum.DOWN)).count();
        Double upVotesPercentageAvg = votes.stream().filter(vote -> vote.getVoteType().equals(VoteEnum.UP)).mapToDouble(Vote::getVotePercentage).average().orElse(0);
        Double downVotesPercentageAvg = votes.stream().filter(vote -> vote.getVoteType().equals(VoteEnum.DOWN)).mapToDouble(Vote::getVotePercentage).average().orElse(0);
        return new VotesResponse(votes, upVotes, downVotes, upVotesPercentageAvg, downVotesPercentageAvg, upVotes.intValue() + downVotes.intValue());
    }
}
