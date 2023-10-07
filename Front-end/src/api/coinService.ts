import axios from "./axios";

/**
 * The function `getAllCoins` is an asynchronous function that makes a GET request to retrieve a list
 * of coins with pagination support.
 * @param {number} page - The page parameter is used to specify the page number of the results you want
 * to retrieve. It determines which page of data you want to fetch from the API.
 * @param {number} size - The `size` parameter represents the number of coins per page that you want to
 * retrieve. It determines the number of coins that will be displayed on each page of the API response.
 * @returns the data from the response of the axios GET request.
 */
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

/**
 * The function `getCoinById` is an asynchronous function that makes a GET request to retrieve data
 * about a specific coin by its ID.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a coin.
 * It is used to fetch the details of a specific coin from an API endpoint.
 * @returns the data from the API response.
 */
export async function getCoinById(id: string) {
	try {
		const response = await axios.get(`/coins/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

/**
 * The function `getCoinMarketData` is an asynchronous function that makes a GET request to retrieve
 * market chart data for a specific coin based on its ID and the number of days specified.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a coin
 * in the cryptocurrency market. It is used to specify which coin's market data you want to retrieve.
 * @param {number} days - The `days` parameter is the number of days of market data you want to
 * retrieve for a specific coin. It is used as a query parameter in the API request to specify the time
 * range of the market data.
 * @returns the data from the API response.
 */
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
