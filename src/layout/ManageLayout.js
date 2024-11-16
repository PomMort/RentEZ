import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function ManageLayout({ children, isAdmin, navbar }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state) => state.productListData.isLoggedIn);
	const user = useSelector((state) => state.productListData.user);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		setIsMenuOpen(false);
		toast.success("Logout Success");
		navigate("/Login");
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	if (!user || !user?.role?.includes(isAdmin ? "Admin" : "ShopOwner")) {
		if (!isLoggedIn) {
			navigate("/Login");
		} else if (!user?.role?.includes(isAdmin ? "Admin" : "ShopOwner")) {
			toast.info("Bạn không có quyền");
			navigate("/");
		}
		return <></>;
	}

	return (
		<div>
			<div className='shadow-lg'>
				<div className='flex justify-between items-center px-6 py-2 text-black'>
					<div className='flex items-center'>
						<img
							src='/image/Logo.png'
							alt='RentEZ'
							className='w-[2rem] h-[2rem] mr-[62px]'
						/>
						<span className='font-bold uppercase'>trang quản lý</span>
					</div>
					<div className='flex items-center space-x-4 relative'>
						<div className='relative'>
							<div
								className='flex items-center cursor-pointer'
								onClick={toggleMenu}
							>
								<FontAwesomeIcon icon={faUser} className='text-black' />
								<span className='font-text ml-2'>
									{isLoggedIn && user ? user.fullName : "My Account"}
								</span>
							</div>
							{isMenuOpen && (
								<div className='absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-40'>
									<button
										onClick={handleLogout}
										className='block px-4 py-2 text-sm w-full text-left hover:bg-gray-200'
									>
										Logout
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-12 mt-5 mx-5'>
				<div className='col-span-2'>{navbar}</div>
				<div className='col-span-10'>
					<div className='pl-5'>{children}</div>
				</div>
			</div>
		</div>
	);
}
