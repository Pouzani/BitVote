export interface Vote{
    coinId : string;
    voteType : VoteEnum;
    votePercentage : number;
}

export const enum VoteEnum{
    UP,
    DOWN
}