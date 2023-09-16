
import useGetVotes from "../hooks/useGetVotes";
import CoinCard from "../components/CoinCard";
import { useParams } from "react-router-dom";

const Detail = () => {
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

export default Detail;