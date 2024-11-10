import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

export default function CategoriesTable({ categories, setReRender }) {
	const handleEdit = () => {};

	const handleDelete = () => {};

	const columns = [
		{ field: "id", headerName: "STT", width: 70 },
		{ field: "categoryName", headerName: "Tên danh mục", width: 300 },
		{ field: "description", headerName: "Mô tả", width: 300 },
		{
			field: "action",
			headerName: "Hành động",
			renderCell: (params) => (
				<div className='text-2xl flex items-center justify-center gap-3 h-full'>
					<MdDeleteOutline className='text-red-600 cursor-pointer' />
					<MdOutlineModeEdit className='text-[#418dff] cursor-pointer' />
				</div>
			),
		},
	];

	const paginationModel = { page: 0, pageSize: 5 };

	return (
		<div className='mt-5'>
			<DataGrid
				rows={categories}
				columns={columns}
				initialState={{ pagination: { paginationModel } }}
				pageSizeOptions={[5, 10]}
			/>
		</div>
	);
}
