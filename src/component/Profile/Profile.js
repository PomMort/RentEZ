import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Profile() {
	const { user } = useSelector((state) => state.productListData);
	const [banks, setBanks] = useState([]);
	const [bankCardInfo, setBankCardInfo] = useState({
		bankId: "",
		accountNo: "",
		accountName: "",
	});

	useEffect(() => {
		axios
			.get("https://api.vietqr.io/v2/banks")
			.then((res) => res.data)
			.then((res) => {
				setBanks(res?.data);
			});
	}, []);

	return (
		<div>
			<p className='text-lg font-bold mb-5'>Thông tin cá nhân</p>
			<div className='grid grid-cols-2 gap-5'>
				<TextField
					id='outlined-basic'
					label='Username'
					variant='outlined'
					disabled
					value={user?.userName}
				/>
				<TextField
					id='outlined-basic'
					label='Email'
					variant='outlined'
					disabled
					value={user?.email}
				/>

				<TextField
					id='outlined-basic'
					label='Họ và tên'
					variant='outlined'
					value={user?.fullName}
				/>
				<TextField
					id='outlined-basic'
					label='Số điện thoại'
					variant='outlined'
					value={user?.phoneNumber}
				/>
				<div className='col-span-2 w-full'>
					<TextField
						id='outlined-basic'
						label='Địa chỉ'
						variant='outlined'
						sx={{
							width: "100%",
						}}
						value={user?.address}
					/>
				</div>
			</div>

			<hr className='my-5' />
			<p className='text-lg font-bold mb-5'>Thông tin thẻ</p>
			<div className='grid grid-cols-3 gap-5'>
				<FormControl fullWidth>
					<InputLabel id='demo-simple-select-label'>
						Chọn ngân hàng
					</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={bankCardInfo?.bankId}
						label='Chọn ngân hàng'
						onChange={(e) =>
							setBankCardInfo({
								...bankCardInfo,
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
				<TextField
					id='outlined-basic'
					label='Số tài khoản'
					variant='outlined'
					value={bankCardInfo?.accountNo}
					type='number'
					onChange={(e) =>
						setBankCardInfo({
							...bankCardInfo,
							accountNo: e.target.value,
						})
					}
				/>

				<TextField
					id='outlined-basic'
					label='Tên tài khoản'
					variant='outlined'
					value={bankCardInfo?.accountName}
					onChange={(e) => {
						const input = e.target.value;
						const normalizedInput = input
							.normalize("NFD") // Tách dấu từ ký tự
							.replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu
							.replace(/[^a-zA-Z0-9\s]/g, "") // Loại bỏ các ký tự không hợp lệ
							.toUpperCase(); // Viết hoa toàn bộ
						setBankCardInfo({
							...bankCardInfo,
							accountName: normalizedInput,
						});
					}}
				/>
			</div>
		</div>
	);
}
