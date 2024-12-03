import { Rating, Tooltip } from "@mui/material";
import React from "react";
import { FaTruckMoving } from "react-icons/fa6";

export default function ProductItem({ product }) {
	return (
		<div className='min-h-[350px] mx-4 '>
			<div className='flex justify-center'>
				<img
					className=' mt-4 bg-center h-[350px] object-contain'
					style={{ width: "80%" }}
					src={product?.image}
					alt='anh_cuoi'
				/>
			</div>
			<div>
				<div className='max-h-[350px] my-3'>
					<Tooltip title={product?.productName}>
						<p
							className='font-text text-2xl overflow-hidden truncate'
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
							{product?.rentPrices?.[0].toLocaleString()}đ
						</p>
						<FaTruckMoving
							style={{
								color: "yellowgreen",
								fontSize: "40px",
							}}
						/>
					</div>

					<div>
						<Rating name='read-only' value={product?.rating} readOnly />
					</div>

					<div
						className='flex justify-between'
						style={{ alignItems: "center" }}
					>
						<div
							className='flex justify-center my-1'
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
