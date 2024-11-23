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
import { useSelector } from "react-redux";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

const RegisterShopper = () => {
	const navigate = useNavigate();
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
		ownerId: 0,
	});

	useEffect(() => {
		axios
			.get("https://api.vietqr.io/v2/banks")
			.then((res) => res.data)
			.then((res) => {
				setBanks(res?.data);
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formatData = { ...info, ownerId: user?.id };
		axiosInstace
			.post("/api/shops", formatData)
			.then((res) => {
				if (res.statusCode === 200) {
					toast.success("Đăng ký cửa hàng thành công");
					navigate("/");
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.Message);
			});
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
						<TextField
							id='outlined-basic'
							label='Shop Email'
							variant='outlined'
							size='small'
							required
							value={info.shopEmail}
							onChange={(e) =>
								setInfo({ ...info, shopEmail: e.target.value })
							}
						/>
						<TextField
							id='outlined-basic'
							label='Tên cửa hàng'
							variant='outlined'
							size='small'
							required
							value={info.shopName}
							onChange={(e) =>
								setInfo({ ...info, shopName: e.target.value })
							}
						/>
						<TextField
							id='outlined-basic'
							label='Địa chỉ cửa hàng'
							variant='outlined'
							size='small'
							required
							value={info.shopAddress}
							onChange={(e) =>
								setInfo({ ...info, shopAddress: e.target.value })
							}
						/>
						<TextField
							id='outlined-basic'
							label='Số điện thoại cửa hàng'
							variant='outlined'
							size='small'
							required
							value={info.shopPhone}
							onChange={(e) =>
								setInfo({ ...info, shopPhone: e.target.value })
							}
						/>
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
										<MenuItem key={bank?.id} value={bank?.id}>
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
						</div>
						<TextField
							id='outlined-basic'
							label='Số tài khoản'
							variant='outlined'
							value={info?.accountNo}
							size='small'
							required
							type='number'
							onChange={(e) =>
								setInfo({
									...info,
									accountNo: e.target.value,
								})
							}
						/>
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
					</div>

					<div className='mt-8'>
						<Button variant='contained' type='submit'>
							Đăng ký
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterShopper;
