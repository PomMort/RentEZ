import React, { useEffect, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import logo from "../Logo.png";
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import axiosInstace from "../util/axiosInstance";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineFileUpload } from "react-icons/md";
import { styled } from "@mui/material/styles";
import { domainBE } from "../util/constant";
import LoadingButton from "@mui/lab/LoadingButton";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

const RegisterShopper = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [banks, setBanks] = useState([]);
	const { user } = useSelector((state) => state.productListData);
	const [info, setInfo] = useState({
		shopEmail: "",
		shopName: "",
		bankId: "",
		accountNo: "",
		accountName: "",
		shopAddress: "",
		shopPhone: "",
		shopAvatar: "",
		ownerId: 0,
	});
	const [fileAvatar, setFileAvatar] = useState(null);
	const [loading, setLoading] = useState(false);
	const [errorsField, setErrorsField] = useState();

	useEffect(() => {
		axios
			.get("https://api.vietqr.io/v2/banks")
			.then((res) => res.data)
			.then((res) => {
				setBanks(res?.data);
			});
	}, []);

	const onChangeFileAvatar = async (e) => {
		const file = e.target.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setFileAvatar(file);
			setInfo({ ...info, shopAvatar: imageUrl });
		} else {
			toast.error("Tải ảnh thất bại");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		let formatData = { ...info, ownerId: user?.id };

		try {
			// Upload ảnh nếu có
			if (fileAvatar) {
				const formData = new FormData();
				formData.append("file", fileAvatar);

				const res = await axios.post(
					domainBE + "/api/media/image",
					formData,
					{
						headers: {
							accept: "*/*",
							"Content-Type": "multipart/form-data",
							Authorization: "Bearer " + user?.token,
						},
					}
				);

				if (res?.statusCode === 200) {
					formatData = { ...formatData, shopAvatar: res?.data?.data };
				} else {
					toast.error("Không thể upload được ảnh");
					return;
				}
			}

			// Đăng ký cửa hàng
			const shopRes = await axiosInstace.post("/api/shops", formatData);
			if (shopRes?.statusCode === 200) {
				toast.success("Đăng ký cửa hàng thành công");
				dispatch({ type: "CREATE_SHOP_SUCCESS" });
				navigate("/shop/dashboard");
			}
		} catch (err) {
			console.error(err);
			setErrorsField(err?.response?.data?.errors || {});
			toast.error(err?.response?.data?.Message || "Đã xảy ra lỗi");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='login-container'>
			<div className='login-box'>
				<div className='flex-col justify-items-center'>
					<h1>Welcome To</h1>
					<img src={logo} alt='Logo' className='logo size-20 ' />
					<h2 style={{ fontFamily: "cursive", fontWeight: "bold" }}>
						RentEZ Shopper
					</h2>
				</div>

				<form onSubmit={(e) => handleSubmit(e)}>
					<div className='grid grid-cols-2 gap-5'>
						<div>
							<TextField
								id='outlined-basic'
								label='Email cửa hàng'
								variant='outlined'
								size='small'
								required
								type='email'
								value={info.shopEmail}
								sx={{ width: "100%" }}
								onChange={(e) =>
									setInfo({ ...info, shopEmail: e.target.value })
								}
							/>
							{errorsField?.["ShopEmail"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["ShopEmail"][0]}
								</p>
							)}
						</div>
						<div>
							<TextField
								id='outlined-basic'
								label='Tên cửa hàng'
								variant='outlined'
								size='small'
								sx={{ width: "100%" }}
								required
								value={info.shopName}
								onChange={(e) =>
									setInfo({ ...info, shopName: e.target.value })
								}
							/>
							{errorsField?.["ShopName"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["ShopName"][0]}
								</p>
							)}
						</div>
						<div>
							<TextField
								id='outlined-basic'
								label='Địa chỉ cửa hàng'
								variant='outlined'
								size='small'
								sx={{ width: "100%" }}
								required
								value={info.shopAddress}
								onChange={(e) =>
									setInfo({ ...info, shopAddress: e.target.value })
								}
							/>
							{errorsField?.["ShopAddress"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["ShopAddress"][0]}
								</p>
							)}
						</div>
						<div>
							<TextField
								id='outlined-basic'
								label='Số điện thoại cửa hàng'
								variant='outlined'
								size='small'
								sx={{ width: "100%" }}
								required
								value={info.shopPhone}
								onChange={(e) =>
									setInfo({ ...info, shopPhone: e.target.value })
								}
							/>
							{errorsField?.["ShopPhone"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["ShopPhone"][0]}
								</p>
							)}
						</div>
						<div className='col-span-2'>
							<div className='flex items-center gap-10'>
								<p className='text-lg font-bold'>Ảnh shop:</p>
								<Button
									component='label'
									role={undefined}
									variant='contained'
									tabIndex={-1}
									startIcon={<MdOutlineFileUpload />}
								>
									Upload files
									<VisuallyHiddenInput
										type='file'
										accept='image/*'
										onChange={(event) => onChangeFileAvatar(event)}
									/>
								</Button>
								<img
									src={info?.shopAvatar || ""}
									alt=''
									className='size-20 rounded-md object-cover'
									onError={(e) => {
										e.target.src =
											"https://lh4.googleusercontent.com/proxy/0rCwwypfFxmFEtvRQoQ83lwTs1T_Y9qsJSp7sMKQ5LXHi89tYhAiRXbHOyoqljagJCmsvpHx7wmLGHS2rhJzPxpN6Wu00Mtk9POTrz0QysbBkdX9FJsk";
									}}
								/>
							</div>
							{errorsField?.["ShopAvatar"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["ShopAvatar"][0]}
								</p>
							)}
						</div>
						<div className='col-span-2'>
							<FormControl fullWidth size='small'>
								<InputLabel id='demo-simple-select-label'>
									Chọn ngân hàng
								</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={info?.bankId}
									size='small'
									label='Chọn ngân hàng'
									required
									onChange={(e) =>
										setInfo({
											...info,
											bankId: e.target.value,
										})
									}
								>
									{banks.map((bank) => (
										<MenuItem key={bank?.bin} value={bank?.bin}>
											<div className='flex items-center gap-3'>
												<img
													src={bank?.logo}
													alt={bank?.shortName}
													className='w-[50px] object-cover'
												/>
												<span>{bank?.name}</span>
											</div>
										</MenuItem>
									))}
								</Select>
							</FormControl>
							{errorsField?.["BankId"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["BankId"][0]}
								</p>
							)}
						</div>
						<div>
							<TextField
								id='outlined-basic'
								label='Số tài khoản'
								variant='outlined'
								value={info?.accountNo}
								size='small'
								sx={{ width: "100%" }}
								required
								type='number'
								onChange={(e) =>
									setInfo({
										...info,
										accountNo: e.target.value,
									})
								}
							/>
							{errorsField?.["AccountNo"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["AccountNo"][0]}
								</p>
							)}
						</div>
						<div>
							<TextField
								id='outlined-basic'
								label='Tên tài khoản'
								variant='outlined'
								value={info?.accountName}
								size='small'
								sx={{ width: "100%" }}
								required
								onChange={(e) => {
									const input = e.target.value;
									const normalizedInput = input
										.normalize("NFD") // Tách dấu từ ký tự
										.replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu
										.replace(/[^a-zA-Z0-9\s]/g, "") // Loại bỏ các ký tự không hợp lệ
										.toUpperCase(); // Viết hoa toàn bộ
									setInfo({
										...info,
										accountName: normalizedInput,
									});
								}}
							/>
							{errorsField?.["AccountName"] && (
								<p className='text-sm text-red-700'>
									{errorsField?.["AccountName"][0]}
								</p>
							)}
						</div>
					</div>

					<div className='mt-8'>
						<LoadingButton
							variant='contained'
							type='submit'
							loading={loading}
						>
							Tạo cửa hàng
						</LoadingButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterShopper;
