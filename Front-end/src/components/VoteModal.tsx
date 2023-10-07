import {
	Card,
	FormControl,
	FormHelperText,
	IconButton,
	Input,
} from "@mui/joy";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { Coin } from "../model/coin";
import { useState } from "react";
import { submitVote } from "../api/voteService";
import { Vote, VoteEnum } from "../model/vote";

type VoteModalProps = {
	coin: Coin;
	error: boolean;
	errorPlaceholder: string;
	errorValue: string;
	hidden: boolean;
	closeModal: ()=>void
};

const VoteModal = ({
	coin,
	errorPlaceholder,
	closeModal,
}: VoteModalProps) => {
	const [votePercentage, setVotePercentage] = useState<number>(0);
	const [error, setError] = useState<boolean>(false);

	const handleVote = async (voteType:VoteEnum) => {
		console.log(votePercentage);
		const vote:Vote={coinId:coin.id, votePercentage, voteType};
		try{
			const response = await submitVote(vote);
			console.log(response)
			closeModal();
		}catch(e){
			console.log(e)
			setError(true);
		}
	}

	return (
		<Card
			sx={{
				width: 400,
				position: "absolute",
				backgroundColor: "white",
			}}
			variant="outlined"
		>
			<FormControl error={error}>
				<div className="flex items-center justify-between py-1">
					<h3>Vote</h3>
					<IconButton onClick={()=>{closeModal()}}>
						<CloseIcon fontSize="small" />
					</IconButton>
				</div>
				<div className="flex items-center gap-3">
					<Input
						size="md"
						placeholder="Enter vote percentage..."
						variant="outlined"
						type="number"
						error={error}
						defaultValue={errorPlaceholder}
						endDecorator="%"
						sx={{
							"--Input-focusedThickness": "-1px",
						}}
						fullWidth
						onChange={(e) => {setVotePercentage(Number(e.target.value))}}
					/>
					<IconButton variant="outlined" onClick={()=>handleVote(VoteEnum.UP)}>
						<KeyboardArrowUpIcon />
					</IconButton>
					<IconButton variant="outlined">
						<KeyboardArrowDownIcon onClick={()=>handleVote(VoteEnum.DOWN)}/>
					</IconButton>
				</div>
				<FormHelperText>
					This vote percentage is optional.
				</FormHelperText>
			</FormControl>
		</Card>
	);
};

export default VoteModal;
