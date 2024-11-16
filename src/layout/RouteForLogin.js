import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RouteForLogin({ children }) {
	const { isLoggedIn } = useSelector((state) => state.productListData);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/Login");
			toast.info("Vui lòng đăng nhập");
		}
	}, [isLoggedIn, navigate]);

	if (!isLoggedIn) {
		return <div></div>;
	}

	return <>{children}</>;
}
