package com.bitvote.project.vote;

import com.bitvote.project.vote.Responses.VotesResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/votes")
public class VoteController {

    private final VoteService voteService;

    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @GetMapping(path = "{coinId}")
    public VotesResponse getVotes(@PathVariable("coinId") String coinId) {
        return voteService.getVotesByCoinId(coinId);
    }

    @PostMapping(path = "{coinId}/{voteType}")
    public void addVote(@PathVariable("coinId") String coinId,
                        @PathVariable("voteType") VoteEnum voteType) {
        voteService.addVote(coinId, voteType);
    }
}
