import React, { useEffect, useState } from "react";
import axiosInstance from "../../../util/axiosInstance";
import OrderHistoryItem from "./OrderHistoryItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
	const [orders, setOrders] = useState([]);
	const [reRender, setReRender] = useState(false);
	const [pageNumber, setPageNumber] = useState(2);
	const [hasMore, setHasMore] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		axiosInstance
			.get("/api/orders/order-shops?IsShop=false&PageNumber=1&PageSize=10")
			.then((res) => {
				if (res.statusCode === 200) {
					setOrders(res?.data?.items);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [reRender]);

	const fetchMoreData = () => {
		axiosInstance
			.get(
				`/api/orders/order-shops?IsShop=false&PageNumber=${pageNumber}&PageSize=10`
			)
			.then((res) => {
				if (res.statusCode === 200) {
					setOrders([...orders, ...res?.data?.items]);
					res?.data?.items?.length > 0
						? setHasMore(true)
						: setHasMore(false);
				}
			})
			.catch((err) => console.log(err));

		setPageNumber((prevIndex) => prevIndex + 1);
	};

	if (orders?.length === 0) {
		return (
			<div className='flex flex-col gap-5 justify-between items-center'>
				<img
					src='https://cdni.iconscout.com/illustration/premium/thumb/no-order-history-illustration-download-in-svg-png-gif-file-formats--previous-orders-past-purchases-records-empty-ecommerce-states-pack-e-commerce-shopping-illustrations-9741057.png?f=webp'
					alt=''
					className='size-60 object-cover'
				/>
				<p className='text-lg uppercase font-bold'>
					Bạn không có đơn hàng nào
				</p>
				<Button variant='contained' onClick={() => navigate("/")}>
					Mua sắm ngay
				</Button>
			</div>
		);
	}
	return (
		<div className='w-[1000px] mx-auto'>
			<div className='flex flex-col'>
				<InfiniteScroll
					dataLength={orders.length}
					next={fetchMoreData}
					hasMore={hasMore}
					loader={<div>Đang tải...</div>}
					className='flex flex-col gap-10 px-10 mt-5'
				>
					{orders.map((o) => (
						<OrderHistoryItem
							order={o}
							setReRender={setReRender}
							key={o?.id}
						/>
					))}
				</InfiniteScroll>
			</div>
		</div>
	);
}
