import { Button, ButtonGroup } from "@mui/joy";
import { useState } from "react";

type PaginationProps = {
	totalPages: number;
	onPageChange: (page: number) => void;
};

const Pagination = (props: PaginationProps) => {
	const { totalPages, onPageChange } = props;
	const [currentPage, setCurrentPage] = useState<number>(1);

	const numbersList: number[] = [];

	const goForward = () => {
		if (currentPage < totalPages) {
			const newCurrentPage = currentPage + 1;
			setCurrentPage(newCurrentPage);
			onPageChange(newCurrentPage);
			updateNumbersList(newCurrentPage);
		}
	};

	const goBack = () => {
		if (currentPage > 1) {
			const newCurrentPage = currentPage - 1;
			setCurrentPage(newCurrentPage);
			onPageChange(newCurrentPage);
			updateNumbersList(newCurrentPage);
		}
	};

	const goToFirstPage = () => {
		if (currentPage !== 1) {
			setCurrentPage(1);
			updateNumbersList(1);
			onPageChange(1);
		}
	};

	const goToLastPage = () => {
		if (currentPage !== totalPages) {
			setCurrentPage(totalPages);
			updateNumbersList(totalPages);
			onPageChange(totalPages);
		}
	};

	const updateNumbersList = (newCurrentPage: number) => {
		// Calculate a new set of page numbers to display
		let start = Math.max(1, newCurrentPage - 3);
		const end = Math.min(totalPages, start + 6);

		numbersList.length = 0; // Clear the array

		// Ensure there are exactly 7 page numbers in the list
		while (numbersList.length < 7 && start <= end) {
			numbersList.push(start);
			start++;
		}
	};

	// Initial update of the numbersList
	updateNumbersList(currentPage);

	return (
		<>
			<div className="block md:hidden">
				<ButtonGroup size="sm">
					<Button
						onClick={goToFirstPage}
						disabled={currentPage === 1}
					>
						&lt;&lt;
					</Button>
					<Button onClick={goBack} disabled={currentPage === 1}>
						&lt;
					</Button>
					{numbersList.map((number) => (
						<Button
							key={number}
							onClick={() => {
								onPageChange(number);
								setCurrentPage(number);
							}}
							className={number === currentPage ? "active" : ""}
							disabled={number === currentPage}
						>
							{number}
						</Button>
					))}
					<Button
						onClick={goForward}
						disabled={currentPage === totalPages}
					>
						&gt;
					</Button>
					<Button
						onClick={goToLastPage}
						disabled={currentPage === totalPages}
					>
						&gt;&gt;
					</Button>
				</ButtonGroup>
			</div>
			<div className="hidden md:block">
				<ButtonGroup size="md">
					<Button
						onClick={goToFirstPage}
						disabled={currentPage === 1}
					>
						&lt;&lt;
					</Button>
					<Button onClick={goBack} disabled={currentPage === 1}>
						&lt;
					</Button>
					{numbersList.map((number) => (
						<Button
							key={number}
							onClick={() => {
								onPageChange(number);
								setCurrentPage(number);
							}}
							className={number === currentPage ? "active" : ""}
							disabled={number === currentPage}
						>
							{number}
						</Button>
					))}
					<Button
						onClick={goForward}
						disabled={currentPage === totalPages}
					>
						&gt;
					</Button>
					<Button
						onClick={goToLastPage}
						disabled={currentPage === totalPages}
					>
						&gt;&gt;
					</Button>
				</ButtonGroup>
			</div>
		</>
	);
};

export default Pagination;
