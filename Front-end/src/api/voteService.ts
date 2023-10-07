import axios from "./axios";
import { Vote } from "../model/vote";


/**
 * The function `submitVote` is an asynchronous function that sends a POST request to `/votes` with the
 * provided `vote` data and returns the response data.
 * @param {Vote} vote - The parameter `vote` is of type `Vote`. It represents the vote that will be
 * submitted.
 * @returns the data from the response of the axios post request.
 */
export async function submitVote(vote:Vote) {
    try {
        const response = await axios.post(`/votes`,vote);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}

/**
 * The function `getVotesByCoin` is an asynchronous function that makes a GET request to retrieve votes
 * for a specific coin and returns the response data.
 * @param {string} coinId - The `coinId` parameter is a string that represents the ID of a coin. It is
 * used to fetch the votes for a specific coin.
 * @returns the data received from the API call.
 */
export async function getVotesByCoin(coinId:string) {
    try{
        const response = await axios.get(`/votes/${coinId}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}