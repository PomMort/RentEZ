import React, { useEffect, useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import ProductTable from "./components/ProductTable";
import { Button } from "@mui/material";
import ModalProducts from "./components/ModalProduct";

export default function ManageProducts() {
	const [openModalAdd, setOpenModalAdd] = useState(false);
	const [reRender, setReRender] = useState(true);

	const [products, setProducts] = useState([]);

	useEffect(() => {
		axiosInstance
			.get("/api/products/own-product")
			.then((res) => {
				if (res.statusCode === 200) {
					setProducts(res.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [reRender]);
	return (
		<div className='mt-5'>
			<Button
				variant='contained'
				color='success'
				onClick={() => setOpenModalAdd(true)}
			>
				Thêm
			</Button>
			<ProductTable products={products} setReRender={setReRender} />

			{/* MODAL ADD */}
			<ModalProducts
				openModalAdd={openModalAdd}
				setOpenModalAdd={setOpenModalAdd}
				setReRender={setReRender}
			/>
		</div>
	);
}
