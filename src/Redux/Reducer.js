const initProductList = {
    productList: [],
    selectorProduct: {},
    cartList: [],
    status: false,
    isLoggedIn: false,
    user: null
}

var Reducer = (state = initProductList, { type, payload }) => {
    switch (type) {
        case "CHANGE_STATUS":
            return {
                ...state,
                status: payload.status
            }
        case "SET_DATA":
            return {
                ...state,
                productList: payload.productList,
                selectorProduct: payload.productList[0]
            }
        case "SELECT_PRODUCT":
            return {
                ...state,
                selectorProduct: payload
            }
        case "ADD_TO_CART":
            const existingProductIndex = state.cartList.findIndex(
                (c) => c.product.id === payload.product.id
            );
            
            if (existingProductIndex !== -1) {
                const updatedCartList = [...state.cartList];
                updatedCartList[existingProductIndex].quantity += payload.quantity;
                
                return {
                    ...state,
                    cartList: updatedCartList,
                };
            } else {
                const updatedCartList = [...state.cartList, payload];
              
                return {
                    ...state,
                    cartList: updatedCartList
                };
            }
            
        case "CHANGE_QUANTITY":{
            const updatedCartList = state.cartList.map(c => {
                return (
                    c.product.id === payload.product.id ? 
                    {...c, quantity: payload.quantity} :
                    c
                )
            })
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
                cartList: updatedCartList
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                user: payload
            }
        case "LOGOUT":
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        default:
            return state
    }
}

export default Reducer;