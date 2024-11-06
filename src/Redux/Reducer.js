import { getCart, getUser, saveCart, saveUser } from "../util/common";

const initProductList = {
	productList: [],
	selectorProduct: {},
	cartList: [],
	productsSelected: [], // Những sản phâm chọn để thanh toán
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
		case "LOAD_USER":
			const _user = getUser();
			if (_user) {
				return {
					...state,
					user: _user,
					isLoggedIn: true,
				};
			}
			return state;
		case "ADD_TO_CART": {
			console.log(payload);

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
						rentDateTime: payload.rentDateTime, // ngày bắt đầu thuê
						returnDateTime: payload.returnDateTime, // ngày trả đồ
						dayRent: payload.dayRent, // số ngày thuê
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
							rentDateTime: payload.rentDateTime, // ngày bắt đầu thuê
							returnDateTime: payload.returnDateTime, // ngày trả đồ
							dayRent: payload.dayRent, // số ngày thuê
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
			const updatedCartList = [...state.cartList];

			updatedCartList[payload?.shopIndex].products[
				payload?.productIndex
			].quantity += payload?.delta;

			saveCart(updatedCartList);

			return {
				...state,
				cartList: updatedCartList,
			};
		}
		case "REMOVE_PRODUCT":
			let updatedCartList = [...state.cartList];

			updatedCartList[payload.shopIndex] = {
				...updatedCartList[payload.shopIndex],
				products: updatedCartList[payload.shopIndex].products.filter(
					(_, index) => index !== payload.productIndex
				),
			};

			updatedCartList = updatedCartList.filter(
				(cartItem) => cartItem?.products?.length > 0
			);

			saveCart(updatedCartList);

			return {
				...state,
				cartList: updatedCartList,
			};
		case "REMOVE_ALL_PRODUCT": {
			localStorage.removeItem("cart");
			return {
				...state,
				cartList: [],
			};
		}
		case "LOAD_CART": {
			const cartData = getCart();

			return {
				...state,
				cartList: cartData,
			};
		}
		case "PRODUCTS_PAYMENT": {
			const productList = [];
			state.cartList.forEach((cart) => {
				cart?.products?.forEach((product, productIndex) => {
					if (
						payload?.productIdListSelected?.includes(product?.product?.id)
					) {
						productList.push(cart.products[productIndex]);
					}
				});
			});

			return {
				...state,
				productsSelected: productList,
			};
		}
		case "REMOVE_PRODUCTS_PAYMENT": {
			return {
				...state,
				productsSelected: [],
			};
		}
		case "LOGIN_SUCCESS":
			saveUser(payload);
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
