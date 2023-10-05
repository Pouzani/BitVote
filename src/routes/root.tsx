import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Root = () => {
	return (
		<div className="flex w-full">
			<Header />
			<Sidebar />
            <Outlet />
		</div>
	);
};

export default Root;
