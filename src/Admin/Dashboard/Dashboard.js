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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axiosInstance from "../../util/axiosInstance";

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
			position: 'top',
		},
		title: {
			display: true,
			text: 'Bảng thống kê của ADMIN',
			font: {
				size: 30,
				weight: 'bold'
			}
		},
	},
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const data = {
	labels,
	datasets: [
		{
			label: 'Số lần thuê theo tháng',
			data: [1, 100, 1000, 2300, 1300, 4000, 200, 2000, 7000, 2000, 7900, 9000],
			borderColor: 'rgb(255, 99, 132)',
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
		{
			label: 'Tổng doanh thu từ đồ theo tháng',
			data: [5, 500, 3000, 2000, 2500, 6500, 1150, 3000, 5000, 5700, 3500, 5900],
			borderColor: 'rgb(53, 162, 235)',
			backgroundColor: 'rgba(53, 162, 235, 0.5)',
		},
	],
};


export default function Dashboard() {


	const [dashboard, setDashboard] = useState();

	useEffect(() => {
		axiosInstance
			.get("/api/stats/revenue")
			.then((res) => {
				if (res.statusCode === 200) {
					setDashboard(res?.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);



	return (
		<div className="container mx-auto">
			<div className="grid md:grid-cols-2 sm:grid-cols-1">
				<div className="py-16 bg-yellow-100 rounded-lg max-w-[400px] max-h-[300px] ml-44">
					<div className="flex flex-row justify-center items-center">
						<p>Tổng doanh thu: {dashboard?.totalRevenue}đ</p>
					</div>
				</div>
				<div className="py-16 bg-yellow-100 rounded-lg max-w-[400px] max-h-[300px] ml-44">
					<div className="flex flex-row justify-center items-center">
						<p>Tổng số lượng sản phẩm: {dashboard?.totalOrderShop} SP</p>
					</div>
				</div>
			</div>
			<div className="py-7 px-4">
				<Line options={options} data={data} />
			</div>
		</div>
	)
}
