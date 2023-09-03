import { Table } from "@mui/joy";
import { useEffect, useState } from "react";
import { getAllCoins } from "../api/coinService";
import { Coin } from "../model/coin";

const Home = () => {
	const [coins, setCoins] = useState<Coin[]>([]);
	const fetchData = async () => {
		try {
			const coins: Coin[] = await getAllCoins(1, 7);
			setCoins(coins);
			// Handle the data or update state as needed
		} catch (error) {
			console.error(error);
			// Handle errors as needed
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div>
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Price</th>
						<th>24h%</th>
						<th>Marketcap</th>
						<th>Volume</th>
					</tr>
				</thead>
				<tbody>
					{coins.map((coin, index) => (
						<tr key={index}>
							<td>{index+1}</td>
							<td>{coin.name}</td>
							<td>{coin.current_price}</td>
							<td>{coin.price_change_percentage_24h}</td>
                            <td>{coin.market_cap}</td>
                            <td>{coin.total_volume}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default Home;
