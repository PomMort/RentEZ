import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";

export default function UsersTable({ users, setReRender }) {
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
			headerName: "Ảnh",
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
		{ field: "userName", headerName: "Username", width: 150 },
		{ field: "email", headerName: "Email", width: 150 },
		{ field: "phoneNumber", headerName: "SĐT", width: 200 },
		{ field: "address", headerName: "Địa chỉ", width: 400 },
		// {
		// 	field: "action",
		// 	headerName: "Hành động",
		// 	renderCell: (params) => (
		// 		<div className='text-2xl flex items-center justify-center gap-3 h-full'>
		// 			{/* <MdOutlineModeEdit className='text-[#418dff] cursor-pointer' />
		// 			<MdDeleteOutline className='text-red-600 cursor-pointer' /> */}
		// 		</div>
		// 	),
		// },
	];

	const paginationModel = { page: 0, pageSize: 5 };

	return (
		<div className='mt-5'>
			<DataGrid
				rows={users?.map((u, index) => {
					return { ...u, index: index + 1 };
				})}
				columns={columns}
				initialState={{ pagination: { paginationModel } }}
				pageSizeOptions={[5, 10]}
			/>
		</div>
	);
}
