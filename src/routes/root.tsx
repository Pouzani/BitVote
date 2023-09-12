import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const root = () => {
	return (
		<div className="flex w-full">
			<Header />
			<Sidebar />
            <Outlet />
		</div>
	);
};

export default root;
