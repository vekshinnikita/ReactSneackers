import {put, takeLatest, call} from "redux-saga/effects"
import { callAlertSaga } from "../services/callAlert"
import { getValues } from "../services/service"
import { hideLoader, setAuthToken, setUser, showLoader, unsetAuthToken } from "../state/actions"
import { ACTIVATE_USER, CONFIRM_PASSWORD, GET_USER, LOGIN_USER, LOGOUT_USER, RESET_PASSWORD, SIGNUP_USER, UPDATE_USER } from "../state/types"
import { getUserAPI, loginAPI, logoutAPI, resetPasswordAPI, signupAPI, updateUserAPI, confirmPasswordAPI, activateUserAPI } from "./authAPI"




function* login(action){
    try {
        yield put(showLoader())
        const data = yield call(loginAPI, action.email, action.password)
        if(data.auth_token){
            yield put(setAuthToken(data.auth_token))
        }

        yield put(hideLoader())
    }catch (error) {
        yield put(hideLoader())
        const errs = getValues(JSON.parse(error.request.response))
        yield callAlertSaga(errs, "error", put)
    }  

    
}

function* logout(action){
    try {
        yield put(showLoader())

        yield call(logoutAPI, action.token)
        yield put(unsetAuthToken())

        yield put(hideLoader())

    }catch (error) {
        yield put(hideLoader())
        yield put(unsetAuthToken())
        const errs = getValues(JSON.parse(error.request.response))
        yield callAlertSaga(errs, "error", put)
    }
}

function* signup(action){
    try {
        yield put(showLoader())
        yield call(
            signupAPI, 
            action.last_name, 
            action.first_name, 
            action.email, 
            action.password)
        yield put(hideLoader())
        yield call(() => action.navigate('/login'))
        yield callAlertSaga(["Вам на электронную почту выслано сообщение с активацией"], 'success', put)
        
        
        
    }catch (error) {
        yield put(hideLoader())
        const errs = getValues(JSON.parse(error.request.response))
        yield callAlertSaga(errs, "error", put)
    }
}

function* getUser(action){
    try {
        yield put(showLoader())

        const data = yield call(getUserAPI, action.token)
        yield put(setUser(data))

        yield put(hideLoader())
    }catch (error) {
        yield put(unsetAuthToken())
        yield put(hideLoader())
        const errs = getValues(JSON.parse(error.request.response))
        yield callAlertSaga(errs, "error", put)
    }
}

function* updateUser(action){
    try {
        yield put(showLoader())

        const data = yield call(updateUserAPI, action.payload, action.token)
        yield put(setUser(data))

        yield put(hideLoader())
        yield callAlertSaga(["Данные успешно сохранены"], "success", put)
    }catch (error) {
        yield put(hideLoader())
        const errs = getValues(JSON.parse(error.request.response))
        yield callAlertSaga(errs, "error", put)
    }
}

function* resetPassword(action){
    try {
        yield put(showLoader())
        yield call(resetPasswordAPI, action.email)
        yield put(hideLoader())
        yield call(() => action.navigate('/login'))
        yield callAlertSaga(["Вам на электронную почту выслано сообщение для смены пароля"], 'success', put)

    }catch (error) {
        yield put(hideLoader())
        const errs = getValues(JSON.parse(error.request.response))
        yield callAlertSaga(errs, "error", put)
        
    }
}

function* confirmPassword(action){
    try {
        yield put(showLoader())
        yield call(confirmPasswordAPI, action.new_password, action.token, action.uid)
        yield put(hideLoader())
        yield call(() => action.navigate('/login'))
        yield callAlertSaga(["Пароль успешно изменён"], 'success', put)

    }catch (error) {
        yield put(hideLoader())
        const errs = getValues(JSON.parse(error.request.response))
        yield callAlertSaga(errs, "error", put)
        
    }
}

function* activateUser(action){
    try {
        yield put(showLoader())
        yield call(activateUserAPI, action.token, action.uid)
        yield put(hideLoader())
        yield callAlertSaga(["Аккаунт успешно активирован"], 'success', put)

    }catch (error) {
        yield put(hideLoader())
        yield callAlertSaga(['Упс... Что-то пошло не так'], "error", put)
        
    }
}


function* authWatcher() {
    yield takeLatest(ACTIVATE_USER, activateUser);
    yield takeLatest(UPDATE_USER, updateUser);
    yield takeLatest(GET_USER, getUser);
    yield takeLatest(SIGNUP_USER, signup);
    yield takeLatest(LOGIN_USER, login);
    yield takeLatest(LOGOUT_USER, logout)
    yield takeLatest(RESET_PASSWORD, resetPassword)
    yield takeLatest(CONFIRM_PASSWORD, confirmPassword)
  }

export default authWatcher