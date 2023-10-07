import { useCallback, useEffect, useState } from "react";
import { getAllCoins } from "../api/coinService";
import { Coin } from "../model/coin";

/**
 * The function `useGetCoins` is a custom hook in TypeScript that fetches a list of coins, handles
 * loading and error states, and returns the coins, loading state, and error state.
 * @param {number} page - The page parameter represents the page number of the data you want to fetch.
 * It is used to determine which page of data to retrieve.
 * @param {number} size - The size parameter represents the number of coins to fetch per page. It
 * determines the number of coins that will be returned in each API call.
 * @returns an object with three properties: "coins", "loading", and "error".
 */
function useGetCoins(page:number,size:number){
    const [coins, setCoins] = useState<Coin[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const coins: Coin[] = await getAllCoins(page, size);
			//set timeout to simulate loading
			setCoins(coins);
			setLoading(false);
			// Handle the data or update state as needed
		} catch (error) {
			console.error(error);
            setError(true);
			// Handle errors as needed
		}
	}, [page, size]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);
    
    return {coins,loading,error};
}

export default useGetCoins;