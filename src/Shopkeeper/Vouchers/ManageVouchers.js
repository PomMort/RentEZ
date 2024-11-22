import React, { useEffect, useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import VoucherTable from "../../Admin/Vouchers/components/VoucherTable";
import { Button } from "@mui/material";
import ModalVoucher from "../../Admin/Vouchers/components/ModalVoucher";
import { useSelector } from "react-redux";

export default function ManageVouchers() {
	const [vouchers, setVouchers] = useState([]);
	const [reRender, setReRender] = useState(false);
	const { user } = useSelector((state) => state.productListData);

	const [openModalAdd, setOpenModalAdd] = useState(false);

	useEffect(() => {
		axiosInstance
			.get(`/api/vouchers?ShopId=${user?.shopId}`)
			.then((res) => {
				if (res?.statusCode === 200) {
					setVouchers(res?.data?.items);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [reRender, user?.shopId]);

	return (
		<div className='mt-5'>
			<Button
				variant='contained'
				color='success'
				onClick={() => setOpenModalAdd(true)}
			>
				Thêm
			</Button>
			<VoucherTable setReRender={setReRender} vouchers={vouchers} />

			{/* MODAL */}
			<ModalVoucher
				openModalAdd={openModalAdd}
				setOpenModalAdd={setOpenModalAdd}
				setReRender={setReRender}
			/>
		</div>
	);
}
