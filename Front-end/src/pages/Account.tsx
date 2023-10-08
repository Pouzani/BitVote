import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Phone } from "react-feather";
import { EditRounded, PhoneRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import User from "../model/user";
import { getCurrent } from "../api/authService";
import { useGetCurrent } from "../hooks/useAuth";

export default function Account() {
	const { currentUser, loading, error} = useGetCurrent();
	return (
		<Box
			sx={{
				flex: 1,
				width: "100%",
			}}
		>
			<Stack
				spacing={4}
				sx={{
					display: "flex",
					maxWidth: "800px",
					mx: "auto",
					px: {
						xs: 2,
						md: 6,
					},
					py: {
						xs: 10,
						md: 3,
					},
				}}
			>
				<Card>
					<Box sx={{ mb: 1 }}>
						<Typography level="title-md">Personal info</Typography>
						<Typography level="body-sm">
							Customize how your profile information will apper to
							the networks.
						</Typography>
					</Box>
					<Divider />
					<Stack
						direction="row"
						spacing={3}
						sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
					>
						<Stack direction="column" spacing={1}>
							<AspectRatio
								ratio="1"
								maxHeight={200}
								sx={{
									flex: 1,
									minWidth: 120,
									borderRadius: "100%",
								}}
							>
								<img
									src={
										currentUser?.imageUrl
											? currentUser?.imageUrl
											: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
									}
									loading="lazy"
									alt="Avatar"
								/>
							</AspectRatio>
							<IconButton
								aria-label="upload new picture"
								size="sm"
								variant="outlined"
								color="neutral"
								sx={{
									bgcolor: "background.body",
									position: "absolute",
									zIndex: 2,
									borderRadius: "50%",
									left: 100,
									top: 170,
									boxShadow: "sm",
								}}
							>
								<EditRoundedIcon />
							</IconButton>
						</Stack>
						<Stack spacing={2} sx={{ flexGrow: 1 }}>
							<Stack spacing={1}>
								<FormLabel>Username</FormLabel>
								<FormControl
									sx={{
										display: {
											sm: "flex-column",
											md: "flex-row",
										},
										gap: 2,
									}}
								>
									<Input
										size="sm"
										placeholder="Enter your new username"
										value={currentUser?.username}
									/>
								</FormControl>
							</Stack>
							<Stack spacing={2}>
								<FormControl>
									<FormLabel>Change Password</FormLabel>
									<Button
										size="sm"
										variant="outlined"
										color="neutral"
										sx={{ width: "50%" }}
										endDecorator={<EditRounded />}
									>
										Change Password
									</Button>
								</FormControl>
								<FormControl sx={{ flexGrow: 1 }}>
									<FormLabel>Email</FormLabel>
									<Input
										size="sm"
										type="email"
										startDecorator={<EmailRoundedIcon />}
										placeholder="Change your email"
										value={currentUser?.email}
										sx={{ flexGrow: 1 }}
									/>
								</FormControl>
							</Stack>
							<div>
								<FormControl
									sx={{ display: { sm: "contents" } }}
								>
									<FormLabel>Age</FormLabel>
									<Input
										size="sm"
										value={currentUser?.age}
										type="number"
										placeholder="Change your age"
									/>
								</FormControl>
							</div>
							<div>
								<FormControl
									sx={{ display: { sm: "contents" } }}
								>
									<FormLabel>Phone number</FormLabel>
									<Input
										size="sm"
										value={currentUser?.phone}
										startDecorator={<PhoneRounded />}
										type="number"
										placeholder="Change your phone number"
									/>
								</FormControl>
							</div>
						</Stack>
					</Stack>
					<Stack
						direction="column"
						spacing={2}
						sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
					>
						<Stack direction="row" spacing={2}>
							<Stack direction="column" spacing={1}>
								<AspectRatio
									ratio="1"
									maxHeight={108}
									sx={{
										flex: 1,
										minWidth: 108,
										borderRadius: "100%",
									}}
								>
									<img
										src={
											currentUser?.imageUrl
												? currentUser?.imageUrl
												: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
										}
										loading="lazy"
										alt="Avatar"
									/>
								</AspectRatio>
								<IconButton
									aria-label="upload new picture"
									size="sm"
									variant="outlined"
									color="neutral"
									sx={{
										bgcolor: "background.body",
										position: "absolute",
										zIndex: 2,
										borderRadius: "50%",
										left: 85,
										top: 180,
										boxShadow: "sm",
									}}
								>
									<EditRoundedIcon />
								</IconButton>
							</Stack>
							<Stack spacing={1} sx={{ flexGrow: 1 }}>
								<FormLabel>Username</FormLabel>
								<FormControl
									sx={{
										display: {
											sm: "flex-column",
											md: "flex-row",
										},
										gap: 2,
									}}
								>
									<Input
										size="sm"
										placeholder="Enter your username"
										value={currentUser?.username}
									/>
								</FormControl>
							</Stack>
						</Stack>

						<FormControl>
							<FormLabel>Change Password</FormLabel>
							<Button
								size="sm"
								variant="outlined"
								color="neutral"
								sx={{ width: "50%" }}
								endDecorator={<EditRounded />}
							>
								Change Password
							</Button>
						</FormControl>
						<FormControl sx={{ flexGrow: 1 }}>
							<FormLabel>Email</FormLabel>
							<Input
								size="sm"
								type="email"
								startDecorator={<EmailRoundedIcon />}
								placeholder="email"
								value={currentUser?.email}
								sx={{ flexGrow: 1 }}
							/>
						</FormControl>
						<div>
							<FormControl sx={{ display: { sm: "contents" } }}>
								<FormLabel>Age</FormLabel>
								<Input
									size="sm"
									value={currentUser?.age}
									type="number"
									placeholder="Change your age"
								/>
							</FormControl>
						</div>
						<div>
							<FormControl sx={{ display: { sm: "contents" } }}>
								<FormLabel>Phone number</FormLabel>
								<Input
									size="sm"
									value={currentUser?.phone}
									startDecorator={<PhoneRounded />}
									type="number"
									placeholder="Change your phone number"
								/>
							</FormControl>
						</div>
					</Stack>
					<CardOverflow
						sx={{ borderTop: "1px solid", borderColor: "divider" }}
					>
						<CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
							<Button
								size="sm"
								variant="outlined"
								color="neutral"
							>
								Cancel
							</Button>
							<Button size="sm" variant="solid">
								Save
							</Button>
						</CardActions>
					</CardOverflow>
				</Card>
			</Stack>
		</Box>
	);
}
