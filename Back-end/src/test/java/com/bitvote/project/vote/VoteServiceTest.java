package com.bitvote.project.vote;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class VoteServiceTest {

    @Mock
    private VoteRepository voteRepository;

    private VoteService voteService;

    @BeforeEach
    void setUp() {
        this.voteService = new VoteService(voteRepository);
    }

    @Test
    void addVote() {
        //given
        Vote vote = new Vote(null, "bitcoin", VoteEnum.UP, 0.0);
        //when
        voteService.addVote(vote.getCoinId(), vote.getVoteType(), vote.getVotePercentage());
        //then
        ArgumentCaptor<Vote> voteArgumentCaptor = ArgumentCaptor.forClass(Vote.class);

        verify(voteRepository).save(voteArgumentCaptor.capture());

        Vote result = voteArgumentCaptor.getValue();

        assertEquals(vote,result);

    }

    @Test
    void removeVote() {
        //given
        Long voteId = 1L;
        //when
        voteService.removeVote(voteId);
        //then
        ArgumentCaptor<Long> voteArgumentCaptor = ArgumentCaptor.forClass(Long.class);

        verify(voteRepository).deleteById(voteArgumentCaptor.capture());

        Long result = voteArgumentCaptor.getValue();

        assertEquals(voteId,result);
    }

    @Test
    void getAllVotes() {
        //when
        voteService.getAllVotes();
        //then
        verify(voteRepository).findAll();
    }

    @Test
    void getVotesByCoinId() {
        //given
        String coinId = "bitcoin";
        //when
        voteService.getVotesByCoinId(coinId);
        //then
        ArgumentCaptor<String> voteArgumentCaptor = ArgumentCaptor.forClass(String.class);

        verify(voteRepository).findByCoinId(voteArgumentCaptor.capture());

        String result = voteArgumentCaptor.getValue();

        assertEquals(coinId,result);
    }
}