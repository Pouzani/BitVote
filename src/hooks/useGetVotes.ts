import { useCallback, useEffect, useState } from "react";
import { Votes } from "../model/vote";
import { getVotesByCoin } from "../api/voteService";
import { Coin } from "../model/coin";

function useGetVotes(coinId: string) {
	const [votes, setVotes] = useState<Votes>({
		votes: [],
		upVotes: 0,
		downVotes: 0,
		totlaVotes: 0,
	});

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [coin, setCoin] = useState<Coin>({
		id: "",
		symbol: "",
		name: "",
		image: "",
		current_price: 0,
		market_cap: 0,
		market_cap_rank: 0,
		high_24h: 0,
		low_24h: 0,
		price_change_percentage_24h: 0,
		market_cap_change_percentage_24h: 0,
		market_cap_change_24h: 0,
		total_volume: 0,
		voted: false
	});
	const getVotes = useCallback(async () => {
		setLoading(true);
		try {
			const votes = await getVotesByCoin(coinId);
			setVotes(votes);
		} catch (error) {
			setError(true);
		}
		setLoading(false);
	}, [coinId]);

	const getCoin = useCallback(async () => {
		setLoading(true);
		try {
			const coin = await getVotesByCoin(coinId);
			setCoin(coin);
		}
		catch (error) {
			setError(true);
		}
		setLoading(false);
	}, [coinId]);

	useEffect(() => {
		getVotes();
		getCoin();
	}, [getVotes, getCoin]);

	return { votes, coin, loading, error };
}

export default useGetVotes;

