import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../api/authService";
import { Link as RouterLink } from "react-router-dom";

interface FormElements extends HTMLFormControlsCollection {
	email: HTMLInputElement;
	password: HTMLInputElement;
	persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

function ColorSchemeToggle({ onClick, ...props }: IconButtonProps) {
	const { mode, setMode } = useColorScheme();
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) {
		return (
			<IconButton size="sm" variant="outlined" color="neutral" disabled />
		);
	}
	return (
		<IconButton
			id="toggle-mode"
			size="sm"
			variant="outlined"
			color="neutral"
			aria-label="toggle light/dark mode"
			{...props}
			onClick={(event) => {
				if (mode === "light") {
					setMode("dark");
				} else {
					setMode("light");
				}
				onClick?.(event);
			}}
		>
			{mode === "light" ? (
				<DarkModeRoundedIcon />
			) : (
				<LightModeRoundedIcon />
			)}
		</IconButton>
	);
}

interface ErrorMessages {
	message?: string;
	messages?: {
		username?: string;
		password?: string;
	};
}

export default function Login() {
	const { setAccessToken, accessToken } = useAuth();
    const { setRefreshToken, refreshToken } = useAuth();
	const [error, setError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState<ErrorMessages>({
		message: "",
	});
	const [loading, setLoading] = React.useState(false);
	const navigate = useNavigate();

	if (accessToken) {
		return <Navigate to="/" />;
	}

	const handleLogin = async (event: React.FormEvent<SignInFormElement>) => {
		event.preventDefault();
		const formElements = event.currentTarget.elements;
		const data = {
			username: formElements.username.value,
			password: formElements.password.value,
			persistent: formElements.persistent.checked,
		};
		try {
			setLoading(true);
			const response = await login(data.username, data.password);
			setAccessToken(response.accessToken);
            data.persistent ? setRefreshToken(response.refreshToken) : setRefreshToken("");
			localStorage.setItem("username", response.username);
            localStorage.setItem("user_role", response.role);
            localStorage.setItem("user_id", response.id);
			navigate("/", { replace: true });
			setLoading(false);
		} catch (e: any) {
			setLoading(false);
			setError(true);
			setErrorMessage(e.response.data);
		}
	};

	return (
		<CssVarsProvider defaultMode="dark" disableTransitionOnChange>
			<CssBaseline />
			<GlobalStyles
				styles={{
					":root": {
						"--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
						"--Cover-width": "50vw", // must be `vw` only
						"--Form-maxWidth": "95%",
						"--Transition-duration": "0.4s", // set to `none` to disable transition
					},
				}}
			/>
			<Box
				sx={(theme) => ({
					width: "100%",
					transition: "width var(--Transition-duration)",
					transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
					position: "relative",
					zIndex: 1,
					display: "flex",
					justifyContent: "center",
					backdropFilter: "blur(12px)",
					backgroundColor: "rgba(255 255 255 / 0.2)",
					[theme.getColorSchemeSelector("dark")]: {
						backgroundColor: "rgba(19 19 24 / 0.4)",
					},
				})}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						minHeight: "100dvh",
						width: "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
						maxWidth: "100%",
						px: 2,
					}}
				>
					<Box
						component="header"
						sx={{
							py: 3,
							display: "flex",
							alignItems: "left",
							justifyContent: "space-between",
						}}
					>
						<Box
							sx={{
								gap: 2,
								display: "flex",
								alignItems: "center",
							}}
						>
							<IconButton
								variant="soft"
								color="primary"
								size="sm"
							>
								<BadgeRoundedIcon />
							</IconButton>
							<Typography level="title-lg">BitVote</Typography>
						</Box>
						<ColorSchemeToggle />
					</Box>
					<Box
						component="main"
						sx={(theme) => ({
							my: "auto",
							py: 5,
							pb: 5,
							px: 3,
							display: "flex",
							flexDirection: "column",
							gap: 2,
							width: 450,
							maxWidth: "100%",
							mx: "auto",
							borderRadius: "sm",
							"& form": {
								display: "flex",
								flexDirection: "column",
								gap: 2,
							},
							[`& .${formLabelClasses.asterisk}`]: {
								visibility: "hidden",
							},
							border: "1px solid",
							borderColor: "neutral.300",
							[theme.getColorSchemeSelector("dark")]: {
								borderColor: "neutral.700",
							},
						})}
					>
						<Stack gap={4} sx={{ mb: 2 }}>
							<Stack gap={1}>
								<Typography level="h3">Sign in</Typography>
								<Typography level="body-sm">
									New to BitVote?{" "}
									<RouterLink to={"/signup"}>
									<Link
										level="title-sm"
									>
										Sign up!
									</Link>
									</RouterLink>
								</Typography>
							</Stack>
						</Stack>
						<Stack gap={4} sx={{ mt: 2 }}>
							{error && errorMessage.message && (
								<Typography level="body-sm" color="danger">
									{errorMessage.message}
								</Typography>
							)}
							<form onSubmit={handleLogin}>
								<FormControl
									required
									error={
										errorMessage.message ||
										(errorMessage.messages &&
											errorMessage.messages.username)
									}
								>
									<FormLabel>Username</FormLabel>
									{errorMessage.messages &&
										errorMessage.messages.username && (
											<Typography
												level="body-xs"
												color="danger"
											>
												{errorMessage.messages.username}
											</Typography>
										)}
									<Input type="username" name="username" />
								</FormControl>
								<FormControl
									required
									error={
										errorMessage.message ||
										(errorMessage.messages &&
											errorMessage.messages.password)
									}
								>
									<FormLabel>Password</FormLabel>
									{errorMessage.messages &&
										errorMessage.messages.password && (
											<Typography
												level="body-xs"
												color="danger"
											>
												{errorMessage.messages.password}
											</Typography>
										)}
									<Input type="password" name="password" />
								</FormControl>
								<Stack gap={4} sx={{ mt: 2 }}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<Checkbox
											size="sm"
											label="Remember me"
											name="persistent"
										/>
										<Link
											level="title-sm"
											href="#replace-with-a-link"
										>
											Forgot your password?
										</Link>
									</Box>
									<Button type="submit" fullWidth>
										Log in
									</Button>
								</Stack>
							</form>
						</Stack>
					</Box>
					<Box component="footer" sx={{ py: 3 }}>
						<Typography level="body-xs" textAlign="center">
							©BitVote {new Date().getFullYear()}
						</Typography>
					</Box>
				</Box>
			</Box>
		</CssVarsProvider>
	);
}
