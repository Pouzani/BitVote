import axios from "./axios";

export async function getAllCoins(page: number, size: number) {
	try {
		const response = await axios.get("/coins", {
			params: {
				per_page: size,
				page: page,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getCoinById(id: string) {
	try {
		const response = await axios.get(`/coins/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getCoinMarketData(id: string, days: number) {
	try {
		const response = await axios.get(`/coins/${id}/market_chart`, {
			params: {
				days:days,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
