import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MdDeleteOutline } from "react-icons/md";
import axiosInstance from "../../../util/axiosInstance";
import { toast } from "react-toastify";
import { Avatar, Rating } from "@mui/material";

export default function FeedbackTable({ feedbacks, setReRender }) {
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
			field: "avatar",
			headerName: "Ảnh đại diện",
			renderCell: (params) => {
				return (
					<Avatar
						alt=''
						src={params?.row?.avatar}
						variant='circular'
						sx={{ width: 40, height: 40 }}
					/>
				);
			},
		},
		{ field: "customerName", headerName: "Tên khách hàng", width: 150 },
		{ field: "productName", headerName: "Sản phẩm", width: 150 },
		{ field: "reviewContent", headerName: "Nội dung đánh giá", width: 580 },
		{
			field: "rating",
			headerName: "Đánh giá",
			width: 150,
			renderCell: (params) => {
				return (
					<Rating name='read-only' value={params?.row?.rating} readOnly />
				);
			},
		},
	];

	const paginationModel = { page: 0, pageSize: 5 };

	return (
		<div className='mt-5'>
			<DataGrid
				rows={feedbacks?.map((f, index) => {
					return { ...f, id: index, index: index + 1 };
				})}
				columns={columns}
				initialState={{ pagination: { paginationModel } }}
				pageSizeOptions={[5, 10]}
			/>
		</div>
	);
}
