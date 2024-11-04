import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
	const { cartList } = useSelector((state) => state.productListData);
	const [cart, setCart] = useState([]);

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
		const newCartData = [...cart];
		newCartData[shopIndex].products[productIndex].quantity += delta;
		setCart(newCartData);
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

	return (
		<div className='container mx-auto p-6 bg-white'>
			<table className='table-auto w-full text-left'>
				<thead>
					<tr>
						<th className='border-b py-3'>Sản phẩm</th>
						<th className='border-b py-3'>Đơn giá</th>
						<th className='border-b py-3'>Số lượng</th>
						<th className='border-b py-3'>Số tiền</th>
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
										colSpan='4'
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
													toggleSelectProduct(index, productIndex)
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
													Phân loại: M
												</p>
											</div>
										</td>
										<td>
											{product?.product?.price.toLocaleString()}đ
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
													disabled={
														product?.product?.quantity <= 1
													}
												>
													-
												</button>
												<span className='px-4'>
													{product?.quantity}
												</span>
												<button
													className='px-2 py-1 border'
													onClick={() =>
														updateQuantity(index, productIndex, 1)
													}
												>
													+
												</button>
											</div>
										</td>
										<td className='font-bold text-red-500'>
											{(
												product?.product?.price * product?.quantity
											).toLocaleString()}
											đ
										</td>
									</tr>
								))}
							</React.Fragment>
						);
					})}
				</tbody>
			</table>

			<div className='mt-6 flex justify-between items-center'>
				<button className='bg-red-500 text-white px-4 py-2 rounded'>
					Xóa sản phẩm không hoạt động
				</button>
				<div className='flex items-center'>
					<span className='mr-4 text-xl font-bold'>
						Tổng thanh toán: {calculateTotal().toLocaleString()}đ
					</span>
					<button className='bg-yellow-400 text-white px-6 py-3 rounded hover:bg-yellow-500'>
						Thanh toán
					</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
