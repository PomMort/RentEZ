import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
	const { cartList, isLoggedIn } = useSelector(
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
						? _total + product?.product?.price * product.quantity
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
				<div className='container mx-auto p-6 bg-white'>
					<table className='table-auto w-full text-left'>
						<thead>
							<tr>
								<th className='border-b py-3'>Sản phẩm</th>
								<th className='border-b py-3'>Đơn giá</th>
								<th className='border-b py-3'>Số lượng</th>
								<th className='border-b py-3'>Số tiền</th>
								<th className='border-b py-3 text-center'>Hành động</th>
							</tr>
						</thead>
						<tbody>
							{cart.map((c, index) => {
								// Kiểm tra xem tất cả các sản phẩm trong shop có được chọn hay không
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
												<label className='inline-flex items-center ml-[20px]'>
													{/* Checkbox tùy chỉnh */}
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
													<div className='bg-yellow-400 p-2 border-r-2 ml-2'>
														Yêu thích +
													</div>
													<p className='ml-2'> {c.shop}</p>
												</label>
											</td>
										</tr>
										{c.products.map((product, productIndex) => (
											<tr key={product.id} className='border-b'>
												<td className='py-4 flex items-center'>
													{/* Checkbox tùy chỉnh cho từng sản phẩm */}
													<input
														type='checkbox'
														checked={product.selected}
														onChange={() =>
															toggleSelectProduct(
																index,
																productIndex
															)
														}
														className='h-5 w-5 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400 mr-4'
													/>
													<img
														src={product?.product?.image}
														alt={product?.product?.productName}
														className='w-16 h-16 object-cover mr-4'
													/>
													<div>
														<p className='font-bold'>
															{product?.product?.productName}
														</p>
														<p className='text-gray-500'>
															Tồn kho:{" "}
															{product?.product?.quantity}
														</p>
														<p className='text-gray-500'>
															Ngày nhận:{" "}
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
												<td>
													{product?.product?.price.toLocaleString()}
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
												<td className='font-bold text-red-500'>
													{(
														product?.product?.price *
														product?.quantity
													).toLocaleString()}
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

					<div className='mt-6 flex flex-row-reverse justify-between items-center'>
						{/* <button className='bg-red-500 text-white px-4 py-2 rounded'>
							Xóa sản phẩm không hoạt động
						</button> */}
						<div className='flex items-center'>
							<span className='mr-4 text-xl font-bold'>
								Tổng thanh toán: {calculateTotal().toLocaleString()}đ
							</span>
							<button
								className='bg-yellow-400 text-white px-6 py-3 rounded hover:bg-yellow-500'
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
