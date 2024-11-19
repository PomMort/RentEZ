import React, { useState } from "react";
import "./Login.css";
import logo from "../Logo.png";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import axiosInstance from "../util/axiosInstance";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
	const [userName, setUserName] = useState();
	const [userNameReset, setUserNameReset] = useState();
	const [otp, setOtp] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleSendOTP = () => {
		if (!userName) {
			toast.info("Vui lòng nhập username");
			return;
		}
		setLoading(true);
		axiosInstance
			.post("/api/auth/password/forgot", { userName })
			.then((res) => {
				if (res?.statusCode === 200) {
					toast.success("Hãy kiểm tra email để lấy mã OTP");
					setLoading(false);
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error(err?.Message);
				setLoading(false);
			});
	};

	const handleResetPassword = () => {
		if (!userNameReset || !otp || !password || !confirmPassword) {
			toast.info("Vui lòng nhập đầy đủ các trường");
			return;
		}

		if (!(password === confirmPassword)) {
			toast.info("Mật khẩu không trùng khớp");
			return;
		}

		axiosInstance
			.post("/api/auth/password/reset", {
				otp,
				password,
				confirmPassword,
				userName: userNameReset,
			})
			.then((res) => {
				if (res?.statusCode === 200) {
					toast.success("Reset mật khẩu thành công");
					navigate("/Login");
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error(err?.Message);
			});
	};

	return (
		<div className='login-container'>
			<div className='login-box'>
				<div className='flex flex-col justify-center items-center'>
					<h1>Reset Password</h1>
					<img src={logo} alt='Logo' className='logo' />
					<h2 className='font-logo'>RentEZ</h2>
				</div>

				<div className='flex justify-between gap-5'>
					<div>
						<p className='font-semibold  mb-3'>B1: GỬI OTP QUA EMAIL</p>
						<div>
							<TextField
								id='outlined-basic'
								label='Username'
								variant='outlined'
								size='small'
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
							/>
						</div>
						<div className='mt-3'>
							<LoadingButton
								className='w-full'
								variant='contained'
								onClick={handleSendOTP}
								loading={loading}
							>
								Gửi mã OTP
							</LoadingButton>
						</div>
					</div>
					<div>
						<p className='font-semibold  mb-3'>B2: ĐỔI MẬT KHẨU MỚI</p>
						<div className='flex flex-col gap-3'>
							<div>
								<TextField
									id='outlined-basic'
									label='Username'
									variant='outlined'
									size='small'
									value={userNameReset}
									onChange={(e) => setUserNameReset(e.target.value)}
								/>
							</div>
							<div>
								<TextField
									id='outlined-basic'
									label='OTP'
									variant='outlined'
									size='small'
									value={otp}
									onChange={(e) => setOtp(e.target.value)}
								/>
							</div>
							<div>
								<TextField
									id='outlined-basic'
									label='New Password'
									variant='outlined'
									size='small'
									type='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div>
								<TextField
									id='outlined-basic'
									label='Confirm Password'
									variant='outlined'
									size='small'
									type='password'
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</div>
						</div>
						<div className='mt-3'>
							<Button
								className='w-full'
								variant='contained'
								onClick={handleResetPassword}
							>
								Đổi mật khẩu
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
