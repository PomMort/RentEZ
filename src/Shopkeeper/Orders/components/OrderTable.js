import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Modal } from "@mui/material";

export default function OrderTable({ orders, setReRender }) {
	const [openModal, setOpenModal] = useState(false);
	const [orderSelected, setOrderSelected] = useState();

	const columns = [
		{ field: "orderId", headerName: "ID", width: 70 },
		{
			field: "totalDeposit",
			headerName: "Tiền cọc",
			width: 150,
			renderCell: (params) => (
				<div>
					<span>{params?.row?.totalDeposit.toLocaleString()}đ</span>
				</div>
			),
		},
		{
			field: "totalRentPrice",
			headerName: "Tiền thuê đồ",
			width: 150,
			renderCell: (params) => (
				<div>
					<span>{params?.row?.totalRentPrice.toLocaleString()}đ</span>
				</div>
			),
		},
		{
			field: "total",
			headerName: "Tổng tiền thanh toán",
			width: 150,
			renderCell: (params) => (
				<div>
					<span>{params?.row?.total.toLocaleString()}đ</span>
				</div>
			),
		},
		{ field: "status", headerName: "Trạng thái", width: 150 },
		{
			field: "action",
			headerName: "Hành động",
			renderCell: (params) => (
				<div className='text-2xl flex items-center justify-center gap-3 h-full'>
					<FaEye
						className='text-[#767b7a] cursor-pointer'
						onClick={() => handleClickView(params?.row)}
					/>
					<MdOutlineModeEdit className='text-[#418dff] cursor-pointer' />
				</div>
			),
		},
	];

	const handleClickView = (order) => {
		setOrderSelected(order);
		setOpenModal(true);
	};

	const paginationModel = { page: 0, pageSize: 5 };

	return (
		<div className='mt-5'>
			<DataGrid
				rows={orders}
				columns={columns}
				initialState={{ pagination: { paginationModel } }}
				pageSizeOptions={[5, 10]}
			/>

			{/* MODAL */}
			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)}
				keepMounted
			>
				<div className='min-w-[500px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl'>
					<div className='mt-5 px-5 text-lg flex justify-between items-center'>
						Chi tiết đơn hàng{" "}
						<span className='text-2xl font-bold'>
							#{orderSelected?.orderId}
						</span>
					</div>
					<div className='p-5 flex flex-col gap-3'>
						{orderSelected?.orderDetails?.map((p, index) => (
							<div key={index}>
								<hr className='my-2' />
								<div className='flex gap-3 mt-2'>
									<img
										src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUiVIR-JA8539wkylRyy3CSblhm12Ewtzxg&s'
										alt=''
										className='size-20 rounded-lg border'
									/>
									<div className='flex flex-col justify-between text-sm'>
										<p className='font-semibold text-lg'>
											Váy không ngủ
										</p>
										<span>Số lượng: {p?.rentQuantity}</span>
										<div className='flex gap-3'>
											<span>
												Giá thuê:{" "}
												{(p?.subTotalRentPrice).toLocaleString()}
											</span>
											<span>|</span>
											<span>
												Tiền cọc:{" "}
												{(p?.subTotalDeposit).toLocaleString()}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</Modal>
		</div>
	);
}
