import React, { useEffect, useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import OrderTable from "./components/OrderTable";

export default function ManageOrders() {
	const [reRender, setReRender] = useState(true);

	const [orders, setOrders] = useState([]);

	useEffect(() => {
		axiosInstance
			.get("/api/orders/order-shops?IsShop=true")
			.then((res) => {
				if (res.statusCode === 200) {
					setOrders(res.data?.items);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [reRender]);
	return (
		<div className='mt-5'>
			<OrderTable orders={orders} setReRender={setReRender} />
		</div>
	);
}
