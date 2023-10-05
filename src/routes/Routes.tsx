import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Test from "../pages/Test";
import Root from "./root";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import { useAuth } from "../auth/AuthProvider";


const Routes = () => {

	const routesForPublic = [
		{
			path: "/",
			element: <Root />,
			children: [
				{ path: "/", element: <Home /> },
				{ path: "/test", element: <Test /> },
				{ path: "/detail/:coinId", element: <Detail /> },
			],
		},
        {
            path: "/login",
            element: <Login />,
        }
	];

	const routesForPrivate = [];

	const router = createBrowserRouter([
		...routesForPublic,
		...routesForPrivate
	]);

	return <RouterProvider router={router} />;
};

export default Routes;
