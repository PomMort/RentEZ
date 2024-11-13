import { Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../util/axiosInstance";

export default function ModalCategory({
	openModalAdd,
	setOpenModalAdd,
	setReRender,
	category,
}) {
	const [categoryName, setCategoryName] = useState();
	const [description, setDescription] = useState();

	useEffect(() => {
		if (category) {
		}
	}, [category]);

	const handleSubmit = () => {
		if (!categoryName || !description) {
			toast.info("Cần nhập đầy đủ các trường");
			return;
		}

		if (!category) {
			axiosInstance
				.post("/api/categories", { categoryName, description })
				.then((res) => {
					if (res.statusCode === 200) {
						toast.success("Thêm mới thành công");
						setReRender((prev) => !prev);
						setOpenModalAdd(false);
					}
				})
				.catch((err) => {
					console.log(err);
					toast.error(err.Message);
				});
		} else {
			// EDIT
		}
	};

	return (
		<div>
			<Modal
				open={openModalAdd}
				onClose={() => setOpenModalAdd(false)}
				keepMounted
			>
				<div className='min-w-[500px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
					<div className='mt-5 px-5 text-lg'>Thêm danh mục</div>
					<hr />
					<div className='px-5 my-5 flex flex-col gap-5'>
						<TextField
							id='outlined-basic'
							label='Tên danh mục'
							variant='outlined'
							sx={{ width: "100%" }}
							value={categoryName}
							onChange={(e) => setCategoryName(e.target.value)}
						/>
						<TextField
							id='outlined-basic'
							label='Mô tả'
							variant='outlined'
							sx={{ width: "100%" }}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<Button variant='contained' onClick={handleSubmit}>
							Thêm
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
