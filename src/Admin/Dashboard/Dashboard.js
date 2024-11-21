import React from "react";
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
			text: 'ADMIN Chart',
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
	return (
		<div className="container mx-auto">
			<div className="grid gap-2 md:grid-cols-4 sm:grid-cols-2">
				<div className="py-16 bg-yellow-100 rounded-lg max-w-[400px] max-h-[300px]">
					<div className="flex flex-row justify-center items-center">
						<p>Tổng doanh thu 1 năm: 20.000.000đ</p>
					</div>
				</div>
				<div className="py-16 bg-yellow-100 rounded-lg max-w-[400px] max-h-[300px]">
					<div className="flex flex-row justify-center items-center">
						<p>Tổng doanh thu 1 tháng: 500.000đ</p>
					</div>
				</div>
				<div className="py-16 bg-yellow-100 rounded-lg max-w-[400px] max-h-[300px]">
					<div className="flex flex-row justify-center items-center">
						<p>Tổng doanh thu 1 tuần: 100.000đ</p>
					</div>
				</div>
				<div className="py-16 bg-yellow-100 rounded-lg max-w-[400px] max-h-[300px]">
					<div className="flex flex-row justify-center items-center">
						<p>Tổng số lượng người dùng: 200 users</p>
					</div>
				</div>
			</div>
			<div className="py-7 px-4">
				<Line options={options} data={data} />
			</div>
		</div>
	)
}
