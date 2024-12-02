import React, { useEffect, useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axiosInstance from "../../util/axiosInstance";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			font: {
				size: 30,
				weight: "bold",
			},
		},
	},
};

const labels = [
	"Tháng 1",
	"Tháng 2",
	"Tháng 3",
	"Tháng 4",
	"Tháng 5",
	"Tháng 6",
	"Tháng 7",
	"Tháng 8",
	"Tháng 9",
	"Tháng 10",
	"Tháng 11",
	"Tháng 12",
];

export default function Dashboard() {
	const [dashboard, setDashboard] = useState();
	const [revenueData, setRevenueData] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchDataRevenue = async () => {
		setLoading((prev) => !prev);
		await axiosInstance
			.get("/api/stats/admin/general")
			.then((res) => {
				if (res.statusCode === 200) {
					setDashboard(res?.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});

		await axiosInstance
			.get(`/api/stats/revenue/chart?Year=${dayjs().year()}`)
			.then((res) => {
				if (res.statusCode === 200) {
					setRevenueData(res?.data);
					setLoading((prev) => !prev);
				}
			})
			.catch((err) => {
				console.log(err);
				setLoading((prev) => !prev);
			});
	};

	useEffect(() => {
		fetchDataRevenue();
	}, []);

	const dataOrders = {
		labels,
		datasets: [
			{
				label: "Tổng số đơn hàng theo tháng",
				data: revenueData?.map((data) => {
					return data?.totalOrder;
				}),
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
		],
	};

	const dataRevenue = {
		labels,
		datasets: [
			{
				label: "Tổng doanh thu từ đồ theo tháng",
				data: revenueData?.map((data) => {
					return data?.totalRevenue;
				}),
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	};

	if (loading) {
		return (
			<div className='flex justify-center mt-10'>
				<CircularProgress />
			</div>
		);
	}

	return (
		<div className='container mx-auto'>
			<div className='grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-5'>
				<div className='py-16 bg-yellow-100 rounded-lg max-w-[400px] max-h-[300px]'>
					<div className='flex flex-row justify-center items-center'>
						<p>
							Tổng doanh thu: {dashboard?.totalRevenue?.toLocaleString()}
							đ
						</p>
					</div>
				</div>
				<div className='py-16 bg-yellow-100 rounded-lg max-w-[400px] max-h-[300px]'>
					<div className='flex flex-row justify-center items-center'>
						<p>Tổng đơn hàng: {dashboard?.totalOrder}</p>
					</div>
				</div>
				<div className='py-16 bg-yellow-100 rounded-lg max-w-[400px] max-h-[300px]'>
					<div className='flex flex-row justify-center items-center'>
						<p>Tổng số cửa hàng: {dashboard?.totalShop}</p>
					</div>
				</div>
				<div className='py-16 bg-yellow-100 rounded-lg max-w-[400px] max-h-[300px]'>
					<div className='flex flex-row justify-center items-center'>
						<p>Tổng số sản phẩm: {dashboard?.totalProduct}</p>
					</div>
				</div>
				<div className='py-16 bg-yellow-100 rounded-lg max-w-[400px] max-h-[300px]'>
					<div className='flex flex-row justify-center items-center'>
						<p>Số lượng người dùng: {dashboard?.totalUser}</p>
					</div>
				</div>
			</div>
			<h1 className='text-center mt-10 font-bold uppercase'>
				Bảng thống kê của admin
			</h1>
			<div className='flex items-center justify-between py-7 px-4'>
				<div className='w-full'>
					<Line options={options} data={dataOrders} />
				</div>
				<div className='w-full'>
					<Line options={options} data={dataRevenue} />
				</div>
			</div>
		</div>
	);
}
