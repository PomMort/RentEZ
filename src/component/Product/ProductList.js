import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import axiosInstace from "../../util/axiosInstance";
import { Button, TextField } from "@mui/material";

export default function ProductList() {
	const [productList, setProductList] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const [categorySelected, setCategorySelected] = useState("");
	const [searchName, setSearchName] = useState("");
	const [flagClickSearch, setFlagClickSearch] = useState(false);

	useEffect(() => {
		axiosInstace
			.get(
				`/api/products/category/shop?SearchTerm=${searchName}&categoryId=${categorySelected}`
			)
			.then((res) => {
				if (res?.statusCode === 200) {
					setProductList(res?.data?.items);
				}
			})
			.catch((err) => {
				console.log(err);
				setProductList([]);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categorySelected, flagClickSearch]);

	useEffect(() => {
		axiosInstace
			.get(`/api/categories`)
			.then((res) => {
				if (res?.statusCode === 200) {
					setCategoryList(res?.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className='px-4 sm:px-6 lg:px-8 flex flex-col gap-5'>
			<div className='flex items-center gap-3 w-96'>
				<TextField
					id='outlined-basic'
					label='Tìm kiếm sản phẩm'
					variant='outlined'
					size='small'
					sx={{ width: "100%" }}
					onChange={(e) => setSearchName(e.target.value)}
				/>
				<Button
					variant='contained'
					className='text-nowrap'
					onClick={() => setFlagClickSearch((prev) => !prev)}
				>
					Tìm kiếm
				</Button>
			</div>
			<div>
				<button
					className={`rounded-2xl px-3 py-1 mx-1 font-semibold ${
						// eslint-disable-next-line eqeqeq
						!categorySelected
							? "bg-yellowCustom text-white"
							: "bg-[#ccc8] text-black opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all ease-linear"
					}`}
					onClick={() => setCategorySelected("")}
				>
					Tất cả
				</button>
				{categoryList?.map((category) => (
					<button
						key={category?.id}
						className={`rounded-2xl px-3 py-1 mx-1 font-semibold ${
							// eslint-disable-next-line eqeqeq
							category?.id == categorySelected
								? "bg-yellowCustom text-white"
								: "bg-[#ccc8] text-black opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all ease-linear"
						}`}
						onClick={() => setCategorySelected(category?.id)}
					>
						{category.categoryName}
					</button>
				))}
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{productList?.map((product) => (
					<div
						key={product?.id}
						className='rounded-lg shadow-md hover:shadow-lg mb-10 shadow-gray-500 transition-shadow overflow-hidden'
					>
						<Link to={`/Detail/${product.id}`}>
							<ProductItem product={product} />
						</Link>
					</div>
				))}
			</div>
			{!productList?.length && (
				<div className='flex flex-col justify-center items-center'>
					<img
						src='https://www.new4you.in/img/no_products_found.png'
						alt=''
					/>
					<p className='text-lg font-bold uppercase'>
						Chưa có sản phẩm nào được trưng bày
					</p>
				</div>
			)}
		</div>
	);
}
