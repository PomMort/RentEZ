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
import { saveOrderId } from "../../util/common";

export default function Order() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { productsSelected } = useSelector((state) => state.productListData);

	const [openModalVoucher, setOpenModalVoucher] = useState(false);
	const [vouchers, setVouchers] = useState([]);
	const [products, setProducts] = useState([]);
	// Đây là biến sau khi calculate order (cũng là dữ liệu để cho vào tạo order)
	const [orderInfo, setOrderInfo] = useState();

	const [voucherShipSelected, setVoucherShipSelected] = useState(null);
	const [voucherRentSelected, setVoucherRentSelected] = useState(null);
	const [note, setNote] = useState("");
	const [informationUser, setInformationUser] = useState({
		address: "",
	});

	// Fetch vouchers
	useEffect(() => {
		axiosInstance.get("/api/vouchers?Status=2").then((res) => {
			if (res.statusCode === 200) {
				const vouchersResponse = res?.data?.items;
				vouchersResponse?.sort((a, b) => {
					if (a < b) return -1;
					if (a > b) return 1;
					return 0;
				});
				setVouchers(vouchersResponse);
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

		let voucherIds = [voucherRentSelected?.id, voucherShipSelected?.id];
		voucherIds = voucherIds.filter((voucherId) => voucherId);

		if (voucherIds.length > 0) {
			data = { ...data, voucherIds };
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
	}, [voucherShipSelected, voucherRentSelected, productsSelected]);

	const handlePayment = async () => {
		if (!informationUser.address) {
			toast.info("Vui lòng nhập địa chỉ");
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
				toast.error(err?.Message);
			});
		if (responseCreateOrder?.statusCode !== 200) {
			toast.error("Thanh toán thất bại");
			return;
		}
		dispatch({ type: "REMOVE_ALL_PRODUCT" });
		const orderId = responseCreateOrder.data.split(" ")[1];

		const responsePayment = await axiosInstance.post(
			"/api/payments/payos/customer/payment-url",
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

		saveOrderId(orderId);

		window.location.href = responsePayment?.data?.checkoutUrl;
	};

	if (productsSelected?.length === 0) {
		navigate("/");
		return <div></div>;
	}

	return (
		<div className='min-h-[400px] bg-[#f5f5f5] py-8'>
			<div className='mx-auto flex flex-col items-center justify-center gap-10 w-11/12 md:w-4/5'>
				<div className='bg-white pt-5 pb-10 px-5 md:px-10 w-full'>
					<div className='text-[#ffb916] flex items-center gap-3 text-lg font-bold'>
						<FaMapMarkerAlt /> Thông tin cá nhân
					</div>
					<hr className='mt-5' />
					<div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
						<div className='col-span-1 w-full'>
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
				<div className='bg-white pt-5 pb-10 px-5 md:px-10 w-full'>
					<div className='text-[#ffb916] flex items-center gap-3 text-lg font-bold'>
						<IoShirt /> Sản phẩm
					</div>
					<hr className='mt-5' />
					<div className='overflow-x-auto'>
						<table className='table-auto w-full text-left text-sm md:text-base'>
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
												className='w-12 h-12 md:w-16 md:h-16 object-cover mr-4'
											/>
											<div className='flex flex-col justify-between'>
												<p className='font-bold'>
													{product?.product?.productName}
												</p>
												<p className='text-gray-500 text-xs md:text-sm'>
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
				<div className='bg-white pt-5 pb-10 px-5 md:px-10 w-full'>
					<div className=' flex items-center justify-between'>
						<span className='flex items-center gap-3 text-lg font-bold text-[#ffb916]'>
							<RiDiscountPercentLine size={23} /> Voucher
						</span>
						<button
							className='text-sm md:text-base cursor-pointer text-[#32719b]'
							onClick={() => setOpenModalVoucher(true)}
						>
							Chọn Voucher
						</button>
					</div>
					<hr className='my-5' />
					<div className='flex flex-col gap-3'>
						{voucherShipSelected && (
							<div className='flex gap-3 bg-slate-50 rounded-lg overflow-hidden border-2 shadow-lg hover:opacity-90 w-full h-fit'>
								<img
									src='https://img.pikbest.com/png-images/20210627/free-ship-free-nationwide_6010376.png!bw700'
									alt=''
									className='h-20 md:h-[116px] object-cover'
								/>
								<div className='flex flex-col justify-between flex-1 p-3'>
									<p className='text-wrap font-bold text-base md:text-lg'>
										{voucherShipSelected?.name}
									</p>
									<p className='text-wrap text-xs md:text-sm mt-1 max-w-[300px] text-[#6a6a6a]'>
										{voucherShipSelected?.description}
									</p>
									<p className='text-[#ffa200] text-sm md:text-[14px] font-bold underline'>
										<span>Giảm: </span>
										{Number.isInteger(voucherShipSelected?.value)
											? (voucherShipSelected?.value).toLocaleString() +
												"đ"
											: voucherShipSelected?.value * 100 + "%"}
									</p>
								</div>
							</div>
						)}
						{voucherRentSelected && (
							<div className='flex gap-3 bg-slate-50 rounded-lg overflow-hidden border-2 shadow-lg hover:opacity-90 w-full h-fit'>
								<img
									src='https://cdn2.vectorstock.com/i/1000x1000/32/81/voucher-icon-coupon-and-gift-offer-discount-vector-7403281.jpg'
									alt=''
									className='h-20 md:h-[116px] object-cover'
								/>
								<div className='flex flex-col justify-between flex-1 p-3'>
									<p className='text-wrap font-bold text-base md:text-lg'>
										{voucherRentSelected?.name}
									</p>
									<p className='text-wrap text-xs md:text-sm mt-1 max-w-[300px] text-[#6a6a6a]'>
										{voucherRentSelected?.description}
									</p>
									<p className='text-[#ffa200] text-sm md:text-[14px] font-bold underline'>
										<span>Giảm: </span>
										{Number.isInteger(voucherRentSelected?.value)
											? (voucherRentSelected?.value).toLocaleString() +
												"đ"
											: voucherRentSelected?.value * 100 + "%"}
									</p>
								</div>
							</div>
						)}
					</div>
					{!voucherShipSelected && !voucherRentSelected && (
						<div className='mt-5 text-gray-600 text-sm'>
							Không có voucher nào được chọn
						</div>
					)}
				</div>
				<div className='bg-white py-5 px-5 md:px-10 w-full'>
					<div className='text-[#ffb916] flex items-center gap-3 text-lg font-bold'>
						<MdOutlinePayments size={23} /> Phương thức thanh toán
					</div>
					<hr className='mt-5' />
					<div className='flex gap-5 mt-2 flex-wrap justify-center md:justify-start'>
						<div
							className='flex items-center justify-center w-fit p-2 gap-3'
							title='Chuyển khoản ngân hàng'
						>
							<input
								type='radio'
								id='bank'
								name='payment'
								value='bank'
								className='hidden peer'
								checked={true}
							/>
							<label
								htmlFor='bank'
								className='cursor-pointer border-2 border-[#ccc] px-2 rounded-lg hover:opacity-80 peer-checked:border-yellow-500 transition-colors'
							>
								<img
									src='https://www.svgrepo.com/show/42266/credit-card.svg'
									alt=''
									className='w-10 h-10 md:w-14 md:h-14 object-contain'
								/>
							</label>
						</div>
					</div>
				</div>
				<div className='bg-white pt-5 pb-10 px-5 md:px-10 w-full'>
					<div className='text-[#ffb916] flex items-center gap-3 text-lg font-bold'>
						<FaInfo /> Thông tin thanh toán
					</div>
					<hr className='mt-5' />
					<div className='flex flex-col md:flex-row justify-between mt-5 gap-5'>
						<div className='min-w-full md:min-w-[500px]'>
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
						<div className='grid grid-cols-2 gap-3 text-sm md:text-lg w-full'>
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
							<div className='text-right text-[#ffb916] font-medium text-base md:text-2xl'>
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
		</div>
	);
	
}
