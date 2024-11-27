import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
	const { cartList, isLoggedIn, user } = useSelector(
		(state) => state.productListData
	);
	const [cart, setCart] = useState([]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch({ type: "LOAD_CART" });
	}, [dispatch]);

	useEffect(() => {
		const cartFormat = cartList.map((shop) => {
			const updatedProducts = shop.products.map((product) => ({
				...product,
				selected: false,
			}));
			return {
				...shop,
				products: updatedProducts,
			};
		});

		setCart(cartFormat);
	}, [cartList]);

	// Hàm để cập nhật số lượng sản phẩm
	const updateQuantity = (shopIndex, productIndex, delta) => {
		dispatch({
			type: "CHANGE_QUANTITY",
			payload: { shopIndex, productIndex, delta },
		});
	};

	// Hàm chọn hoặc bỏ chọn tất cả sản phẩm trong một shop
	const toggleSelectAllInShop = (shopIndex, selected) => {
		const newCartData = [...cart];
		newCartData[shopIndex].products = newCartData[shopIndex].products.map(
			(product) => ({
				...product,
				selected: selected,
			})
		);
		setCart(newCartData);
	};

	// Hàm chọn/bỏ chọn từng sản phẩm
	const toggleSelectProduct = (shopIndex, productIndex) => {
		const newCartData = [...cart];
		newCartData[shopIndex].products[productIndex].selected =
			!newCartData[shopIndex].products[productIndex].selected;
		setCart(newCartData);
	};

	// Hàm tính tổng tiền
	const calculateTotal = () => {
		return cart.reduce((total, c) => {
			return (
				total +
				c.products.reduce((_total, product) => {
					return product.selected
						? _total +
								product?.product?.rentPrices?.[product?.dayRent] *
									product.quantity
						: _total;
				}, 0)
			);
		}, 0);
	};

	const handleClickPayment = () => {
		if (!isLoggedIn) {
			toast.info("Bạn cần đăng nhập để có thể thanh toán");
			return;
		}

		if (!user?.bankId || !user?.accountNo || !user?.accountName) {
			toast.info("Vui lòng cập nhật thông tin thẻ");
			return;
		}

		const productIdListSelected = [];
		cart.forEach((c) => {
			c?.products?.forEach((product) => {
				if (product.selected) {
					productIdListSelected.push(product?.product?.id);
				}
			});
		});

		if (productIdListSelected.length === 0) {
			toast.info("Phải chọn ít nhất 1 món đồ để thanh toán");
			return;
		}

		dispatch({
			type: "PRODUCTS_PAYMENT",
			payload: { productIdListSelected },
		});

		navigate("/order");
	};

	return (
		<>
			{cart.length ? (
				<div className='container mx-auto p-4 sm:p-6 bg-white'>
					<table className='table-auto w-full text-left text-sm sm:text-base'>
						<thead>
							<tr>
								<th className='border-b py-3'>Sản phẩm</th>
								<th className='border-b py-3 hidden sm:table-cell'>
									Đơn giá
								</th>
								<th className='border-b py-3'>Số lượng</th>
								<th className='border-b py-3 hidden sm:table-cell'>
									Số tiền
								</th>
								<th className='border-b py-3 text-center'>Hành động</th>
							</tr>
						</thead>
						<tbody>
							{cart.map((c, index) => {
								const allSelected = c.products.every(
									(product) => product.selected
								);

								return (
									<React.Fragment key={index}>
										<tr>
											<td
												colSpan='5'
												className='bg-[#f5f5f5] py-2 font-bold'
											>
												<label className='inline-flex items-center ml-2 sm:ml-[20px]'>
													<input
														type='checkbox'
														checked={allSelected}
														onChange={(e) =>
															toggleSelectAllInShop(
																index,
																e.target.checked
															)
														}
														className='h-5 w-5 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400'
													/>
													<div className='bg-yellow-400 p-2 border-r-2 ml-2 text-sm sm:text-base'>
														Yêu thích +
													</div>
													<p className='ml-2 text-sm sm:text-base'>
														{c.shop}
													</p>
												</label>
											</td>
										</tr>
										{c.products.map((product, productIndex) => (
											<tr key={product.id} className='border-b'>
												<td className='py-4 flex flex-col sm:flex-row sm:items-center'>
													<div className='flex items-center mb-2 sm:mb-0'>
														<input
															type='checkbox'
															checked={product.selected}
															onChange={() =>
																toggleSelectProduct(
																	index,
																	productIndex
																)
															}
															className='h-5 w-5 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400 mr-2'
														/>
														<img
															src={product?.product?.image}
															alt={product?.product?.productName}
															className='w-16 h-16 object-cover mr-4'
														/>
													</div>
													<div className='text-sm sm:text-base'>
														<p className='font-bold'>
															{product?.product?.productName}
														</p>
														<p className='text-gray-500'>
															Tồn kho:{" "}
															{product?.product?.quantity}
														</p>
														<p className='text-gray-500'>
															Nhận:{" "}
															{
																product?.rentDateTime
																	?.formattedDate
															}{" "}
															-{" "}
															{
																product?.returnDateTime
																	?.formattedDate
															}{" "}
															({product?.dayRent} ngày)
														</p>
													</div>
												</td>
												<td className='hidden sm:table-cell'>
													{product?.product?.rentPrices?.[
														product?.dayRent
													]?.toLocaleString()}
													đ
												</td>
												<td>
													<div className='flex items-center'>
														<button
															className='px-2 py-1 border'
															onClick={() =>
																updateQuantity(
																	index,
																	productIndex,
																	-1
																)
															}
															disabled={product?.quantity <= 1}
														>
															-
														</button>
														<span className='px-4'>
															{product?.quantity}
														</span>
														<button
															className='px-2 py-1 border'
															onClick={() =>
																updateQuantity(
																	index,
																	productIndex,
																	1
																)
															}
															disabled={
																product?.quantity >=
																product?.product?.quantity
															}
														>
															+
														</button>
													</div>
												</td>
												<td className='hidden sm:table-cell font-bold text-red-500'>
													{(
														product?.product?.rentPrices?.[
															product?.dayRent
														] * product?.quantity
													)?.toLocaleString()}
													đ
												</td>
												<td>
													<div className='flex items-center justify-center'>
														<MdDeleteOutline
															className='cursor-pointer hover:opacity-80'
															size={20}
															color='red'
															onClick={() => {
																const check = window.confirm(
																	"Do you want to delete this product?"
																);
																if (check) {
																	dispatch({
																		type: "REMOVE_PRODUCT",
																		payload: {
																			shopIndex: index,
																			productIndex,
																		},
																	});
																}
															}}
														/>
													</div>
												</td>
											</tr>
										))}
									</React.Fragment>
								);
							})}
						</tbody>
					</table>

					<div className='mt-6 flex flex-col sm:flex-row-reverse justify-between items-center'>
						<div className='flex items-center mb-4 sm:mb-0'>
							<span className='mr-4 text-lg sm:text-xl font-bold'>
								Tổng: {calculateTotal()?.toLocaleString()}đ
							</span>
							<button
								className='bg-yellow-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-yellow-500'
								onClick={handleClickPayment}
							>
								Thanh toán
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className='p-10 flex flex-col items-center justify-center'>
					<img
						src='https://cdni.iconscout.com/illustration/premium/thumb/empty-shopping-cart-illustration-download-in-svg-png-gif-file-formats--no-items-bucket-added-zero-trolley-states-pack-user-interface-illustrations-5006800.png?f=webp'
						alt='No item'
						className='w-60 h-60 sm:w-80 sm:h-80'
					/>

					<Link to={"/"}>
						<Button variant='contained'>Trang chủ</Button>
					</Link>
				</div>
			)}
		</>
	);
};

export default Cart;
