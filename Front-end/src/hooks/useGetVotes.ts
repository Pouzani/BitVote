import { useCallback, useEffect, useState } from "react";
import { Votes } from "../model/vote";
import { getVotesByCoin } from "../api/voteService";
import { CoinDetail } from "../model/coin";
import { getCoinById, getCoinMarketData } from "../api/coinService";
import exempleMarketData from "../mock/market_data.json";

/**
 * The function `useGetVotes` is a custom hook in TypeScript that fetches votes, coin details, and
 * market data for a given coin ID and number of days, and returns the fetched data along with loading
 * and error states.
 * @param {string} coinId - The coinId parameter is a string that represents the unique identifier of a
 * cryptocurrency coin. It is used to fetch data related to a specific coin, such as votes, market
 * data, and other details.
 * @param {number} days - The "days" parameter is the number of days for which you want to retrieve
 * market data for a specific coin.
 * @returns The function `useGetVotes` returns an object with the following properties:
 */
function useGetVotes(coinId: string, days: number) {
	const [votes, setVotes] = useState<Votes>({
		votes: [],
		upVotes: 0,
		downVotes: 0,
		totalVotes: 0,
		upVotesPercentageAvg: 0,
		downVotesPercentageAvg: 0,
	});

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [marketData, setMarketData] = useState<typeof exempleMarketData>({
		prices: [],
		market_caps: [],
		total_volumes: [],
	});
	const [coin, setCoin] = useState<CoinDetail>({
		id: "",
		symbol: "",
		name: "",
		image: {
			thumb: "",
			small: "",
			large: "",
		},
		market_data: {
			current_price: {
				usd: 0,
			},
			market_cap: {
				usd: 0,
			},
			market_cap_rank: 0,
			high_24h: {
				usd: 0,
			},
			low_24h: {
				usd: 0,
			},
			price_change_percentage_24h: 0,
			market_cap_change_percentage_24h: 0,
			market_cap_change_24h: 0,
			total_volume: {
				usd: 0,
			},
		},
	});

	const getVotes = useCallback(async () => {
		try {
			const votes = await getVotesByCoin(coinId);
			setVotes(votes);
		} catch (error) {
			setError(true);
		}
	}, [coinId]);

	const getCoin = useCallback(async () => {
		try {
			setLoading(true);
			const coin = await getCoinById(coinId);
			setCoin(coin);
			setLoading(false);
		} catch (error) {
			setError(true);
		}
	}, [coinId]);

	const getMarketData = useCallback(async () => {
		try {
			setLoading(true);
			const marketData = await getCoinMarketData(coinId,days);
			setMarketData(marketData);
			setLoading(false);
		} catch (error) {
			setError(true);
		}
	}, [coinId, days]);

	useEffect(() => {
		getVotes();
		getCoin();
		getMarketData();
	}, [getVotes, getCoin, getMarketData]);

	return { votes, coin, marketData, loading, error };
}

export default useGetVotes;
