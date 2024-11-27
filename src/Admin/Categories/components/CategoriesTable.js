import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import axiosInstance from "../../../util/axiosInstance";
import ModalCategory from "./ModalCategory";
import { toast } from "react-toastify";

export default function CategoriesTable({ categories, setReRender }) {
	const [openModalAdd, setOpenModalAdd] = useState(false);
	const [category, setCategory] = useState();

	const columns = [
		{
			field: "index",
			headerName: "STT",
			width: 70,
			renderCell: (params) => {
				return <p>{params?.row?.index}</p>;
			},
		},
		{ field: "categoryName", headerName: "Tên danh mục", width: 300 },
		{ field: "description", headerName: "Mô tả", width: 300 },
		{
			field: "action",
			headerName: "Hành động",
			renderCell: (params) => (
				<div className='text-2xl flex items-center justify-center gap-3 h-full'>
					<MdOutlineModeEdit
						className='text-[#418dff] cursor-pointer'
						onClick={() => handleEdit(params?.row?.id)}
					/>
					<MdDeleteOutline
						className='text-red-600 cursor-pointer'
						onClick={() => handleDelete(params?.row?.id)}
					/>
				</div>
			),
		},
	];

	const handleDelete = (id) => {
		const check = window.confirm("Bạn có muốn xoá sản phẩm này chứ");
		if (check) {
			axiosInstance
				.delete(`/api/categories/${id}`)
				.then((res) => {
					if (res.statusCode === 200) {
						setCategory(res?.data);
						setReRender((prev) => !prev);
						toast.success("Xoá thành công");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const handleEdit = (id) => {
		setOpenModalAdd(true);
		axiosInstance
			.get(`/api/categories/${id}`)
			.then((res) => {
				if (res.statusCode === 200) {
					setCategory(res?.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const paginationModel = { page: 0, pageSize: 5 };

	return (
		<div className='mt-5'>
			<DataGrid
				rows={categories?.map((c, index) => {
					return { ...c, index: index + 1 };
				})}
				columns={columns}
				initialState={{ pagination: { paginationModel } }}
				pageSizeOptions={[5, 10]}
			/>

			{/* MODAL EDIT */}
			<ModalCategory
				openModalAdd={openModalAdd}
				setOpenModalAdd={setOpenModalAdd}
				setReRender={setReRender}
				category={category}
			/>
		</div>
	);
}
