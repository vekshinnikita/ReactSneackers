import {put, takeLatest, call} from "redux-saga/effects"
import { callAlertSaga } from "../services/callAlert"
import { getValues } from "../services/service"
import { hideLoader, hideLoaderDetail, hideLoaderList, setDetailProduct, setFilterFields, setListProduct, setOrders, setReview, showLoader, showLoaderDetail, showLoaderList, successOrder, unsetAuthToken } from "../state/actions"
import { GET_DETAIL_PRODUCTS, GET_FILTER_FIELDS, GET_LIST_PRODUCTS, GET_ORDERS, LEAVE_REVIEW, MAKE_ORDER } from "../state/types"
import { detailProductsAPI, getFilterFieldsAPI, getOrdersAPI, leaveReviewAPI, listProductsAPI, makeOrderAPI } from "./productAPI"

const delay = time => new Promise(resolve => setTimeout(resolve, time))

function* getListProducts(action){
    try {
        if(!action.filter){
            yield put(showLoaderList())
            yield delay(800)
        }   
        const [data, pageQuantity] = yield call(listProductsAPI, action.filter, action.page)
        if(!action.filter){
            yield put(hideLoaderList())
        }   

        yield put(setListProduct(data, action.pagination, pageQuantity))

    }catch (error) {
        const errs = getValues(JSON.parse(error.request.response))
        yield callAlertSaga(errs, "error", put)
        
    }
}

function* getDetailProducts(action){
    try {
        yield put(showLoaderDetail())
        yield delay(500)
        const data = yield call(detailProductsAPI, action.id)
        yield put(setDetailProduct(data))

        yield put(hideLoaderDetail())

        

    }catch (error) {
        const errs = getValues(JSON.parse(error.request.response))
        yield callAlertSaga(errs, "error", put)
        
    }
}

function* leaveReview(action){
    try {
        const data = yield call(leaveReviewAPI, action.productID, action.text, action.rating_value, action.token)
        yield put(setReview(data))

    }catch (error) {
        yield put(unsetAuthToken())
        const errs = getValues(JSON.parse(error.request.response))
        yield callAlertSaga(errs, "error", put)
        
    }
}

function* getFilterFields(){
    try {
        const data = yield call(getFilterFieldsAPI)
        yield put(setFilterFields(data))
        

    }catch (error) {
        const errs = getValues(JSON.parse(error.request.response))
        yield callAlertSaga(errs, "error", put)
    }
}

function* getOrders(action){
    try {
        const data = yield call(getOrdersAPI, action.token)
        yield put(setOrders(data))
        

    }catch (error) {
        yield put(unsetAuthToken())
        const errs = getValues(JSON.parse(error.request.response))
        yield callAlertSaga(errs, "error", put)
    }
}

function* makeOrder(action){
    try {
        yield put(showLoader())
        const data = yield call(makeOrderAPI, action.order, action.token)

        yield put(hideLoader())
        yield put(successOrder(data))
        
        
        
    }catch (error) {
        yield put(unsetAuthToken())
        yield put(hideLoader())
        const errs = getValues(JSON.parse(error.request.response))
        yield callAlertSaga(errs, "error", put)
    }
}



function* productWatcher() {
    yield takeLatest(MAKE_ORDER, makeOrder);
    yield takeLatest(GET_ORDERS, getOrders);
    yield takeLatest(GET_FILTER_FIELDS, getFilterFields);
    yield takeLatest(LEAVE_REVIEW, leaveReview);
    yield takeLatest(GET_LIST_PRODUCTS, getListProducts);
    yield takeLatest(GET_DETAIL_PRODUCTS, getDetailProducts);
  }

export default productWatcher