export const saveCart = (cartList) => {
	localStorage.setItem("cart", JSON.stringify(cartList));
};

export const getCart = () => {
	return JSON.parse(localStorage.getItem("cart"));
};
