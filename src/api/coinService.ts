
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
