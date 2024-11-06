import { Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaInfo, FaMapMarkerAlt } from "react-icons/fa";
import { IoShirt } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { RiDiscountPercentLine } from "react-icons/ri";
import axiosInstance from "../../util/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { domainFE } from "../../util/constant";

export default function Order() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { productsSelected } = useSelector((state) => state.productListData);

	const [openModalVoucher, setOpenModalVoucher] = useState(false);
	const [vouchers, setVouchers] = useState([]);
	const [products, setProducts] = useState([]);
	// Đây là biến sau khi calculate order (cũng là dữ liệu để cho vào tạo order)
	const [orderInfo, setOrderInfo] = useState();

	const [voucherSelected, setVoucherSelected] = useState(null);
	const [note, setNote] = useState("");
	const [informationUser, setInformationUser] = useState({
		address: "",
		fullName: "",
		phoneNumber: "",
	});

	// Fetch vouchers
	useEffect(() => {
		axiosInstance.get("/api/vouchers").then((res) => {
			if (res.statusCode === 200) {
				setVouchers(res?.data?.items);
			}
		});
	}, []);

	// Get product selected
	useEffect(() => {
		setProducts(productsSelected);
		return () => {
			dispatch({ type: "REMOVE_PRODUCTS_PAYMENT" });
		};
	}, [dispatch, navigate, productsSelected]);

	const handleCalculate = () => {
		let data = {
			cartItems: productsSelected.map((product) => {
				return {
					productId: product?.product?.id,
					rentQuantity: product?.quantity,
					rentDateTime: product?.rentDateTime?.isoDate,
					returnDateTime: product?.returnDateTime?.isoDate,
				};
			}),
		};

		if (voucherSelected) {
			data = { ...data, voucherIds: [voucherSelected?.id] };
		}

		axiosInstance
			.post("/api/orders/cart/calculation", data)
			.then((res) => {
				if (res.statusCode === 200) {
					setOrderInfo(res.data);
				}
			})
			.catch((err) => {
				toast.error("Lỗi khi tính toán");
				console.log(err);
			});
	};

	// Caculate info payment
	useEffect(() => {
		if (productsSelected?.length > 0) {
			handleCalculate();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [voucherSelected, productsSelected]);

	const handlePayment = async () => {
		if (
			!informationUser.address ||
			!informationUser.fullName ||
			!informationUser.phoneNumber
		) {
			toast.info("Vui lòng nhập đầy đủ các trường");
			return;
		}

		const data = {
			...orderInfo,
			orderAddress: informationUser.address,
			note: note,
		};

		const responseCreateOrder = await axiosInstance
			.post("/api/orders", data)
			.catch((err) => {
				console.log(err);
			});
		if (responseCreateOrder.statusCode !== 200) {
			toast.error("Thanh toán thất bại");
			return;
		}
		dispatch({ type: "REMOVE_ALL_PRODUCT" });
		const orderId = responseCreateOrder.data.split(" ")[1];

		const responsePayment = await axiosInstance.post(
			"/api/payments/payos/payment-url",
			{
				orderId,
				cancelUrl: domainFE + "/order-handler",
				returnUrl: domainFE + "/order-handler",
			}
		);
		if (responsePayment.statusCode !== 200) {
			toast.error("Không thể tạo mã QRCode");
			return;
		}

		window.location.href = responsePayment?.data?.checkoutUrl;
	};

	if (productsSelected?.length === 0) {
		navigate("/");
		return <div></div>;
	}

	return (
		<div className='min-h-[400px] bg-[#f5f5f5] py-8'>
			<div className='mx-auto flex flex-col items-center justify-center gap-10 w-4/5'>
				<div className='bg-white pt-5 pb-10 px-10 w-full'>
					<div className='text-[#ffb916] flex items-center gap-3 text-lg font-bold'>
						<FaMapMarkerAlt /> Thông tin cá nhân
					</div>
					<hr className='mt-5' />
					<div className='grid grid-cols-2 gap-5 mt-5'>
						<TextField
							id='standard-basic'
							label='Họ và tên'
							variant='standard'
							required
							value={informationUser.fullName}
							onChange={(e) =>
								setInformationUser({
									...informationUser,
									fullName: e.target.value,
								})
							}
						/>
						<TextField
							id='standard-basic'
							label='Số điện thoại'
							variant='standard'
							value={informationUser.phoneNumber}
							required
							onChange={(e) =>
								setInformationUser({
									...informationUser,
									phoneNumber: e.target.value,
								})
							}
						/>
						<div className='col-span-2 w-full'>
							<TextField
								id='standard-basic'
								label='Địa chỉ nhận hàng'
								variant='standard'
								required
								value={informationUser.address}
								onChange={(e) =>
									setInformationUser({
										...informationUser,
										address: e.target.value,
									})
								}
								sx={{ width: "100%" }}
							/>
						</div>
					</div>
				</div>
				<div className='bg-white pt-5 pb-10 px-10 w-full'>
					<div className='text-[#ffb916] flex items-center gap-3 text-lg font-bold'>
						<IoShirt /> Sản phẩm
					</div>
					<hr className='mt-5' />
					<div>
						<table className='table-auto w-full text-left'>
							<thead>
								<tr>
									<th className='border-b py-3'>Sản phẩm</th>
									<th className='border-b py-3'>Đơn giá</th>
									<th className='border-b py-3'>Số lượng</th>
									<th className='border-b py-3'>Thành tiền</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product, index) => (
									<tr className='border-b' key={product?.product?.id}>
										<td className='py-4 flex items-center'>
											<img
												src={product?.product?.image}
												alt={product?.product?.productName}
												className='w-16 h-16 object-cover mr-4'
											/>
											<div className='flex flex-col justify-between'>
												<p className='font-bold'>
													{product?.product?.productName}
												</p>
												<p className='text-gray-500'>
													Ngày thuê:{" "}
													{product?.rentDateTime?.formattedDate} -{" "}
													{product?.returnDateTime?.formattedDate}{" "}
													({product?.dayRent} ngày)
												</p>
											</div>
										</td>
										<td>
											{(product?.product?.price).toLocaleString()}đ
										</td>
										<td>
											<span className='px-4'>
												{product?.quantity}
											</span>
										</td>
										<td className='font-bold text-red-500'>
											{(
												product?.product?.price * product?.quantity
											).toLocaleString()}
											đ
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div className='bg-white pt-5 pb-10 px-10 w-full'>
					<div className=' flex items-center justify-between'>
						<span className='flex items-center gap-3 text-lg font-bold text-[#ffb916]'>
							<RiDiscountPercentLine size={23} /> Voucher
						</span>
						<button
							className='text-base cursor-pointer text-[#32719b]'
							onClick={() => setOpenModalVoucher(true)}
						>
							Chọn Voucher
						</button>
					</div>
					<hr className='my-5' />
					{voucherSelected ? (
						<div className='flex max-h-[116px] min-w-[500px] gap-3 bg-slate-50 rounded-lg overflow-hidden border-2 shadow-lg hover:opacity-90 w-fit h-fit'>
							<img
								src='https://cdn2.vectorstock.com/i/1000x1000/32/81/voucher-icon-coupon-and-gift-offer-discount-vector-7403281.jpg'
								alt=''
								className='h-[116px] object-cover'
							/>
							<div className='flex flex-col justify-between flex-1 p-3'>
								<p className='text-wrap font-bold text-lg'>
									{voucherSelected?.name}
								</p>
								<p className='text-wrap text-sm mt-1 max-w-[300px] text-[#6a6a6a]'>
									{voucherSelected?.description}
								</p>
								<p className='text-[#ffa200] text-[14px] font-bold underline'>
									<span>Giảm: </span>
									{Number.isInteger(voucherSelected?.value)
										? (voucherSelected?.value).toLocaleString() + "đ"
										: voucherSelected?.value * 100 + "%"}
								</p>
							</div>
						</div>
					) : (
						<div className='mt-5 text-gray-600 text-sm'>
							Không có voucher nào được chọn
						</div>
					)}
				</div>
				<div className='bg-white py-5 px-10 w-full'>
					<div className='text-[#ffb916] flex items-center gap-3 text-lg font-bold'>
						<MdOutlinePayments size={23} /> Phương thức thanh toán
					</div>
					<hr className='mt-5' />
					<div className='flex gap-5 mt-2'>
						<div
							class='flex items-center justify-center w-fit p-2 gap-3'
							title='Chuyển khoản ngân hàng'
						>
							<input
								type='radio'
								id='bank'
								name='payment'
								value='bank'
								class='hidden peer'
								checked={true}
							/>
							<label
								for='bank'
								class='cursor-pointer border-2 border-[#ccc] px-2 rounded-lg hover:opacity-80 
                           peer-checked:border-yellow-500 transition-colors'
							>
								<img
									src='https://www.svgrepo.com/show/42266/credit-card.svg'
									alt=''
									class='w-14 h-14 object-contain'
								/>
							</label>
						</div>
					</div>
				</div>
				<div className='bg-white pt-5 pb-10 px-10 w-full'>
					<div className='text-[#ffb916] flex items-center gap-3 text-lg font-bold'>
						<FaInfo /> Thông tin thanh toán
					</div>
					<hr className='mt-5' />
					<div className='flex justify-between mt-5'>
						<div className='min-w-[500px]'>
							<TextField
								id='filled-basic'
								label='Lời nhắn cho shop'
								variant='filled'
								sx={{
									width: "100%",
								}}
								value={note}
								onChange={(e) => setNote(e.target.value)}
							/>
						</div>
						<div className='grid grid-cols-2 gap-3 text-lg'>
							<div>Tổng tiền hàng: </div>
							<div className='text-right'>
								<strong>
									{orderInfo?.totalRentPrice?.toLocaleString()}đ
								</strong>
							</div>
							<div>Tiền đặt cọc: </div>
							<div className='text-right'>
								<strong>
									{orderInfo?.totalDeposit?.toLocaleString()}đ
								</strong>
							</div>

							<div>Tiền Ship: </div>
							<div className='text-right'>
								<strong>
									{orderInfo?.totalShipFee?.toLocaleString()}đ
								</strong>
							</div>
							<div>Tổng thanh toán: </div>
							<div className='text-right text-[#ffb916] font-medium text-2xl'>
								<strong>{orderInfo?.total?.toLocaleString()}đ</strong>
							</div>
						</div>
					</div>
					<hr className='my-5' />
					<div className='flex flex-row-reverse'>
						<Button
							variant='contained'
							size='large'
							color='warning'
							onClick={handlePayment}
						>
							Đặt hàng
						</Button>
					</div>
				</div>
			</div>

			{/* =================== MODAL SELECT VOUCHER =================== */}
			<Modal
				open={openModalVoucher}
				onClose={() => setOpenModalVoucher(false)}
				keepMounted
			>
				<div className='min-w-[500px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
					<div className='mt-5 px-5 text-lg'>Chọn Voucher</div>
					<hr />
					<div className='px-8 mt-5'>
						<div className='bg-gray-100 p-3 flex items-center justify-around'>
							<span className='text-sm text-gray-600'>Mã Voucher</span>
							<TextField
								id='outlined-basic'
								label='Mã Voucher'
								variant='outlined'
								size='small'
								color='warning'
							/>
							<Button variant='outlined' color='warning' disabled>
								ÁP DỤNG
							</Button>
						</div>

						<div className='mt-5 pr-3 flex flex-col max-h-[460px] overflow-y-auto gap-3 pb-5'>
							{vouchers.map((voucher) => (
								<div key={voucher?.id}>
									<input
										type='radio'
										id={voucher?.id}
										name='voucher'
										value={voucher?.code}
										onChange={() => setVoucherSelected(voucher)}
										className='hidden peer'
									/>
									<label
										htmlFor={voucher?.id}
										className='flex max-h-[116px] min-w-[500px] gap-3 bg-slate-50 rounded-lg overflow-hidden border-2 shadow-lg transition-colors peer-checked:border-yellow-500 peer-checked:bg-[#deb7364f] cursor-pointer hover:opacity-90 w-fit h-fit'
									>
										<img
											src='https://cdn2.vectorstock.com/i/1000x1000/32/81/voucher-icon-coupon-and-gift-offer-discount-vector-7403281.jpg'
											alt=''
											className='h-[116px] object-cover'
										/>
										<div className='flex flex-col justify-between flex-1 p-3'>
											<p className='text-wrap font-bold text-lg'>
												{voucher?.name}
											</p>
											<p className='text-wrap text-sm mt-1 max-w-[300px] text-[#6a6a6a]'>
												{voucher?.description}
											</p>
											<p className='text-[#ffa200] text-[14px] font-bold underline'>
												<span>Giảm: </span>
												{Number.isInteger(voucher?.value)
													? (voucher?.value).toLocaleString() + "đ"
													: voucher?.value * 100 + "%"}
											</p>
										</div>
									</label>
								</div>
							))}
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
