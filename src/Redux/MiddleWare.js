import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios';

//Call API
const getProducts = async () => {
    const res = await axios.get("https://65321e684d4c2e3f333da188.mockapi.io/api/v1/products")
    // const res = await axios.get("https://65321e684d4c2e3f333da188.mockapi.io/api/v1/categories")
    if (res.status === 200) {
        return res.data;
    }
    else {
        return null;
    }
}
// const LoginAPI = async () => {
//     const res = await axios.get("https://localhost:7085/api/auth/authentication")
//     if (res.status === 200) {
//         return res.data;
//     }
//     else {
//         return null;
//     }
// }


// Tạo Function GetData để lấy dữ liệu từ server
function* GetData() {
    // yield delay(1000);
    const data = yield call(getProducts)
    yield put({ type: "CHANGE_STATUS", payload: { status: true } })
    if (data) {
        yield put({ type: "SET_DATA", payload: { productList: data } })
    }
}

function* mySaga() {
    yield takeLatest("GET_DATA", GetData) 
    // yield takeLatest("GET_DATA", GetData)
}

export default mySaga;
