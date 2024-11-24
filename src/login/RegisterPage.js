import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Logo.png";
import { TextField } from "@mui/material";
import axiosInstace from "../util/axiosInstance";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector } from "react-redux";

const RegisterPage = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const { isLoggedIn } = useSelector((state) => state.productListData);
	const [info, setInfo] = useState({
		userName: "",
		fullName: "",
		email: "",
		phoneNumber: "",
		password: "",
		confirmPassword: "",
		address: "",
	});
	const [errorsField, setErrorsField] = useState();

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn, navigate]);

	const handleSubmit = () => {
		if (
			info.userName === "" ||
			info.fullName === "" ||
			info.email === "" ||
			info.phoneNumber === "" ||
			info.password === "" ||
			info.address === ""
		) {
			toast.info("Vui lòng nhập đầy đủ các trường");
			return;
		}

		setLoading(true);
		axiosInstace
			.post("/api/auth/register", info)
			.then((res) => {
				if (res.statusCode === 200) {
					toast.success(
						"Đăng ký thành công! Hãy kiểm tra email để kích hoạt"
					);
					setLoading(false);
					navigate(`/active-account/${info.email}/${info.userName}`);
				}
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setErrorsField(err?.errors);
				toast.error(err?.Message);
			});
	};

	return (
		<div className='login-container'>
			<div className='login-box'>
				<div className='Logo-center'>
					<h1>Welcome To</h1>
					<img src={logo} alt='Logo' className='logo size-20' />
					<h2 style={{ fontFamily: "cursive", fontWeight: "bold" }}>
						RentEZ
					</h2>
				</div>

				<div className='grid grid-cols-2 gap-5'>
					<div>
						<TextField
							sx={{ width: "100%" }}
							id='outlined-basic'
							label='Username'
							variant='outlined'
							size='small'
							value={info.userName}
							onChange={(e) =>
								setInfo({ ...info, userName: e.target.value })
							}
						/>
						{errorsField?.["UserName"] && (
							<p className='text-sm text-red-700'>
								{errorsField?.["UserName"][0]}
							</p>
						)}
					</div>
					<div>
						<TextField
							sx={{ width: "100%" }}
							id='outlined-basic'
							label='Full Name'
							variant='outlined'
							size='small'
							value={info.fullName}
							onChange={(e) =>
								setInfo({ ...info, fullName: e.target.value })
							}
						/>
						{errorsField?.["FullName"] && (
							<p className='text-sm text-red-700'>
								{errorsField?.["FullName"][0]}
							</p>
						)}
					</div>
					<div>
						<TextField
							sx={{ width: "100%" }}
							id='outlined-basic'
							label='Email'
							variant='outlined'
							size='small'
							value={info.email}
							onChange={(e) =>
								setInfo({ ...info, email: e.target.value })
							}
						/>
						{errorsField?.["Email"] && (
							<p className='text-sm text-red-700'>
								{errorsField?.["Email"][0]}
							</p>
						)}
					</div>
					<div>
						<TextField
							sx={{ width: "100%" }}
							id='outlined-basic'
							label='Phone number'
							variant='outlined'
							size='small'
							value={info.phoneNumber}
							onChange={(e) =>
								setInfo({ ...info, phoneNumber: e.target.value })
							}
						/>
						{errorsField?.["PhoneNumber"] && (
							<p className='text-sm text-red-700'>
								{errorsField?.["PhoneNumber"][0]}
							</p>
						)}
					</div>
					<div>
						<TextField
							sx={{ width: "100%" }}
							id='outlined-basic'
							label='Password'
							variant='outlined'
							size='small'
							type='password'
							value={info.password}
							onChange={(e) =>
								setInfo({ ...info, password: e.target.value })
							}
						/>
						{errorsField?.["Password"] && (
							<p className='text-sm text-red-700'>
								{errorsField?.["Password"][0]}
							</p>
						)}
					</div>
					<div>
						<TextField
							sx={{ width: "100%" }}
							id='outlined-basic'
							label='Confirm password'
							variant='outlined'
							size='small'
							type='password'
							value={info.confirmPassword}
							onChange={(e) =>
								setInfo({ ...info, confirmPassword: e.target.value })
							}
						/>
						{errorsField?.["ConfirmPassword"] && (
							<p className='text-sm text-red-700'>
								{errorsField?.["ConfirmPassword"][0]}
							</p>
						)}
					</div>
					<div className='col-span-2'>
						<TextField
							sx={{ width: "100%" }}
							id='outlined-basic'
							label='Address'
							variant='outlined'
							size='small'
							value={info.address}
							onChange={(e) =>
								setInfo({ ...info, address: e.target.value })
							}
						/>
						{errorsField?.["Address"] && (
							<p className='text-sm text-red-700'>
								{errorsField?.["Address"][0]}
							</p>
						)}
					</div>
				</div>

				<div className='mt-8'>
					<LoadingButton
						loading={loading}
						variant='contained'
						onClick={handleSubmit}
					>
						Đăng ký
					</LoadingButton>
				</div>

				<div className='signup-container'>
					<span style={{ color: "black" }}>Already have an account?</span>
					<Link to='/Login' className='signup-link'>
						Sign In Here
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
