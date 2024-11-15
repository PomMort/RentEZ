import React, { useEffect, useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import ShopTable from "./components/ShopTable";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";

export default function ManageShops() {
	const [tab, setTab] = React.useState("1");
	const [reRender, setReRender] = useState(true);
	const [shops, setShop] = useState([]);
	const [shopsPending, setShopPending] = useState([]);

	useEffect(() => {
		axiosInstance
			.get("/api/shops?IsVerified=true")
			.then((res) => {
				if (res?.statusCode === 200) {
					setShop(res?.data?.items);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [reRender]);

	useEffect(() => {
		axiosInstance
			.get("/api/shops/admin/pending")
			.then((res) => {
				if (res?.statusCode === 200) {
					setShopPending(res?.data);
				}
			})
			.catch((err) => {
				if (err.StatusCode === 404) {
					setShopPending([]);
				}
				console.log(err);
			});
	}, [reRender]);

	const handleChange = (event, newTab) => {
		setTab(newTab);
	};

	return (
		<div className='mt-5'>
			<TabContext value={tab}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TabList onChange={handleChange}>
						<Tab label='Tất cả cửa hàng' value='1' />
						<Tab label='Cửa hàng chờ xét duyệt' value='2' />
					</TabList>
				</Box>
				<TabPanel value='1'>
					<ShopTable
						shops={shops}
						setReRender={setReRender}
						type={"all"}
					/>
				</TabPanel>
				<TabPanel value='2'>
					<ShopTable
						shops={shopsPending}
						setReRender={setReRender}
						type={"pending"}
					/>
				</TabPanel>
			</TabContext>
		</div>
	);
}
