import { takeLatest, takeEvery, call, delay, put } from 'redux-saga/effects'
import axios from 'axios';

//Call API
const getProducts = async () => {
    const res = await axios.get("https://65321e684d4c2e3f333da188.mockapi.io/api/v1/staffs")

    if (res.status === 200) {
        return res.data;
    }
    else {
        return null;
    }
}


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
