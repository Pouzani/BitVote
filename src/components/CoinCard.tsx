import { Card, Typography } from "@mui/joy";
import { CoinDetail } from "../model/coin";
import { Votes } from "../model/vote";
import { ArrowDown, ArrowUp } from "react-feather";

interface CoinCardProps {
	coin: CoinDetail;
	vote: Votes;
}

const CoinCard = ({ coin, vote }: CoinCardProps) => {
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

export default CoinCard;
