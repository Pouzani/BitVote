import { Table } from "@mui/joy";
import { useEffect, useState } from "react";
import { getAllCoins } from "../api/coinService";
import { Coin } from "../model/coin";
import TableLoader from "../components/TableLoader";

const Home = () => {
	const [coins, setCoins] = useState<Coin[]>([]);
	const fetchData = async () => {
		try {
			const coins: Coin[] = await getAllCoins(1, 7);
            //set timeout to simulate loading
            setTimeout(() => {
                setCoins(coins);
            }, 3000);
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
		<div className="flex items-center justify-center">
			<div className="w-2/3">
				<Table sx={{ "--TableCell-height": "4rem" }}>
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
						{coins.length ? coins.map((coin, index) => (
							<tr key={index} className="">
								<td>{index + 1}</td>
								<td className="flex items-center gap-2">
									<img src={coin.image} className="w-8" />
									{coin.name}
								</td>
								<td>{coin.current_price}</td>
								{coin.price_change_percentage_24h >= 0 ? (
									<td className="text-green-600">
										{coin.price_change_percentage_24h}
									</td>
								) : (   
									<td className="text-red-500">
										{coin.price_change_percentage_24h}
									</td>
								)}
								<td>{coin.market_cap}</td>
								<td>{coin.total_volume}</td>
							</tr>
						)): <TableLoader />}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default Home;
