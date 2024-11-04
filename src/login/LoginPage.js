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

			console.log(response);

			const userData = response;
			localStorage.setItem("Auth", JSON.stringify(userData));
			dispatch({ type: "LOGIN_SUCCESS", payload: userData });
			navigate("/");
			toast.success("Login successfully");
		} catch (error) {
			console.error("Login error:", error);
			toast.error("Login failed. Please check your credentials.");
		}
	};

	return (
		<div className='login-container'>
			<div className='login-box'>
				<div className='Logo-center'>
					<h1>Welcome To</h1>
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
						User name:
					</p>
					<input
						type='text'
						placeholder='username'
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
						Password:
					</p>
					<div className='password-input-container'>
						<input
							type={showPassword ? "text" : "password"}
							placeholder='password'
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
						Login
					</button>
				</form>

				<div className='signup-container'>
					<span style={{ color: "black" }}>Don't have an account?</span>
					<Link to='/register' className='signup-link'>
						Sign Up Here
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
