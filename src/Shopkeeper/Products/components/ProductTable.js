import { Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import ModalProducts from "./ModalProduct";
import { useState } from "react";
import axiosInstance from "../../../util/axiosInstance";
import { toast } from "react-toastify";

export default function ProductTable({ products, setReRender }) {
	const [openModalAdd, setOpenModalAdd] = useState(false);
	const [product, setProduct] = useState();
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
			field: "image",
			headerName: "Ảnh",
			renderCell: (params) => {
				return (
					<Avatar
						alt=''
						src={params?.row?.image}
						variant='rounded'
						sx={{ width: 40, height: 40 }}
					/>
				);
			},
		},
		{
			field: "productName",
			headerName: "Tên sản phẩm",
			width: 150,
		},
		{
			field: "categoryName",
			headerName: "Loại sản phẩm",
			width: 150,
		},
		{
			field: "price",
			headerName: "Giá",
			width: 150,
			renderCell: (params) => (
				<div>
					<span>{params?.row?.price.toLocaleString()}đ</span>
				</div>
			),
		},
		{
			field: "deposit",
			headerName: "Tiền cọc",
			width: 150,
			renderCell: (params) => (
				<div>
					<span>{params?.row?.deposit.toLocaleString()}đ</span>
				</div>
			),
		},
		{ field: "rentedCount", headerName: "Số lần đã thuê", width: 150 },
		{ field: "quantity", headerName: "Số lượng", width: 150 },
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

	const paginationModel = { page: 0, pageSize: 5 };

	const handleDelete = (id) => {
		const check = window.confirm("Bạn có muốn xoá sản phẩm này chứ");
		if (check) {
			axiosInstance
				.delete(`/api/products/${id}`)
				.then((res) => {
					if (res.statusCode === 200) {
						setProduct(res?.data);
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
			.get(`/api/products/${id}`)
			.then((res) => {
				if (res.statusCode === 200) {
					setProduct(res?.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='mt-5'>
			<DataGrid
				rows={products?.map((p, index) => {
					return { ...p, index: index + 1 };
				})}
				columns={columns}
				initialState={{ pagination: { paginationModel } }}
				pageSizeOptions={[5, 10]}
			/>

			{/* MODAL EDIT */}
			<ModalProducts
				openModalAdd={openModalAdd}
				setOpenModalAdd={setOpenModalAdd}
				setReRender={setReRender}
				product={product}
			/>
		</div>
	);
}
