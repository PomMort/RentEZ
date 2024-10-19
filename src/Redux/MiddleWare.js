import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios';

//Call API
const getProducts = async () => {
    const res = await axios.get("https://localhost:7085/api/products")
    if (res.status === 200) {
        return res.data.data;
    }
    else {
        return null;
    }
}

// Tạo Function GetData để lấy dữ liệu từ server
function* GetData() {
    const data = yield call(getProducts)
    yield put({ type: "CHANGE_STATUS", payload: { status: true } })
    if (data) {
        yield put({ type: "SET_DATA", payload: { productList: data } })
    }
}

function* mySaga() {
    yield takeLatest("GET_DATA", GetData) 
}

export default mySaga;