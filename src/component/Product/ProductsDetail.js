import React, { useEffect, useState } from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Grid2, MenuItem, Rating, Select } from "@mui/material";
import axiosInstance from "../../util/axiosInstance";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { getFutureDate } from "../../util/common";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const ProductDetail = () => {
	const { user } = useSelector((state) => state.productListData);
	const [selectedTab, setSelectedTab] = useState("description"); // Quản lý tab hiện tại
	const { id } = useParams();
	const [product, setProduct] = useState();
	const [rating, setRating] = useState(0);
	const [relatedProduct, setRelatedProduct] = useState([]);
	const [datesRent, setDatesRent] = useState([]); // render ra ngày cần thuê
	const [feedbacks, setFeedbacks] = useState([]);

	const [dayRent, setDayRent] = useState(1); // số ngày thuê
	const [dateRent, setDateRent] = useState(); // chọn này thuê

	const dispatch = useDispatch();

	useEffect(() => {
		axiosInstance
			.get(`/api/products/${id}`)
			.then((res) => {
				if (res?.statusCode === 200) {
					setRating(res?.data?.rating);
					setProduct(res?.data);
				} else {
					console.log(res);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	useEffect(() => {
		axiosInstance
			.get(`/api/feedbacks?ProductId=${id}`)
			.then((res) => {
				if (res?.statusCode === 200) {
					setFeedbacks(res?.data?.items);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	useEffect(() => {
		if (product?.categoryId) {
			axiosInstance
				.get(
					`/api/products/category/shop?categoryId=${product?.categoryId}`
				)
				.then((res) => {
					if (res.statusCode === 200) {
						setRelatedProduct(res.data.items);
					} else {
						console.log(res);
					}
				});
		}
	}, [product]);

	useEffect(() => {
		const dates = [];
		Array(14)
			.fill()
			.map((_, index) => {
				return index + 1;
			})
			.slice(product?.allowRentBeforeDays)
			.forEach((d) => {
				dates.push(getFutureDate(new Date().toDateString(), d));
			});
		setDatesRent(dates);
		setDateRent(dates[0]);
	}, [product]);

	// Hàm để chuyển tab nội dung
	const renderContent = () => {
		switch (selectedTab) {
			case "description":
				return (
					<div>
						<p>{product?.description}</p>
					</div>
				);
			case "reviews":
				if (feedbacks?.length === 0) {
					return <p>Chưa có đánh giá nào</p>;
				}
				return (
					<div className='flex flex-col gap-3'>
						{feedbacks?.map((feedback) => (
							<div className='flex gap-5 ml-5'>
								<img
									src={feedback?.avatar}
									alt=''
									className='size-10 object-cover rounded-full'
									onError={(e) => {
										e.target.src =
											"https://lh4.googleusercontent.com/proxy/0rCwwypfFxmFEtvRQoQ83lwTs1T_Y9qsJSp7sMKQ5LXHi89tYhAiRXbHOyoqljagJCmsvpHx7wmLGHS2rhJzPxpN6Wu00Mtk9POTrz0QysbBkdX9FJsk"; // Đường dẫn ảnh thay thế
									}}
								/>
								<div className='flex flex-col gap-1'>
									<div className='flex items-center gap-3'>
										<p>
											<strong>{feedback?.customerName}</strong>
										</p>
										<Rating
											name='read-only'
											value={feedback?.rating}
											readOnly
											size='small'
										/>
										<span className='text-xs font-bold text-gray-500'>
											{dayjs(feedback?.feedbackCreatedTime).format(
												"DD/MM/YYYY HH:mm:ss"
											)}
										</span>
									</div>
									<p>{feedback?.reviewContent}</p>
								</div>
							</div>
						))}
					</div>
				);
			case "shop-info":
				return (
					<div className='flex gap-5'>
						<img
							src={product?.shopAvatar}
							alt=''
							className='size-20 object-cover'
						/>
						<div className='flex flex-col justify-between'>
							<p>
								Tên shop: <strong>{product?.shopName}</strong>
							</p>
							<p>Email: {product?.shopEmail}</p>
							<p>Địa chỉ: {product?.shopAddress}</p>
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	const handleAddCart = () => {
		if (user?.shopId === product?.shopId) {
			toast.error("Không thể đặt hàng sản phẩm của mình");
			return;
		}

		toast.success("Đã thêm sản phẩm vào giỏ hàng");
		dispatch({
			type: "ADD_TO_CART",
			payload: {
				product,
				quantity: 1,
				rentDateTime: dateRent,
				returnDateTime: getFutureDate(dateRent.isoDate, dayRent),
				dayRent,
			},
		});
	};

	return (
		<div className='container mx-auto p-6'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{/* Phần ảnh sản phẩm */}
				<div className='flex flex-col items-center relative'>
					<div className='w-full md:w-4/5 lg:w-3/5 mb-4 h-[500px]'>
						<img
							src={product?.image}
							alt='Product'
							className='w-full h-full object-cover object-center'
						/>
					</div>
				</div>

				{/* Phần thông tin sản phẩm */}
				<div className='flex flex-col justify-start'>
					{/* Tên sản phẩm */}
					<h2 className='text-2xl font-bold mb-2'>
						{product?.productName}
					</h2>

					{/* Giá sản phẩm */}
					<div className='flex items-center mb-4'>
						<span className='text-red-500 text-2xl font-bold mr-4'>
							{product?.rentPrices[dayRent - 1].toLocaleString()}đ
						</span>
					</div>

					<div className='mb-4'>
						<p className='font-semibold'>Số ngày thuê: {dayRent} ngày</p>
						<div className='flex items-center gap-3 mt-2'>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={dayRent}
								onChange={(e) => setDayRent(e.target.value)}
								size='small'
							>
								{product?.rentPrices?.map((_, index) => (
									<MenuItem value={index + 1}>
										{index + 1} ngày
									</MenuItem>
								))}
							</Select>
						</div>
					</div>

					<div className='mb-4'>
						<p className='font-semibold'>Ngày nhận đồ:</p>
						<div className='flex items-center gap-3 mt-2'>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={dateRent ? dateRent.isoDate : ""}
								onChange={(e) => {
									const selectedDate = datesRent.find(
										(date) => date.isoDate === e.target.value
									);
									setDateRent(selectedDate);
								}}
								size='small'
							>
								{datesRent.map((date, index) => (
									<MenuItem value={date.isoDate} key={index}>
										{date.formattedDate}
									</MenuItem>
								))}
							</Select>
						</div>
					</div>

					{/* Ngày dự kiến */}
					<div className='mb-4'>
						<p className='font-semibold flex items-center gap-1'>
							Đánh giá:{" "}
							<Rating name='read-only' value={rating} readOnly />(
							{product?.ratingCount})
						</p>
					</div>

					{/* Nút Add to Cart và Add to WishList */}
					<div className='flex gap-4 mt-6'>
						<button
							className='flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded'
							onClick={handleAddCart}
						>
							<FaCartPlus />
							Add To Cart
						</button>
						<button className='flex items-center gap-2 border-2 border-yellow-400 text-yellow-500 px-6 py-3 rounded'>
							<FaHeart />
							Add To WishList
						</button>
					</div>
				</div>
			</div>

			{/* Tabs Miêu Tả, Đánh Giá, Thông Tin Shop */}
			<div className='flex border-b border-gray-300 mb-4 mt-6'>
				<button
					className={`px-4 py-2 ${selectedTab === "description" ? "text-blue-600 border-b-2 border-blue-600" : ""}`}
					onClick={() => setSelectedTab("description")}
				>
					Miêu Tả
				</button>
				<button
					className={`px-4 py-2 ${selectedTab === "reviews" ? "text-blue-600 border-b-2 border-blue-600" : ""}`}
					onClick={() => setSelectedTab("reviews")}
				>
					Đánh Giá ({product?.ratingCount})
				</button>
				<button
					className={`px-4 py-2 ${selectedTab === "shop-info" ? "text-blue-600 border-b-2 border-blue-600" : ""}`}
					onClick={() => setSelectedTab("shop-info")}
				>
					Thông Tin Shop
				</button>
			</div>

			{/* Nội dung hiển thị theo tab được chọn */}
			<div className='mb-8'>{renderContent()}</div>

			{/* Danh sách sản phẩm khác */}
			<h2 className='text-2xl font-bold mb-4'>Những Sản Phẩm Khác</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
				{relatedProduct.map((product) => (
					<Grid2
						size={{ lg: 3, md: 6, sm: 12 }}
						className='rounded-lg shadow hover:shadow-lg mb-10 shadow-gray-500'
						style={{ cursor: "pointer" }}
						key={product?.id}
					>
						<Link key={product?.id} to={`/Detail/${product.id}`}>
							<ProductItem product={product} />
						</Link>
					</Grid2>
				))}
			</div>
		</div>
	);
};

export default ProductDetail;
