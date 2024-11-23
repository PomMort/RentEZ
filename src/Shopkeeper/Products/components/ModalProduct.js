import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../util/axiosInstance";

const initProduct = {
	productName: "",
	categoryId: 0,
	quantity: 0,
	allowRentBeforeDays: 0,
	size: 0,
	price: 0,
	rentPrices: [0, 0, 0, 0, 0, 0, 0],
	depositRate: 0,
	description: "",
	image: "",
	mass: 0,
	long: 0,
	width: 0,
	height: 0,
};

export default function ModalProducts({
	openModalAdd,
	setOpenModalAdd,
	setReRender,
	product,
}) {
	const [infoProduct, setInfoProduct] = useState(initProduct);

	const [errorsField, setErrorsField] = useState({
		Long: "",
		Mass: "",
		Size: "",
		Price: "",
		Width: "",
		Height: "",
		Quantity: "",
		DepositRate: "",
		AllowRentBeforeDays: "",
	});

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axiosInstance
			.get("/api/categories")
			.then((res) => {
				if (res.statusCode === 200) {
					setCategories(res?.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// Reset lại form
	useEffect(() => {
		setErrorsField({});
		setInfoProduct(initProduct);
		if (product) {
			setInfoProduct(product);
		}
	}, [openModalAdd, product]);

	const handleSubmit = () => {
		const formatData = { ...infoProduct, DepositRate: infoProduct.depositRate / 100 }
		if (!product) {
			axiosInstance
				.post("/api/products", formatData)
				.then((res) => {
					if (res.statusCode === 200) {
						toast.success("Thêm mới thành công");
						setReRender((prev) => !prev);
						setOpenModalAdd(false);
					}
				})
				.catch((err) => {
					console.log(err);
					setErrorsField(err?.errors);
					toast.error(err.Message);
				});
		} else {
			axiosInstance
				.put(`/api/products/${product?.id}`, formatData)
				.then((res) => {
					if (res.statusCode === 200) {
						toast.success("Cập nhật thành công");
						setReRender((prev) => !prev);
						setOpenModalAdd(false);
					}
				})
				.catch((err) => {
					console.log(err);
					setErrorsField(err?.errors);
					toast.error(err.Message);
				});
		}
	};

	return (
		<div>
			<Modal
				open={openModalAdd}
				onClose={() => setOpenModalAdd(false)}
				keepMounted
			>
				<div className='min-w-[900px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
					<div className='mt-5 px-5 text-lg'>Thêm sản phẩm</div>
					<hr />
					<div className='px-5 my-5 grid grid-cols-3 gap-5'>
						<div>
							<TextField
								id='outlined-basic'
								label='Tên sản phẩm'
								variant='outlined'
								sx={{ width: "100%" }}
								size='small'
								value={infoProduct.productName}
								onChange={(e) =>
									setInfoProduct({
										...infoProduct,
										productName: e.target.value,
									})
								}
							/>
							{errorsField?.["ProductName"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["ProductName"][0]}
								</p>
							)}
						</div>
						<div>
							<FormControl fullWidth>
								<InputLabel id='demo-simple-select-label'>
									Thể loại
								</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={infoProduct.categoryId}
									label='Thể loại'
									size='small'
									onChange={(e) =>
										setInfoProduct({
											...infoProduct,
											categoryId: +e.target.value,
										})
									}
								>
									<MenuItem value={0}>Chọn thể loại</MenuItem>
									{categories?.map((c) => (
										<MenuItem value={c?.id}>
											{c.categoryName}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							{errorsField?.["CategoryId"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["CategoryId"][0]}
								</p>
							)}
						</div>
						<div>
							<TextField
								id='outlined-basic'
								label='Số lượng'
								variant='outlined'
								sx={{ width: "100%" }}
								size='small'
								type='number'
								InputProps={{ inputProps: { min: 1, step: 1 } }}
								value={infoProduct.quantity}
								onChange={(e) =>
									setInfoProduct({
										...infoProduct,
										quantity: +e.target.value,
									})
								}
							/>
							{errorsField?.["Quantity"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["Quantity"][0]}
								</p>
							)}
						</div>
						<div>
							<TextField
								id='outlined-basic'
								label='Thuê trước mấy ngày'
								variant='outlined'
								sx={{ width: "100%" }}
								size='small'
								type='number'
								InputProps={{ inputProps: { min: 1, step: 1 } }}
								value={infoProduct.allowRentBeforeDays}
								onChange={(e) =>
									setInfoProduct({
										...infoProduct,
										allowRentBeforeDays: +e.target.value,
									})
								}
							/>
							{errorsField?.["AllowRentBeforeDays"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["AllowRentBeforeDays"][0]}
								</p>
							)}
						</div>
						<div>
							<TextField
								id='outlined-basic'
								label='Kích thước'
								variant='outlined'
								sx={{ width: "100%" }}
								size='small'
								type='number'
								InputProps={{ inputProps: { min: 1, step: 1 } }}
								value={infoProduct.size}
								onChange={(e) =>
									setInfoProduct({
										...infoProduct,
										size: +e.target.value,
									})
								}
							/>
							{errorsField?.["Size"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["Size"][0]}
								</p>
							)}
						</div>
						<div>
							<TextField
								id='outlined-basic'
								label='Giá'
								variant='outlined'
								sx={{ width: "100%" }}
								size='small'
								type='number'
								InputProps={{ inputProps: { min: 1, step: 1 } }}
								value={infoProduct.price}
								onChange={(e) =>
									setInfoProduct({
										...infoProduct,
										price: +e.target.value,
									})
								}
							/>
							{errorsField?.["Price"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["Price"][0]}
								</p>
							)}
						</div>
						<div>
							<TextField
								id='outlined-basic'
								label='Tỷ lệ tiền cọc'
								variant='outlined'
								sx={{ width: "100%" }}
								size='small'
								type='number'
								InputProps={{ inputProps: { min: 1, step: 1 } }}
								value={infoProduct.depositRate}

								onChange={(e) =>
									setInfoProduct({
										...infoProduct,
										depositRate: +e.target.value,
									})
								}
							/>
							{errorsField?.["DepositRate"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["DepositRate"][0]}
								</p>
							)}
						</div>
						<div>
							<TextField
								id='outlined-basic'
								label='Khối lượng'
								variant='outlined'
								sx={{ width: "100%" }}
								size='small'
								type='number'
								InputProps={{ inputProps: { min: 1, step: 1 } }}
								value={infoProduct.mass}
								onChange={(e) =>
									setInfoProduct({
										...infoProduct,
										mass: +e.target.value,
									})
								}
							/>
							{errorsField?.["Mass"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["Mass"][0]}
								</p>
							)}
						</div>
						<div>
							<TextField
								id='outlined-basic'
								label='Chiều dài'
								variant='outlined'
								sx={{ width: "100%" }}
								size='small'
								type='number'
								InputProps={{ inputProps: { min: 1, step: 1 } }}
								value={infoProduct.long}
								onChange={(e) =>
									setInfoProduct({
										...infoProduct,
										long: +e.target.value,
									})
								}
							/>
							{errorsField?.["Long"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["Long"][0]}
								</p>
							)}
						</div>
						<div>
							<TextField
								id='outlined-basic'
								label='Chiều rộng'
								variant='outlined'
								sx={{ width: "100%" }}
								size='small'
								type='number'
								InputProps={{ inputProps: { min: 1, step: 1 } }}
								value={infoProduct.width}
								onChange={(e) =>
									setInfoProduct({
										...infoProduct,
										width: +e.target.value,
									})
								}
							/>
							{errorsField?.["Width"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["Width"][0]}
								</p>
							)}
						</div>
						<div>
							<TextField
								id='outlined-basic'
								label='Chiều cao'
								variant='outlined'
								sx={{ width: "100%" }}
								size='small'
								type='number'
								InputProps={{ inputProps: { min: 1, step: 1 } }}
								value={infoProduct.height}
								onChange={(e) =>
									setInfoProduct({
										...infoProduct,
										height: +e.target.value,
									})
								}
							/>
							{errorsField?.["Height"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["Height"][0]}
								</p>
							)}
						</div>
						<div>
							<TextField
								id='outlined-basic'
								label='URL Ảnh'
								variant='outlined'
								sx={{ width: "100%" }}
								size='small'
								value={infoProduct.image}
								onChange={(e) =>
									setInfoProduct({
										...infoProduct,
										image: e.target.value,
									})
								}
							/>
							{errorsField?.["Image"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["Image"][0]}
								</p>
							)}
						</div>
						<div className='col-span-3 grid grid-cols-7 gap-5'>
							{infoProduct?.rentPrices?.map((_, index) => (
								<TextField
									id={`outlined-basic-${index}`}
									label={`Giá ngày ${index + 1}`}
									variant='outlined'
									sx={{ width: "100%" }}
									size='small'
									type='number'
									InputProps={{ inputProps: { min: 1, step: 1 } }}
									value={infoProduct.rentPrices[index]}
									onChange={(e) =>
										setInfoProduct({
											...infoProduct,
											rentPrices: infoProduct?.rentPrices?.map(
												(price, i) =>
													i === index ? +e.target.value : price
											),
										})
									}
								/>
							))}
						</div>
						<div className='col-span-3'>
							<TextField
								id='outlined-basic'
								label='Mô tả'
								variant='outlined'
								sx={{ width: "100%" }}
								size='small'
								value={infoProduct.description}
								onChange={(e) =>
									setInfoProduct({
										...infoProduct,
										description: e.target.value,
									})
								}
							/>
							{errorsField?.["Description"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["Description"][0]}
								</p>
							)}
						</div>

						<div className='col-span-3 flex flex-row-reverse'>
							<Button variant='contained' onClick={handleSubmit}>
								{!product ? "Thêm" : "Cập nhật"}
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
