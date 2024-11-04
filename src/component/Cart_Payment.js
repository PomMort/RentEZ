import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Cart_Payment() {
	const { cartList } = useSelector((state) => state.productListData);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		const totalPrice = cartList.reduce((preValue, c) => {
			return preValue + c.product.price * c.quantity * 1.0;
		}, 0);

		setTotalPrice(totalPrice.toFixed(2));
	}, [cartList]);

	return (
		<div>
			<div className='mt-2 shadow hover:shadow-lg  rounded-2xl shadow-gray-500 min-h-[235px] min-w-[150px]'>
				<p className='font-bold font-text text-xl mx-4 py-4'>
					Order Infor{" "}
				</p>
				<div className='mx-10'>
					<p className='flex justify-between '>
						<span className=' text-gray-500 font-text'> Subtotal: </span>
						<span className='font-semibold font-text'>{totalPrice}đ</span>
					</p>

					<p className='flex justify-between mb-4'>
						<span className=' text-gray-500 font-text'>
							{" "}
							Shipping Cost:{" "}
						</span>
						<span className='font-semibold font-text'>20000đ</span>
					</p>
				</div>

				<p className='flex justify-between font-bold text-2xl pb-11 mx-4 font-text'>
					Total:{" "}
					<span className='mr-7 font-text'>
						{(totalPrice * 1 + 20000).toFixed(2)}đ
					</span>
				</p>
			</div>

			<div className='grid grid-cols-1 mt-4 gap-3'>
				<Button
					variant='contained'
					style={{
						color: "black",
						background: "yellow",
						fontWeight: "bold",
					}}
					className='transition ease-in-out hover:-translate-y-1 hover:scale-105  duration-500 rounded-2xl font-text'
				>
					Check out
				</Button>

				<Link to={"/"}>
					<Button
						variant='outlined'
						style={{
							color: "black",
							fontWeight: "lighter",
							border: "1px solid black",
						}}
						className='transition ease-in-out hover:-translate-y-1 hover:scale-x-105  duration-500 rounded-2xl w-full font-text'
					>
						Continue shopping
					</Button>
				</Link>
			</div>
		</div>
	);
}
