import React, { useEffect, useState } from "react";
import axiosInstance from "../../../util/axiosInstance";
import OrderHistoryItem from "./OrderHistoryItem";
import InfiniteScroll from "react-infinite-scroll-component";

export default function OrderHistory() {
	const [orders, setOrders] = useState([]);
	const [reRender, setReRender] = useState(false);
	const [pageNumber, setPageNumber] = useState(2);
	const [hasMore, setHasMore] = useState(true);

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

	return (
		<div className='w-[1000px] mx-auto'>
			<div className='flex flex-col gap-5'>
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
