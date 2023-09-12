import { useCallback, useEffect, useState } from "react";
import { getAllCoins } from "../api/coinService";
import { Coin } from "../model/coin";

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