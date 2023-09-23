import useGetVotes from "../hooks/useGetVotes";
import CoinCard from "../components/CoinCard";
import { useParams } from "react-router-dom";
import CoinChart from "../components/CoinChart";
import exempleMarketData from "../mock/market_data.json";

const Detail = () => {
	let { coinId } = useParams();
	if (coinId === undefined) {
		coinId = "";
	}
	const { votes, coin, marketData, loading, error } = useGetVotes(coinId,30);
	console.log(coin);
	return (
		<div className="flex flex-col items-center justify-center w-full gap-10">
			<CoinCard vote={votes} coin={coin} loading={loading} />
			<CoinChart coinData={marketData} />
		</div>
	);
};

export default Detail;
