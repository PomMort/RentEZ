export const saveCart = (cartList) => {
	localStorage.setItem("cart", JSON.stringify(cartList));
};

export const getCart = () => {
	return JSON.parse(localStorage.getItem("cart")) || [];
};

export const saveUser = (user) => {
	localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
	return JSON.parse(localStorage.getItem("user")) || null;
};

// dateString: ngày hiện tại
// numberOfDaysLater: tính toán sau ngày dateString
// VD: (06/11/2024, 3) => thì sẽ tính toán => trả về 09/11/2024
export function getFutureDate(dateString, numberOfDaysLater) {
	const date = new Date(dateString);
	date.setDate(date.getDate() + numberOfDaysLater);
	return {
		formattedDate: date.toLocaleDateString("vi-VN"), // DD-MM-YYYY format
		isoDate: date.toISOString(),
	};
}
