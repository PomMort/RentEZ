import { Avatar, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import axiosInstance from "../../../util/axiosInstance";
import { toast } from "react-toastify";

export default function ShopTable({ shops, type, setReRender }) {
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
			field: "shopAvatar",
			headerName: "Ảnh",
			renderCell: (params) => {
				return (
					<Avatar
						alt='Remy Sharp'
						src={params?.row?.shopAvatar}
						variant='rounded'
						sx={{ width: 52, height: 52 }}
					/>
				);
			},
		},
		{ field: "shopName", headerName: "Tên cửa hàng", width: 250 },
		{ field: "shopEmail", headerName: "Email", width: 250 },
		{ field: "shopPhone", headerName: "Số điện thoại", width: 120 },
		{ field: "shopAddress", headerName: "Địa chỉ", width: 250 },
		type === "pending" && {
			field: "action",
			headerName: "Hành động",
			renderCell: (params) => {
				return (
					<div className='flex items-center justify-center gap-5 h-full'>
						<Button
							variant='contained'
							onClick={() => handleApprove(params?.row?.id)}
						>
							DUYỆT
						</Button>
					</div>
				);
			},
		},
	];

	const handleApprove = (id) => {
		axiosInstance
			.put(`/api/shops/admin/approval?id=${id}`)
			.then((res) => {
				if (res?.statusCode === 200) {
					toast.success("Phê duyệt thành công");
					setReRender((prev) => !prev);
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
			});
	};

	const paginationModel = { page: 0, pageSize: 5 };

	return (
		<div className='mt-5'>
			<DataGrid
				rows={shops?.map((s, index) => {
					return { ...s, index: index + 1 };
				})}
				columns={columns}
				initialState={{ pagination: { paginationModel } }}
				pageSizeOptions={[5, 10]}
			/>
		</div>
	);
}
