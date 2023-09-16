import { Button, Table } from "@mui/joy";
import { useState } from "react";
import { Coin } from "../model/coin";
import TableLoader from "../components/TableLoader";
import Pagination from "../components/Pagination";
import VoteModal from "../components/VoteModal";
import useGetCoins from "../hooks/useGetCoins";
import { Link, redirect } from "react-router-dom";

const Home = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [rowHoverd, setRowHoverd] = useState<number>(-1);

	const { coins, loading, error } = useGetCoins(currentPage, 12);

	const onPageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="flex flex-col gap-3 items-center w-full">
			<div className="w-2/3">
				<Table
					sx={{
						"--TableCell-height": "4rem",
						backgroundColor: "transparent",
						"& thead th:nth-child(2)": { width: "40%" },
						"& tr > *:not(:nth-child(1)):not(:nth-child(2))": {
							textAlign: "right",
						},
						"& thead th:nth-child(7)": { textAlign: "center" },
						width: "100%",
					}}
				>
					<thead>
						<tr>
							<th className="hidden lg:table-cell">#</th>
							<th>Name</th>
							<th>Price</th>
							<th>24h%</th>
							<th className="hidden lg:table-cell">Marketcap</th>
							<th className="hidden lg:table-cell">Volume</th>
							<th>Vote</th>
						</tr>
					</thead>
					<tbody>
						{!loading ? (
							coins.map((coin, index) => (
								<tr
									key={index}
									className="cursor-pointer"
									onMouseEnter={() => setRowHoverd(index)}
									onMouseLeave={() => setRowHoverd(-1)}
								>
									<td className="hidden lg:table-cell">
										{coin.market_cap_rank}
									</td>
									<td>
										<Link to={`detail/${coin.id}`}>
											<div className="flex items-center gap-2">
												<img
													src={coin.image}
													className="w-8"
												/>
												<span
													className={
														rowHoverd === index
															? "underline"
															: ""
													}
												>
													{coin.name}
												</span>
											</div>
										</Link>
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
									<td className="hidden lg:table-cell">
										{coin.market_cap}
									</td>
									<td className="hidden lg:table-cell">
										{coin.total_volume}
									</td>
									<td>
										{!coin.voted ? (
											<VoteButton coin={coin} />
										) : (
											"Already voted"
										)}
									</td>
								</tr>
							))
						) : (
							<TableLoader />
						)}
					</tbody>
				</Table>
			</div>
			<Pagination totalPages={250} onPageChange={onPageChange} />
		</div>
	);
};

export const VoteButton = ({ coin }: { coin: Coin }) => {
	const [hidden, setHidden] = useState<boolean>(true);
	const showModal = () => {
		hidden ? setHidden(false) : setHidden(true);
		console.log(hidden);
	};
	return (
		<>
			<div className="z-[-1]">
				<Button
					variant="outlined"
					color="neutral"
					onClick={() => showModal()}
				>
					Vote
				</Button>
			</div>
			<div className="z-10 relative right-32">
				{!hidden ? (
					<VoteModal
						closeModal={() => {
							setHidden(true);
						}}
						coin={coin}
					/>
				) : null}
			</div>
		</>
	);
};

export default Home;
