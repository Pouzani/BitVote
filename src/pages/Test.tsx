import { useParams } from "react-router-dom";
import { getVotes } from "../api/voteService";
import useGetVotes from "../hooks/useGetVotes";
import { Votes } from "../model/vote";



const Test = () => {
  let { coinId } = useParams();
  if (coinId === undefined) {
    coinId = "";
  }
  const {votes, coin,loading,error} = useGetVotes(coinId);
	return <>{votes.upVotes}</>;
};

export default Test;
