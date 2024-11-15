import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import ModalOrderHistory from "./ModalOrderHistory";
import axiosInstance from "../../../util/axiosInstance";
import { Button } from "@mui/material";

export default function OrderHistoryItem({ order }) {
	const [openModal, setOpenModal] = useState(false);
	const [orderSelect, setOrderSelect] = useState();

	useEffect(() => {
		axiosInstance
			.get(`/api/orders/${order?.id}`)
			.then((res) => {
				if (res.statusCode === 200) {
					setOrderSelect(res?.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [order]);

	return (
		<div
			className='p-8 rounded-xl '
			style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
		>
			<p className='text-sm text-gray-600'>
				Ngày mua: {dayjs(order?.createdTime).format("DD/MM/YYYY")}
			</p>
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
				<div className='text-sm flex flex-col gap-1'>
					<p className='font-bold text-base'>Thông tin cá nhân</p>
					<p>Họ và tên: {order?.fullName}</p>
					<p>Số điện thoại: {order?.phoneNumber}</p>
					<p>Địa chỉ: {order?.orderAddress}</p>
				</div>
				<div>
					<div className=' text-sm flex flex-col gap-1'>
						<p className='font-bold text-base'>Thông tin đơn hàng</p>
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
							<div className='flex flex-col gap-1'>
								<p>Phương thức thanh toán: {order?.paymentMethod}</p>
								<p>Trạng thái: {order?.paymentStatus}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='flex flex-row-reverse gap-3 mt-3'>
				<Button variant='contained'>Đã nhận được hàng</Button>
				<Button variant='outlined'>Trả hàng</Button>
			</div>

			{/* MODAL */}
			<ModalOrderHistory
				openModal={openModal}
				setOpenModal={setOpenModal}
				order={orderSelect}
			/>
		</div>
	);
}
