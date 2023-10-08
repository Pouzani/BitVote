import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import IconButton from "@mui/joy/IconButton";
import Sheet from "@mui/joy/Sheet";
import {
	AlertCircle,
	ArrowLeft,
	Home,
	LogIn,
	Settings,
	Users,
} from "react-feather";
// import MuiLogo from './MuiLogo';
import { openSidebar, closeSidebar, Selected } from "../utils/navbarUtils";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../auth/AuthProvider";
import { useGetCurrent } from "../hooks/useAuth";
import { Login } from "@mui/icons-material";
// import ColorSchemeToggle from './ColorSchemeToggle';

export default function Sidebar() {
	const [selected, setSelected] = React.useState(Selected.HOME);
	const { accessToken } = useAuth();
	const { loading, error, currentUser } = useGetCurrent();

	return (
		<Sheet
			className="FirstSidebar"
			color="primary"
			invertedColors
			sx={{
				position: {
					xs: "fixed",
					md: "sticky",
				},
				transform: {
					xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
					md: "none",
				},
				transition: "transform 0.4s",
				zIndex: 10000,
				height: "100dvh",
				width: "var(--FirstSidebar-width)",
				top: 0,
				p: 1.5,
				py: 2,
				flexShrink: 0,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 2,
				borderRight: "1px solid",
				borderColor: "divider",
			}}
		>
			<GlobalStyles
				styles={{
					":root": {
						"--FirstSidebar-width": "68px",
					},
				}}
			/>
			<IconButton
				variant="soft"
				color="neutral"
				onClick={() => closeSidebar()}
				sx={{ display: { md: "none" }, mt: -2, borderRadius: "50%" }}
			>
				<ArrowLeft />
			</IconButton>
			<Logo />
			<List sx={{ "--ListItem-radius": "8px", "--List-gap": "12px" }}>
				<ListItem>
					<Link to={"/"}>
						<ListItemButton
							selected={selected === Selected.HOME}
							onClick={() => {
								openSidebar();
								setSelected(Selected.HOME);
							}}
						>
							<Home />
						</ListItemButton>
					</Link>
				</ListItem>
				<ListItem>
					<Link to={"/about"}>
						<ListItemButton
							selected={selected === Selected.ABOUT}
							onClick={() => {
								openSidebar();
								setSelected(Selected.ABOUT);
							}}
						>
							<AlertCircle />
						</ListItemButton>
					</Link>
				</ListItem>
				<ListItem>
					<Link to={"/forum"}>
						<ListItemButton
							selected={selected === Selected.FORUM}
							onClick={() => {
								openSidebar();
								setSelected(Selected.FORUM);
							}}
						>
							<Users />
						</ListItemButton>
					</Link>
				</ListItem>
			</List>
			<List
				sx={{
					mt: "auto",
					flexGrow: 0,
					"--ListItem-radius": "8px",
					"--List-gap": "8px",
				}}
			>
				{/* <ColorSchemeToggle sx={{ display: { xs: 'none', md: 'inline-flex' } }} /> */}
				<ListItem>
					<Link to={"/account"}>
						<ListItemButton
							selected={selected === Selected.ACCOUNT}
							onClick={() => setSelected(Selected.ACCOUNT)}
						>
							<Settings />
						</ListItemButton>
					</Link>
				</ListItem>
			</List>
			{accessToken ? (
						<Link to={"/logout"}>
							<Avatar
								variant="outlined"
								src={currentUser?.imageUrl}
							/>
						</Link>
					) : (
						<Link to={"/login"}>
							<ListItemButton>
								<LogIn />
							</ListItemButton>
						</Link>
					)}
		</Sheet>
	);
}
