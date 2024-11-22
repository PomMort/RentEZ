import dayjs from "dayjs";
import React, { useState } from "react";
import ModalOrderHistory from "./ModalOrderHistory";
import { Button } from "@mui/material";

export default function OrderHistoryItem({ order }) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<div
			className='p-8 rounded-xl '
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
							<p>Trạng thái: {order?.status}</p>
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
				<Button variant='contained'>Đã nhận được hàng</Button>
				<Button variant='outlined'>Trả hàng</Button>
			</div>

			{/* MODAL */}
			<ModalOrderHistory
				openModal={openModal}
				setOpenModal={setOpenModal}
				order={order}
			/>
		</div>
	);
}
