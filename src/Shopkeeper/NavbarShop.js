import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoShirt } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { BiSolidDiscount } from "react-icons/bi";
import { MdDashboard, MdFeedback } from "react-icons/md";

const NAVBAR_LIST = [
	{
		title: "Dashboard",
		icon: <MdDashboard />,
		path: "/dashboard",
	},
	{
		title: "Manage Products",
		icon: <IoShirt />,
		path: "/manage-products",
	},
	{
		title: "Manage Orders",
		icon: <FaMoneyBillWave />,
		path: "/manage-orders",
	},
	{
		title: "Manage Vouchers",
		icon: <BiSolidDiscount />,
		path: "/manage-vouchers",
	},
	{
		title: "Manage Feedbacks",
		icon: <MdFeedback />,
		path: "/manage-feedbacks",
	},
];

export default function NavbarShop() {
	return (
		<div className='px-[25px] border-r-4 border-[#EDEDED]'>
			{NAVBAR_LIST.map((nav) => (
				<NavLink
					to={`/shop${nav.path}`}
					key={nav.title}
					className={`flex items-center justify-between p-3 my-2 cursor-pointer text-black font-medium hover:bg-gray-100 rounded-lg transition-all`}
				>
					<div className='flex items-center gap-[10px]'>
						{nav.icon}
						<p className='text-base'>{nav.title}</p>
					</div>
				</NavLink>
			))}
		</div>
	);
}
