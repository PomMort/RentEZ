import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoriesTable from "./components/CategoriesTable";
import ModalCategory from "./components/ModalCategory";
import axiosInstance from "../../util/axiosInstance";

export default function ManageCategories() {
	const [openModalAdd, setOpenModalAdd] = useState(false);
	const [reRender, setReRender] = useState(true);

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axiosInstance
			.get("/api/categories")
			.then((res) => {
				if (res.statusCode === 200) {
					const formatData = res.data.map((c, index) => {
						return { ...c, id: index + 1 };
					});
					setCategories(formatData);
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

			<CategoriesTable categories={categories} setReRender={setReRender} />

			{/* MODAL ADD */}
			<ModalCategory
				openModalAdd={openModalAdd}
				setOpenModalAdd={setOpenModalAdd}
				setReRender={setReRender}
			/>
		</div>
	);
}
