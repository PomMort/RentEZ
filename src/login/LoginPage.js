import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../Logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../util/axiosInstance";

const LoginPage = () => {
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post("/api/auth/authentication", {
				username: username,
				password: password,
			});

			const userData = response;
			dispatch({ type: "LOGIN_SUCCESS", payload: userData });

			const isAdmin = userData?.role?.includes("Admin");

			if (isAdmin) {
				navigate("/admin/dashboard");
			} else {
				navigate("/");
			}

			toast.success("Đăng nhập thành công");
		} catch (error) {
			console.error("Login error:", error);
			toast.error(error?.Message);
		}
	};

	return (
		<div className='login-container'>
			<div className='login-box'>
				<div className='Logo-center'>
					<h1>Chào mừng đã đến với</h1>
					<img src={logo} alt='Logo' className='logo' />
					<h2 className='font-logo'>RentEZ</h2>
				</div>

				<form onSubmit={handleLogin}>
					<p
						style={{
							display: "flex",
							justifyContent: "start",
							fontSize: "15px",
							marginBottom: "-10px",
							color: "black",
						}}
					>
						Tên tài khoản:
					</p>
					<input
						type='text'
						placeholder='Tên tài khoản'
						value={username}
						onChange={(e) => setUserName(e.target.value)}
						required
						className='input'
					/>

					<p
						style={{
							display: "flex",
							justifyContent: "start",
							fontSize: "15px",
							marginBottom: "-10px",
							color: "black",
							marginTop: "20px",
						}}
					>
						Mật khẩu:
					</p>
					<div className='password-input-container'>
						<input
							type={showPassword ? "text" : "password"}
							placeholder='Mật khẩu'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className='input'
							style={{ marginBottom: "20px" }}
						/>
						<span
							className='password-toggle-icon'
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</span>
					</div>

					<button
						type='submit'
						className='login-button'
						style={{ marginTop: "30px" }}
					>
						Đăng nhập
					</button>
				</form>

				<div className='signup-container'>
					<span style={{ color: "black" }}>Don't have an account ?</span>
					<Link to='/register' className='signup-link '>
						Tài khoản khách hàng
					</Link>
					{/* <p>or</p>
					<Link to='/RegisterShop' className='signup-link'>
						Shopper Account
					</Link> */}
				</div>
				<Link to='/reset-password' className='signup-link'>
					Đặt lại mật khẩu
				</Link>
			</div>
		</div>
	);
};

export default LoginPage;
