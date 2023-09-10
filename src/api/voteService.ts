import axios from "./axios";
import { Vote } from "../model/vote";


export async function submitVote(vote:Vote) {
    console.log(vote)
    try {
        const response = await axios.post(`/votes`,vote);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}