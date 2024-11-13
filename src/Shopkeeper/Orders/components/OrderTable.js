import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineModeEdit } from "react-icons/md";

export default function OrderTable({ orders, setReRender }) {
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
					<MdOutlineModeEdit className='text-[#418dff] cursor-pointer' />
				</div>
			),
		},
	];

	const paginationModel = { page: 0, pageSize: 5 };

	return (
		<div className='mt-5'>
			<DataGrid
				rows={orders}
				columns={columns}
				initialState={{ pagination: { paginationModel } }}
				pageSizeOptions={[5, 10]}
			/>
		</div>
	);
}
