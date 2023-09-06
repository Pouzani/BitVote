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
};

const VoteModal = ({
	coin,
	error,
	errorPlaceholder,
	errorValue,
}: VoteModalProps) => {
    const [closed, setClosed] = useState<boolean>(false)
    const closeModal= ()=>{
        setClosed(true)
    }
	return (
        !closed?
		<Card
			sx={{
				width: 400,
				position: "absolute",
			}}
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
		</Card>:null
	);
};

export default VoteModal;
