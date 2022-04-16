import {all} from "redux-saga/effects"
import authWatcher from "./authSaga"
import productWatcher from "./productSaga"

export function* rootWatcher() {
    yield all([authWatcher(), productWatcher()])
}