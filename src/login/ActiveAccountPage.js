import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../util/axiosInstance";
import { toast } from "react-toastify";

export default function ActiveAccountPage() {
	const navigate = useNavigate();
	const { email, username } = useParams();
	const [code, setCode] = useState();

	const handleVerify = () => {
		if (!code) {
			toast.info("Vui lòng nhập mã OTP");
			return;
		}
		axiosInstance
			.post("/api/auth/email/verification", {
				userName: username,
				otp: code,
			})
			.then((res) => {
				if (res.statusCode === 200) {
					toast.success("Kích hoạt tài khoản thành công");
					navigate("/Login");
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error("Sai mã OTP");
			});
	};

	return (
		<div>
			<div className='w-[500px] mx-auto p-10 shadow-2xl h-fit my-10 rounded-2xl'>
				<div className='text-center'>
					<p className='font-bold text-xl'>Verify Code</p>
					<p className='text-wrap text-gray-400 mt-3 mb-2'>
						Please enter verify code that we've sent to your email.
					</p>
					<p className='font-bold'>{email}</p>
				</div>
				<div className='my-7'>
					<TextField
						id='outlined-basic'
						label='OTP'
						variant='outlined'
						size='small'
						sx={{
							width: "100%",
						}}
						onChange={(e) => setCode(e.target.value)}
					/>
				</div>
				<div className='flex flex-row-reverse' onClick={handleVerify}>
					<Button variant='contained'>Xác nhận</Button>
				</div>
			</div>
		</div>
	);
}
