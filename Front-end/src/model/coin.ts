export interface Coin {
	id: string;
	symbol: string;
	name: string;
	image: string;
	current_price: number;
	market_cap: number;
	market_cap_rank: number;
	high_24h: number;
	low_24h: number;
	price_change_percentage_24h: number;
	market_cap_change_percentage_24h: number;
	market_cap_change_24h: number;
	total_volume: number;
}

export interface CoinDetail {
	id: string;
	symbol: string;
	name: string;
	image: {
		thumb: string;
		small: string;
		large: string;
	};
	market_data: {
		current_price: {
			usd: number;
		};
		market_cap: {
			usd: number;
		};
		market_cap_rank: number;
		high_24h: {
			usd: number;
		};
		low_24h: {
			usd: number;
		};
		price_change_percentage_24h: number;
		market_cap_change_percentage_24h: number;
		market_cap_change_24h: number;
		total_volume: {
			usd: number;
		};
	};
}
