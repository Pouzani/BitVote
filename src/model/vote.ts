export interface Vote{
    coinId : string;
    voteType : VoteEnum;
    votePercentage : number;
}

export const enum VoteEnum{
    UP,
    DOWN
}

export interface Votes{
    votes: Vote[];
    upVotes: number;
    downVotes: number;
    totalVotes: number;
}