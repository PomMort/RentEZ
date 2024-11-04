import React from "react";
import { useSelector } from "react-redux";
import CartProducts from "./Cart_Products";

export default function Cart_Item() {
	const { cartList } = useSelector((state) => state.productListData);

	return (
		<div className='grid mt-2'>
			{cartList.map((cart) => (
				<CartProducts key={cart.product.id} cart={cart} />
			))}
		</div>
	);
}
