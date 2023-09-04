import { Button, ButtonGroup } from "@mui/joy";

type PaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

const Pagination = (props:PaginationProps) => {
    const {totalPages, currentPage, onPageChange} = props;
    const numbersList = []
    for (let i = 1; i <= totalPages; i++) {
        numbersList.push(i);
    }
	return (
		<div>
			<ButtonGroup>
				{numbersList.map((number) => {
                    if (number === currentPage) {
                        return (
                            <Button key={number} disabled onClick={() => onPageChange(number)}>
                                {number}
                            </Button>
                        )
                    }
                    return <Button key={number} onClick={() => onPageChange(number)}>{number}</Button>;
                })}
			</ButtonGroup>
		</div>
	);
};

export default Pagination;
