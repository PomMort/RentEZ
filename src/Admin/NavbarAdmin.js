import React from "react";
import { FaMoneyBillWave, FaRegChartBar } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { BiSolidDiscount } from "react-icons/bi";
import { FaShop } from "react-icons/fa6";

const NAVBAR_LIST = [
	{
		title: "Thống kê",
		icon: <MdDashboard />,
		path: "/dashboard",
	},
	{
		title: "Quản lý khách hàng",
		icon: <FaUserGroup />,
		path: "/manage-users",
	},
	{
		title: "Quản lý kho",
		icon: <FaRegChartBar />,
		path: "/manage-categories",
	},
	{
		title: "Quản lý Vouchers",
		icon: <BiSolidDiscount />,
		path: "/manage-vouchers",
	},
	{
		title: "Quản lí cửa hàng",
		icon: <FaShop />,
		path: "/manage-shops",
	},
	{
		title: "Quản lý đơn hàng",
		icon: <FaMoneyBillWave />,
		path: "/manage-orders",
	},
];

export default function NavbarAdmin() {
	return (
		<div className='px-[25px] border-r-4 border-[#EDEDED]'>
			{NAVBAR_LIST.map((nav) => (
				<NavLink
					to={`/admin${nav.path}`}
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
