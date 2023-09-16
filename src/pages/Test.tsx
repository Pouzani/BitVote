import { useParams } from "react-router-dom";
import { getVotes } from "../api/voteService";
import useGetVotes from "../hooks/useGetVotes";
import { Votes } from "../model/vote";
import CoinCard from "../components/CoinCard";

const Test = () => {
	let { coinId } = useParams();
	if (coinId === undefined) {
		coinId = "";
	}
	const { votes, coin, loading, error } = useGetVotes(coinId);
	console.log(coin);
	return (
		<div className="flex flex-col items-center justify-center w-full">
			<CoinCard vote={votes} coin={coin} />
		</div>
	);
};

export default Test;
