package com.bitvote.project.vote;

import com.bitvote.project.vote.Mapper.VotesMapper;
import com.bitvote.project.vote.Responses.VotesResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoteService {

    private final VoteRepository voteRepository;

    public VoteService(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }

    public void addVote(String coinId, VoteEnum voteType) {
        voteRepository.save(Vote.builder()
                .coinId(coinId)
                .voteType(voteType)
                .build());
    }

    public void removeVote(Long voteId) {
        voteRepository.deleteById(voteId);
    }

    public List<Vote> getAllVotes(){
        return voteRepository.findAll();
    }

    public VotesResponse getVotesByCoinId(String coinId){
        return VotesMapper.mapToVotesResponse(voteRepository.findByCoinId(coinId));
    }
}
