import dayjs from "dayjs";
import React, { useState } from "react";
import ModalOrderHistory from "./ModalOrderHistory";
import { Button } from "@mui/material";
import axiosInstance from "../../../util/axiosInstance";
import { toast } from "react-toastify";
import { domainFE, ORDER_STATUS } from "../../../util/constant";

export default function OrderHistoryItem({ order, setReRender }) {
	const [openModal, setOpenModal] = useState(false);

	const handleUpdateStatus = () => {
		axiosInstance
			.put(`/api/orders/order-shops/${order?.id}/status?isShop=false`)
			.then((res) => {
				if (res?.statusCode === 200) {
					toast.success("Cập nhật trạng thái thành công");
					setReRender((prev) => !prev);
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error(err?.Message);
			});
	};

	const handleCancelOrder = (orderId) => {
		const confirm = window.confirm(
			"Bạn có chắc huỷ thanh toán đơn hàng này chứ"
		);
		if (confirm) {
			axiosInstance
				.delete(`/api/orders/${orderId}`)
				.then((res) => {
					if (res?.statusCode === 200) {
						toast.success("Huỷ thanh toán thành công");
						setReRender((prev) => !prev);
					}
				})
				.catch((err) => {
					console.log(err);
					toast.error(err?.Message);
				});
		}
	};

	const handleRePayment = (orderId) => {
		axiosInstance
			.post("/api/payments/payos/customer/payment-url", {
				orderId,
				cancelUrl: domainFE + "/order-handler",
				returnUrl: domainFE + "/order-handler",
			})
			.then((res) => {
				if (res?.statusCode === 200) {
					window.location.href = res?.data?.checkoutUrl;
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div
			className='p-8 rounded-xl my-5'
			style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
		>
			<div className='flex items-center justify-between'>
				<p className='font-bold text-lg'>
					Tên cửa hàng: {order?.shop?.shopName}
				</p>
				<p className='text-sm text-gray-600'>
					Ngày mua: {dayjs(order?.createdTime).format("DD/MM/YYYY")}
				</p>
			</div>
			<div className=' mt-2 flex justify-between'>
				<span className='text-lg font-bold'>Mã đơn hàng: #{order?.id}</span>
				<span
					className='text-sm underline cursor-pointer hover:opacity-80'
					onClick={() => setOpenModal(true)}
				>
					Chi tiết đơn hàng
				</span>
			</div>

			<div className='mt-3 grid grid-cols-2 gap-5'>
				<div>
					<div className=' text-sm flex flex-col gap-1'>
						<div className='flex items-center gap-10'>
							<p className='font-bold text-base'>Thông tin đơn hàng</p>
							<p>
								Trạng thái:{" "}
								<strong>
									{
										ORDER_STATUS.find(
											(stt) => stt.status === order?.status
										)?.status_vi
									}
								</strong>
							</p>
						</div>

						<div className='flex gap-10'>
							<div className='flex flex-col gap-1'>
								<p>
									Tổng giá thuê:{" "}
									{order?.totalRentPrice?.toLocaleString()}đ
								</p>
								<p>
									Tổng số tiền cọc:{" "}
									{order?.totalDeposit?.toLocaleString()}đ
								</p>
								<p>
									Thành tiền:{" "}
									<span className='font-bold'>
										{order?.total?.toLocaleString()}đ
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='flex flex-row-reverse gap-3 mt-3'>
				{order?.status === "Shipping" && (
					<Button variant='contained' onClick={handleUpdateStatus}>
						Đã nhận được hàng
					</Button>
				)}
				{order?.status === "Received" && (
					<Button variant='outlined' onClick={handleUpdateStatus}>
						Trả hàng
					</Button>
				)}
				{order?.status === "WaitForPayment" && (
					<>
						<Button
							variant='contained'
							onClick={() => handleRePayment(order?.orderId)}
						>
							Thanh toán
						</Button>
						<Button
							variant='outlined'
							onClick={() => handleCancelOrder(order?.orderId)}
						>
							Huỷ thanh toán
						</Button>
					</>
				)}
			</div>

			{/* MODAL */}
			<ModalOrderHistory
				openModal={openModal}
				setOpenModal={setOpenModal}
				setReRender={setReRender}
				order={order}
			/>
		</div>
	);
}
