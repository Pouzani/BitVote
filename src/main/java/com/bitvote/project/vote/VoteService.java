package com.bitvote.project.vote;

import com.bitvote.project.vote.Mapper.VotesMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoteService {

    private final VoteRepository voteRepository;

    public VoteService(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }

    public Vote addVote(String coinId, VoteEnum voteType, Double votePercentage) {
        return voteRepository.save(Vote.builder()
                .coinId(coinId)
                .voteType(voteType)
                .votePercentage(votePercentage)
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
