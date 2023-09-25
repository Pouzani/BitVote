package com.bitvote.project.vote;

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

    @PostMapping(path = "")
    public Vote addVote(@RequestBody VoteRequest voteRequest) {
        return voteService.addVote(voteRequest.coinId(), voteRequest.voteType(), voteRequest.votePercentage());
    }
}
