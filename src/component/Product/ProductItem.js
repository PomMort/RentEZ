import { Tooltip } from "@mui/material";
import React from "react";
import { FaTruckMoving } from "react-icons/fa6";

export default function ProductItem({ product }) {
	return (
		<div className='min-h-[350px] mx-4'>
			<div className='flex justify-center'>
				<img
					className=' mt-4 bg-center max-h-[400px] object-cover'
					style={{ width: "80%" }}
					src={product?.image}
					alt='anh_cuoi'
				/>
			</div>
			<div>
				<div className='max-h-[350px] my-3'>
					<Tooltip title={product?.productName}>
						<p
							className='font-text text-xl overflow-hidden truncate'
							style={{ whiteSpace: "nowrap" }}
						>
							{product?.productName}
						</p>
					</Tooltip>

					<div
						className='flex justify-between mt-2'
						style={{ alignItems: "center" }}
					>
						<p
							className='font-text'
							style={{
								color: "red",
								fontSize: "20px",
							}}
						>
							{product?.price}đ
						</p>
						<FaTruckMoving
							style={{
								color: "yellowgreen",
								fontSize: "40px",
							}}
						/>
					</div>

					<div
						className='flex justify-between'
						style={{ alignItems: "center" }}
					>
						<div
							className='flex justify-center my-5'
							style={{
								alignItems: "center",
								gap: "5px",
							}}
						>
							<p
								className='font-text text-black'
								style={{ fontSize: "20px" }}
							>
								Đánh giá: {product?.ratingCount}
							</p>
						</div>
						<p className='font-text text-black text-xl'>
							Số lần thuê: {product?.rentedCount}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}