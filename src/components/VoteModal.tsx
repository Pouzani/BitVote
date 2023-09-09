import {
	Card,
	FormControl,
	FormHelperText,
	FormLabel,
	IconButton,
	Input,
	Typography,
} from "@mui/joy";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { Coin } from "../model/coin";
import { useState } from "react";

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
	error,
	errorPlaceholder,
	errorValue,
	closeModal,
}: VoteModalProps) => {
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
					/>
					<IconButton variant="outlined">
						<KeyboardArrowUpIcon />
					</IconButton>
					<IconButton variant="outlined">
						<KeyboardArrowDownIcon />
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
