package com.bitvote.project.vote;

public record VoteRequest(String coinId, VoteEnum voteType, Double votePercentage) {
}
