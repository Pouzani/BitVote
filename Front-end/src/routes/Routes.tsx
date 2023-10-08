import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Test from "../pages/Test";
import Root from "./root";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import { useAuth } from "../auth/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Logout from "../pages/Logout";
import Signup from "../pages/Signup";
import Account from "../pages/Account";


/* The `Routes` component is responsible for defining the routes of the application using the
`react-router-dom` library. */
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
        },
		{
			path: "/signup",
			element: <Signup />,
		}
	];

	const routesForPrivate = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                { path: "/logout", element: <Logout /> },
				{ path: "/account", element: <Account />}
            ],
        }
    ];

	const router = createBrowserRouter([
		...routesForPublic,
		...routesForPrivate
	]);

	return <RouterProvider router={router} />;
};

export default Routes;
