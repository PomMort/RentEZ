import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import OrderHistory from "./OrderHistory/OrderHistory";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
	const [tab, setTab] = React.useState("1");
	const theme = useTheme();
	const isMobile = useMediaQuery("(max-width:768px)");
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(window.location.search);
	const t = queryParams.get("t");

	useEffect(() => {
		setTab(t);
	}, [t]);

	const handleChange = (event, newTab) => {
		setTab(newTab);
		navigate(`?t=${newTab}`);
	};

	return (
		<div className='my-5 md:my-10 w-full md:w-[1200px] mx-auto px-4 md:px-0'>
			<Box sx={{ width: "100%", typography: "body1" }}>
				<TabContext value={tab}>
					<Box
						sx={{
							borderBottom: 1,
							borderColor: "divider",
						}}
					>
						<TabList
							onChange={handleChange}
							variant={isMobile ? "scrollable" : "standard"}
							scrollButtons={isMobile ? "auto" : false}
							allowScrollButtonsMobile
							sx={{
								".MuiTabs-flexContainer": {
									gap: isMobile ? "8px" : "0",
								},
								".MuiTab-root": {
									fontSize: isMobile ? "14px" : "16px",
									padding: isMobile ? "8px 12px" : "12px 16px",
									minWidth: isMobile ? "auto" : "160px",
									minHeight: isMobile ? "48px" : "56px",
								},
								".MuiTabs-scrollButtons": {
									width: isMobile ? "32px" : "40px",
								},
								".MuiTabScrollButton-root": {
									width: isMobile ? "32px" : "40px",
								},
							}}
						>
							<Tab
								label='Thông tin cá nhân'
								value='1'
								wrapped={isMobile}
							/>
							<Tab label='Đổi mật khẩu' value='2' wrapped={isMobile} />
							<Tab
								label='Lịch sử đơn hàng'
								value='3'
								wrapped={isMobile}
							/>
						</TabList>
					</Box>
					<TabPanel
						value='1'
						sx={{
							padding: isMobile ? "16px 0" : "24px",
						}}
					>
						<Profile />
					</TabPanel>
					<TabPanel
						value='2'
						sx={{
							padding: isMobile ? "16px 0" : "24px",
						}}
					>
						<ChangePassword />
					</TabPanel>
					<TabPanel
						value='3'
						sx={{
							padding: isMobile ? "16px 0" : "24px",
						}}
					>
						<OrderHistory />
					</TabPanel>
				</TabContext>
			</Box>
		</div>
	);
}
