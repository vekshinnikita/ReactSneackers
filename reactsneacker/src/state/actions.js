import { ACTIVATE_USER, ADD_PRODUCT_BASKET, ADD_PRODUCT_FAVOURITE, CONFIRM_PASSWORD, FIRST_UPDATE, GET_DETAIL_PRODUCTS, GET_FILTER_FIELDS, GET_LIST_PRODUCTS, GET_ORDERS, GET_USER, HIDE_ALERT, HIDE_LOADER, HIDE_LOADER_DETAIL, HIDE_LOADER_LIST, LEAVE_REVIEW, LOGIN_USER, LOGOUT_USER, MAKE_ORDER, REMOVE_PRODUCT_BASKET, REMOVE_PRODUCT_FAVOURITE, RESET_PASSWORD, SET_AUTH_TOKEN, SET_DETAIL_PRODUCTS, SET_FILTER_FIELDS, SET_LIST_PRODUCTS, SET_ORDERS, SET_REVIEW, SET_USER, SHOW_ALERT, SHOW_LOADER, SHOW_LOADER_DETAIL, SHOW_LOADER_LIST, SIGNUP_USER, SUCCESS_ORDER, UNSET_AUTH_TOKEN, UPDATE_USER } from "./types"


export function setListProduct(products, pagination, pageQuantity){
    return{
        type: SET_LIST_PRODUCTS,
        payload: products,
        pagination,
        pageQuantity
    }
}

export function setDetailProduct(product){
    return{
        type: SET_DETAIL_PRODUCTS,
        payload: product
    }
}

export function showLoaderDetail(){
    return{
        type: SHOW_LOADER_DETAIL,
    }
}
export function hideLoaderDetail(){
    return{
        type: HIDE_LOADER_DETAIL,
    }
}

export function showLoaderList(){
    return{
        type: SHOW_LOADER_LIST,
    }
}
export function hideLoaderList(){
    return{
        type: HIDE_LOADER_LIST,
    }
}

export function getListProduct(pagination, filter, page){
    return{
        type: GET_LIST_PRODUCTS,
        filter,
        pagination,
        page
    }
}

export function getDetailProduct(id){
    return{
        type: GET_DETAIL_PRODUCTS,
        id,
    }
}

export function removeProductBasket(product){
    return{
        type: REMOVE_PRODUCT_BASKET,
        payload: product
    }
}

export function addProductBasket(product){
    return{
        type: ADD_PRODUCT_BASKET,
        payload: product
    }
}

export function removeProductFavourite(product){
    return{
        type: REMOVE_PRODUCT_FAVOURITE,
        payload: product
    }
}

export function addProductFavourite(product){
    return{
        type: ADD_PRODUCT_FAVOURITE,
        payload: product
    }
}

export function loginUser(payload){
    return {
        type: LOGIN_USER,
        email: payload.email,
        password: payload.password
    }
}

export function logoutUser(payload){
    return {
        type: LOGOUT_USER,
        token: payload,
    }
}

export function signupUser(payload,navigate){
    return {
        type: SIGNUP_USER,
        email: payload.email,
        password: payload.password,
        last_name: payload.last_name,
        first_name: payload.first_name,
        navigate,
    }
}

export function setAuthToken(payload){
    return {
        type: SET_AUTH_TOKEN,
        payload
    }
}

export function unsetAuthToken(){
    return {
        type: UNSET_AUTH_TOKEN,
    }
}

export function getUser(payload){
    return {
        type: GET_USER,
        token: payload
    }
}

export function updateUser(payload, token){
    return {
        type: UPDATE_USER,
        payload,
        token
    }
}

export function setUser(payload){
    return {
        type: SET_USER,
        payload
    }
}

export function showAlert(alerts, tp){
    return{
        type: SHOW_ALERT,
        alerts,
        tp,
    }
}

export function hideAlert(){
    return{
        type: HIDE_ALERT
    }
}

export function showLoader(){
    return{
        type: SHOW_LOADER
    }
}

export function hideLoader(){
    return{
        type: HIDE_LOADER
    }
}

export function activateUser(payload){
    return {
        type: ACTIVATE_USER,
        uid: payload.uid,
        token: payload.token,
    }
}

export function resetPassword(email, navigate){
    return {
        type: RESET_PASSWORD,
        email,
        navigate
    }
}

export function confirmPassword(payload, navigate){
    return {
        type: CONFIRM_PASSWORD,
        new_password: payload.new_password,
        uid: payload.uid,
        token: payload.token,
        navigate
    }
}

export function leaveReview(text, rating_value, productID, token){
    return {
        type: LEAVE_REVIEW,
        text,
        rating_value,
        productID,
        token
    }   
}
export function setReview(payload){
    return {
        type: SET_REVIEW,
        payload,
    }   
}

export function getFilterFields(){
    return {
        type: GET_FILTER_FIELDS,
    }   
}

export function setFilterFields(payload){
    return {
        type: SET_FILTER_FIELDS,
        payload
    }   
}

export function getOrders(token){

    return {
        type: GET_ORDERS,
        token
    }
}

export function setOrders(payload){

    return {
        type: SET_ORDERS,
        payload
    }
}

export function makeOrder(order, token){
    
    return {
        type: MAKE_ORDER,
        order,
        token,
    }
}

export function successOrder(payload){
    return {
        type: SUCCESS_ORDER,
        payload
    }
}

export function firstUpdateAction(){
    return {
        type: FIRST_UPDATE,
    }
}