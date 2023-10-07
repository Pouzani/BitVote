import { Card, Skeleton, Typography } from "@mui/joy";
import { CoinDetail } from "../model/coin";
import { Votes } from "../model/vote";
import { ArrowDown, ArrowUp } from "react-feather";

interface CoinCardProps {
	coin: CoinDetail;
	vote: Votes;
	loading: boolean;
}
import coinExemple from "../mock/bitcoin.json";

const CoinCard = ({ coin, vote, loading }: CoinCardProps) => {
	if (loading) {
		return <CardLoader />;
	}
	return (
		<Card sx={{ width: "80%", height: "max-content" }}>
			<div className="flex justify-between">
				<div className="flex flex-col">
					<div className="flex items-start gap-2">
						<img src={coin.image.small}></img>
						<div className="flex flex-col gap-4">
							<div className="flex flex-col">
								<div className="flex gap-2">
									<Typography level="h2">
										{coin.name}
									</Typography>
									<Typography level="h2" color="neutral">
										{coin.symbol.toUpperCase()}
									</Typography>
								</div>
								<div>
									<Typography level="h2">
										{coin.market_data.current_price.usd}{" "}
										<span className="text-neutral-500">
											$
										</span>
									</Typography>
								</div>
							</div>
							<div>
								<Typography level="body-lg" color="neutral">
									Market Cap
								</Typography>
								<Typography level="body-sm" color="neutral">
									{coin.market_data.market_cap.usd} $
								</Typography>
							</div>
							<div>
								<Typography level="body-lg" color="neutral">
									Market Cap Rank
								</Typography>
								<Typography level="body-sm" color="neutral">
									#{coin.market_data.market_cap_rank}
								</Typography>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<Typography level="h3">Votes</Typography>
					<div className="flex items-start gap-4">
						<div className="flex items-center">
							<Typography level="h2" textColor={"rgb(22 163 74)"}>
								{vote.upVotes}
							</Typography>
							<ArrowUp />
						</div>
						<div className="flex items-center">
							<Typography level="h2" textColor={"rgb(239 68 68)"}>
								{vote.downVotes}
							</Typography>
							<ArrowDown />
						</div>
					</div>
					<Typography level="h3">Total Votes</Typography>
					<div>
						<Typography level="h2">{vote.totalVotes}</Typography>
					</div>
					<Typography level="h3">Average vote %</Typography>
					<div className="flex items-start gap-4">
						<div className="flex items-center">
							<Typography level="h2" textColor={"rgb(22 163 74)"}>
								{vote.upVotesPercentageAvg}
							</Typography>
							<ArrowUp />
						</div>
						<div className="flex items-center">
							<Typography level="h2" textColor={"rgb(239 68 68)"}>
								{vote.downVotesPercentageAvg}
							</Typography>
							<ArrowDown />
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};


const CardLoader = () => {
	const vote = {
		votes: [],
		upVotes: 0,
		downVotes: 0,
		totalVotes: 0,
		upVotesPercentageAvg: 0,
		downVotesPercentageAvg: 0,
	};
	return (
		<Card sx={{ width: "80%", height: "max-content" }}>
			<div className="flex justify-between">
				<div className="flex flex-col">
					<div className="flex items-start gap-2">
						<Skeleton variant="circular" width={48} height={48} />
						<div className="flex flex-col gap-4">
							<div className="flex flex-col">
								<div className="flex gap-2">
									<Typography level="h2">
										<Skeleton>{coinExemple.name}</Skeleton>
									</Typography>
									<Typography level="h2" color="neutral">
										<Skeleton>
											{coinExemple.symbol.toUpperCase()}
										</Skeleton>
									</Typography>
								</div>
								<div>
									<Typography level="h2">
										<Skeleton>
											{coinExemple.market_data.current_price.usd}{" "}
											<span className="text-neutral-500">
												$
											</span>
										</Skeleton>
									</Typography>
								</div>
							</div>
							<div>
								<Typography level="body-lg" color="neutral">
									Market Cap
								</Typography>
								<Typography level="body-sm" color="neutral">
									<Skeleton>
										{coinExemple.market_data.market_cap.usd} $
									</Skeleton>
								</Typography>
							</div>
							<div>
								<Typography level="body-lg" color="neutral">
									Market Cap Rank
								</Typography>
								<Typography level="body-sm" color="neutral">
									<Skeleton>
										#{coinExemple.market_data.market_cap_rank}
									</Skeleton>
								</Typography>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<Typography level="h3">Votes</Typography>
					<div className="flex items-start gap-4">
						<div className="flex items-center">
							<Typography level="h2" textColor={"rgb(22 163 74)"}>
								<Skeleton>{vote.upVotes}</Skeleton>
							</Typography>
							<ArrowUp />
						</div>
						<div className="flex items-center">
							<Typography level="h2" textColor={"rgb(239 68 68)"}>
								<Skeleton>{vote.downVotes}</Skeleton>
							</Typography>
							<ArrowDown />
						</div>
					</div>
					<Typography level="h3">Total Votes</Typography>
					<div>
						<Typography level="h2">
							<Skeleton>{vote.totalVotes}</Skeleton>
						</Typography>
					</div>
					<Typography level="h3">Average vote %</Typography>
					<div className="flex items-start gap-4">
						<div className="flex items-center">
							<Typography level="h2" textColor={"rgb(22 163 74)"}>
								<Skeleton>{vote.upVotesPercentageAvg}</Skeleton>
							</Typography>
							<ArrowUp />
						</div>
						<div className="flex items-center">
							<Typography level="h2" textColor={"rgb(239 68 68)"}>
								<Skeleton>
									{vote.downVotesPercentageAvg}
								</Skeleton>
							</Typography>
							<ArrowDown />
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default CoinCard;
