import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import axiosInstance from "../../../util/axiosInstance";
import { toast } from "react-toastify";
import ModalVoucher from "./ModalVoucher";
import dayjs from "dayjs";

export default function VoucherShop({ vouchers, setReRender }) {
	const [voucher, setVoucher] = useState();
	const [openModalAdd, setOpenModalAdd] = useState(false);

	const columns = [
		{ field: "id", headerName: "ID", width: 70 },
		{ field: "code", headerName: "CODE", width: 120 },
		{ field: "name", headerName: "Tên voucher", width: 250 },
		{ field: "type", headerName: "Loại", width: 100 },
		{ field: "description", headerName: "Mô tả", width: 250 },
		{
			field: "startDate",
			headerName: "Ngày bắt đầu",
			width: 120,
			renderCell: (params) => {
				return (
					<div>{dayjs(params?.row?.startDate).format("DD/MM/YYYY")}</div>
				);
			},
		},
		{
			field: "endDate",
			headerName: "Ngày kết thúc",
			width: 120,
			renderCell: (params) => {
				return (
					<div>{dayjs(params?.row?.endDate).format("DD/MM/YYYY")}</div>
				);
			},
		},
		{ field: "status", headerName: "Trạng thái", width: 120 },
		{
			field: "value",
			headerName: "Giảm",
			renderCell: (params) => {
				return (
					<div>
						{Number.isInteger(params?.row?.value)
							? (params?.row?.value).toLocaleString() + "đ"
							: params?.row?.value * 100 + "%"}
					</div>
				);
			},
		},
		{
			field: "action",
			headerName: "Hành động",
			renderCell: (params) => {
				return (
					<div className='flex items-center justify-center gap-5 h-full text-xl'>
						<MdOutlineModeEdit
							className='text-[#418dff] cursor-pointer'
							onClick={() => handleEdit(params?.row?.id)}
						/>
						<MdDeleteOutline
							className='text-red-500 cursor-pointer'
							onClick={() => handleDelete(params?.row?.id)}
						/>
					</div>
				);
			},
		},
	];

	const paginationModel = { page: 0, pageSize: 5 };

	const handleDelete = (id) => {
		const check = window.confirm("Bạn có muốn xoá voucher này không?");
		if (check) {
			axiosInstance
				.delete(`/api/vouchers/${id}`)
				.then((res) => {
					if (res.statusCode === 200) {
						toast.success("Xoá voucher thành công");
						setReRender((prev) => !prev);
					}
				})
				.catch((err) => {
					console.log(err);
					toast.error("Xoá voucher thất bại");
				});
		}
	};

	const handleEdit = (id) => {
		axiosInstance
			.get(`/api/vouchers/${id}`)
			.then((res) => {
				if (res.statusCode === 200) {
					setVoucher(res.data);
					setOpenModalAdd(true);
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error("Lấy dữ liệu không thành công");
			});
	};

	return (
		<div className='mt-5'>
			<DataGrid
				rows={vouchers}
				columns={columns}
				initialState={{ pagination: { paginationModel } }}
				pageSizeOptions={[5, 10]}
			/>

			{/* MODAL */}
			<ModalVoucher
				openModalAdd={openModalAdd}
				setOpenModalAdd={setOpenModalAdd}
				setReRender={setReRender}
				_voucher={voucher}
			/>
		</div>
	);
}
