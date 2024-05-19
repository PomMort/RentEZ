import Reducer from "./Reducer";
import MiddleWare from './MiddleWare'
import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, legacy_createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware()

const allReducer = combineReducers({
    productListData: Reducer,
})

export default legacy_createStore(allReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(MiddleWare)