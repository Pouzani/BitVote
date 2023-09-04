import { Table } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";
import { getAllCoins } from "../api/coinService";
import { Coin } from "../model/coin";
import TableLoader from "../components/TableLoader";
import Pagination from "../components/Pagination";

const Home = () => {
	const [coins, setCoins] = useState<Coin[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const onPageChange = (page: number) => {
		setCurrentPage(page);
		console.log(page);
	};
	const fetchData = useCallback(async () => {
		try {
			setIsLoading(true);
			const coins: Coin[] = await getAllCoins(currentPage, 7);
            //set timeout to simulate loading
			setCoins(coins);
			setIsLoading(false);
			// Handle the data or update state as needed
		} catch (error) {
			console.error(error);
			// Handle errors as needed
		}
	},[currentPage]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);
	return (
		<div className="flex flex-col gap-3 items-center justify-center">
			<div className="w-2/3">
				<Table sx={{ "--TableCell-height": "4rem" }}>
					<thead>
						<tr>
							<th className="hidden lg:table-cell">#</th>
							<th>Name</th>
							<th>Price</th>
							<th>24h%</th>
							<th className="hidden lg:table-cell">Marketcap</th>
							<th className="hidden lg:table-cell">Volume</th>
						</tr>
					</thead>
					<tbody>
						{!isLoading ? coins.map((coin, index) => (
							<tr key={index} className="">
								<td className="hidden lg:table-cell">{coin.market_cap_rank}</td>
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
								<td className="hidden lg:table-cell">{coin.market_cap}</td>
								<td className="hidden lg:table-cell">{coin.total_volume}</td>
							</tr>
						)): <TableLoader />}
					</tbody>
				</Table>
			</div>
			<Pagination totalPages={7} currentPage={currentPage} onPageChange={onPageChange} />
		</div>
	);
};

export default Home;
