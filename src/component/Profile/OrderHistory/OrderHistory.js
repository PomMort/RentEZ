import React, { useEffect, useState } from "react";
import axiosInstance from "../../../util/axiosInstance";
import OrderHistoryItem from "./OrderHistoryItem";

export default function OrderHistory() {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		axiosInstance
			.get("/api/orders")
			.then((res) => {
				if (res.statusCode === 200) {
					setOrders(res?.data?.items);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className='w-[1000px] mx-auto'>
			<div className='flex flex-col gap-5'>
				{orders.map((o) => (
					<OrderHistoryItem order={o} />
				))}
			</div>
		</div>
	);
}
