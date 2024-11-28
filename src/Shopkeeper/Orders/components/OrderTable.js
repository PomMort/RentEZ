import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaEye } from "react-icons/fa";
import { Button, Modal } from "@mui/material";
import dayjs from "dayjs";
import axiosInstance from "../../../util/axiosInstance";
import { toast } from "react-toastify";
import { ORDER_STATUS } from "../../../util/constant";

export default function OrderTable({ orders, setReRender }) {
	const [openModalDetailOrder, setOpenModalDetailOrder] = useState(false);
	const [openModalStatus, setOpenModalStatus] = useState(false);
	const [orderSelected, setOrderSelected] = useState();

	const columns = [
		{
			field: "index",
			headerName: "STT",
			width: 70,
			renderCell: (params) => {
				return <p>{params?.row?.index}</p>;
			},
		},
		{
			field: "fullName",
			headerName: "Tên khách hàng",
			width: 150,
			renderCell: (params) => (
				<div>
					<span>{params?.row?.order?.customer?.fullName}</span>
				</div>
			),
		},
		{
			field: "phoneNumber",
			headerName: "Số điện thoại",
			width: 150,
			renderCell: (params) => (
				<div>
					<span>{params?.row?.order?.customer?.phoneNumber}</span>
				</div>
			),
		},
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
		{
			field: "status",
			headerName: "Trạng thái",
			width: 150,
			renderCell: (params) => (
				<div>
					<span>
						{
							ORDER_STATUS.find(
								(stt) => stt.status === params?.row?.status
							)?.status_vi
						}
					</span>
				</div>
			),
		},
		{
			field: "action",
			headerName: "Hành động",
			width: 200,
			renderCell: (params) => (
				<div className='flex items-center gap-5 h-full'>
					<FaEye
						className='text-2xl text-[#767b7a] cursor-pointer'
						onClick={() => handleClickView(params?.row)}
					/>
					<Button
						variant='contained'
						size='small'
						onClick={() => handleClickEditStatus(params?.row)}
						disabled={
							params?.row?.status === "WaitingForRefund" ||
							params?.row?.status === "Completed" ||
							params?.row?.status === "WaitForPayment" ||
							params?.row?.status === "Shipping" ||
							params?.row?.status === "Received"
						}
					>
						Xác nhận
					</Button>
				</div>
			),
		},
	];

	const handleClickView = (order) => {
		setOrderSelected(order);
		setOpenModalDetailOrder(true);
	};

	const handleClickEditStatus = (order) => {
		setOpenModalStatus(true);
		setOrderSelected(order);
	};

	const paginationModel = { page: 0, pageSize: 5 };

	const handleEdit = () => {
		axiosInstance
			.put(`/api/orders/order-shops/${orderSelected?.id}/status?isShop=true`)
			.then((res) => {
				if (res?.statusCode === 200) {
					toast.success("Cập nhật trạng thái thành công");
					setOpenModalStatus(false);
					setReRender((prev) => !prev);
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error(err?.Message);
			});
	};

	return (
		<div className='mt-5'>
			<DataGrid
				rows={orders?.map((o, index) => {
					return { ...o, index: index + 1 };
				})}
				columns={columns}
				initialState={{ pagination: { paginationModel } }}
				pageSizeOptions={[5, 10]}
			/>

			{/* MODAL DETAIL ORDER */}
			<Modal
				open={openModalDetailOrder}
				onClose={() => setOpenModalDetailOrder(false)}
				keepMounted
			>
				<div className='min-w-[500px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl'>
					<div className='mt-5 px-5 text-lg flex justify-between items-center'>
						Chi tiết đơn hàng{" "}
						<span className='text-2xl font-bold'>
							#{orderSelected?.id}
						</span>
					</div>
					<div className='p-5 flex flex-col gap-3'>
						{orderSelected?.orderDetails?.map((p, index) => (
							<div key={index}>
								<hr className='my-2' />
								<div className='flex gap-3 mt-2'>
									<img
										src={
											p?.product?.productImage
												? p?.product?.productImage
												: "https://png.pngtree.com/png-clipart/20211116/original/pngtree-minimal-loading-icon-graphic-png-image_6944732.png"
										}
										alt=''
										className='size-20 rounded-lg border'
									/>
									<div className='flex flex-col gap-1 text-sm'>
										<p className='font-bold text-lg'>
											{p?.product?.productName}
										</p>
										<div className='flex gap-2'>
											<span>Số lượng: {p?.rentQuantity}</span>
											<span>|</span>
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
										<div className='flex gap-2'>
											<span>
												Ngày thuê:{" "}
												{dayjs(p?.rentDateTime).format(
													"DD/MM/YYYY"
												)}
											</span>
											<span>|</span>
											<span>
												Ngày trả:{" "}
												{dayjs(p?.returnDateTime).format(
													"DD/MM/YYYY"
												)}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</Modal>

			{/* MODAL UPDATE STATUS ORDER */}
			<Modal
				open={openModalStatus}
				onClose={() => setOpenModalStatus(false)}
				keepMounted
			>
				<div className='min-w-[500px] bg-white absolute top-[20%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl'>
					<div className='my-5 px-5'>
						<div className='mt-5 mb-2 text-lg flex justify-between items-center'>
							Cập nhật trạng thái đơn hàng
						</div>
						<hr className='mb-5' />
						<p className='text-lg'>
							Trạng thái:{" "}
							<strong>
								{
									ORDER_STATUS.find(
										(stt) => stt.status === orderSelected?.status
									)?.status_vi
								}
							</strong>
						</p>
						<div className='flex flex-row-reverse mt-3'>
							<Button variant='contained' onClick={handleEdit}>
								Cập nhật trạng thái
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
