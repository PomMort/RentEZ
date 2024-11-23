import React, { useEffect, useState } from "react";
import axiosInstance from "../../../util/axiosInstance";
import OrderHistoryItem from "./OrderHistoryItem";

export default function OrderHistory() {
	const [orders, setOrders] = useState([]);
	const [reRender, setReRender] = useState(false);

	useEffect(() => {
		axiosInstance
			.get("/api/orders/order-shops?IsShop=false&PageNumber=1&PageSize=1000")
			.then((res) => {
				if (res.statusCode === 200) {
					setOrders(res?.data?.items.sort((a, b) => b?.id - a?.id));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [reRender]);

	return (
		<div className='w-[1000px] mx-auto'>
			<div className='flex flex-col gap-5'>
				{orders.map((o) => (
					<OrderHistoryItem
						order={o}
						setReRender={setReRender}
						key={o?.id}
					/>
				))}
			</div>
		</div>
	);
}
