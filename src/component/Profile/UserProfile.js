import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useEffect } from "react";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import OrderHistory from "./OrderHistory/OrderHistory";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
	const [tab, setTab] = React.useState("1");
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(window.location.search);
	const t = queryParams.get("t");

	const handleChange = (event, newTab) => {
		setTab(newTab);
		navigate(`?t=${newTab}`);
	};

	useEffect(() => {
		setTab(t);
	}, [t]);

	return (
		<div className='my-10 w-[1200px] mx-auto'>
			<Box sx={{ width: "100%", typography: "body1" }}>
				<TabContext value={tab}>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<TabList onChange={handleChange}>
							<Tab label='Thông tin cá nhân' value='1' />
							<Tab label='Đổi mật khẩu' value='2' />
							<Tab label='Lịch sử đơn hàng' value='3' />
						</TabList>
					</Box>
					<TabPanel value='1'>
						<Profile></Profile>
					</TabPanel>
					<TabPanel value='2'>
						<ChangePassword></ChangePassword>
					</TabPanel>
					<TabPanel value='3'>
						<OrderHistory></OrderHistory>
					</TabPanel>
				</TabContext>
			</Box>
		</div>
	);
}
