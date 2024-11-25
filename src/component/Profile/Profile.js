import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import axiosIntance from "../../util/axiosInstance";
import { toast } from "react-toastify";

export default function Profile() {
	const { user } = useSelector((state) => state.productListData);
	const [banks, setBanks] = useState([]);
	const [userInfo, setUserInfo] = useState(null);
	const [bankIdUser, setBankIdUser] = useState("");

	useEffect(() => {
		axios
			.get("https://api.vietqr.io/v2/banks")
			.then((res) => res.data)
			.then((res) => {
				setBanks(res?.data);
			});
	}, []);

	useEffect(() => {
		if (user?.id) {
			axiosIntance
				.get(`/api/users/${user?.id}`)
				.then((res) => {
					if (res.statusCode === 200) {
						setUserInfo({
							bankId: res?.data?.bankId + "",
							accountNo: res?.data?.accountNo,
							accountName: res?.data?.accountName,
							id: res?.data?.id,
							userName: res?.data?.userName,
							fullName: res?.data?.fullName,
							address: res?.data?.address,
						});
						setBankIdUser(res?.data?.bankId + "");
					}
				})
				.catch((err) => {
					console.log(err);
					toast.error(err?.Message);
				});
		}
	}, [user]);

	const handleUpdateUser = () => {
		const data = {
			...userInfo,
			bankId: bankIdUser,
		};
		axiosIntance
			.put("/api/users", data)
			.then((res) => {
				if (res.statusCode === 200) {
					toast.success("Cập nhật thành công");
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error(err?.Message);
				toast.error(err?.errors?.FullName?.[0]);
			});
	};

	if (!userInfo) {
		return <></>;
	}
	return (
		<div>
			<p className='text-lg font-bold mb-5'>Thông tin cá nhân</p>
			<div className='grid grid-cols-2 gap-5'>
				<TextField
					id='outlined-basic'
					label='Username'
					variant='outlined'
					disabled
					value={userInfo?.userName}
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
					value={userInfo?.fullName}
					onChange={(e) =>
						setUserInfo({ ...userInfo, fullName: e.target.value })
					}
				/>
				<TextField
					id='outlined-basic'
					label='Số điện thoại'
					disabled
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
						value={userInfo?.address}
						onChange={(e) =>
							setUserInfo({ ...userInfo, address: e.target.value })
						}
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
						value={bankIdUser}
						label='Chọn ngân hàng'
						onChange={(e) => {
							setBankIdUser(e.target.value);
						}}
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
				<TextField
					id='outlined-basic'
					label='Số tài khoản'
					variant='outlined'
					value={userInfo?.accountNo}
					type='number'
					onChange={(e) =>
						setUserInfo({
							...userInfo,
							accountNo: e.target.value,
						})
					}
				/>

				<TextField
					id='outlined-basic'
					label='Tên tài khoản'
					variant='outlined'
					value={userInfo?.accountName}
					onChange={(e) => {
						const input = e.target.value;
						const normalizedInput = input
							.normalize("NFD") // Tách dấu từ ký tự
							.replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu
							.replace(/[^a-zA-Z0-9\s]/g, "") // Loại bỏ các ký tự không hợp lệ
							.toUpperCase(); // Viết hoa toàn bộ
						setUserInfo({
							...userInfo,
							accountName: normalizedInput,
						});
					}}
				/>
			</div>
			<div className='mt-5 flex flex-row-reverse'>
				<Button variant='contained' onClick={handleUpdateUser}>
					Cập nhật
				</Button>
			</div>
		</div>
	);
}
