import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
} from "@mui/material";
import dayjs from "dayjs";
import axiosInstance from "../../../util/axiosInstance";

export default function OrderTable({ orders, setReRender }) {
	const [openModalDetailOrder, setOpenModalDetailOrder] = useState(false);
	const [openModalStatus, setOpenModalStatus] = useState(false);
	const [orderSelected, setOrderSelected] = useState();
	const [statuses, setStatuses] = useState([]);
	const [statusSelected, setStatusSelected] = useState("");

	const columns = [
		{ field: "id", headerName: "ID", width: 70 },
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
					<MdOutlineModeEdit
						className='text-[#418dff] cursor-pointer'
						onClick={() => handleClickEditStatus(params?.row)}
					/>
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
		setStatusSelected(statuses?.find((s) => s?.status === order?.status)?.id);
	};

	const paginationModel = { page: 0, pageSize: 5 };

	useEffect(() => {
		axiosInstance.get("/api/orders/order-shops/enums").then((res) => {
			if (res.statusCode === 200) {
				const listStatusObj = res?.data?.orderShopStatusEnums;
				const listStatus = [];
				if (listStatusObj) {
					for (const [key, value] of Object.entries(listStatusObj)) {
						listStatus.push({ id: key, status: value });
					}
				}

				setStatuses(listStatus);
			}
		});
	}, []);

	const handleEdit = () => {};

	return (
		<div className='mt-5'>
			<DataGrid
				rows={orders}
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
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'>
								Trạng thái đơn hàng
							</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={statusSelected}
								label='Trạng thái đơn hàng'
								onChange={(e) => {
									setStatusSelected(e.target.value);
								}}
							>
								{statuses?.map((s) => (
									<MenuItem key={s?.id} value={s?.id}>
										<div>
											<span>{s?.status}</span>
										</div>
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<div className='flex flex-row-reverse mt-3'>
							<Button variant='contained' onClick={handleEdit}>
								Cập nhật
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
