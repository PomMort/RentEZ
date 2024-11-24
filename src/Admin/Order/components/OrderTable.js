import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { RiRefund2Fill } from "react-icons/ri";
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
	const [qrcode, setqrcode] = useState({
		customerRefundQR: "",
		shopPaymentQR: "",
	});

	const columns = [
		{ field: "id", headerName: "ID", width: 70 },
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
			renderCell: (params) => (
				<div className='text-2xl flex items-center justify-center gap-3 h-full'>
					<FaEye
						className='text-[#767b7a] cursor-pointer'
						onClick={() => handleClickView(params?.row)}
					/>
					<RiRefund2Fill
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
		const data = {
			orderShopId: order?.id,
			userId: order?.order?.customer?.id,
		};
		axiosInstance
			.post("/api/payments/refund", data)
			.then((res) => {
				setqrcode({
					customerRefundQR: res?.customerRefundQR,
					shopPaymentQR: res?.shopPaymentQR,
				});
				setOpenModalStatus(true);
				setReRender((prev) => !prev);
			})
			.catch((err) => {
				console.log(err);
				toast.error("Lỗi không tạo được QR CODE");
			});
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
				disableEscapeKeyDown
				BackdropProps={{
					onClick: (event) => event.stopPropagation(),
				}}
			>
				<div className='min-w-[500px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl'>
					<div className='my-5 px-5'>
						<div className='mt-5 mb-2 text-lg flex justify-between items-center'>
							Hoàn tiền
						</div>
						<hr className='mb-5' />
						<div className='flex justify-between items-center gap-5'>
							{qrcode?.customerRefundQR && (
								<div>
									<p className='text-center'>
										Hoàn tiền cọc cho khách hàng
									</p>
									<img
										src={qrcode?.customerRefundQR}
										alt=''
										className='w-52 object-cover'
									/>
								</div>
							)}
							{qrcode?.shopPaymentQR && (
								<div>
									<p className='text-center'>Hoàn tiền cho shop</p>
									<img
										src={qrcode?.shopPaymentQR}
										alt=''
										className='w-52 object-cover'
									/>
								</div>
							)}
						</div>
						<div className='flex flex-row-reverse mt-5'>
							<Button
								variant='contained'
								onClick={() => {
									setOpenModalStatus(false);
									toast.success("Cập nhật thành công");
								}}
							>
								Đã chuyển
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
