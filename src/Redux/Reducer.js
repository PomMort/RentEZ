import { saveCart } from "../util/common";

const initProductList = {
	productList: [],
	selectorProduct: {},
	cartList: [],
	status: false,
	isLoggedIn: false,
	user: null,
};

var Reducer = (state = initProductList, { type, payload }) => {
	switch (type) {
		case "CHANGE_STATUS":
			return {
				...state,
				status: payload.status,
			};
		case "SET_DATA":
			return {
				...state,
				productList: payload.productList,
				selectorProduct: payload.productList[0],
			};
		case "SELECT_PRODUCT":
			return {
				...state,
				selectorProduct: payload,
			};
		case "ADD_TO_CART": {
			const updatedCartList = [...state.cartList];
			const existingShopIndex = updatedCartList.findIndex(
				(shop) => shop.shopId === payload.product?.shopId
			);

			if (existingShopIndex !== -1) {
				// Tìm sản phẩm trong shop đã tồn tại
				const existingProductIndex = updatedCartList[
					existingShopIndex
				].products.findIndex(
					(product) => product.product.id === payload.product?.id
				);

				if (existingProductIndex !== -1) {
					// Sản phẩm đã tồn tại, cập nhật quantity
					updatedCartList[existingShopIndex].products[
						existingProductIndex
					].quantity += payload.quantity;
				} else {
					// Sản phẩm chưa tồn tại, thêm sản phẩm mới vào shop
					updatedCartList[existingShopIndex].products.push({
						product: payload.product,
						quantity: payload.quantity,
					});
				}
			} else {
				// Shop chưa tồn tại, thêm shop mới cùng sản phẩm vào cartList
				updatedCartList.push({
					shop: payload.product.shopName,
					shopId: payload.product.shopId,
					products: [
						{
							product: payload.product,
							quantity: payload.quantity,
						},
					],
				});
			}

			// Lưu cart sau khi cập nhật
			saveCart(updatedCartList);

			return {
				...state,
				cartList: updatedCartList,
			};
		}

		case "CHANGE_QUANTITY": {
			const updatedCartList = state.cartList.map((c) => {
				return c.product.id === payload.product.id
					? { ...c, quantity: payload.quantity }
					: c;
			});
			return {
				...state,
				cartList: updatedCartList,
			};
		}

		case "REMOVE_PRODUCT":
			const updatedCartList = state.cartList.filter(
				(c) => c.product.id !== payload.product.id
			);
			return {
				...state,
				cartList: updatedCartList,
			};
		case "LOGIN_SUCCESS":
			return {
				...state,
				isLoggedIn: true,
				user: payload,
			};
		case "LOGOUT":
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		default:
			return state;
	}
};

export default Reducer;
