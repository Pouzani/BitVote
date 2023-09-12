import axios from "./axios";
import { Vote } from "../model/vote";


export async function submitVote(vote:Vote) {
    try {
        const response = await axios.post(`/votes`,vote);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}

export async function getVotes(coinId:string) {
    try{
        const response = await axios.get(`/votes/${coinId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}