import ContentLoader from "react-content-loader";

const TableLoader = () => {
    const rows = [1,2,3,4,5,6,7,8,9,10,11,12]
	return (
        rows.map((index) => (
		<tr key={index}>
			<td>
				<NumberCellLoader />
			</td>
			<td>
				<NameCellLoader />
			</td>
			<td>
				<DefaultCellLoader />
			</td>
			<td>
				<DefaultCellLoader />
			</td>
			<td>
				<DefaultCellLoader />
			</td>
			<td>
				<DefaultCellLoader />
			</td>
		</tr>
	)));
};

const NameCellLoader: React.FC = () => (
	<ContentLoader
		speed={1}
		width={400}
		height={40}
		viewBox="0 0 400 40"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<rect x="52" y="18" rx="3" ry="3" width="52" height="6" />
		<circle cx="20" cy="20" r="20" />
	</ContentLoader>
);

const NumberCellLoader = () => (
	<ContentLoader
		speed={1}
		width={400}
		height={40}
		viewBox="0 0 400 40"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<rect x="0" y="18" rx="3" ry="3" width="10" height="6" />
	</ContentLoader>
);

const DefaultCellLoader = () => (
	<ContentLoader
		speed={1}
		width={400}
		height={40}
		viewBox="0 0 400 40"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<rect x="0" y="18" rx="3" ry="3" width="58" height="6" />
	</ContentLoader>
);

export default TableLoader;
