import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance";
import { getOrderId } from "../../util/common";

//http://localhost:3000/order-handler?code=00&id=0b82afd43198441a97534d72c029337a&cancel=true&status=CANCELLED&orderCode=983345

// http://localhost:3000/order-handler?code=00&id=ffef93aa942c445ba7b2230a4ec07b0e&cancel=false&status=PAID&orderCode=369545

export default function OrderHandler() {
	const [load, setLoad] = useState(false);
	const [isCancel, setIsCancel] = useState(false);

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const status = urlParams.get("status");
		const paymentId = urlParams.get("id");
		const orderId = getOrderId();
		setIsCancel(JSON.parse(urlParams.get("cancel")));
		setLoad(true);

		if (status === "PAID") {
			axiosInstance
				.get(
					`/api/payments/payos/confirmation?orderId=${orderId}&paymentId=${paymentId}`
				)
				.then((res) => {
					if (res.statusCode === 200) {
						localStorage.removeItem("order");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	if (!load) {
		return <div></div>;
	}

	if (isCancel) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[500px] pb-10'>
				<img
					src='https://cdni.iconscout.com/illustration/premium/thumb/cancel-order-illustration-download-in-svg-png-gif-file-formats--food-canceled-delivery-pack-people-illustrations-4363243.png'
					alt=''
				/>
				<Link to={"/"}>
					<Button variant='contained'>Về trang chủ</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-[500px] pb-10'>
			<img
				src='https://sellcodes.com/assets/images/Purchase_Success.png'
				alt=''
				className='w-72 object-cover'
			/>
			<p className='mt-10 uppercase font-bold text-2xl text-green-700'>
				Thanh toán thành công
			</p>
			<p className='mb-10 mt-3 text-gray-500'>
				Cảm ơn bạn đã tin tưởng sử dụng sản phẩm của chúng tôi
			</p>
			<Link to={"/"}>
				<Button variant='contained'>Về trang chủ</Button>
			</Link>
		</div>
	);
}
