import { takeLatest, call, put } from "redux-saga/effects";
import axiosInstance from "../util/axiosInstance";

//Call API
const getProducts = async () => {
	try {
		const res = await axiosInstance.get("/api/products/category/shop");
		if (res.statusCode === 200) {
			return res.data.items;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);

	}
};

// Tạo Function GetData để lấy dữ liệu từ server
function* GetData() {
	const data = yield call(getProducts);
	yield put({ type: "CHANGE_STATUS", payload: { status: true } });
	if (data) {
		yield put({ type: "SET_DATA", payload: { productList: data } });
	}
}

function* mySaga() {
	yield takeLatest("GET_DATA", GetData);
}

export default mySaga;
