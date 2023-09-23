import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import exempleMarketData from "../mock/market_data.json";

ChartJS.register(...registerables);

interface CoinChartProps {
	coinData: typeof exempleMarketData;
}

const CoinChart = ({ coinData }: CoinChartProps) => {
	const days: number[] = [];
	for (let i = 0; i < 31; i++) {
		days.push(i);
	}
	const data = {
		labels: days,
		datasets: [
			{
				label: "",
				data: coinData.prices.map((price) => price[1]),
				fill: true,
				backgroundColor: "rgb(137, 198, 255, 0.3)",
				borderColor: "#0080FE",
				spanGaps: true
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				grid: {
					display: false,
				},
			},
		},
	};

	return (
        <div className="w-[60%] max-h-max">
			<Line data={data} options={options} />
        </div>
	);
};

export default CoinChart;
